import requests

BASE_URL = "http://localhost:5001/api"

def test_api():
    # 1. Login
    print("Testing Login...")
    try:
        login_res = requests.post(f"{BASE_URL}/auth/login", json={"username": "admin", "password": "password"})
        if login_res.status_code != 200:
            print(f"Login Failed: {login_res.status_code} - {login_res.text}")
            return
        
        data = login_res.json()
        token = data.get('access_token')
        print(f"Login Successful. Token: {token[:20]}...")
    except Exception as e:
        print(f"Login Exception: {e}")
        return

    # 2. Get Products
    print("\nTesting Get Products...")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        # Note the trailing slash to match the frontend
        products_res = requests.get(f"{BASE_URL}/products/", headers=headers)
        
        if products_res.status_code != 200:
            print(f"Get Products Failed: {products_res.status_code} - {products_res.text}")
        else:
            products = products_res.json()
            print(f"Get Products Successful. Found {len(products)} items.")
            print(products)
            
    except Exception as e:
        print(f"Get Products Exception: {e}")

if __name__ == "__main__":
    test_api()
