from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db, User, Product, Category
from routes.auth import auth_bp
from routes.products import products_bp
from routes.orders import orders_bp
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gemcart.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-change-in-production'

db.init_app(app)
jwt = JWTManager(app)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(products_bp, url_prefix='/api/products')
app.register_blueprint(orders_bp, url_prefix='/api/orders')

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories])

# Something new: Search functionality
@app.route('/api/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    products = Product.query.filter(
        Product.name.contains(query) | 
        Product.description.contains(query)
    ).all()
    
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'price': p.price,
        'description': p.description,
        'image_url': p.image_url
    } for p in products])

def create_sample_data():
    # Create sample seller
    seller = User(username='seller', email='seller@gemcart.com', is_seller=True)
    seller.set_password('password')
    db.session.add(seller)
    
    # Create categories
    categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets']
    cat_objects = []
    for cat_name in categories:
        cat = Category(name=cat_name)
        cat_objects.append(cat)
        db.session.add(cat)
    
    db.session.commit()
    
    # Create sample products
    products_data = [
        {'name': 'Diamond Ring', 'price': 1299.99, 'description': 'Beautiful diamond ring', 'categories': [0]},
        {'name': 'Gold Necklace', 'price': 899.99, 'description': 'Elegant gold necklace', 'categories': [1]},
        {'name': 'Pearl Earrings', 'price': 299.99, 'description': 'Classic pearl earrings', 'categories': [2]}
    ]
    
    for prod_data in products_data:
        product = Product(
            name=prod_data['name'],
            price=prod_data['price'],
            description=prod_data['description'],
            seller_id=seller.id,
            image_url='https://via.placeholder.com/300x300'
        )
        for cat_idx in prod_data['categories']:
            product.categories.append(cat_objects[cat_idx])
        db.session.add(product)
    
    db.session.commit()

@app.before_first_request
def create_tables():
    db.create_all()
    if not User.query.first():
        create_sample_data()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not User.query.first():
            create_sample_data()
    app.run(debug=True, port=5000)