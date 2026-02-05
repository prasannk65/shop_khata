import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';

import Login from './components/Auth/Login';
import SignupDetails from './components/Auth/SignupDetails';
import SignupOTP from './components/Auth/SignupOTP';
import PremiumDetails from './components/Auth/PremiumDetails';
import PremiumOTP from './components/Auth/PremiumOTP';
import PremiumPayment from './components/Auth/PremiumPayment';
import MainLayout from './components/Dashboard/MainLayout';
import { ShopProvider, useShop } from './context/ShopContext';

// Protected Route Helper
const ProtectedRoute = () => {
  const { isAuthenticated } = useShop();
  return isAuthenticated ? <MainLayout /> : <Navigate to="/" />;
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupDetails />} />
            <Route path="/signup-otp" element={<SignupOTP />} />
            <Route path="/premium-details" element={<PremiumDetails />} />
            <Route path="/premium-otp" element={<PremiumOTP />} />
            <Route path="/premium-payment" element={<PremiumPayment />} />

            {/* Protected Routes */}
            <Route path="/app/*" element={<ProtectedRoute />} />
          </Routes>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
