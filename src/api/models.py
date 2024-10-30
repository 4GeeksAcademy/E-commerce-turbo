from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import datetime

# Instancias globales
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

# Modelo User
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

    def __repr__(self):
        return f"<User {self.username}>"

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # No serializar la contraseña por seguridad
        }

    def set_password(self, password):
        # Hashea la contraseña y la guarda en `password`
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        # Verifica si la contraseña proporcionada coincide con el hash almacenado
        return bcrypt.check_password_hash(self.password, password)

# Modelo Product
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)  # URL de la imagen

    def __repr__(self):
        return f"<Product {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url
        }

# Modelo Order
class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Order {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "created_at": self.created_at.isoformat()
        }
