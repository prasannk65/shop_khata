import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // --- Auth State ---
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // --- Loading State ---
    const [isLoading, setIsLoading] = useState(true);

    // --- Data State ---
    const [inventory, setInventory] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [shopProfile, setShopProfile] = useState({ shopName: 'My Shop', email: '', image: '' });
    const [isDataCleared, setIsDataCleared] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

    // --- Initialization ---
    useEffect(() => {
        const storedEmail = localStorage.getItem('currentUserEmail');
        if (storedEmail) {
            const users = JSON.parse(localStorage.getItem('shop_users') || '[]');
            const user = users.find(u => u.email === storedEmail);
            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
                loadUserData(user.email);
            }
        }
        setIsLoading(false);
    }, []);

    // --- core Data Helpers ---
    const loadUserData = (email) => {
        // Inventory
        const savedInventory = localStorage.getItem(`inventory_${email}`);
        if (savedInventory) {
            setInventory(JSON.parse(savedInventory));
        } else {
            // Default Inventory for new users
            setInventory([
                { id: 1, name: 'Milk (1L)', cp: 50, sp: 60, quantity: 20, image: 'https://images.unsplash.com/photo-1563636619-e910009355bb?w=200' },
                { id: 2, name: 'Bread', cp: 30, sp: 40, quantity: 15, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200' },
                { id: 3, name: 'Sugar (1kg)', cp: 40, sp: 45, quantity: 50, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=200' },
                { id: 4, name: 'Egg (Dozen)', cp: 60, sp: 72, quantity: 10, image: 'https://images.unsplash.com/photo-1582722872445-44c5c1f0c8a7?w=200' },
                { id: 5, name: 'Rice (5kg)', cp: 250, sp: 300, quantity: 8, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
                { id: 6, name: 'Cooking Oil (1L)', cp: 140, sp: 160, quantity: 12, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200' },
                { id: 7, name: 'Pulse (1kg)', cp: 90, sp: 110, quantity: 25, image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=200' },
                { id: 8, name: 'Tea (250g)', cp: 80, sp: 95, quantity: 18, image: 'https://images.unsplash.com/photo-1544787210-22bb1ed0599e?w=200' },
                { id: 9, name: 'Detergent (1kg)', cp: 120, sp: 150, quantity: 5, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200' },
                { id: 10, name: 'Soap', cp: 25, sp: 35, quantity: 30, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=200' },
            ]);
        }

        // Transactions
        setTransactions(JSON.parse(localStorage.getItem(`transactions_${email}`) || '[]'));

        // Customers
        setCustomers(JSON.parse(localStorage.getItem(`customers_${email}`) || '[]'));

        // Settings
        setIsDataCleared(localStorage.getItem(`isDataCleared_${email}`) === 'true');

        // Profile & Premium Status logic (Derived from User Object usually, but shopProfile might be editable)
        const savedProfile = localStorage.getItem(`profile_${email}`);

        // Load fresh user to get premium status
        const users = JSON.parse(localStorage.getItem('shop_users') || '[]');
        const user = users.find(u => u.email === email);

        setShopProfile(savedProfile ? JSON.parse(savedProfile) : {
            shopName: user?.shopName || 'My Shop',
            email: email,
            image: user?.image || ''
        });

        setIsPremium(!!user?.isPremium);
    };

    // --- Persistence Effects ---
    // Only save if we have a current user
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`inventory_${currentUser.email}`, JSON.stringify(inventory));
        }
    }, [inventory, currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`transactions_${currentUser.email}`, JSON.stringify(transactions));
        }
    }, [transactions, currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`customers_${currentUser.email}`, JSON.stringify(customers));
        }
    }, [customers, currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`isDataCleared_${currentUser.email}`, isDataCleared);
        }
    }, [isDataCleared, currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(shopProfile));
        }
    }, [shopProfile, currentUser]);


    // --- Auth Actions ---

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('shop_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUserEmail', user.email);
            setIsAuthenticated(true);
            loadUserData(user.email);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (userData) => { // { email, password, shopName, isPremium }
        const users = JSON.parse(localStorage.getItem('shop_users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { ...userData, isPremium: userData.isPremium || false };
        users.push(newUser);
        localStorage.setItem('shop_users', JSON.stringify(users));
        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUserEmail');
        // Clear state to prevent flashing old data
        setInventory([]);
        setTransactions([]);
        setCustomers([]);
        setShopProfile({ shopName: '', email: '' });
    };

    // --- Shop Actions ---

    const updateShopProfile = (updates) => {
        setShopProfile(prev => ({ ...prev, ...updates }));
        // Also update the main user registry if critical info changes (optional but good)
    };

    const addTransaction = (transaction) => {
        const enrichedTransaction = {
            ...transaction,
            items: transaction.items.map(item => {
                const prod = inventory.find(p => p.id === item.productId);
                return {
                    ...item,
                    costPrice: item.costPrice || (prod ? prod.cp : 0)
                };
            })
        };
        setTransactions(prev => {
            const next = [enrichedTransaction, ...prev];
            return next.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });

        // Update stock
        setInventory(prev => prev.map(item => {
            const soldItem = transaction.items.find(ti => ti.productId === item.id);
            if (soldItem) {
                const updatedItem = { ...item };
                if (transaction.type === 'sell') {
                    updatedItem.quantity -= soldItem.quantity;
                    updatedItem.lastSold = transaction.timestamp;
                } else {
                    updatedItem.quantity += soldItem.quantity;
                    updatedItem.lastBought = transaction.timestamp;
                }
                updatedItem.lastActivity = transaction.timestamp;
                return updatedItem;
            }
            return item;
        }));
    };

    const updateTransaction = (updatedTransaction) => {
        const oldTransaction = transactions.find(t => t.id === updatedTransaction.id);
        if (!oldTransaction) return;

        setInventory(prev => prev.map(item => {
            let newQty = item.quantity;
            const oldItem = oldTransaction.items.find(oi => oi.productId === item.id);
            if (oldItem) {
                newQty += (oldTransaction.type === 'sell' ? oldItem.quantity : -oldItem.quantity);
            }
            const newItem = updatedTransaction.items.find(ni => ni.productId === item.id);
            if (newItem) {
                newQty += (updatedTransaction.type === 'sell' ? -newItem.quantity : newItem.quantity);
            }
            return { ...item, quantity: newQty };
        }));

        setTransactions(prev => {
            const next = prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t);
            return next.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });
    };

    const addInventoryItem = (newItem) => {
        setInventory(prev => [{ ...newItem, id: Date.now() }, ...prev]);
        setIsDataCleared(false);
    };

    const updateInventoryItem = (id, updatedItem) => {
        setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    };

    const clearShopData = () => {
        setTransactions([]);
        setInventory(prev => prev.map(item => ({
            ...item,
            quantity: 0,
            lastSold: null,
            lastBought: null,
            lastActivity: null
        })));
        setIsDataCleared(true);
    };


    const upgradeToPremium = () => {
        if (!currentUser) return;

        setIsPremium(true);
        // Update user in 'shop_users'
        const users = JSON.parse(localStorage.getItem('shop_users') || '[]');
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex].isPremium = true;
            localStorage.setItem('shop_users', JSON.stringify(users));
            setCurrentUser(prev => ({ ...prev, isPremium: true }));
        }

        // Add gift
        if (!inventory.find(i => i.name === 'Apple Airpods Pro')) {
            setInventory(prev => [
                ...prev,
                { id: Date.now(), name: 'Apple Airpods Pro', cp: 18000, sp: 24900, quantity: 5, image: 'https://images.unsplash.com/photo-1588156979435-379b9d802b74?w=200' },
                { id: Date.now() + 1, name: 'Smart Watch Series 7', cp: 35000, sp: 41900, quantity: 3, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200' }
            ]);
        }
        // alert("🎉 Congratulations! You are now a Premium Member."); 
        // Note: Alert might be handled by UI
    };

    const addCustomer = (customer) => {
        setCustomers(prev => [{ ...customer, id: Date.now(), transactions: [] }, ...prev]);
    };

    const addCustomerTransaction = (customerId, amount, type, description) => {
        setCustomers(prev => prev.map(c => {
            if (c.id === customerId) {
                const newTrans = {
                    id: Date.now(),
                    amount: parseFloat(amount),
                    type,
                    description,
                    date: new Date().toISOString()
                };
                return { ...c, transactions: [newTrans, ...c.transactions] };
            }
            return c;
        }));
    };

    // Metrics calculation
    const metrics = (() => {
        const totalSold = transactions.filter(t => t.type === 'sell').reduce((acc, current) => acc + current.total, 0);

        // Initial Value calc
        const initialItems = [
            { id: 1, cp: 50, q: 20 }, { id: 2, cp: 30, q: 15 }, { id: 3, cp: 40, q: 50 },
            { id: 4, cp: 60, q: 10 }, { id: 5, cp: 250, q: 8 }, { id: 6, cp: 140, q: 12 },
            { id: 7, cp: 90, q: 25 }, { id: 8, cp: 80, q: 18 }, { id: 9, cp: 120, q: 5 },
            { id: 10, cp: 25, q: 30 }
        ];
        const initialValue = isDataCleared ? 0 : initialItems.reduce((acc, item) => acc + (item.cp * item.q), 0);
        const buyTransactionsValue = transactions.filter(t => t.type === 'buy').reduce((acc, current) => acc + current.total, 0);


        const totalCreditGiven = customers.reduce((acc, c) => acc + c.transactions.filter(t => t.type === 'gave').reduce((sum, t) => sum + t.amount, 0), 0);
        const totalCreditRecovered = customers.reduce((acc, c) => acc + c.transactions.filter(t => t.type === 'got').reduce((sum, t) => sum + t.amount, 0), 0);

        return {
            totalSold,
            totalBought: buyTransactionsValue + initialValue,
            profit: transactions.reduce((acc, t) => {
                if (t.type === 'sell') {
                    const transProfit = t.items.reduce((p, item) => {
                        const cp = item.costPrice || (inventory.find(i => i.id === item.productId)?.cp || 0);
                        return p + (item.unitPrice - cp) * item.quantity;
                    }, 0);
                    return acc + transProfit;
                }
                return acc;
            }, 0),
            stockAvailable: inventory.reduce((acc, item) => acc + item.quantity, 0),
            stockEmergency: inventory.filter(item => item.quantity < 10).length,
            totalCreditGiven,
            totalCreditRecovered,
            outstandingCredit: totalCreditGiven - totalCreditRecovered
        };
    })();

    return (
        <ShopContext.Provider value={{
            currentUser,
            isAuthenticated,
            login,
            signup,
            logout,
            inventory,
            transactions,
            addTransaction,
            updateTransaction,
            addInventoryItem,
            updateInventoryItem,
            clearShopData,
            shopProfile,
            updateShopProfile,
            metrics,
            customers,
            addCustomer,
            addCustomerTransaction,
            isPremium,
            upgradeToPremium,
            isLoading
        }}>
            {children}
        </ShopContext.Provider>
    );
};
