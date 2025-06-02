import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import AuthModal from '../auth/AuthModal';

const SharedHeader = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || ''
  );
  
  // Auth modal state
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authRedirectPath, setAuthRedirectPath] = useState('');
  const [authDefaultTab, setAuthDefaultTab] = useState('login');
  
  // Define role-specific navigation items
  const userNavItems = [
    { path: '/home', label: 'Home' },
    { path: '/try-on', label: 'Try On' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
  ];
  
  const merchantNavItems = [
    { path: '/merchants', label: 'Dashboard' },
    { path: '/merchants/products', label: 'Products' },
    { path: '/merchants/analytics', label: 'Analytics' },
    { path: '/merchants/billing', label: 'Billing' },
  ];
  
  const adminNavItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/customers', label: 'Customers' },
    { path: '/admin/merchants', label: 'Merchants' },
    { path: '/admin/affiliates', label: 'Affiliates' },
    { path: '/admin/categories', label: 'Categories' },
  ];
  
  // Items for different user role dropdown menus
  const userDropdownItems = [
    { path: '/profile', label: 'My Profile' },
    { path: '/wishlist', label: 'Wishlist' },
    { path: '/contact', label: 'Contact' },
    { path: '/affiliate/signup', label: 'Become an Affiliate' },
  ];
  
  const merchantDropdownItems = [
    { path: '/merchants/settings', label: 'Account Settings' },
    { path: '/merchants/billing', label: 'Billing' },
    { path: '/merchants/support', label: 'Support' },
    { path: '/contact', label: 'Contact' },
  ];
  
  const adminDropdownItems = [
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/categories', label: 'Categories' },
    { path: '/admin/homepage', label: 'Homepage' },
    { path: '/admin/popups', label: 'Popups' },
  ];

  // Get current navigation items based on user role
  const getCurrentNavItems = () => {
    switch (userRole) {
      case 'admin':
        return adminNavItems;
      case 'merchant':
        return merchantNavItems;
      case 'user':
      default:
        return userNavItems;
    }
  };
  
  // Get current dropdown items based on user role
  const getCurrentDropdownItems = () => {
    switch (userRole) {
      case 'admin':
        return adminDropdownItems;
      case 'merchant':
        return merchantDropdownItems;
      case 'user':
      default:
        return userDropdownItems;
    }
  };

  // Get home page URL based on user role
  const getHomePage = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'merchant':
        return '/merchants';
      case 'affiliate':
        return '/affiliate/dashboard';
      case 'user':
      default:
        return '/home';
    }
  };

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMoreMenuOpen(!moreMenuOpen);
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    setAuthDefaultTab('login');
    setAuthRedirectPath('');
    setAuthModalVisible(true);
  };

  // Function to handle signup button click
  const handleSignupClick = () => {
    setAuthDefaultTab('register');
    setAuthRedirectPath('');
    setAuthModalVisible(true);
  };

  // Function to handle navigation for non-default routes
  const handleNavigation = (path) => {
    // Close menus
    setIsMenuOpen(false);
    setMoreMenuOpen(false);
    
    // For My Profile, always show auth modal
    if (path === '/profile') {
      setAuthRedirectPath(path);
      setAuthDefaultTab('login');
      setAuthModalVisible(true);
      return;
    }
    
    // Check if trying to access other protected routes while not authenticated
    const protectedRoutes = ['/orders', '/wishlist'];
    if (!isAuthenticated && protectedRoutes.includes(path)) {
      // Show auth modal instead of redirecting
      setAuthRedirectPath(path);
      setAuthDefaultTab('login');
      setAuthModalVisible(true);
      return;
    }
    
    // Navigate to the path
    navigate(path);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close dropdowns when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      setMoreMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Update authentication state when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const role = localStorage.getItem('userRole') || '';
      setIsAuthenticated(authStatus);
      setUserRole(role);
    };
    
    // Listen for storage events (in case auth changes in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Listen for custom auth-change event
    window.addEventListener('auth-change', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);
  
  const handleLogout = () => {
    // Remove auth flag from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    
    // Update local state immediately
    setIsAuthenticated(false);
    setUserRole('');
    
    // If onLogout prop is provided, call it
    if (onLogout) {
      onLogout();
      return;
    }
    
    // Otherwise handle logout manually
    // Dispatch a custom event to notify other components about the logout
    window.dispatchEvent(new Event('auth-change'));
    
    // Navigate to login page with a slight delay to ensure all state updates complete
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 10);
  };

  // Get the welcome text and action button based on user role
  const getWelcomeAndAction = () => {
    switch (userRole) {
      case 'admin':
        return {
          welcome: 'Admin Portal',
          actionPath: '/admin',
          actionLabel: 'DASHBOARD',
        };
      case 'merchant':
        return {
          welcome: 'Merchant Portal',
          actionPath: '/merchants/products',
          actionLabel: 'PRODUCTS',
        };
      case 'user':
      default:
        return {
          welcome: 'Virtual Try-On',
          actionPath: '/try-on',
          actionLabel: 'TRY ON',
        };
    }
  };

  const { welcome, actionPath, actionLabel } = getWelcomeAndAction();
  
  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Use window.location for a full page refresh
    window.location.href = getHomePage();
  };

  // Function to navigate with page refresh for merchant header
  const navigateWithRefresh = (path) => {
    window.location.href = path;
  };

  // Update state when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    // Check auth status on every location change
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole') || '';
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, [location]);

  // Custom rendering for merchant role
  if (userRole === 'merchant' && location.pathname.includes('/merchants')) {
    return (
      <header className="bg-indigo-700 fixed w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={handleLogoClick} className="flex items-center bg-transparent border-0">
                <img
                  src="https://i.ibb.co/KjrQ65br/logo.png"
                  alt="KOKOMATTO"
                  className="h-8 w-8 mr-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.alt = "K";
                    e.target.className = "font-bold text-white text-lg mr-2";
                  }}
                />
                <span className="text-white font-bold text-xl">Merchant Portal</span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => navigateWithRefresh('/merchants')}
                className={`text-white font-medium ${location.pathname === '/merchants' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigateWithRefresh('/merchants/products')}
                className={`text-white font-medium ${location.pathname.includes('/products') ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
              >
                Products
              </button>
              <button 
                onClick={() => navigateWithRefresh('/merchants/analytics')}
                className={`text-white font-medium ${location.pathname.includes('/analytics') ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
              >
                Analytics
              </button>
              <button 
                onClick={() => navigateWithRefresh('/merchants/billing')}
                className={`text-white font-medium ${location.pathname.includes('/billing') ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
              >
                Billing
              </button>
              <button 
                onClick={handleLogout}
                className="bg-white text-indigo-700 px-4 py-1 rounded font-medium"
              >
                LOGOUT
              </button>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden py-3 border-t border-indigo-600">
              <button onClick={() => navigateWithRefresh('/merchants')} className="block w-full text-left py-2 text-white">
                Dashboard
              </button>
              <button onClick={() => navigateWithRefresh('/merchants/products')} className="block w-full text-left py-2 text-white">
                Products
              </button>
              <button onClick={() => navigateWithRefresh('/merchants/analytics')} className="block w-full text-left py-2 text-white">
                Analytics
              </button>
              <button onClick={() => navigateWithRefresh('/merchants/billing')} className="block w-full text-left py-2 text-white">
                Billing
              </button>
              <div className="pt-2 border-t border-indigo-600 mt-2">
                <button onClick={handleLogout} className="block w-full text-left py-2 text-white">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
  
  // Default header for other user roles
  return (
    <header className="bg-[#464996] fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with dynamic text based on role */}
          <div className="flex items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center bg-transparent border-0"
              title="Go to Home"
            >
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-3 hover:opacity-90 transition-opacity shadow-sm">
                <img 
                  className="h-8 w-8" 
                  src="https://i.ibb.co/KjrQ65br/logo.png" 
                  alt="KOKOMATTO" 
                  onError={(e) => {
                    // Fallback in case the logo doesn't load
                    e.target.src = "/assets/images/logo.png";
                    // If both fail, show text as last resort
                    e.target.onerror = () => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.alt = "K";
                      e.target.className = "font-bold text-[#464996] text-xl";
                      e.target.parentElement.classList.add("justify-center");
                    };
                  }}
                />
              </div>
              <span className="text-xl font-bold text-white">{welcome}</span>
            </button>
          </div>
          
          {/* Right-aligned navigation and actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Desktop Navigation - Dynamic based on role */}
            {isAuthenticated && getCurrentNavItems().map((item, index) => (
              <button 
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`text-white hover:text-gray-300 bg-transparent border-0 ${
                  location.pathname === item.path ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Action button based on role */}
            {isAuthenticated ? (
              <button
                onClick={() => handleNavigation(actionPath)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#464996] bg-white hover:bg-gray-100"
              >
                {actionLabel}
              </button>
            ) : (
              <>
                {/* Login and Register buttons for unauthenticated users */}
                <button
                  onClick={handleLoginClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:text-gray-200"
                >
                  LOGIN
                </button>
                <button
                  onClick={handleSignupClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#464996] bg-white hover:bg-gray-100"
                >
                  REGISTER
                </button>
              </>
            )}
            
            {/* More Menu Dropdown (Desktop) */}
            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className="inline-flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-md"
                title="More Options"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {isAuthenticated ? (
                      <>
                        {getCurrentDropdownItems().map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.label}
                          </button>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleLoginClick}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </button>
                        <button
                          onClick={handleSignupClick}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#3d3f85]">
            <div className="flex flex-col space-y-3 pb-3">
              {isAuthenticated ? (
                <>
                  {/* Role-specific navigation for mobile */}
                  {getCurrentNavItems().map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className="text-white hover:text-gray-300 text-left bg-transparent border-0"
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {/* Role-specific dropdown items for mobile */}
                  {getCurrentDropdownItems().map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className="text-white hover:text-gray-300 text-left bg-transparent border-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <button onClick={() => handleNavigation('/')} className="text-white hover:text-gray-300 text-left bg-transparent border-0">
                    Home
                  </button>
                  <button onClick={() => handleNavigation('/about')} className="text-white hover:text-gray-300 text-left bg-transparent border-0">
                    About
                  </button>
                  <button onClick={() => handleNavigation('/categories')} className="text-white hover:text-gray-300 text-left bg-transparent border-0">
                    Categories
                  </button>
                  <button onClick={() => handleNavigation('/contact')} className="text-white hover:text-gray-300 text-left bg-transparent border-0">
                    Contact
                  </button>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="pt-3 border-t border-[#3d3f85]">
                <button
                  onClick={() => handleNavigation(actionPath)}
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#464996] bg-white hover:bg-gray-100"
                >
                  {actionLabel}
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-3 block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-[#3d3f85] grid grid-cols-2 gap-3">
                <button
                  onClick={handleLoginClick}
                  className="text-center px-4 py-2 border border-white border-opacity-50 text-sm font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10"
                >
                  LOGIN
                </button>
                <button
                  onClick={handleSignupClick}
                  className="text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#464996] bg-white hover:bg-gray-100"
                >
                  REGISTER
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalVisible}
        onCancel={() => setAuthModalVisible(false)}
        defaultTab={authDefaultTab}
        redirectPath={authRedirectPath}
      />
    </header>
  );
};

export default SharedHeader; 