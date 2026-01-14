from flask import Blueprint, request, jsonify
from db import mysql
from flask_jwt_extended import jwt_required

reports_bp = Blueprint('reports', __name__)

@reports_bp.route('/daily_sales', methods=['GET'])
@jwt_required()
def daily_sales():
    date = request.args.get('date')
    if not date:
         return jsonify({"msg": "Date parameter required (YYYY-MM-DD)"}), 400
         
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT CAST(SUM(total_amount) AS FLOAT) as total_sales FROM orders WHERE DATE(order_date) = %s", (date,))
    result = cursor.fetchone()
    cursor.close()
    
    total = result['total_sales'] if result and result['total_sales'] else 0
    return jsonify({"date": date, "total_sales": total}), 200

@reports_bp.route('/daily_profit', methods=['GET'])
@jwt_required()
def daily_profit():
    date = request.args.get('date')
    if not date:
         return jsonify({"msg": "Date parameter required (YYYY-MM-DD)"}), 400
         
    cursor = mysql.connection.cursor()
    # Profit = Sum( (price_at_sale - cost_at_sale) * quantity )
    query = """
        SELECT CAST(SUM((price_at_sale - cost_at_sale) * quantity) AS FLOAT) as total_profit
        FROM order_items
        JOIN orders ON order_items.order_id = orders.id
        WHERE DATE(orders.order_date) = %s
    """
    cursor.execute(query, (date,))
    result = cursor.fetchone()
    cursor.close()
    
    total = result['total_profit'] if result and result['total_profit'] else 0
    return jsonify({"date": date, "total_profit": total}), 200
