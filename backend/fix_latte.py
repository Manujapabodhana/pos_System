from app import app
from db import mysql

def fix():
    with app.app_context():
        cursor = mysql.connection.cursor()
        # Using a reliable Latte Art image
        new_url = "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop"
        cursor.execute("UPDATE products SET image_url = %s WHERE name = 'Latte'", (new_url,))
        mysql.connection.commit()
        print("Updated Latte image to new URL.")

if __name__ == "__main__":
    fix()
