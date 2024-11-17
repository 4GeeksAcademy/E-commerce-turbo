import stripe
from dotenv import load_dotenv
import os
from flask import Blueprint, jsonify, request
from flask import jsonify

# Cargar las variables de entorno
load_dotenv()

# Configurar Stripe con la clave secreta
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Crear un Blueprint para las rutas de Stripe
stripe_bp = Blueprint('stripe', __name__)

@stripe_bp.route('/api/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        # Obtener el monto desde el frontend (en centavos)
        amount = request.json['amount']
        
        # Crear el PaymentIntent
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",  
        )
        
        # Devolver el ID del PaymentIntent
        return jsonify({'id': payment_intent.id})
    except stripe.error.StripeError as e:
        # Manejo de errores
        return jsonify({"error": str(e)}), 400
