import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaCog, FaHeadset, FaChartLine } from 'react-icons/fa';

const AffiliatePortalHeader = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(auth);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const getHomePage = () => {
    const userRole = localStorage.getItem('userRole') || '';
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

  const handleLogoClick = () => {
    navigate(getHomePage());
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button onClick={handleLogoClick} className="flex items-center">
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
                <span className="text-white font-bold text-xl">Affiliate Portal</span>
              </button>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {isAuthenticated ? (
              <>
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={toggleProfileMenu}
                    >
                      <span className="sr-only">Open user menu</span>
                      <FaUserCircle className="h-8 w-8 text-white hover:text-gray-200" />
                    </button>
                  </div>
                  
                  {isProfileMenuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        to="/affiliate/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <FaUserCircle className="mr-2" />
                          Your Profile
                        </div>
                      </Link>
                      <Link
                        to="/affiliate/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <FaCog className="mr-2" />
                          Settings
                        </div>
                      </Link>
                      <Link
                        to="/affiliate/support"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <FaHeadset className="mr-2" />
                          Support
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex items-center text-red-600">
                          <FaSignOutAlt className="mr-2" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-indigo-700" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/affiliate"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                >
                  Home
                </Link>
                <Link
                  to="/affiliate/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                >
                  Your Profile
                </Link>
                <Link
                  to="/affiliate/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                >
                  Settings
                </Link>
                <Link
                  to="/affiliate/support"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                >
                  Support
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default AffiliatePortalHeader; 