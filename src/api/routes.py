"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Product, Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from payments import create_payment_intent
import stripe



routes = Blueprint('routes', __name__)
CORS(routes) 

stripe.api_key = 'tu_clave_secreta_de_stripe'

# # Allow CORS requests to this API
# CORS(api)


def create_payment(app: Flask):
    @routes.route('/api/create-payment-intent', methods=['POST'])
    def create_payment():
        data = request.json
        amount = data.get('amount') 

        if not amount:
            return jsonify({'error': 'Amount is required'}), 400

        # Crear el PaymentIntent
    try:
        payment_intent = create_payment_intent(amount)
        return jsonify(payment_intent), 200  
    except Exception as e:
        return jsonify({'error': str(e)}), 400



@routes.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@routes.route('/')
def home():
    return "¡Bienvenido a la tienda en línea!"

# Endpoints de productos
@routes.route('/products', methods=['POST'])
@jwt_required()  # Requiere un token JWT válido
def create_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        image_url=data.get('image_url', '')  
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Producto creado exitosamente!'}), 201

@routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {'id': product.id, 
         'name': product.name, 
         'description': product.description, 
         'price': product.price, 
         'image_url': product.image_url}
        for product in products
    ])

@routes.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'image_url': product.image_url,
    })

# Endpoints de usuarios
@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'El usuario ya existe'}), 400
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])  # Hashea y guarda la contraseña
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Usuario registrado exitosamente!'}), 201

@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity={'id': user.id, 'username': user.username})
        return jsonify(access_token=access_token), 200
    return jsonify({'message': 'Credenciales inválidas'}), 401

# Ruta protegida 
@routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'Tienes acceso a esta ruta porque estás autenticado!'})

# CRUD para productos
# @routes.route('/products', methods=['POST'])
# @jwt_required()
# def create_product():
#     data = request.get_json()
#     product = Product(name=data['name'], description=data['description'], price=data['price'])
#     db.session.add(product)
#     db.session.commit()
#     return jsonify({'message': 'Producto creado exitosamente!'}), 201

# @routes.route('/products', methods=['GET'])
# def get_products():
#     products = Product.query.all()
#     return jsonify([{'id': p.id, 'name': p.name, 'price': p.price} for p in products])

# @routes.route('/products/<int:id>', methods=['GET'])
# def get_product(id):
#     product = Product.query.get_or_404(id)
#     return jsonify({'id': product.id, 'name': product.name, 'price': product.price})

# Ruta para crear un nuevo pedido
@routes.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Pedido creado exitosamente!'}), 201
