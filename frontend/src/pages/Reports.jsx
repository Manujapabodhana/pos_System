import { useState, useContext } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Reports = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [sales, setSales] = useState(null);
    const [profit, setProfit] = useState(null);

    const fetchReports = async () => {
        try {
            const [salesRes, profitRes] = await Promise.all([
                api.get(`/reports/daily_sales?date=${date}`),
                api.get(`/reports/daily_profit?date=${date}`)
            ]);
            setSales(salesRes.data.total_sales);
            setProfit(profitRes.data.total_profit);
        } catch (err) {
            console.error(err);
            alert('Error fetching reports');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'url("https://images.unsplash.com/photo-1447933601403-0c60e017bc32?q=80&w=1974&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            padding: '40px'
        }}>
            {/* Dark Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 15, 17, 0.85)' }}></div>

            <div className="container animate-in" style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                <Link to="/" className="btn" style={{
                    display: 'inline-flex', alignItems: 'center', marginBottom: '30px',
                    color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '50px'
                }}>
                    <span>&larr; Back to POS</span>
                </Link>

                <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: '800' }}>Daily Insights</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your business performance.</p>
                </header>

                <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                    <div className="reports-controls">
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select Date</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '15px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '1.2rem',
                                    pointerEvents: 'none'
                                }}>📅</span>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                        padding: '15px 15px 15px 50px', // Extra padding for icon
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        width: '100%',
                                        colorScheme: 'dark' // Ensures native picker is dark-themed
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={fetchReports}
                            className="btn btn-primary"
                            style={{ padding: '15px 40px', borderRadius: '12px', marginBottom: '1px' }}
                        >
                            Analyze
                        </button>
                    </div>

                    {sales !== null ? (
                        <div className="animate-in reports-grid">
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                                padding: '30px', borderRadius: '20px', textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', border: '1px solid rgba(255,255,255,0.1)' }}>💰</div>
                                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Total Sales</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                    ${sales.toFixed(2)}
                                </p>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%)',
                                padding: '30px', borderRadius: '20px', textAlign: 'center',
                                border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'var(--success)' }}>📈</div>
                                <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Net Profit</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--success)' }}>
                                    ${profit.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                            Select a date to view analytics
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
