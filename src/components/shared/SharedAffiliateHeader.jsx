import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SharedAffiliateHeader = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || ''
  );
  
  // Dropdown items for profile menu
  const profileDropdownItems = [
    { path: '/affiliate/profile', label: 'My Profile' },
    { path: '/affiliate/settings', label: 'Settings' },
    { path: '/affiliate/support', label: 'Support' },
    { path: '/home', label: 'Visit Store' },
  ];

  // Additional check for merchant users
  const isMerchant = userRole === 'merchant';

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

  const toggleProfileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileMenuOpen(!profileMenuOpen);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    // Close menus
    setIsMenuOpen(false);
    setProfileMenuOpen(false);
    
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
      setProfileMenuOpen(false);
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

  // Return to merchant dashboard if user is a merchant
  const handleReturnToMerchantPortal = () => {
    navigate('/merchants');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleNavigation(getHomePage());
  };

  return (
    <header className="bg-purple-800 fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center bg-transparent border-0"
              title="Go to Home"
            >
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-2 hover:opacity-90 transition-opacity shadow-sm">
                <img 
                  className="h-6 w-6" 
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
                      e.target.className = "font-bold text-purple-800 text-xs";
                      e.target.parentElement.classList.add("justify-center");
                    };
                  }}
                />
              </div>
              <span className="text-lg font-semibold text-white">Affiliate Portal</span>
            </button>
          </div>
          
          {/* Right-aligned navigation and actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Merchant return button if applicable */}
            {isMerchant && (
              <button
                onClick={handleReturnToMerchantPortal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                MERCHANT PORTAL
              </button>
            )}
            
            {/* Profile Menu Dropdown (Desktop) */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="inline-flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/10 rounded-full"
                  title="Profile Options"
                >
                  <div className="h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-800 font-semibold text-sm">SA</span>
                  </div>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {profileDropdownItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavigation(item.path)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {!isAuthenticated && (
              <button
                onClick={() => handleNavigation('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-800 bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                Login
              </button>
            )}
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
          <div className="md:hidden py-4 border-t border-purple-700">
            <div className="flex flex-col space-y-3 pb-3">
              {isAuthenticated ? (
                <>
                  {/* Dashboard link */}
                  <button 
                    onClick={() => handleNavigation('/affiliate')}
                    className="text-white hover:text-gray-300 text-left bg-transparent border-0 font-medium"
                  >
                    Dashboard
                  </button>
                  
                  {/* Profile dropdown items for mobile */}
                  {profileDropdownItems.map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className="text-white hover:text-gray-300 text-left bg-transparent border-0"
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {/* Merchant return button on mobile if applicable */}
                  {isMerchant && (
                    <button 
                      onClick={handleReturnToMerchantPortal}
                      className="text-white hover:text-gray-300 text-left font-semibold bg-transparent border-0"
                    >
                      Return to Merchant Portal
                    </button>
                  )}
                  
                  {/* Logout button for mobile */}
                  <button 
                    onClick={handleLogout}
                    className="text-red-300 hover:text-red-200 text-left bg-transparent border-0"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleNavigation('/')} className="text-white hover:text-gray-300 text-left bg-transparent border-0">
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SharedAffiliateHeader; 