import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('isAuthenticated');
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('auth-change'));
      navigate('/login', { replace: true });
    }
  };
  
  const toggleMoreMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMoreMenuOpen(!moreMenuOpen);
  };

  // Close dropdown when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      setMoreMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [moreMenuOpen]);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-white shadow-md py-2' 
      : 'bg-[#464996] py-4'
  }`;

  const logoClasses = `font-bold text-xl md:text-2xl transition-all duration-300 ${
    scrolled ? 'text-primary' : 'text-white'
  }`;

  const navItemClasses = `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
    scrolled 
      ? 'text-gray-800 hover:text-primary' 
      : 'text-white hover:text-white/80'
  }`;

  // Main navigation items
  const mainNavItems = [
    { path: '/', label: 'Home' },
    { path: '/try-on', label: 'Try On' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
  ];

  // Items for the "More" dropdown
  const moreMenuItems = [
    { path: '/affiliate/signup', label: 'Affiliate Program' },
    { path: '/affiliate/dashboard', label: 'Affiliate Dashboard' },
    { path: '/merchants', label: 'Merchant Portal' },
    { path: '/admin', label: 'Admin' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={headerClasses} style={{ zIndex: 1000 }}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 relative overflow-hidden rounded-full bg-white p-1">
            <img 
              src="https://i.ibb.co/KjrQ65br/logo.png" 
              alt="Kokomatto" 
              className="object-contain h-full w-full"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/32?text=K";
              }}
            />
          </div>
          <span className={logoClasses}>Kokomatto</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3">
          {mainNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`${navItemClasses} ${isActive ? 'font-semibold' : ''}`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            );
          })}
          
          <div className="flex items-center space-x-3">
            <Link
              to="/try-on"
              className={`
                ${scrolled 
                  ? 'bg-primary hover:bg-primary-dark text-white' 
                  : 'bg-white hover:bg-gray-100 text-[#464996]'
                } py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
              `}
            >
              TRY ON
            </Link>
            
            {/* More Menu Dropdown */}
            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className={`inline-flex items-center px-3 py-2 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                } rounded-md`}
                title="More Options"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {moreMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ))}
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
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={scrolled ? "currentColor" : "white"}
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t z-50"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`py-3 px-4 ${
                    location.pathname === item.path
                      ? 'text-primary font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {moreMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`py-3 px-4 ${
                    location.pathname === item.path
                      ? 'text-primary font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                to="/try-on"
                className="mx-4 mt-3 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
              >
                TRY ON
              </Link>
              
              <button 
                onClick={handleLogout}
                className="mx-4 mt-2 mb-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-4 h-4 mr-1.5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" 
                  />
                </svg>
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 