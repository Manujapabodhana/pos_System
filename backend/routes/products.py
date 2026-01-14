from flask import Blueprint, jsonify
from db import mysql
from flask_jwt_extended import jwt_required

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
@jwt_required()
def get_products():
    cursor = mysql.connection.cursor()
    # Cast decimals to float for JSON serialization
    cursor.execute("SELECT id, name, CAST(price AS FLOAT) as price, stock_quantity, image_url FROM products")
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products), 200
