import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, Search, Trash2, Calendar, User, ShoppingBag, X, Clock, Edit2 } from 'lucide-react';

const Transactions = () => {
    const { transactions, inventory, addTransaction, updateTransaction } = useShop();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Transaction Form State
    const [customerName, setCustomerName] = useState('');
    const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
    const [transactionTime, setTransactionTime] = useState(new Date().toTimeString().split(' ')[0].substring(0, 5));
    const [type, setType] = useState('sell'); // sell or buy
    const [selectedItems, setSelectedItems] = useState([{ productId: '', quantity: 1, unitPrice: 0 }]);

    const filteredTransactions = transactions
        .filter(t => t.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const handleAddItem = () => {
        setSelectedItems([...selectedItems, { productId: '', quantity: 1, unitPrice: 0 }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = selectedItems.filter((_, i) => i !== index);
        setSelectedItems(newItems);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...selectedItems];
        newItems[index][field] = value;

        // Auto-fill price if product is selected
        if (field === 'productId') {
            const product = inventory.find(p => p.id === parseInt(value));
            if (product) {
                newItems[index].unitPrice = type === 'sell' ? product.sp : product.cp;
            }
        }

        setSelectedItems(newItems);
    };

    const calculateTotal = () => {
        return selectedItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    };

    const handleEditClick = (t) => {
        setEditingTransaction(t);
        setCustomerName(t.customerName);
        setType(t.type);
        setTransactionDate(new Date(t.timestamp).toISOString().split('T')[0]);
        setTransactionTime(new Date(t.timestamp).toTimeString().split(' ')[0].substring(0, 5));
        setSelectedItems(t.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        })));
        setIsModalOpen(true);
    };

    const handleNewClick = () => {
        setEditingTransaction(null);
        setCustomerName('');
        setTransactionDate(new Date().toISOString().split('T')[0]);
        setTransactionTime(new Date().toTimeString().split(' ')[0].substring(0, 5));
        setType('sell');
        setSelectedItems([{ productId: '', quantity: 1, unitPrice: 0 }]);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItems.some(i => !i.productId)) return;

        // Combine date and time
        const combinedDateTime = `${transactionDate}T${transactionTime}`;
        const selectedDate = new Date(combinedDateTime);

        const transaction = {
            id: editingTransaction ? editingTransaction.id : Date.now(),
            customerName,
            type,
            items: selectedItems.map(i => {
                const prod = inventory.find(p => p.id === parseInt(i.productId));
                return {
                    productId: parseInt(i.productId),
                    quantity: parseInt(i.quantity),
                    unitPrice: parseFloat(i.unitPrice),
                    costPrice: prod ? prod.cp : (editingTransaction ? (editingTransaction.items.find(ei => ei.productId === parseInt(i.productId))?.costPrice || 0) : 0)
                };
            }),
            total: calculateTotal(),
            timestamp: selectedDate.toISOString()
        };

        if (editingTransaction) {
            updateTransaction(transaction);
        } else {
            addTransaction(transaction);
        }
        setIsModalOpen(false);
        setEditingTransaction(null);
        // Reset form
        setCustomerName('');
        setTransactionDate(new Date().toISOString().split('T')[0]);
        setTransactionTime(new Date().toTimeString().split(' ')[0].substring(0, 5));
        setType('sell');
        setSelectedItems([{ productId: '', quantity: 1, unitPrice: 0 }]);
    };

    return (
        <div className="transactions-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Transaction History</h2>
                <button className="btn btn-primary" onClick={handleNewClick}>
                    <Plus size={18} /> New Transaction
                </button>
            </div>

            <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search by customer name..."
                        style={{ paddingLeft: '40px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: 'var(--glass)' }}>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>Date & Time</th>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>Customer / Source</th>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>Type</th>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>Items</th>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>Profit/Loss</th>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'right' }}>Total Amount</th>
                            <th style={{ padding: '16px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((t) => (
                            <tr key={t.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontSize: '0.9rem' }}>{new Date(t.timestamp).toLocaleDateString()}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{new Date(t.timestamp).toLocaleTimeString()}</div>
                                </td>
                                <td style={{ padding: '16px', fontWeight: 600 }}>{t.customerName}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: t.type === 'sell' ? '#10b98120' : '#31A7DB20',
                                        color: t.type === 'sell' ? '#10b981' : '#31A7DB'
                                    }}>
                                        {t.type === 'sell' ? 'SALE' : 'PURCHASE'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        {t.items.map(item => {
                                            const prod = inventory.find(p => p.id === item.productId);
                                            return `${prod ? prod.name : 'Unknown'} (${item.quantity})`;
                                        }).join(', ')}
                                    </div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    {t.type === 'sell' ? (
                                        (() => {
                                            const profit = t.items.reduce((acc, item) => {
                                                const cp = item.costPrice || (inventory.find(p => p.id === item.productId)?.cp || 0);
                                                return acc + (item.unitPrice - cp) * item.quantity;
                                            }, 0);
                                            return (
                                                <div style={{ color: profit >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                                                    {profit >= 0 ? '+' : ''}₹{profit.toFixed(2)}
                                                </div>
                                            );
                                        })()
                                    ) : (
                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>N/A (Purchase)</span>
                                    )}
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem' }}>
                                    ₹{t.total.toFixed(2)}
                                </td>
                                <td style={{ padding: '16px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleEditClick(t)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '8px' }}
                                        title="Edit Transaction"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredTransactions.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-dim)' }}>
                                    <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                                    <p>No transactions found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* New Transaction Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content">
                        <button onClick={() => { setIsModalOpen(false); setEditingTransaction(null); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{editingTransaction ? 'Edit Transaction' : 'Record New Transaction'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 120px 1fr', gap: '16px', alignItems: 'end' }}>
                                <div className="form-group">
                                    <label>Customer / Supplier Name</label>
                                    <input type="text" className="input-field" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Full Name" />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" className="input-field" required value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input type="time" className="input-field" required value={transactionTime} onChange={(e) => setTransactionTime(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            type="button"
                                            className={`btn ${type === 'sell' ? 'btn-primary' : 'btn-outline'}`}
                                            style={{ flex: 1 }}
                                            onClick={() => setType('sell')}
                                        >Selling to customer</button>
                                        <button
                                            type="button"
                                            className={`btn ${type === 'buy' ? 'btn-primary' : 'btn-outline'}`}
                                            style={{ flex: 1 }}
                                            onClick={() => setType('buy')}
                                        >Buying stock</button>
                                    </div>
                                </div>
                            </div>

                            <div className="items-section">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <label style={{ fontWeight: 600 }}>Products</label>
                                    <button type="button" onClick={handleAddItem} style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Plus size={16} /> Add Another Item
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {selectedItems.map((item, index) => (
                                        <div key={index} className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 2fr) 100px 140px 40px', gap: '16px', alignItems: 'end', padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label>Select Product</label>
                                                <select
                                                    className="input-field"
                                                    required
                                                    value={item.productId}
                                                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                                                >
                                                    <option value="">Choose item...</option>
                                                    {inventory.map(p => (
                                                        <option key={p.id} value={p.id} style={{ padding: '10px' }}>{p.name} (Stock: {p.quantity})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label>Quantity</label>
                                                <input
                                                    type="number"
                                                    className="input-field"
                                                    required
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label>Unit Price (₹)</label>
                                                <input
                                                    type="number"
                                                    className="input-field"
                                                    required
                                                    value={item.unitPrice}
                                                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index)}
                                                style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ padding: '24px', background: 'var(--glass)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total Order Value:</span>
                                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>₹{calculateTotal().toFixed(2)}</span>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ height: '56px', justifyContent: 'center', fontSize: '1.1rem' }}>
                                {editingTransaction ? 'Update Transaction' : 'Complete Transaction'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
