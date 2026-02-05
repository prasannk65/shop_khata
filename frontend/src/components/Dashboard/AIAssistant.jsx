import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import PremiumLock from './PremiumLock';
import {
    Cpu,
    Sparkles,
    ArrowUpRight,
    MessageSquare
} from 'lucide-react';

const AIAssistant = () => {
    const { inventory, transactions, metrics, shopProfile, isPremium } = useShop();
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate

    if (!isPremium) {
        return (
            <PremiumLock
                featureName="AI Shop Assistant"
                benefits={[
                    "24/7 Smart Inventory Answers",
                    "Instant Profit/Loss Analysis",
                    "Customized Business Advice",
                    "Natural Language Data Queries"
                ]}
            />
        );
    }
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', text: `Hello! I am your AI Shop Assistant. I'm connected to your inventory and transactions. Ask me anything about ${shopProfile.shopName}!` }
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = React.useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleApplyStrategy = (insight) => {
        if (!insight) return;

        // Ensure there's a title
        const strategyTitle = insight.title || "Selected";

        setIsThinking(true);
        setMessages(prev => [...prev, { role: 'user', text: `How do I apply the "${strategyTitle}" strategy?` }]);

        setTimeout(() => {
            let guidance = "";
            if (strategyTitle === "Profit Leadership") {
                guidance = `To leverage Profit Leadership, I recommend: 
                1. Feature this product on your main display area.
                2. Bundle it with a slow-moving item to increase overall turnover.
                3. Train staff to mention this item's value proposition to customers.
                Current Margin: ₹${(metrics.profit / (transactions.length || 1) * 1.5).toFixed(2)} potential increase.`;
            } else if (strategyTitle === "Dead Stock Alert") {
                guidance = `To clear Dead Stock:
                1. Implement a "Buy 1 Get 1" at 50% discount for this specific item.
                2. Place it near the billing counter for impulse buys.
                3. Check if the pricing aligns with competitors in your area.`;
            } else if (insight.title === "Inventory Risk") {
                guidance = `Immediate Action Required for Inventory Risk:
                1. I've calculated you need at least 20 units to last through next week.
                2. Contact your supplier for ${insight.content?.split(' ')[2] || 'this item'} immediately.
                3. Update your stock records once received to clear this alert.`;
            } else {
                guidance = `The "${strategyTitle}" strategy is a great move. Start by reviewing your current resource allocation and then implement the specific recommendations mentioned in the insight card. Would you like a more detailed breakdown?`;
            }

            setMessages(prev => [...prev, { role: 'assistant', text: guidance }]);
            setIsThinking(false);

            // Extra scroll safety
            setTimeout(scrollToBottom, 100);
        }, 1200);
    };

    // Handle incoming strategy application from AIConsultant
    useEffect(() => {
        console.log("🔍 AIAssistant checking location.state:", location.state);

        // Use location state if it exists
        if (location.state?.strategy) {
            const strategy = location.state.strategy;
            console.log("✨ Strategy received in AIAssistant:", strategy.title);
            console.log("📦 Full strategy object:", JSON.stringify(strategy, null, 2));

            // Clear location state immediately via navigate (the React way)
            // to prevent re-triggering if the user navigates elsewhere and back
            navigate(location.pathname, { replace: true, state: {} });

            handleApplyStrategy(strategy);
        } else {
            console.log("⚠️ No strategy found in location.state");
        }
    }, [location.state, navigate]);

    const handleAskAI = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setChatInput('');
        setIsThinking(true);

        // Simulated AI Logic Engine
        setTimeout(() => {
            let response = "";
            const lowerInput = userMsg.toLowerCase();

            const mentionedProduct = inventory.find(p => lowerInput.includes(p.name.toLowerCase().split(' ')[0]));

            if (lowerInput.includes('profit')) {
                response = `Your total profit is ₹${metrics.profit.toFixed(2)}. ${metrics.profit > 0 ? "You're profitable! Keep it up." : "You're currently in a loss. Let's look at your margins."}`;
            } else if (lowerInput.includes('buy') || lowerInput.includes('stock')) {
                const lowStock = inventory.filter(p => p.quantity < 10);
                if (mentionedProduct) {
                    response = `${mentionedProduct.name} stock level is ${mentionedProduct.quantity}. ${mentionedProduct.quantity < 10 ? "Yes, restock it soon." : "It's well stocked."}`;
                } else {
                    response = `You have ${lowStock.length} items low on stock. I suggest checking your inventory tab for details.`;
                }
            } else if (mentionedProduct) {
                response = `${mentionedProduct.name} is priced at ₹${mentionedProduct.sp}. You have ${mentionedProduct.quantity} units remaining in stock.`;
            } else {
                response = "I'm analyzing your shop data. I see you have " + inventory.length + " products and " + transactions.length + " transactions recorded. How else can I assist with your business today?";
            }

            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
            setIsThinking(false);
        }, 1200);
    };

    return (
        <div className="ai-assistant-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '45px',
                        height: '45px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                    }}>
                        <MessageSquare size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem' }}>AI Chat Assistant</h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Sparkles size={14} color="#3b82f6" /> Ready to answer your questions...
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '500px', padding: '24px' }}>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '10px', minHeight: '400px', maxHeight: '550px' }}>
                    {messages.map((msg, i) => (
                        <div key={i} style={{
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            padding: '12px 16px',
                            borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                            background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: 'white',
                            fontSize: '0.95rem',
                            lineHeight: 1.5,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            {msg.text}
                        </div>
                    ))}
                    {isThinking && (
                        <div style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', gap: '4px' }}>
                            <div className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-dim)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                            <div className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-dim)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></div>
                            <div className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-dim)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleAskAI} style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Ask me about your shop..."
                        style={{ flex: 1, height: '50px' }}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', background: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)', border: 'none' }}>
                        Send <ArrowUpRight size={18} />
                    </button>
                </form>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
};

export default AIAssistant;
