import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Calendar, Download, FileText, Table as TableIcon, Filter } from 'lucide-react';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

const Analytics = () => {
    const { transactions, inventory, metrics } = useShop();
    const [dateRange, setDateRange] = useState({ start: '2026-01-01', end: '2026-12-31' });
    const [timeRange, setTimeRange] = useState('1W'); // 1W, 1M, 6M, 1Y

    // Data processing for charts
    // Data processing for charts - 7 Day Profit Loss View
    // Data processing for charts - Stock Market Style
    const getChartData = () => {
        let days = 7;
        if (timeRange === '1M') days = 30;
        if (timeRange === '6M') days = 180;
        if (timeRange === '1Y') days = 365;

        const timeline = [];
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
            timeline.push({ date: dateStr, profit: 0, fullDate: d.toLocaleDateString() });
        }

        const stats = timeline.reduce((acc, item) => {
            acc[item.fullDate] = item;
            return acc;
        }, {});

        transactions.forEach(t => {
            const dateStr = new Date(t.timestamp).toLocaleDateString();
            if (stats[dateStr]) {
                if (t.type === 'sell') {
                    const transProfit = t.items.reduce((p, item) => {
                        const cp = item.costPrice || (inventory.find(i => i.id === item.productId)?.cp || 0);
                        return p + (item.unitPrice - cp) * item.quantity;
                    }, 0);
                    stats[dateStr].profit += transProfit;
                }
            }
        });

        // For long ranges, we might want to group by month, but for now let's keep it daily
        return timeline;
    };

    const chartData = getChartData();
    const totalProfitInRange = chartData.reduce((acc, curr) => acc + curr.profit, 0);
    const isNegative = totalProfitInRange < 0;
    const chartColor = isNegative ? 'var(--danger)' : 'var(--primary)';
    const textColor = isNegative ? 'var(--danger)' : 'var(--success)';

    const stockData = inventory.map(item => ({
        name: item.name,
        quantity: item.quantity,
        value: item.quantity * item.sp
    })).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

    const COLORS = ['#31A7DB', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    const handleExport = (format) => {
        if (format === 'pdf') exportToPDF(transactions, inventory, dateRange);
        else exportToExcel(transactions, inventory);
    };

    return (
        <div className="analytics-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Business Analytics</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
                        <Calendar size={16} color="var(--primary)" />
                        <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} style={{ background: 'transparent', border: 'none', color: 'white' }} />
                        <span>to</span>
                        <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} style={{ background: 'transparent', border: 'none', color: 'white' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline" onClick={() => handleExport('pdf')}>
                            <FileText size={18} /> PDF
                        </button>
                        <button className="btn btn-outline" onClick={() => handleExport('excel')}>
                            <TableIcon size={18} /> Excel
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
                {/* Sales Trend */}
                <div className="glass-card" style={{ gridColumn: 'span 8', padding: '24px', height: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Profit Performance</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: textColor }}>
                                    ₹{totalProfitInRange.toFixed(2)}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Total in {timeRange}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-darker)', padding: '4px', borderRadius: '8px' }}>
                            {['1W', '1M', '6M', '1Y'].map(range => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        background: timeRange === range ? 'var(--primary)' : 'transparent',
                                        color: timeRange === range ? 'white' : 'var(--text-dim)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '280px' }}>
                        <ResponsiveContainer>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="var(--text-dim)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={30}
                                />
                                <YAxis
                                    stroke="var(--text-dim)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `₹${val}`}
                                />
                                <Tooltip
                                    cursor={{ stroke: chartColor, strokeWidth: 1 }}
                                    contentStyle={{ background: '#192b40', border: '1px solid var(--glass-border)', borderRadius: '12px' }}
                                    itemStyle={{ color: 'white' }}
                                    formatter={(value) => [`₹${value.toFixed(2)}`, 'Profit']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stroke={chartColor}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorProfit)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stock Distribution */}
                <div className="glass-card" style={{ gridColumn: 'span 4', padding: '24px', height: 'auto', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Top Stock Distribution</h3>
                    <div style={{ width: '100%', height: '220px' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={stockData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="quantity"
                                >
                                    {stockData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', flex: 1 }}>
                        {stockData.map((entry, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[index % COLORS.length] }}></div>
                                    <span style={{ color: 'var(--text-dim)' }}>{entry.name}</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>{entry.quantity} units</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inventory Value */}
                <div className="glass-card" style={{ gridColumn: 'span 12', padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Inventory Value Analysis</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', color: 'var(--text-dim)', borderBottom: '1px solid var(--glass-border)' }}>
                                    <th style={{ padding: '12px' }}>Product</th>
                                    <th style={{ padding: '12px' }}>Stock Quantity</th>
                                    <th style={{ padding: '12px' }}>Avg Selling Price</th>
                                    <th style={{ padding: '12px' }}>Estimated Value</th>
                                    <th style={{ padding: '12px' }}>Potential Profit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '12px', fontWeight: 600 }}>{item.name}</td>
                                        <td style={{ padding: '12px' }}>{item.quantity}</td>
                                        <td style={{ padding: '12px' }}>₹{item.sp}</td>
                                        <td style={{ padding: '12px', fontWeight: 600 }}>₹{(item.quantity * item.sp).toFixed(2)}</td>
                                        <td style={{ padding: '12px', color: 'var(--success)' }}>₹{(item.quantity * (item.sp - item.cp)).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
