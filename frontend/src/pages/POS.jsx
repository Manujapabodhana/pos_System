import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

const POS = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { logout, user } = useContext(AuthContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products/');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product_id === product.id);
            if (existing) {
                return prev.map(item => item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { product_id: product.id, name: product.name, price: product.price, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.product_id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.product_id === productId) {
                    const newQty = item.quantity + delta;
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        try {
            await api.post('/orders/', { items: cart });
            alert('Order placed successfully!');
            setCart([]);
            fetchProducts(); // Refresh stock
        } catch (err) {
            alert('Checkout failed: ' + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <div className="pos-layout">
            {/* Main Content Area (Products) */}
            <div className="pos-content">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h1 style={{ color: 'var(--accent)', fontSize: '1.8rem' }}>Tomo's Coffee</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome, {user?.username}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link to="/reports" className="btn" style={{
                            background: 'transparent',
                            color: 'var(--primary)',
                            border: '2px solid var(--primary)',
                            padding: '10px 25px',
                            borderRadius: '50px',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--primary)';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(200, 159, 101, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            📊 Reports
                        </Link>
                        <button onClick={logout} className="btn" style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ff8888',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            padding: '10px 20px',
                            borderRadius: '50px'
                        }}>
                            Logout
                        </button>
                    </div>
                </header>

                <div>
                    <h2 style={{ marginBottom: '20px' }}>Menu</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {products.map(p => {
                            const cartItem = cart.find(item => item.product_id === p.id);
                            return (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    addToCart={addToCart}
                                    updateQuantity={updateQuantity}
                                    cartItem={cartItem}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Sidebar (Cart Component) */}
            <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                total={total}
                handleCheckout={handleCheckout}
            />
        </div>
    );
};

export default POS;
