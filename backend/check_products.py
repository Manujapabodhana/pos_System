from app import app
from db import mysql

def check_products():
    with app.app_context():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        print(f"Found {len(products)} products:")
        for p in products:
            print(p)

if __name__ == '__main__':
    check_products()
