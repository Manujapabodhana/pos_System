import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart, total, handleCheckout }) => {
    return (
        <div className="cart-sidebar">
            <div style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Current Order</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>#{Math.floor(Math.random() * 10000)}</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {cart.length === 0 ? (
                    <div style={{
                        height: '100%', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
                    }}>
                        <span style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.3 }}>🛒</span>
                        <p>No items added yet</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.product_id} className="animate-in" style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '12px',
                            padding: '15px',
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(255,255,255,0.03)'
                        }}>
                            <div>
                                <h4 style={{ marginBottom: '4px', color: 'var(--text-main)' }}>{item.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>${item.price.toFixed(2)}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <button
                                    onClick={() => updateQuantity(item.product_id, -1)}
                                    className="btn"
                                    style={{
                                        width: '28px', height: '28px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.5)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                >
                                    -
                                </button>

                                <span style={{ width: '25px', textAlign: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--primary)' }}>{item.quantity}</span>

                                <button
                                    onClick={() => updateQuantity(item.product_id, 1)}
                                    className="btn"
                                    style={{
                                        width: '28px', height: '28px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        lineHeight: 1
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.product_id)}
                                className="btn"
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    border: 'none',
                                    marginLeft: '10px',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    transition: 'all 0.2s',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--danger)';
                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-muted)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                                title="Remove Item"
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '30px',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: '25px',
                    fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)',
                    paddingTop: '15px', borderTop: '1px dashed rgba(255,255,255,0.1)'
                }}>
                    <span>Total</span>
                    <span className="text-gradient">${total.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px' }}
                    disabled={cart.length === 0}
                >
                    Complete Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
