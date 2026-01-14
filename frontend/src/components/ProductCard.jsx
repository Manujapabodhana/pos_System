const ProductCard = ({ product, addToCart, updateQuantity, cartItem }) => {
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="card animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: 'var(--bg-panel)',
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            overflow: 'hidden',
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
        >
            <div style={{
                height: '160px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ height: '100%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem' }}>☕</span>
                    </div>
                )}

                {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                    <span style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(239, 68, 68, 0.9)', color: 'white',
                        padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold'
                    }}>
                        Low Stock
                    </span>
                )}
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-main)', margin: 0 }}>{product.name}</h3>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px' }}>
                    Stock: <span style={{ color: product.stock_quantity > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>{product.stock_quantity}</span>
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary)' }}>${product.price ? product.price.toFixed(2) : '0.00'}</span>

                    {quantity > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', padding: '5px' }}>
                            <button
                                onClick={() => updateQuantity(product.id, -1)}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%', border: 'none',
                                    background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                }}
                            >-</button>
                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, 1)}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%', border: 'none',
                                    background: 'var(--primary)', color: 'white', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                }}
                            >+</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(product)}
                            className="btn btn-primary"
                            disabled={product.stock_quantity <= 0}
                            style={{ padding: '8px 20px', borderRadius: '50px' }}
                        >
                            {product.stock_quantity > 0 ? 'Add' : 'Sold Out'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
