import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Lock } from 'lucide-react';

const PremiumLock = ({ featureName, benefits }) => {
    const navigate = useNavigate();

    return (
        <div className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            textAlign: 'center',
            minHeight: '60vh',
            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid var(--glass-border)'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)'
            }}>
                <Lock size={40} color="white" />
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Unlock {featureName}</h2>
            <p style={{ color: 'var(--text-dim)', maxWidth: '500px', marginBottom: '32px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                This is a premium feature designed to help you scale your business. Upgrade to Shop Khata Premium to access this and more.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', textAlign: 'left' }}>
                {benefits.map((benefit, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            padding: '4px',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Check size={16} color="var(--success)" />
                        </div>
                        <span style={{ fontSize: '1rem' }}>{benefit}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/premium-details')}
                className="btn"
                style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    padding: '16px 48px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <Sparkles size={20} /> Upgrade to Premium
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '16px' }}>
                One-time life access for just ₹499
            </p>
        </div>
    );
};

export default PremiumLock;
