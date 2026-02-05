import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, Mail, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './AuthStyles.css';

const SignupDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ownerName: '',
        shopName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        // Navigate to OTP verification with form data
        navigate('/signup-otp', { state: { ...formData } });
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card" style={{ maxWidth: '600px' }}>
                <div className="auth-header">
                    <div style={{
                        display: 'inline-flex',
                        padding: '12px',
                        background: 'linear-gradient(135deg, #31A7DB 0%, #268dbd 100%)',
                        borderRadius: '16px',
                        marginBottom: '16px',
                        boxShadow: '0 10px 25px rgba(49, 167, 219, 0.3)'
                    }}>
                        <Store size={32} color="white" />
                    </div>
                    <h2>Create Your Free Account</h2>
                    <p>Start managing your shop in minutes</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label htmlFor="ownerName" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <User size={16} /> Owner Name
                        </label>
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            className="input-field"
                            placeholder="John Doe"
                            required
                            value={formData.ownerName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="shopName" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Store size={16} /> Shop Name
                        </label>
                        <input
                            type="text"
                            id="shopName"
                            name="shopName"
                            className="input-field"
                            placeholder="My General Store"
                            required
                            value={formData.shopName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone size={16} /> Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="input-field"
                            placeholder="+91 98765 43210"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label htmlFor="email" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail size={16} /> Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="input-field"
                            placeholder="name@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="input-field"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                style={{ paddingRight: '45px' }}
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                className="input-field"
                                placeholder="••••••••"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={{ paddingRight: '45px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            gridColumn: 'span 2',
                            width: '100%',
                            justifyContent: 'center',
                            marginTop: '10px',
                            height: '50px',
                            fontSize: '1.05rem'
                        }}
                    >
                        Continue to Verification <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <a href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login here</a>
                </div>
            </div>
        </div>
    );
};

export default SignupDetails;
