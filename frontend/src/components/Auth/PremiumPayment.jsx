import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const PremiumPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signup, login, upgradeToPremium } = useShop();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Data passed from Details page
    const userData = location.state || {};

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);

            // 1. Create User via Context (adds to shop_users database)
            const signupResult = signup({
                shopName: userData.shopName || 'My Pro Shop',
                email: userData.email,
                password: userData.password,
                isPremium: true
            });

            if (!signupResult.success && signupResult.message !== 'User already exists') {
                alert("Could not create account: " + signupResult.message);
                return;
            }

            // 2. Perform Login to set Current User and load proper data context
            const loginResult = login(userData.email, userData.password);

            if (loginResult.success) {
                // Ensure premium status is applied
                upgradeToPremium();
                setIsSuccess(true);

                // 3. Redirect after delay
                setTimeout(() => {
                    navigate('/app/dashboard');
                }, 2000);
            } else {
                alert("Login failed after payment. Please login manually.");
                navigate('/login');
            }

        }, 2000);
    };

    if (isSuccess) {
        return (
            <div style={{
                height: '100vh',
                background: 'var(--bg-dark)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '30px',
                    boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)'
                }}>
                    <CheckCircle size={50} color="white" />
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Payment Successful!</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '10px' }}>Welcome to Shop Khata Pro.</p>
                <p style={{ color: 'var(--primary)' }}>Redirecting to your dashboard...</p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            color: 'white'
        }}>
            <div className="glass-card" style={{ maxWidth: '900px', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', overflow: 'hidden' }}>
                {/* Payment Form */}
                <div style={{ padding: '40px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CreditCard size={28} color="var(--primary)" /> Payment Details
                    </h2>

                    <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label style={{ color: 'var(--text-dim)', marginBottom: '8px', display: 'block' }}>Cardholder Name</label>
                            <input type="text" className="input-field" placeholder="Name on card" required style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
                        </div>
                        <div className="form-group">
                            <label style={{ color: 'var(--text-dim)', marginBottom: '8px', display: 'block' }}>Card Number</label>
                            <input type="text" className="input-field" placeholder="0000 0000 0000 0000" required style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ color: 'var(--text-dim)', marginBottom: '8px', display: 'block' }}>Expiry Date</label>
                                <input type="text" className="input-field" placeholder="MM/YY" required style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ color: 'var(--text-dim)', marginBottom: '8px', display: 'block' }}>CVV</label>
                                <input type="password" className="input-field" placeholder="123" required style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                            <ShieldCheck size={16} color="var(--success)" /> Payments are secure and encrypted.
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="btn"
                            style={{
                                marginTop: '10px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '16px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                borderRadius: '12px',
                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                opacity: isProcessing ? 0.7 : 1
                            }}
                        >
                            {isProcessing ? (
                                <><Loader2 size={20} className="spin" /> Processing...</>
                            ) : (
                                'Pay ₹500.00'
                            )}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '40px',
                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span>Shop Owner Pro Plan</span>
                        <span>₹500.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-dim)' }}>
                        <span>Billing Cycle</span>
                        <span>Monthly</span>
                    </div>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                        <span>Total Due</span>
                        <span>₹500.00</span>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ marginBottom: '10px', fontWeight: 600, color: 'var(--text-dim)' }}>Plan Includes:</div>
                        <ul style={{ listStyle: 'none', color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                            <li style={{ marginBottom: '8px' }}>• Lifetime AI Analytics</li>
                            <li style={{ marginBottom: '8px' }}>• Smart Inventory Forecasting</li>
                            <li style={{ marginBottom: '8px' }}>• Priority Support</li>
                            <li style={{ marginBottom: '8px' }}>• Multi-device Sync</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumPayment;
