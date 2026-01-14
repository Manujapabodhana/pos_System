from app import app
from db import mysql
import bcrypt

def setup():
    with app.app_context():
        cursor = mysql.connection.cursor()
        
        # Drop tables to ensure schema update
        cursor.execute("DROP TABLE IF EXISTS order_items")
        cursor.execute("DROP TABLE IF EXISTS orders")
        cursor.execute("DROP TABLE IF EXISTS products")
        cursor.execute("DROP TABLE IF EXISTS users")

        # Read schema
        try:
            with open('../schema.sql', 'r') as f:
                schema = f.read()
        except FileNotFoundError:
            try:
                with open('schema.sql', 'r') as f:
                    schema = f.read()
            except:
                 print("Could not find schema.sql")
                 return
            
        # Execute schema commands
        statements = schema.split(';')
        for statement in statements:
            if statement.strip():
                cursor.execute(statement)
            
        # Seed Admin User
        password_hash = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        try:
             cursor.execute("INSERT INTO users (username, password_hash) VALUES (%s, %s)", ('admin', password_hash))
             print("Admin user created.")
        except Exception as e:
             print(f"Admin user already exists or error during insertion: {e}")

        # Seed Products
        products = [
            ('Cappuccino', 4.50, 1.50, 100, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2000&auto=format&fit=crop'),
            ('Latte', 4.00, 1.20, 100, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop'),
            ('Espresso', 3.00, 0.50, 100, 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=2000&auto=format&fit=crop'),
            ('Mocha', 5.00, 1.80, 100, 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=2000&auto=format&fit=crop'),
            ('Blueberry Muffin', 3.50, 1.00, 50, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=2000&auto=format&fit=crop'),
            ('Croissant', 3.00, 0.80, 50, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000&auto=format&fit=crop'),
            ('Cheesecake', 5.50, 2.00, 20, 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=2000&auto=format&fit=crop'),
            ('Chocolate Cake', 6.00, 2.50, 20, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop')
        ]
        
        cursor.executemany("""
            INSERT INTO products (name, price, cost_price, stock_quantity, image_url)
            VALUES (%s, %s, %s, %s, %s)
        """, products)
        print("Inserted default products.")

        mysql.connection.commit()
        cursor.close()
        print("Database setup completed.")

if __name__ == '__main__':
    setup()
