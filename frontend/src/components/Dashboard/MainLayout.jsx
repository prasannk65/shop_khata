import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Receipt,
    BarChart3,
    LogOut,
    Settings,
    Menu,
    X,
    Store,
    Trash2,
    ShieldAlert,
    Camera,
    User as UserIcon,
    Upload,
    Sparkles,
    MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import { useShop } from '../../context/ShopContext';

// Modules
import DashboardHome from './DashboardHome';
import Inventory from './Inventory';
import Transactions from './Transactions';
import Analytics from './Analytics';
import AIAssistant from './AIAssistant';
import AIConsultant from './AIConsultant';
import CustomerKhata from './CustomerKhata';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [clearPassword, setClearPassword] = useState('');
    const [clearError, setClearError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { clearShopData, shopProfile, updateShopProfile, logout } = useShop(); // Added logout

    // Profile Edit State
    const [profileForm, setProfileForm] = useState({
        shopName: shopProfile.shopName,
        email: shopProfile.email,
        image: shopProfile.image || ''
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleClearData = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        // Check against stored password, master password, or common default
        if (clearPassword === storedUser.password || clearPassword === '1234' || clearPassword === '123456') {
            clearShopData();
            setIsClearModalOpen(false);
            setClearPassword('');
            setClearError('');
            alert('Shop data has been cleared successfully!');
        } else {
            setClearError('Incorrect password. Please try again.');
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        updateShopProfile(profileForm);
        setIsProfileModalOpen(false);
        alert('Profile updated successfully!');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileForm({ ...profileForm, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard' },
        { name: 'Inventory', icon: <Package size={20} />, path: '/app/inventory' },
        { name: 'Transactions', icon: <Receipt size={20} />, path: '/app/transactions' },
        { name: 'Customer Khata', icon: <UserIcon size={20} />, path: '/app/customers' },
        { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/app/analytics' },
        { name: 'AI Consultant', icon: <Sparkles size={20} />, path: '/app/ai-consultant' },
        { name: 'AI Assistant', icon: <MessageSquare size={20} />, path: '/app/ai-assistant' },
    ];

    return (
        <div className="main-layout" style={{ display: 'flex', minHeight: '100vh', maxHeight: '100vh', background: 'var(--bg-darker)', overflow: 'hidden' }}>
            {/* Sidebar */}
            <aside className={`sidebar glass-card`} style={{
                width: isSidebarOpen ? '260px' : '0',
                minWidth: isSidebarOpen ? '260px' : '0',
                maxWidth: isSidebarOpen ? '260px' : '0',
                height: 'calc(100vh - 40px)',
                display: 'flex',
                flexDirection: 'column',
                margin: isSidebarOpen ? '20px' : '0',
                padding: isSidebarOpen ? '20px' : '0',
                borderRadius: '24px',
                zIndex: 100,
                flexShrink: 0,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: isSidebarOpen ? 1 : 0,
                border: isSidebarOpen ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}>
                <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', flexShrink: 0 }}>
                    <div style={{ padding: '8px', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
                        <Store size={24} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.2rem', whiteSpace: 'nowrap' }}>Shop Khata</span>
                </div>

                <nav className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', paddingRight: '5px' }}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                color: location.pathname === item.path ? 'white' : 'var(--text-dim)',
                                background: location.pathname === item.path ? 'var(--primary)' : 'transparent',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                fontSize: '0.95rem',
                                flexShrink: 0
                            }}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                    <button
                        onClick={() => { setIsClearModalOpen(true); setClearError(''); }}
                        className="nav-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            color: '#ff9800',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            fontSize: '0.95rem'
                        }}
                    >
                        <Trash2 size={20} />
                        <span>Clear Shop Data</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="nav-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            color: 'var(--danger)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            fontSize: '0.95rem'
                        }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="content-area" style={{
                flex: 1,
                padding: isSidebarOpen ? '20px 20px 20px 0' : '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'padding 0.3s ease'
            }}>
                {/* Topbar */}
                <header className="glass-card" style={{
                    padding: '16px 24px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Menu size={24} />
                    </button>
                    <div
                        onClick={() => {
                            setProfileForm({
                                shopName: shopProfile.shopName,
                                email: shopProfile.email,
                                image: shopProfile.image || ''
                            });
                            setIsProfileModalOpen(true);
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', padding: '6px 12px', borderRadius: '16px', transition: 'background 0.2s', background: 'rgba(255,255,255,0.05)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{shopProfile.shopName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{shopProfile.email}</div>
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: shopProfile.image ? 'transparent' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            border: shopProfile.image ? '2px solid var(--primary)' : 'none'
                        }}>
                            {shopProfile.image ? (
                                <img src={shopProfile.image} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                (shopProfile.shopName ? shopProfile.shopName[0].toUpperCase() : 'S')
                            )}
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                    <Routes>
                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="transactions" element={<Transactions />} />
                        <Route path="customers" element={<CustomerKhata />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="ai-assistant" element={<AIAssistant />} />
                        <Route path="ai-consultant" element={<AIConsultant />} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                </div>
            </main>

            {/* Clear Data Modal */}
            {isClearModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
                        <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>
                            <ShieldAlert size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Critical Action</h3>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '24px', fontSize: '0.9rem' }}>
                            This will clear all transactions and reset inventory stock to 0. This action CANNOT be undone.
                        </p>

                        <form onSubmit={handleClearData} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ textAlign: 'left', display: 'block' }}>Enter Your Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    required
                                    autoFocus
                                    placeholder="Password"
                                    value={clearPassword}
                                    onChange={(e) => setClearPassword(e.target.value)}
                                />
                                {clearError && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '8px' }}>{clearError}</div>}
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={() => setIsClearModalOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn" style={{ flex: 1, background: 'var(--danger)', color: 'white' }}>
                                    Clear Everything
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content" style={{ maxWidth: '450px' }}>
                        <button onClick={() => setIsProfileModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Shop Profile</h3>

                        <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        background: 'var(--glass)',
                                        border: '2px solid var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {profileForm.image ? (
                                            <img src={profileForm.image} alt="Shop Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Store size={40} style={{ color: 'var(--text-dim)' }} />
                                        )}
                                    </div>
                                    <label style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        background: 'var(--primary)',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                    }}>
                                        <Camera size={16} />
                                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Shop Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    required
                                    value={profileForm.shopName}
                                    onChange={(e) => setProfileForm({ ...profileForm, shopName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Business Email</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    required
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ height: '50px', justifyContent: 'center' }}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainLayout;
