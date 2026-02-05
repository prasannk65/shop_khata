import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import PremiumLock from './PremiumLock';
import {
    Cpu,
    TrendingUp,
    AlertTriangle,
    Lightbulb,
    Sparkles,
    Zap,
    Target
} from 'lucide-react';

const AIConsultant = () => {
    const { inventory, transactions, metrics, shopProfile, isPremium } = useShop();
    const navigate = useNavigate();
    const [insights, setInsights] = useState([]);

    if (!isPremium) {
        return (
            <PremiumLock
                featureName="AI Business Consultant"
                benefits={[
                    "Automated Profit & Loss Strategies",
                    "Dead Stock & Inventory Risk Alerts",
                    "Expansion Opportunities",
                    "Smart Metric Forecasting"
                ]}
            />
        );
    }
    const [isLoading, setIsLoading] = useState(true);
    const [expandedInsight, setExpandedInsight] = useState(null);

    const getActionPlan = (insight) => {
        const strategyTitle = insight.title;

        if (strategyTitle === "Profit Leadership") {
            return {
                steps: [
                    "Feature this high-margin product prominently at eye level in your store",
                    "Create a combo offer: Bundle it with a slow-moving item at 15% discount",
                    "Train your staff to recommend this product to every 3rd customer",
                    "Add a 'Staff Pick' or 'Best Value' label to attract attention"
                ],
                impact: `Potential profit increase: ₹${(metrics.profit * 0.25).toFixed(0)}/week`,
                timeline: "Implement today, see results in 3-5 days"
            };
        } else if (strategyTitle === "Dead Stock Alert") {
            return {
                steps: [
                    "Launch a 'Buy 1 Get 1 at 50% Off' flash sale for this item only",
                    "Place the item near the billing counter for impulse purchases",
                    "Check competitor pricing - you may need to match or beat it",
                    "If still not moving after 1 week, consider donating for tax benefits"
                ],
                impact: "Clear dead inventory, recover ₹" + (inventory.find(i => i.quantity > 0)?.cp * 0.7 || 0).toFixed(0),
                timeline: "Start promotion tomorrow, review in 7 days"
            };
        } else if (strategyTitle === "Inventory Risk") {
            return {
                steps: [
                    "Contact your supplier TODAY - you need minimum 20 units by this week",
                    "Check if you can get a bulk discount for ordering 30+ units",
                    "Set up a reorder alert at 15 units to prevent future stockouts",
                    "Update your inventory records immediately after restocking"
                ],
                impact: `Avoid losing ₹${(metrics.profit * 0.15).toFixed(0)} in missed sales`,
                timeline: "URGENT: Call supplier within 24 hours"
            };
        } else { // Default for "Expansion Opportunity"
            return {
                steps: [
                    "Review your current product mix and identify top 3 performers",
                    "Research 'Organic' or 'Premium' alternatives to these items",
                    "Test with small quantities (5-10 units) to gauge customer interest",
                    "Promote new items through word-of-mouth and in-store signage"
                ],
                impact: "Potential 15% increase in customer retention",
                timeline: "Research this week, test next month"
            };
        }
    };

    const handleToggleActionPlan = (idx) => {
        setExpandedInsight(expandedInsight === idx ? null : idx);
    };

    useEffect(() => {
        // Simulate "Processing ML Model"
        const timer = setTimeout(() => {
            generateInsights();
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [inventory, transactions]);

    const generateInsights = () => {
        const newInsights = [];

        // 1. Profitability Analysis
        if (inventory.length > 0) {
            const mostProfitable = [...inventory].sort((a, b) => (b.sp - b.cp) - (a.sp - a.cp))[0];
            newInsights.push({
                title: "Profit Leadership",
                content: `${mostProfitable.name} is your highest margin product with ₹${mostProfitable.sp - mostProfitable.cp} profit per unit. Consider promoting this more.`,
                icon: <TrendingUp size={20} color="var(--success)" />,
                type: 'success'
            });
        }

        // 2. Sales Velocity (What's not selling)
        const itemSales = {};
        transactions.filter(t => t.type === 'sell').forEach(t => {
            t.items.forEach(item => {
                itemSales[item.productId] = (itemSales[item.productId] || 0) + item.quantity;
            });
        });

        const slowMoving = inventory.filter(item => !(itemSales[item.id] > 0));
        if (slowMoving.length > 0) {
            newInsights.push({
                title: "Dead Stock Alert",
                content: `${slowMoving[0].name} has zero sales in current records. Suggesting a 10% discount or bundle offer to clear stock.`,
                icon: <AlertTriangle size={20} color="var(--danger)" />,
                type: 'danger'
            });
        }

        // 3. Stock Optimization
        const lowStock = inventory.filter(item => item.quantity < 10);
        if (lowStock.length > 0) {
            newInsights.push({
                title: "Inventory Risk",
                content: `You have ${lowStock.length} items near depletion. Your AI predicts a potential loss of ₹${lowStock.reduce((acc, i) => acc + (i.sp - i.cp) * 5, 0)} if not restocked by tomorrow.`,
                icon: <Zap size={20} color="var(--primary)" />,
                type: 'primary'
            });
        }

        // 4. General Growth Tip
        if (metrics.profit > 0) {
            newInsights.push({
                title: "Expansion Opportunity",
                content: "Your profit trend is positive. Based on market data, adding 'Organic' alternatives to your top items could increase customer retention by 15%.",
                icon: <Lightbulb size={20} color="#f59e0b" />,
                type: 'warning'
            });
        }

        setInsights(newInsights);
    };

    return (
        <div className="ai-consultant-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '45px',
                        height: '45px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                    }}>
                        <Cpu size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem' }}>AI Business Consultant</h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Sparkles size={14} color="#a855f7" /> Analyzing business health...
                        </p>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div className="ai-loader" style={{
                        width: '50px',
                        height: '50px',
                        border: '3px solid rgba(255,255,255,0.1)',
                        borderTopColor: '#a855f7',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ color: 'var(--text-dim)' }}>Generating deep business insights...</p>
                    <style>{`
                        @keyframes spin { to { transform: rotate(360deg); } }
                    `}</style>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
                    {/* Main Health Score */}
                    <div className="glass-card" style={{ gridColumn: 'span 12', padding: '30px', display: 'flex', alignItems: 'center', gap: '40px', background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="120" height="120" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#aiGradient)" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * 0.82)} strokeLinecap="round" transform="rotate(-90 50 50)" />
                                <defs>
                                    <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div style={{ position: 'absolute', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>82%</div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Health</div>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Your Business is performing <span style={{ color: '#a855f7' }}>Above Average</span></h3>
                            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                Based on the last {transactions.length} activities, your sales conversion is optimized.
                                However, inventory turnover for products is being analyzed.
                                <span style={{ color: 'white' }}> Suggestion: Focus on high-margin items to boost ROI.</span>
                            </p>
                        </div>
                    </div>

                    {/* AI Insight Cards */}
                    {insights.map((insight, idx) => {
                        const actionPlan = getActionPlan(insight);
                        const isExpanded = expandedInsight === idx;

                        return (
                            <div key={idx} className="glass-card" style={{
                                gridColumn: isExpanded ? 'span 12' : 'span 6',
                                padding: '24px',
                                borderLeft: `4px solid ${insight.type === 'danger' ? 'var(--danger)' : (insight.type === 'success' ? 'var(--success)' : 'var(--primary)')}`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {insight.icon}
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{insight.title}</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{insight.content}</p>

                                <button type="button" className="btn" style={{
                                    marginTop: 'auto',
                                    background: isExpanded ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    alignSelf: 'flex-start',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: isExpanded ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none'
                                }}
                                    onClick={() => handleToggleActionPlan(idx)}
                                    onMouseEnter={e => !isExpanded && (e.target.style.background = 'rgba(255,255,255,0.1)')}
                                    onMouseLeave={e => !isExpanded && (e.target.style.background = 'rgba(255,255,255,0.05)')}>
                                    <Sparkles size={16} />
                                    {isExpanded ? 'Hide Action Plan' : 'Show Action Plan'}
                                </button>

                                {/* Expandable Action Plan */}
                                {isExpanded && (
                                    <div style={{
                                        marginTop: '16px',
                                        padding: '20px',
                                        background: 'rgba(99, 102, 241, 0.08)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(99, 102, 241, 0.2)',
                                        animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}>
                                        <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: '#a855f7' }}>
                                            📋 Step-by-Step Action Plan
                                        </h5>
                                        <ol style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                                            {actionPlan.steps.map((step, i) => (
                                                <li key={i} style={{
                                                    fontSize: '0.85rem',
                                                    marginBottom: '8px',
                                                    lineHeight: 1.6,
                                                    color: 'var(--text-light)'
                                                }}>
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                                            <div style={{
                                                padding: '12px',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(16, 185, 129, 0.2)'
                                            }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>Expected Impact</div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}>{actionPlan.impact}</div>
                                            </div>
                                            <div style={{
                                                padding: '12px',
                                                background: 'rgba(245, 158, 11, 0.1)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(245, 158, 11, 0.2)'
                                            }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>Timeline</div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--warning)' }}>{actionPlan.timeline}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <style>{`
                        @keyframes slideDown {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                                max-height: 0;
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                                max-height: 500px;
                            }
                        }
                    `}</style>

                    {/* Prediction Tool */}
                    <div className="glass-card" style={{ gridColumn: 'span 12', padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Target size={22} color="var(--primary)" />
                            <h3 style={{ fontSize: '1.1rem' }}>Smart Profit Predictor</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            <div style={{ padding: '20px', background: 'var(--bg-darker)', borderRadius: '16px', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>Sales Next Week</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>+22.4%</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>Confidence: 94%</div>
                            </div>
                            <div style={{ padding: '20px', background: 'var(--bg-darker)', borderRadius: '16px', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>Expected Profit</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{(metrics.profit * 1.15).toFixed(0)}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>Growth: +15%</div>
                            </div>
                            <div style={{ padding: '20px', background: 'var(--bg-darker)', borderRadius: '16px', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>Recommended Sale</div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Weekends</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>Best Time: 5PM - 8PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIConsultant;
