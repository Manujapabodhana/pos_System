from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import init_db
from routes.auth import auth_bp
from routes.products import products_bp
from routes.orders import orders_bp
from routes.reports import reports_bp
import os

app = Flask(__name__)

# Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Weka@' # User should configure this
app.config['MYSQL_DB'] = 'tomos_coffee'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'dev-secret-key' # Change for production

# Initialize extensions
CORS(app)
JWTManager(app)
init_db(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(products_bp, url_prefix='/api/products')
app.register_blueprint(orders_bp, url_prefix='/api/orders')
app.register_blueprint(reports_bp, url_prefix='/api/reports')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
