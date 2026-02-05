import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    CheckCircle, Shield, Zap, TrendingUp, Package, Calculator,
    Users, Brain, BarChart3, Bell, Smartphone, Cloud,
    ChevronDown, ChevronUp, Star, Award, MessageSquare,
    ShoppingCart, Store, Coffee, Briefcase, ArrowRight,
    Clock, DollarSign, LineChart, Lock
} from 'lucide-react';
import AnimatedStudent from './AnimatedStudent';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="landing-page" style={{
            background: 'var(--bg-dark)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* SVG Filters for Cards */}
            <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}>
                <defs>
                    <filter id="🌀↖️" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>
                    <filter id="🌀🎨" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
                        <feColorMatrix type="hueRotate" result="pt1" >
                            <animate attributeName="values" values="0;360;" dur=".6s" repeatCount="indefinite" calcMode="paced" />
                        </feColorMatrix>
                        <feComposite />
                        <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
                        <feColorMatrix type="hueRotate" result="pt2">
                            <animate attributeName="values" values="0; 333; 199; 286; 64; 168; 256; 157; 360;" dur="5s" repeatCount="indefinite" calcMode="paced" />
                        </feColorMatrix>
                        <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
                        <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>
                </defs>
            </svg>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: '20px 0',
                zIndex: 100,
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div style={{ padding: '10px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: '14px', boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)' }}>
                            <Shield size={24} color="white" />
                        </div>
                        <span style={{ fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.03em', color: 'white' }}>Shop Khata</span>
                    </div>

                    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <a href="#features" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500, transition: '0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>Features</a>
                            <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500, transition: '0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>How It Works</a>
                            <a href="#pricing" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500, transition: '0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>Pricing</a>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '30px' }}>
                            <Link to="/login" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
                            <Link to="/signup" style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 600,
                                padding: '10px 24px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                            }}>Get Started</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mesh Gradient Background Layer */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                pointerEvents: 'none',
                background: `
                    radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 100% 0%, rgba(45, 212, 191, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 100% 100%, rgba(244, 63, 94, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
                `
            }} />

            {/* Floating Blobs for extra 'Cool' factor */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    zIndex: 1
                }}
            />

            {/* Hero Section */}
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', zIndex: 1 }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'center', gap: '60px', zIndex: 2, padding: '100px 20px' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <motion.div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 20px',
                                background: 'rgba(99, 102, 241, 0.1)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                borderRadius: '30px',
                                fontSize: '0.9rem',
                                marginBottom: '30px',
                                color: '#a5b4fc',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <span style={{ display: 'flex', height: '8px', width: '8px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 10px #6366f1' }}></span>
                            Trusted by 5,000+ Business Owners Across India
                        </motion.div>
                        <motion.h1
                            style={{ fontSize: '5rem', marginBottom: '25px', lineHeight: '1', fontWeight: 900, letterSpacing: '-0.04em' }}
                        >
                            Your Shop’s <br />
                            <span style={{
                                background: 'linear-gradient(to right, #6366f1, #2dd4bf)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                position: 'relative'
                            }}>
                                Digital Backbone.
                            </span>
                        </motion.h1>
                        <motion.p
                            style={{ fontSize: '1.4rem', color: 'var(--text-dim)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.5, fontWeight: 400 }}
                        >
                            The smarter way to manage inventory, track credits, and grow your revenue with
                            <span style={{ color: 'white', fontWeight: 600 }}> AI-powered </span>
                            business intelligence.
                        </motion.p>
                        <motion.div
                            style={{ display: 'flex', gap: '20px', marginBottom: '50px', flexWrap: 'wrap' }}
                        >
                            <Link to="/signup" className="btn btn-primary" style={{
                                fontSize: '1.1rem',
                                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                border: 'none',
                                padding: '18px 40px',
                                borderRadius: '14px',
                                boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <Zap size={20} fill="currentColor" /> Start Free Trial
                            </Link>

                            <a
                                href="#pricing"
                                className="btn btn-outline"
                                style={{
                                    fontSize: '1.1rem',
                                    padding: '18px 40px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '14px',
                                    color: 'white',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                <Package size={20} color="#a855f7" /> Buy Pro Plan
                            </a>
                        </motion.div>
                        <motion.div
                            style={{ display: 'flex', gap: '40px', alignItems: 'center', color: 'var(--text-dim)', fontSize: '0.95rem' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Shield size={18} color="var(--success)" />
                                <span>No Credit Card Req.</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={18} color="#6366f1" />
                                <span>5m Setup Time</span>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="hero-visual" style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        transform: 'scale(1.4)', // Massive boost to the vibe
                        transformOrigin: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '600px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <AnimatedStudent />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Stats Bar */}
            <section style={{
                padding: '80px 0',
                background: 'rgba(15, 23, 42, 0.4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                zIndex: 1,
                position: 'relative'
            }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                        <StatCard number="5k+" label="Active Shopkeepers" icon={<Users size={24} />} />
                        <StatCard number="₹500Cr+" label="Transactions Handled" icon={<TrendingUp size={24} />} />
                        <StatCard number="99%" label="Uptime Record" icon={<Shield size={24} />} />
                        <StatCard number="24/7" label="Support Hours" icon={<MessageSquare size={24} />} />
                    </div>
                </div>
            </section>

            {/* Comprehensive Features Section */}
            <section id="features" style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '80px' }}
                    >
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 900, letterSpacing: '-0.04em' }}>
                            Everything You Need to <br />
                            <span style={{ color: 'var(--primary)' }}>Scale Your Shop.</span>
                        </h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>Powerful tools designed for the modern retail entrepreneur.</p>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                        <FeatureCard
                            index={0}
                            icon={<TrendingUp size={28} color="#6366f1" />}
                            title="Live Analytics"
                            description="Real-time sales tracking with predictive AI insights. Know your profit before the day ends."
                        />
                        <FeatureCard
                            index={1}
                            icon={<Package size={28} color="#2dd4bf" />}
                            title="Smart Inventory"
                            description="Auto-alerts for low stock and expiration warnings. Manage 10,000+ SKUs with ease."
                        />
                        <FeatureCard
                            index={2}
                            icon={<Calculator size={28} color="#f43f5e" />}
                            title="Quick Billing"
                            description="Generate GST-ready bills in under 5 seconds. Supports barcode and manual entry."
                        />
                        <FeatureCard
                            index={3}
                            icon={<Users size={28} color="#fbbf24" />}
                            title="Digital Khata"
                            description="Maintain customer credit records perfectly. Automated WhatsApp payment reminders."
                        />
                        <FeatureCard
                            index={4}
                            icon={<Brain size={28} color="#8b5cf6" />}
                            title="AI Assistant"
                            description="Personalized growth strategies and demand forecasting based on your shop's data."
                        />
                        <FeatureCard
                            index={5}
                            icon={<Cloud size={28} color="#3b82f6" />}
                            title="Cloud Sync"
                            description="Access your data from any device, anywhere. Secure backups every 30 minutes."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section - MOVED UP */}
            <section id="pricing" className="pricing-section" style={{ padding: '120px 0', position: 'relative', zIndex: 1, background: 'rgba(255, 255, 255, 0.01)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: 900, letterSpacing: '-0.04em' }}>Transparent Pricing</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem' }}>No hidden fees. No surprises.</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', padding: '40px 20px' }}>
                        {/* Free Trial Plan - Refined Dramatic */}
                        <div data-style="original" className="card-container" style={{ width: '400px' }}>
                            <div className="inner-container">
                                <div className="border-outer">
                                    <div className="main-card"></div>
                                </div>
                                <div className="glow-layer-1"></div>
                                <div className="glow-layer-2"></div>
                            </div>

                            <div className="content-container-dramatic">
                                <div className="content-top-dramatic">
                                    <div className="scrollbar-glass">Free Explorer</div>
                                    <h3 className="dramatic-title">₹0</h3>
                                    <p style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>Perfect for new shops</p>
                                    <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '40px', padding: 0 }}>
                                        <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}><CheckCircle size={20} color="var(--success)" /> Full Access for 60 Days</li>
                                        <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}><CheckCircle size={20} color="var(--success)" /> Basic Analytics Included</li>
                                        <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}><CheckCircle size={20} color="var(--success)" /> Email Support</li>
                                    </ul>
                                </div>
                                <hr className="dramatic-divider" />
                                <div className="content-bottom-dramatic">
                                    <Link to="/signup" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', height: '60px', borderRadius: '16px' }}>Start Trail</Link>
                                </div>
                            </div>
                        </div>

                        {/* Pro Plan - Refined Dramatic */}
                        <div data-style="hue" className="card-container" style={{ width: '400px' }}>
                            <div className="inner-container">
                                <div className="border-outer">
                                    <div className="main-card"></div>
                                </div>
                                <div className="glow-layer-1"></div>
                                <div className="glow-layer-2"></div>
                            </div>

                            <div className="content-container-dramatic">
                                <div className="content-top-dramatic">
                                    <div className="scrollbar-glass">Shop Owner Pro</div>
                                    <h3 className="dramatic-title">₹500<span style={{ fontSize: '1.2rem', opacity: 0.6 }}>/mo</span></h3>
                                    <p style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>Unlimited scaling power</p>
                                    <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '40px', padding: 0 }}>
                                        <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}><CheckCircle size={18} color="#6366f1" /> Unlimited Khata Accounts</li>
                                        <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}><CheckCircle size={18} color="#6366f1" /> AI Business Consultant</li>
                                        <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}><CheckCircle size={18} color="#6366f1" /> Multi-device Sync</li>
                                        <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}><CheckCircle size={18} color="#6366f1" /> Priority 24/7 Support</li>
                                        <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}><CheckCircle size={18} color="#6366f1" /> WhatsApp Notifications</li>
                                    </ul>
                                </div>
                                <hr className="dramatic-divider" />
                                <div className="content-bottom-dramatic">
                                    <Link to="/signup" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none' }}>Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '80px' }}
                    >
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 900, letterSpacing: '-0.04em' }}>
                            Start Selling in <br />
                            <span style={{ color: 'var(--accent-teal)' }}>3 Simple Steps.</span>
                        </h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem' }}>From setup to your first sale in under 5 minutes.</p>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <ProcessStep
                            number="1"
                            title="Quick Signup"
                            description="Create your account in seconds. We'll pre-load your inventory with essential categories."
                            icon={<Zap size={32} />}
                        />
                        <ProcessStep
                            number="2"
                            title="Add Inventory"
                            description="Import bulk items or add products one-by-one with our smart entry tool."
                            icon={<Package size={32} />}
                        />
                        <ProcessStep
                            number="3"
                            title="Go Digital"
                            description="Record sales, track credits, and get real-time AI analytics on your performance."
                            icon={<TrendingUp size={32} />}
                        />
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section style={{ padding: '120px 0', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', zIndex: 1, position: 'relative' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                        <UseCaseCard icon={<Store size={32} />} title="Kirana Stores" description="Master your daily grocery inventory & credits." />
                        <UseCaseCard icon={<Coffee size={32} />} title="Cafes & Bakeries" description="Manage ingredients and daily sales daily." />
                        <UseCaseCard icon={<Briefcase size={32} />} title="Retail Outlets" description="Hardware, clothing, and electronics stores." />
                        <UseCaseCard icon={<Users size={32} />} title="Wholesalers" description="Handle bulk orders and supplier payments." />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        style={{ textAlign: 'center', marginBottom: '80px' }}
                    >
                        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.04em' }}>Trusted by Modern Owners.</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem' }}>Real stories from real businesses across India.</p>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                        <TestimonialCard
                            name="Rajesh Verma"
                            business="Verma Groceries, Delhi"
                            text="Shop Khata saved me 2 hours every day. The digital khata feature is a life-saver for tracking customer credits."
                            rating={5}
                        />
                        <TestimonialCard
                            name="Anita Singh"
                            business="Singh Electronics, Mumbai"
                            text="The AI inventory predictions are magic. I never run out of stock now, and my wastage has dropped by 40%."
                            rating={5}
                        />
                        <TestimonialCard
                            name="Mohammed Ali"
                            business="Ali Wholesale, Hyderabad"
                            text="Professional reports and easy billing. My customers trust me more because of the digital bills they receive."
                            rating={5}
                        />
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section style={{ padding: '120px 0', position: 'relative', zIndex: 1, background: 'rgba(99, 102, 241, 0.02)' }}>
                <div className="container">
                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        padding: '60px',
                        background: 'rgba(15, 23, 42, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '40px',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#ef4444', fontWeight: 800 }}>Traditional Way</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        'Messy Paper Registers',
                                        'Manual Math Errors',
                                        'No Stock Visibility',
                                        'Forgotten Credit Payments',
                                        'Hours of Monthly Boring Calculations'
                                    ].map((item, i) => (
                                        <li key={i} style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                                            <span style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: 900 }}>✕</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ paddingLeft: '40px', borderLeft: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#10b981', fontWeight: 800 }}>Shop Khata Way</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {[
                                        'Clear Digital Records',
                                        'Automated Error-free Reports',
                                        'Real-time Inventory Alerts',
                                        'WhatsApp Payment Reminders',
                                        'Instant Profit/Loss AI Insights'
                                    ].map((item, i) => (
                                        <li key={i} style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
                                            <CheckCircle size={22} color="#10b981" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.04em' }}>Common Questions</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem' }}>Got a question? We've got answers.</p>
                    </div>
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        <FAQItem question="Do I need technical knowledge?" answer="Not at all! Shop Khata is designed for people with zero technical background. Our interface is as simple as using WhatsApp." />
                        <FAQItem question="Is my shop data really safe?" answer="Absolutely. We use bank-grade 256-bit encryption. Your data is backed up every 30 minutes and never shared with anyone." />
                        <FAQItem question="Can I use it on multiple phones?" answer="Yes! With our Pro plan, multiple staff members can use Shop Khata on different devices simultaneously with real-time sync." />
                        <FAQItem question="What happens after the 60-day trial?" answer="You can upgrade to Pro for ₹500/mo to keep all features, or use our free plan for basic transactions and inventory tracking." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '100px 0 50px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '80px', marginBottom: '80px' }}>
                        {/* Brand Column */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                                <div style={{ padding: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: '16px', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}>
                                    <Shield size={28} color="white" />
                                </div>
                                <span style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.02em' }}>Shop Khata</span>
                            </div>
                            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '30px', fontSize: '1.1rem', maxWidth: '400px' }}>
                                Empowering 5,000+ general stores across India with next-gen digital management and AI-driven insights.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dim)', fontSize: '1rem' }}>
                                <span>Made with ❤️ in India</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '25px', color: 'white' }}>Platform</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((link) => (
                                    <li key={link} style={{ marginBottom: '15px' }}>
                                        <a href={`#${link.toLowerCase().replace(' ', '-')}`} style={{ color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.3s', fontSize: '1.05rem' }} onMouseOver={e => e.target.style.color = '#6366f1'} onMouseOut={e => e.target.style.color = 'var(--text-dim)'}>{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '25px', color: 'white' }}>Company</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((link) => (
                                    <li key={link} style={{ marginBottom: '15px' }}>
                                        <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.3s', fontSize: '1.05rem' }} onMouseOver={e => e.target.style.color = '#6366f1'} onMouseOut={e => e.target.style.color = 'var(--text-dim)'}>{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', margin: 0 }}>
                            © 2026 Shop Khata. All rights reserved. Precision Software for Local Retail.
                        </p>
                        <div style={{ display: 'flex', gap: '25px' }}>
                            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                                <a key={social} href="#" style={{ color: 'var(--text-dim)', fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#6366f1'} onMouseOut={e => e.target.style.color = 'var(--text-dim)'}>{social}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer >
            {/* Floating Back to Top Button */}
            < AnimatePresence >
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        style={{
                            position: 'fixed',
                            bottom: '40px',
                            right: '40px',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                            transition: 'transform 0.3s'
                        }}
                        whileHover={{ scale: 1.1, translateY: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronUp size={28} />
                    </motion.button>
                )}
            </AnimatePresence >
        </div >
    );
};

// Component: StatCard
const StatCard = ({ number, label, icon }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
    >
        <div style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', color: '#6366f1' }}>
            {icon}
        </div>
        <div style={{ fontSize: '3rem', fontWeight: 900, background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{number}</div>
        <div style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
    </motion.div>
);

// Component: FeatureCard
const FeatureCard = ({ icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="glass-card"
        style={{
            padding: '40px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.3)'
        }}
        whileHover={{
            y: -12,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderColor: 'rgba(99, 102, 241, 0.3)'
        }}
    >
        <div style={{
            marginBottom: '30px',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(45, 212, 191, 0.1))',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '15px', fontWeight: 800, color: 'white' }}>{title}</h3>
        <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '1.1rem' }}>{description}</p>

        {/* Subtle decorative glow on hover */}
        <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            zIndex: -1
        }} />
    </motion.div>
);

// Component: ProcessStep
const ProcessStep = ({ number, title, description, icon }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: parseInt(number) * 0.2 }}
        style={{ textAlign: 'center', position: 'relative', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px' }}
    >
        <div style={{
            width: '90px',
            height: '90px',
            margin: '0 auto 30px',
            background: 'linear-gradient(135deg, #6366f1 0%, #2dd4bf 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)',
            color: 'white'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', fontWeight: 800 }}>{title}</h3>
        <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '1.1rem' }}>{description}</p>
        <div style={{ fontSize: '6rem', position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', zIndex: -1 }}>
            0{number}
        </div>
    </motion.div>
);

// Component: UseCaseCard
const UseCaseCard = ({ icon, title, description }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        style={{
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            transition: 'all 0.3s ease'
        }}
    >
        <div style={{ marginBottom: '25px', color: '#6366f1', display: 'inline-block', padding: '15px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%' }}>{icon}</div>
        <h4 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: 800 }}>{title}</h4>
        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.6 }}>{description}</p>
    </motion.div>
);

// Component: TestimonialCard
const TestimonialCard = ({ name, business, text, rating }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            position: 'relative'
        }}
    >
        <div style={{ display: 'flex', gap: '4px', marginBottom: '25px' }}>
            {[...Array(rating)].map((_, i) => (
                <Star key={i} size={18} fill="#10b981" color="#10b981" />
            ))}
        </div>
        <p style={{ color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '30px', fontSize: '1.1rem', fontWeight: 400 }}>"{text}"</p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>{name}</div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>{business}</div>
        </div>
    </motion.div>
);

// Component: FAQItem
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
                padding: '24px 32px',
                marginBottom: '16px',
                cursor: 'pointer',
                background: 'rgba(15, 23, 42, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '20px'
            }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{question}</h4>
                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? '#6366f1' : 'rgba(255,255,255,0.05)', borderRadius: '50%', transition: 'all 0.3s' }}>
                    {isOpen ? <ChevronUp size={20} color="white" /> : <ChevronDown size={20} color="white" />}
                </div>
            </div>
            {isOpen && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ color: 'var(--text-dim)', marginTop: '20px', lineHeight: '1.8', fontSize: '1.1rem' }}
                >
                    {answer}
                </motion.p>
            )}
        </motion.div>
    );
};

export default LandingPage;
