import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
    TrendingUp,
    ShoppingCart,
    IndianRupee,
    AlertTriangle,
    Package,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const DashboardHome = () => {
    const { metrics, transactions, inventory } = useShop();

    const cards = [
        { title: 'Total Sold', value: `₹${metrics.totalSold}`, icon: <TrendingUp />, color: '#10b981', trend: '+12.5%' },
        { title: 'Total Bought', value: `₹${metrics.totalBought}`, icon: <ShoppingCart />, color: '#31A7DB', trend: '+5.2%' },
        { title: 'Gross Profit', value: `₹${metrics.profit.toFixed(2)}`, icon: <IndianRupee />, color: '#f59e0b', trend: '+18.7%' },
        { title: 'Available Stock', value: metrics.stockAvailable, icon: <Package />, color: '#8b5cf6', trend: '-2.1%' },
        { title: 'Stock Emergency', value: metrics.stockEmergency, icon: <AlertTriangle />, color: '#ef4444', subtitle: 'Low stock items' },
    ];

    return (
        <div className="dashboard-home" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.8rem' }}>Dashboard Overview</h2>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {cards.map((card, index) => (
                    <div key={index} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ padding: '10px', background: `${card.color}20`, borderRadius: '12px', color: card.color }}>
                                {card.icon}
                            </div>
                            {card.trend && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: card.trend.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                                    {card.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {card.trend}
                                </div>
                            )}
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 500 }}>{card.title}</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>{card.value}</div>
                            {card.subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>{card.subtitle}</div>}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Recent Transactions */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.2rem' }}>Recent Transactions</h3>
                        <button style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>View All</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                    <th style={{ padding: '12px 0', color: 'var(--text-dim)', fontWeight: 500 }}>Date & Time</th>
                                    <th style={{ padding: '12px 0', color: 'var(--text-dim)', fontWeight: 500 }}>Customer</th>
                                    <th style={{ padding: '12px 0', color: 'var(--text-dim)', fontWeight: 500 }}>Profit/Loss</th>
                                    <th style={{ padding: '12px 0', color: 'var(--text-dim)', fontWeight: 500 }}>Total</th>
                                    <th style={{ padding: '12px 0', color: 'var(--text-dim)', fontWeight: 500 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                    .slice(0, 5)
                                    .map((t, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '16px 0' }}>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{new Date(t.timestamp).toLocaleDateString()}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td style={{ padding: '16px 0', fontWeight: 500 }}>{t.customerName}</td>
                                            <td style={{ padding: '16px 0' }}>
                                                {t.type === 'sell' ? (
                                                    (() => {
                                                        const profit = t.items.reduce((acc, item) => {
                                                            const cp = item.costPrice || (inventory.find(p => p.id === item.productId)?.cp || 0);
                                                            return acc + (item.unitPrice - cp) * item.quantity;
                                                        }, 0);
                                                        return (
                                                            <span style={{ color: profit >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600, fontSize: '0.9rem' }}>
                                                                {profit >= 0 ? '+' : ''}₹{profit.toFixed(2)}
                                                            </span>
                                                        );
                                                    })()
                                                ) : <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>-</span>}
                                            </td>
                                            <td style={{ padding: '16px 0', fontWeight: 600 }}>₹{t.total.toFixed(2)}</td>
                                            <td style={{ padding: '16px 0' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    background: t.type === 'sell' ? '#10b98120' : '#31A7DB20',
                                                    color: t.type === 'sell' ? '#10b981' : '#31A7DB'
                                                }}>
                                                    {t.type === 'sell' ? 'Sold' : 'Bought'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                {transactions.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>No recent transactions</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Low Stock Alerts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {inventory.filter(i => i.quantity < 10).slice(0, 6).map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                                <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>Only {item.quantity} left</div>
                                </div>
                            </div>
                        ))}
                        {inventory.filter(i => i.quantity < 10).length === 0 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '20px' }}>All stock levels healthy! ✅</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
