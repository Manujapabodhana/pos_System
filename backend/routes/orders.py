from flask import Blueprint, request, jsonify
from db import mysql
from flask_jwt_extended import jwt_required
import datetime

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    data = request.get_json()
    items = data.get('items') # List of {product_id, quantity}
    if not items:
        return jsonify({"msg": "No items in order"}), 400

    conn = mysql.connection
    cursor = conn.cursor()
    
    try:
        total_amount = 0
        order_items_data = [] # (product_id, quantity, price, cost)
        
        for item in items:
            pid = item['product_id']
            qty = item['quantity']
            
            cursor.execute("SELECT price, cost_price, stock_quantity FROM products WHERE id = %s", (pid,))
            product = cursor.fetchone()
            
            if not product:
                raise Exception(f"Product {pid} not found")
            
            if product['stock_quantity'] < qty:
                raise Exception(f"Insufficient stock for product {pid}")
            
            price = float(product['price'])
            cost = float(product['cost_price'])
            total_amount += price * qty
            
            order_items_data.append((pid, qty, price, cost))

        # Insert Order
        cursor.execute("INSERT INTO orders (order_date, total_amount) VALUES (NOW(), %s)", (total_amount,))
        order_id = cursor.lastrowid
        
        # Insert Order Items and Update Stock
        for pid, qty, price, cost in order_items_data:
            cursor.execute("INSERT INTO order_items (order_id, product_id, quantity, price_at_sale, cost_at_sale) VALUES (%s, %s, %s, %s, %s)", 
                           (order_id, pid, qty, price, cost))
            cursor.execute("UPDATE products SET stock_quantity = stock_quantity - %s WHERE id = %s", (qty, pid))
            
        conn.commit()
        return jsonify({"msg": "Order created", "order_id": order_id}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({"msg": str(e)}), 400
    finally:
        cursor.close()
