import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import '../Auth/AuthStyles.css';

const PremiumOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state || {};

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');

    // Redirect if no user data
    useEffect(() => {
        if (!userData.email) {
            navigate('/premium-details');
            return;
        }
        // Generate and "send" OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        console.log('🔐 Premium OTP for testing:', otp);
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
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleResendOTP = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(newOtp);
        console.log('🔐 New Premium OTP for testing:', newOtp);
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

        setTimeout(() => {
            setIsVerifying(false);

            if (enteredOTP === generatedOTP) {
                // OTP verified, proceed to payment
                navigate('/premium-payment', { state: userData });
            } else {
                alert('Invalid OTP! Please try again.');
                setOtp(['', '', '', '', '', '']);
                document.getElementById('otp-0')?.focus();
            }
        }, 1500);
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card" style={{ maxWidth: '500px' }}>
                <div className="auth-header">
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        border: '2px solid #6366f1'
                    }}>
                        <Mail size={40} color="#6366f1" />
                    </div>
                    <h2>Verify Your Email</h2>
                    <p>We've sent a 6-digit code to</p>
                    <p style={{ color: '#6366f1', fontWeight: 600, marginTop: '5px' }}>{userData.email}</p>
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
                                        color: '#6366f1',
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
                        className="btn"
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            height: '50px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            color: 'white',
                            border: 'none',
                            opacity: (isVerifying || otp.join('').length !== 6) ? 0.6 : 1,
                            cursor: (isVerifying || otp.join('').length !== 6) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 size={18} className="spin" /> Verifying...
                            </>
                        ) : (
                            'Verify & Continue to Payment'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <button
                        onClick={() => navigate('/premium-details')}
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

export default PremiumOTP;
