"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import base64
from flask import Flask, request, jsonify, url_for, send_from_directory
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, bcrypt, jwt
from api.routes import routes
from api.admin import setup_admin
from api.commands import setup_commands
from api.stripe_payment import stripe_bp
from routes import create_payment 
from api.stripe_payment import create_payment_intent
from payments import create_payment_intent
import stripe



load_dotenv() 

# Acceder a las variables de entorno
DATABASE_URL = os.getenv('DATABASE_URL')
FLASK_APP_KEY = os.getenv('FLASK_APP_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
STRIPE_API_KEY = os.getenv('stripe.api_key')

print(f"Database URL: {DATABASE_URL}")
print(f"Stripe API Key: {STRIPE_API_KEY}")

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')


app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY') 

db.init_app(app)
migrate = Migrate(app, db, compare_type=True)
bcrypt.init_app(app)
jwt.init_app(app)
CORS(app)
create_payment(app)

setup_admin(app)

setup_commands(app)

app.register_blueprint(routes, url_prefix='/api')
app.register_blueprint(stripe_bp)
# app.register_blueprint(create_payment_intent)

@app.route('/')
def home():
    return 'Bienvenido a la tienda'

@app.route('/api/register', methods=['POST'])
def register():
    # Lógica de registro
    return "Registro exitoso"



@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code



@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


# endpoint para pago 

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment():
    data = request.json
    amount = data.get('amount')  
    if not amount:
        return jsonify({'error': 'Amount is required'}), 400

    # Llamar a la función que crea el PaymentIntent
    payment_intent = create_payment_intent(amount)
    return jsonify(payment_intent)

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': data['product_name'],
                    },
                    'unit_amount': int(data['price'] * 100),  # Precio en centavos
                },
                'quantity': data['quantity'],
            }],
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
        )
        return jsonify({'id': session.id})
    except Exception as e:
        return jsonify(error=str(e)), 403


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(debug=True, host="0.0.0.0", port=3001)