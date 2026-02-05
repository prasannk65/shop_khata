import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
    Users,
    Plus,
    Search,
    ArrowUpRight,
    ArrowDownLeft,
    Phone,
    MessageCircle,
    History,
    ChevronRight,
    X,
    Wallet
} from 'lucide-react';
import PremiumLock from './PremiumLock';

const CustomerKhata = () => {
    const { customers, addCustomer, addCustomerTransaction, isPremium } = useShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Forms
    const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });
    const [transactionForm, setTransactionForm] = useState({ amount: '', description: '', type: 'gave' });

    // Update selected customer when customers array changes (to show new transactions)
    useEffect(() => {
        if (selectedCustomer) {
            const updatedCustomer = customers.find(c => c.id === selectedCustomer.id);
            if (updatedCustomer) {
                setSelectedCustomer(updatedCustomer);
            }
        }
    }, [customers]);

    // Premium Check - Let's say basic 3 customers are free, more require premium
    // This answers "what different things for paid" -> Unlimited Customers
    const isLimitReached = !isPremium && customers.length >= 3;

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    const handleAddCustomer = (e) => {
        e.preventDefault();
        if (isLimitReached) {
            alert("Free plan limit reached! Upgrade to Premium to add more customers.");
            return;
        }
        addCustomer(newCustomer);
        setNewCustomer({ name: '', phone: '' });
        setIsAddModalOpen(false);
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!selectedCustomer) return;

        addCustomerTransaction(
            selectedCustomer.id,
            transactionForm.amount,
            transactionForm.type,
            transactionForm.description || (transactionForm.type === 'gave' ? 'Credit Given' : 'Payment Received')
        );
        setTransactionForm({ amount: '', description: '', type: 'gave' });
    };

    const getBalance = (customer) => {
        const given = customer.transactions.filter(t => t.type === 'gave').reduce((acc, t) => acc + t.amount, 0);
        const got = customer.transactions.filter(t => t.type === 'got').reduce((acc, t) => acc + t.amount, 0);
        return given - got;
    };

    return (
        <div className="customer-khata-page" style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 140px)' }}>

            {/* Left Panel: Customer List */}
            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Users color="var(--primary)" />
                            Customers
                        </h2>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="btn btn-primary"
                            style={{
                                padding: '8px 12px',
                                gap: '6px',
                                opacity: isLimitReached ? 0.7 : 1
                            }}
                        >
                            <Plus size={18} /> Add New
                        </button>
                    </div>

                    {!isPremium && (
                        <div style={{
                            fontSize: '0.8rem',
                            padding: '8px 12px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '8px',
                            color: 'var(--warning)',
                            marginBottom: '12px'
                        }}>
                            Free Plan: {customers.length}/3 Customers Used.
                            <span style={{ fontWeight: 'bold', cursor: 'pointer', marginLeft: '4px', textDecoration: 'underline' }}>Upgrade for Unlimited</span>
                        </div>
                    )}

                    <div className="search-box" style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <Search size={18} color="var(--text-dim)" />
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            style={{ background: 'transparent', border: 'none', color: 'white', marginLeft: '10px', width: '100%' }}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filteredCustomers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                            <Users size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                            <p>No customers found.</p>
                        </div>
                    ) : (
                        filteredCustomers.map(customer => {
                            const balance = getBalance(customer);
                            return (
                                <div
                                    key={customer.id}
                                    onClick={() => setSelectedCustomer(customer)}
                                    style={{
                                        padding: '16px 20px',
                                        borderBottom: '1px solid var(--glass-border)',
                                        cursor: 'pointer',
                                        background: selectedCustomer?.id === customer.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        transition: 'background 0.2s',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px', height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.2rem', fontWeight: 600
                                        }}>
                                            {customer.name[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{customer.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{customer.phone}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontWeight: 700,
                                            color: balance > 0 ? 'var(--danger)' : (balance < 0 ? 'var(--success)' : 'var(--text-dim)')
                                        }}>
                                            ₹{Math.abs(balance)}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                                            {balance > 0 ? 'You will get' : (balance < 0 ? 'Advance' : 'Settled')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Right Panel: Transaction Details */}
            {selectedCustomer ? (
                <div className="glass-card" style={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '50px', height: '50px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', fontWeight: 600
                            }}>
                                {selectedCustomer.name[0].toUpperCase()}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{selectedCustomer.name}</h2>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Phone size={14} /> {selectedCustomer.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Net Balance</div>
                            <div style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                color: getBalance(selectedCustomer) > 0 ? 'var(--danger)' : (getBalance(selectedCustomer) < 0 ? 'var(--success)' : 'white')
                            }}>
                                ₹{Math.abs(getBalance(selectedCustomer))}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: getBalance(selectedCustomer) > 0 ? 'var(--danger)' : 'var(--success)' }}>
                                {getBalance(selectedCustomer) > 0 ? 'Due Amount' : (getBalance(selectedCustomer) < 0 ? 'Advance Paid' : 'All Clear')}
                            </div>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {selectedCustomer.transactions.length === 0 ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', opacity: 0.5 }}>
                                <History size={48} style={{ marginBottom: '16px' }} />
                                <p>No transactions yet</p>
                            </div>
                        ) : (
                            selectedCustomer.transactions.map(t => (
                                <div key={t.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '12px',
                                    borderLeft: `4px solid ${t.type === 'gave' ? 'var(--danger)' : 'var(--success)'}`
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{t.description || (t.type === 'gave' ? 'Credit Given' : 'Payment Received')}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                            {new Date(t.date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        color: t.type === 'gave' ? 'var(--danger)' : 'var(--success)'
                                    }}>
                                        {t.type === 'gave' ? '-' : '+'} ₹{t.amount}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Action Bar */}
                    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--glass-border)' }}>
                        <form onSubmit={handleAddTransaction} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                                <input
                                    type="number"
                                    placeholder="Amount (₹)"
                                    required
                                    className="input-field"
                                    style={{ flex: 1 }}
                                    value={transactionForm.amount}
                                    onChange={e => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Note (Optional)"
                                    className="input-field"
                                    style={{ flex: 2 }}
                                    value={transactionForm.description}
                                    onChange={e => setTransactionForm({ ...transactionForm, description: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="submit"
                                    onClick={() => setTransactionForm({ ...transactionForm, type: 'gave' })}
                                    className="btn"
                                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.5)' }}
                                >
                                    <ArrowUpRight size={18} /> GAVE (Udhaar)
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => setTransactionForm({ ...transactionForm, type: 'got' })}
                                    className="btn"
                                    style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.5)' }}
                                >
                                    <ArrowDownLeft size={18} /> GOT (Payment)
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="glass-card" style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
                    <div style={{
                        width: '80px', height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '20px'
                    }}>
                        <Wallet size={40} opacity={0.5} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Select a Customer</h3>
                    <p>View ledger or add new transaction</p>
                </div>
            )}

            {/* Add Customer Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content" style={{ maxWidth: '400px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Add New Customer</h3>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAddCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    value={newCustomer.name}
                                    onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    className="input-field"
                                    required
                                    placeholder="e.g. 9876543210"
                                    value={newCustomer.phone}
                                    onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                                Add Customer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerKhata;
