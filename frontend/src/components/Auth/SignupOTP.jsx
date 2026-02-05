import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import './AuthStyles.css';

const SignupOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signup, login } = useShop();
    const userData = location.state || {};

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');

    // Redirect if no user data
    useEffect(() => {
        if (!userData.email) {
            navigate('/signup');
            return;
        }
        // Generate and "send" OTP (in real app, this would be backend)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        console.log('🔐 OTP for testing:', otp); // For development
        alert(`Your OTP is: ${otp}\n(In production, this will be sent to your email)`);
    }, []);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Only single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleResendOTP = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(newOtp);
        console.log('🔐 New OTP for testing:', newOtp);
        alert(`New OTP sent: ${newOtp}\n(In production, this will be sent to your email)`);
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');

        if (enteredOTP.length !== 6) {
            alert('Please enter complete OTP');
            return;
        }

        setIsVerifying(true);

        // Simulate verification delay
        setTimeout(() => {
            setIsVerifying(false);

            // Verify OTP
            if (enteredOTP === generatedOTP) {
                // Create account
                const signupResult = signup({
                    shopName: userData.shopName,
                    email: userData.email,
                    password: userData.password,
                    ownerName: userData.ownerName,
                    phone: userData.phone,
                    isPremium: false
                });

                if (signupResult.success) {
                    setIsSuccess(true);

                    // Auto-login after successful signup
                    setTimeout(() => {
                        const loginResult = login(userData.email, userData.password);
                        if (loginResult.success) {
                            navigate('/app/dashboard');
                        }
                    }, 2000);
                } else {
                    alert(signupResult.message);
                }
            } else {
                alert('Invalid OTP! Please try again.');
                setOtp(['', '', '', '', '', '']);
                document.getElementById('otp-0')?.focus();
            }
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="auth-container">
                <div className="glass-card auth-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'var(--success)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 30px',
                        boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)'
                    }}>
                        <CheckCircle size={50} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Account Created!</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '10px' }}>
                        Welcome to Shop Khata, {userData.ownerName}!
                    </p>
                    <p style={{ color: 'var(--primary)' }}>Redirecting to your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="glass-card auth-card" style={{ maxWidth: '500px' }}>
                <div className="auth-header">
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(49, 167, 219, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        border: '2px solid var(--primary)'
                    }}>
                        <Mail size={40} color="var(--primary)" />
                    </div>
                    <h2>Verify Your Email</h2>
                    <p>We've sent a 6-digit code to</p>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '5px' }}>{userData.email}</p>
                </div>

                <form onSubmit={handleVerify} className="auth-form">
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '15px', textAlign: 'center' }}>Enter OTP</label>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="input-field"
                                    style={{
                                        width: '50px',
                                        height: '60px',
                                        textAlign: 'center',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        padding: '0'
                                    }}
                                />
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--primary)',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        margin: '0 auto'
                                    }}
                                >
                                    <RefreshCw size={14} /> Resend OTP
                                </button>
                            ) : (
                                <span>Resend OTP in {timer}s</span>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isVerifying || otp.join('').length !== 6}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            height: '50px',
                            opacity: (isVerifying || otp.join('').length !== 6) ? 0.6 : 1,
                            cursor: (isVerifying || otp.join('').length !== 6) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 size={18} className="spin" /> Verifying...
                            </>
                        ) : (
                            'Verify & Create Account'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <button
                        onClick={() => navigate('/signup')}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-dim)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        ← Change email address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupOTP;
