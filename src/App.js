import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Import pages
import HomePage from './pages/HomePage';
import TryOnPage from './pages/TryOnPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import MerchantPortalPage from './pages/MerchantPortalPage';
import AffiliatePortalPage from './pages/AffiliatePortalPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import ContactPage from './pages/ContactPage';
import Login from './components/common/Login';
import DashboardPage from './pages/DashboardPage';
import AffiliateDashboardPage from './pages/AffiliateDashboardPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';

// Merchant and Affiliate Auth pages
import MerchantLoginPage from './components/merchant/MerchantLoginPage';
import MerchantSignupPage from './components/merchant/MerchantSignupPage';
import AffiliateLoginPage from './components/affiliate/AffiliateLoginPage';
import AffiliateSignupPage from './components/affiliate/AffiliateSignupPage';
import MarketingMaterialsPage from './components/affiliate/MarketingMaterialsPage';
import AffiliateSettingsPage from './pages/AffiliateSettingsPage';
import AffiliateDashboardSettingsPage from './pages/AffiliateDashboardSettingsPage';
import AffiliateSupportPage from './pages/AffiliateSupportPage';
import AffiliateDashboardSupportPage from './pages/AffiliateDashboardSupportPage';

// Protected route wrapper component
const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate page based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'merchant') {
      return <Navigate to="/merchants" replace />;
    } else if (userRole === 'affiliate') {
      return <Navigate to="/affiliate/dashboard" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }
  
  return <Outlet />;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on app load
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    setAuthenticated(isAuth);
    setUserRole(role);
  }, []);

  const handleLogin = (role) => {
    setAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<AffiliateSignupPage />} />
          
          {/* Merchant auth routes */}
          <Route path="/merchant/login" element={<MerchantLoginPage onLogin={handleLogin} />} />
          <Route path="/merchant/signup" element={<MerchantSignupPage />} />
          
          {/* Affiliate auth routes */}
          <Route path="/affiliate/login" element={<AffiliateLoginPage onLogin={handleLogin} />} />
          <Route path="/affiliate/signup" element={<AffiliateSignupPage />} />
          
          {/* User routes */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
            <Route path="/categories" element={<CategoriesPage onLogout={handleLogout} />} />
            <Route path="/try-on" element={<TryOnPage />} />
            <Route path="/try-on/:id" element={<TryOnPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Route>

          {/* Merchant routes */}
          <Route element={<ProtectedRoute allowedRoles={['merchant']} />}>
            <Route path="/merchants" element={<MerchantPortalPage onLogout={handleLogout} />} />
            <Route path="/merchants/analytics" element={<MerchantPortalPage onLogout={handleLogout} />} />
            <Route path="/merchants/products" element={<MerchantPortalPage onLogout={handleLogout} />} />
            <Route path="/merchants/orders" element={<MerchantPortalPage onLogout={handleLogout} />} />
            <Route path="/merchants/billing" element={<MerchantPortalPage onLogout={handleLogout} />} />
            <Route path="/merchants/settings" element={<MerchantPortalPage onLogout={handleLogout} />} />
            <Route path="/merchants/support" element={<MerchantPortalPage onLogout={handleLogout} />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/customers" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/merchants" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/affiliates" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/orders" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/products" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/categories" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/homepage" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/popups" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/settings" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/about" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/contact" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/seo" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/analytics" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/chat" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/reviews" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/pages" element={<OwnerDashboardPage onLogout={handleLogout} />} />
            <Route path="/admin/category-articles" element={<OwnerDashboardPage onLogout={handleLogout} />} />
          </Route>

          {/* Dashboard routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'merchant']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/banner" element={<DashboardPage />} />
            <Route path="/dashboard/popups" element={<DashboardPage />} />
            <Route path="/dashboard/products" element={<DashboardPage />} />
            <Route path="/dashboard/categories" element={<DashboardPage />} />
            <Route path="/dashboard/tags" element={<DashboardPage />} />
            <Route path="/dashboard/analytics" element={<DashboardPage />} />
            <Route path="/dashboard/settings" element={<DashboardPage />} />
          </Route>

          {/* Affiliate Portal routes */}
          <Route element={<ProtectedRoute allowedRoles={['affiliate', 'merchant']} />}>
            <Route path="/affiliate" element={<AffiliatePortalPage />} />
            <Route path="/affiliate/dashboard" element={<AffiliatePortalPage />} />
            <Route path="/affiliate/links" element={<AffiliatePortalPage />} />
            <Route path="/affiliate/payments" element={<AffiliatePortalPage />} />
            <Route path="/affiliate/marketing" element={<AffiliatePortalPage />} />
            <Route path="/affiliate/profile" element={<AffiliatePortalPage />} />
            <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
            <Route path="/affiliate/support" element={<AffiliateSupportPage />} />
          </Route>

          {/* Protected affiliate dashboard routes */}
          <Route element={<ProtectedRoute allowedRoles={['affiliate', 'merchant']} />}>
            <Route path="/affiliate/dashboard/overview" element={<AffiliateDashboardPage onLogout={handleLogout} />} />
            <Route path="/affiliate/dashboard/links" element={<AffiliateDashboardPage onLogout={handleLogout} />} />
            <Route path="/affiliate/dashboard/earnings" element={<AffiliateDashboardPage onLogout={handleLogout} />} />
            <Route path="/affiliate/dashboard/materials" element={<AffiliateDashboardPage onLogout={handleLogout} />} />
            <Route path="/affiliate/dashboard/social" element={<AffiliateDashboardPage onLogout={handleLogout} />} />
            <Route path="/affiliate/dashboard/profile" element={<AffiliateDashboardPage onLogout={handleLogout} />} />
            <Route path="/affiliate/dashboard/settings" element={<AffiliateDashboardSettingsPage />} />
            <Route path="/affiliate/dashboard/support" element={<AffiliateDashboardSupportPage />} />
          </Route>

          {/* Catch all route - redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;