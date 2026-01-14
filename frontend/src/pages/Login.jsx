import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        // Simulate a small delay for sleekness
        await new Promise(r => setTimeout(r, 600));

        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials');
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'url("https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop") center/cover no-repeat',
            position: 'relative'
        }}>
            {/* Dark Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f0f11 20%, rgba(15, 15, 17, 0.6))' }}></div>

            <div className="glass-panel animate-in" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '60px', height: '60px',
                        background: 'var(--gradient-primary)',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '24px', boxShadow: '0 10px 30px rgba(200, 159, 101, 0.4)'
                    }}>
                        ☕
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '10px' }}>Tomo's Coffee</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, please login.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex', alignItems: 'center', padding: '0 15px'
                        }}>
                            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>👤</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    width: '100%',
                                    padding: '15px'
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex', alignItems: 'center', padding: '0 15px'
                        }}>
                            <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>🔒</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    width: '100%',
                                    padding: '15px'
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="animate-in" style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--danger)',
                            color: '#ff8888',
                            padding: '10px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            marginBottom: '20px',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Please wait...' : 'Sign In'}
                    </button>

                    <div style={{ marginTop: '25px', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                        <p>Demo: admin / password</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
