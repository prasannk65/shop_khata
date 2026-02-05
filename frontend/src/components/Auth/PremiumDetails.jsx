import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, Mail, MapPin, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';

const PremiumDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ownerName: '',
        shopName: '',
        email: '',
        password: '', // Simple password for "Pro Login" creation
        phone: '',
        address: '',
        shopType: 'General Store'
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass data to OTP verification page
        navigate('/premium-otp', { state: { ...formData } });
    };

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
            <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '12px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        borderRadius: '16px',
                        marginBottom: '16px',
                        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
                    }}>
                        <Store size={32} color="white" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px' }}>Setup Your Pro Shop</h2>
                    <p style={{ color: 'var(--text-dim)' }}>Tell us a bit more about your business to customize your experience.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-dim)' }}>
                            <User size={16} /> Owner Name
                        </label>
                        <input
                            type="text"
                            name="ownerName"
                            required
                            className="input-field"
                            placeholder="John Doe"
                            value={formData.ownerName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-dim)' }}>
                            <Store size={16} /> Shop Name
                        </label>
                        <input
                            type="text"
                            name="shopName"
                            required
                            className="input-field"
                            placeholder="My Super Store"
                            value={formData.shopName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-dim)' }}>
                            <Phone size={16} /> Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input-field"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                        />
                    </div>

                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-dim)' }}>
                            <Mail size={16} /> Business Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="input-field"
                            placeholder="shop@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                        />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-dim)' }}>
                            Password (for Login)
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                className="input-field"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', paddingRight: '45px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-dim)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '4px'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-dim)' }}>
                            <MapPin size={16} /> Shop Address
                        </label>
                        <textarea
                            name="address"
                            required
                            rows="3"
                            className="input-field"
                            placeholder="Complete address..."
                            value={formData.address}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', resize: 'none' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        style={{
                            gridColumn: 'span 2',
                            marginTop: '20px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '16px',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        Continue to Verification <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PremiumDetails;
