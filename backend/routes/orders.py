from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, OrderItem, Product

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('items'):
        return jsonify({'error': 'No items in order'}), 400
    
    total = 0
    order = Order(user_id=user_id, total=0)
    db.session.add(order)
    db.session.flush()
    
    for item_data in data['items']:
        product = Product.query.get(item_data['product_id'])
        if not product:
            return jsonify({'error': f'Product {item_data["product_id"]} not found'}), 400
        
        item_total = product.price * item_data['quantity']
        total += item_total
        
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item_data['quantity'],
            price=product.price
        )
        db.session.add(order_item)
    
    order.total = total
    db.session.commit()
    
    return jsonify({'message': 'Order created', 'order_id': order.id, 'total': total}), 201

@orders_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    
    return jsonify([{
        'id': o.id,
        'total': o.total,
        'status': o.status,
        'created_at': o.created_at.isoformat(),
        'items': [{
            'product_name': item.product.name,
            'quantity': item.quantity,
            'price': item.price
        } for item in o.items]
    } for o in orders])