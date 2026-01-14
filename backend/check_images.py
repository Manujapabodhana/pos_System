from app import app
from db import mysql

def check_images():
    with app.app_context():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, name, image_url FROM products")
        products = cursor.fetchall()
        print(f"Found {len(products)} products:")
        for p in products:
            print(f"ID: {p['id']}, Name: {p['name']}, Image: {p['image_url']}")

if __name__ == '__main__':
    check_images()
