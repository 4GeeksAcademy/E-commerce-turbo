import stripe
from dotenv import load_dotenv
import os

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


def create_payment_intent(amount, currency="usd"):
    """
    Crea un PaymentIntent para realizar el pago.

    :param amount: Monto a cobrar en centavos (ejemplo: 2000 para $20.00)
    :param currency: Moneda para el pago, por defecto es USD
    :return: PaymentIntent creado o error en la creación
    """
    try:
        
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
             metadata={'integration_check': 'accept_a_payment'},
        )
        return payment_intent
    
    except stripe.error.StripeError as e:      
        return {"error": str(e)}

def create_charge(amount, currency="usd", source="tok_visa"):
    """
    Crea un cargo de ejemplo utilizando un token de fuente (por ejemplo, 'tok_visa').

    :param amount: Monto en centavos para cobrar
    :param currency: Moneda del pago (USD por defecto)
    :param source: Token de la fuente de pago (ejemplo 'tok_visa')
    :return: Charge creado o error
    """
    try:
        charge = stripe.Charge.create(
            amount=amount,
            currency=currency,
            source=source,
            description="Test Charge"
        )
        return charge
    except stripe.error.StripeError as e:
        # Manejo de errores al crear el cargo
        return {"error": str(e)}
