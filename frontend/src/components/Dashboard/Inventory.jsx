import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, Search, Edit2, Package, Trash2, X, Download, FileText, Upload, Image as ImageIcon, Clock } from 'lucide-react';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

const Inventory = () => {
    const { inventory, addInventoryItem, updateInventoryItem, addTransaction } = useShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [restockItem, setRestockItem] = useState(null);
    const [restockQty, setRestockQty] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        cp: '',
        sp: '',
        quantity: '',
        image: ''
    });

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                cp: item.cp,
                sp: item.sp,
                quantity: item.quantity,
                image: item.image
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                cp: '',
                sp: '',
                quantity: '',
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleRestock = (e) => {
        e.preventDefault();
        if (!restockItem || !restockQty) return;

        const transaction = {
            id: Date.now(),
            customerName: 'Self (Restock)',
            type: 'buy',
            items: [{
                productId: restockItem.id,
                quantity: parseInt(restockQty),
                unitPrice: restockItem.cp,
                costPrice: restockItem.cp
            }],
            total: restockItem.cp * parseInt(restockQty),
            timestamp: new Date().toISOString()
        };

        addTransaction(transaction);
        setIsRestockModalOpen(false);
        setRestockQty('');
        setRestockItem(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const itemData = {
            ...formData,
            cp: parseFloat(formData.cp),
            sp: parseFloat(formData.sp),
            quantity: parseInt(formData.quantity),
            image: formData.image || 'https://images.unsplash.com/photo-1628102422204-766157053073?w=200'
        };

        if (editingItem) {
            updateInventoryItem(editingItem.id, itemData);
        } else {
            addInventoryItem(itemData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="inventory-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Inventory Management</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-outline" style={{ padding: '8px 16px' }} onClick={() => exportToPDF([], inventory, { start: 'All', end: 'All' })}>
                        <FileText size={18} /> PDF
                    </button>
                    <button className="btn btn-outline" style={{ padding: '8px 16px' }} onClick={() => exportToExcel([], inventory)}>
                        <Download size={18} /> Excel
                    </button>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} /> Add New Item
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search products..."
                        style={{ paddingLeft: '40px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Inventory Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {filteredInventory.map((item) => (
                    <div key={item.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {item.quantity < 10 && (
                                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--danger)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>
                                    LOW STOCK
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.name}</h3>
                                <button onClick={() => handleOpenModal(item)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                                    <Edit2 size={16} />
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '8px', background: 'var(--glass)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Cost Price</div>
                                    <div style={{ fontWeight: 700 }}>₹{item.cp}</div>
                                </div>
                                <div style={{ padding: '8px', background: 'var(--glass)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Sell Price</div>
                                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{item.sp}</div>
                                </div>
                            </div>

                            {item.lastActivity && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} />
                                    <span>Last {item.lastSold === item.lastActivity ? 'Sold' : 'Bought'}: </span>
                                    <span style={{ color: 'white' }}>{new Date(item.lastActivity).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: item.quantity < 10 ? 'var(--danger)' : 'var(--text-dim)' }}>
                                        <Package size={16} />
                                        <span style={{ fontSize: '0.9rem' }}>{item.quantity} units</span>
                                    </div>
                                    <button
                                        onClick={() => { setRestockItem(item); setIsRestockModalOpen(true); }}
                                        style={{
                                            background: 'var(--primary)',
                                            border: 'none',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 12px rgba(49, 167, 219, 0.3)'
                                        }}
                                        title="Quick Restock (Buy)"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
                                    Profit: ₹{item.sp - item.cp}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content" style={{ maxWidth: '540px' }}>
                        <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label>Item Name</label>
                                <input type="text" className="input-field" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Cost Price (CP)</label>
                                    <input type="number" className="input-field" required value={formData.cp} onChange={(e) => setFormData({ ...formData, cp: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Selling Price (SP)</label>
                                    <input type="number" className="input-field" required value={formData.sp} onChange={(e) => setFormData({ ...formData, sp: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Available Quantity</label>
                                <input type="number" className="input-field" required value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Product Image</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {formData.image && (
                                        <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                                            <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                style={{ position: 'absolute', top: '4px', right: '4px', background: 'var(--danger)', border: 'none', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <label className="btn btn-outline" style={{ cursor: 'pointer', fontSize: '0.85rem', padding: '10px' }}>
                                            <Upload size={16} /> Upload from System
                                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                        </label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="...or paste Image URL"
                                            style={{ fontSize: '0.85rem', padding: '10px' }}
                                            value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
                                {editingItem ? 'Update Item' : 'Add Item'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Restock Modal */}
            {isRestockModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content" style={{ maxWidth: '400px' }}>
                        <button onClick={() => setIsRestockModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Buy Stock</h3>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '24px', fontSize: '0.9rem' }}>Record a new purchase for <strong>{restockItem?.name}</strong></p>

                        <form onSubmit={handleRestock} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label>Quantity to Buy</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    required
                                    autoFocus
                                    placeholder="Enter count..."
                                    value={restockQty}
                                    onChange={(e) => setRestockQty(e.target.value)}
                                />
                                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                                    Total Cost: <span style={{ color: 'white', fontWeight: 600 }}>₹{(restockItem?.cp * (parseInt(restockQty) || 0)).toFixed(2)}</span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Record Purchase
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
