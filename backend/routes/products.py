from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Product, Category, User

products_bp = Blueprint('products', __name__)

# READ - Get all products
@products_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'price': p.price,
        'description': p.description,
        'image_url': p.image_url,
        'categories': [c.name for c in p.categories]
    } for p in products])

# READ - Get single product
@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'image_url': product.image_url,
        'categories': [c.name for c in product.categories]
    })

# CREATE - Add new product
@products_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user.is_seller:
        return jsonify({'error': 'Only sellers can add products'}), 403
    
    data = request.get_json()
    
    if not data.get('name') or not data.get('price'):
        return jsonify({'error': 'Name and price required'}), 400
    
    product = Product(
        name=data['name'],
        price=float(data['price']),
        description=data.get('description', ''),
        image_url=data.get('image_url', ''),
        seller_id=user_id
    )
    
    # Add categories
    if data.get('categories'):
        for cat_name in data['categories']:
            category = Category.query.filter_by(name=cat_name).first()
            if not category:
                category = Category(name=cat_name)
                db.session.add(category)
            product.categories.append(category)
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify({'message': 'Product created', 'id': product.id}), 201

# UPDATE - Edit product
@products_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(id)
    
    if product.seller_id != user_id:
        return jsonify({'error': 'Not authorized'}), 403
    
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.price = float(data.get('price', product.price))
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)
    
    db.session.commit()
    return jsonify({'message': 'Product updated'})

# DELETE - Remove product
@products_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(id)
    
    if product.seller_id != user_id:
        return jsonify({'error': 'Not authorized'}), 403
    
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'})