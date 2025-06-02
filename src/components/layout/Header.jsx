import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import RegionSelector from '../common/RegionSelector';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const categoriesRef = useRef(null);

  const categories = [
    { 
      name: "Men's Clothing", 
      path: "/categories/mens", 
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Women's Clothing", 
      path: "/categories/womens", 
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Shoes", 
      path: "/categories/shoes", 
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Accessories", 
      path: "/categories/accessories", 
      image: "https://images.unsplash.com/photo-1631534580489-64753225b9da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Athletic Wear", 
      path: "/categories/athletic", 
      image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Formal Wear", 
      path: "/categories/formal", 
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Outerwear", 
      path: "/categories/outerwear", 
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    },
    { 
      name: "Swimwear", 
      path: "/categories/swimwear", 
      image: "https://images.unsplash.com/photo-1570976846683-80db92bebabd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
    }
  ];

  // Mobile categories - limited to 4
  const mobileCategories = categories.slice(0, 4);

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
    setCategoriesMenuOpen(false);
  }, [location]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const headerClasses = classNames(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    {
      'bg-white shadow-md py-2': scrolled,
      'bg-gradient-to-r from-indigo-900/90 to-indigo-800/90 backdrop-blur-sm py-3': !scrolled,
    }
  );

  const logoClasses = classNames(
    'font-bold text-xl md:text-2xl transition-all duration-300',
    {
      'text-primary': scrolled,
      'text-white': !scrolled,
    }
  );

  const navItemClasses = (isActive) =>
    classNames(
      'relative px-3 py-2 text-sm font-medium transition-all duration-200',
      {
        'text-gray-800 hover:text-primary': scrolled,
        'text-white hover:text-white/80': !scrolled,
        'font-semibold': isActive,
      }
    );

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/try-on', label: 'Try-On' },
    { path: '/categories', label: 'Categories', isDropdown: true },
    { path: '/about', label: 'About' },
    { path: '/merchants', label: 'Merchant Portal' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/contact', label: 'Contact' },
    { path: '/assistance', label: 'Assistance' },
  ];

  const activeIndicator = (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
      layoutId="activeIndicator"
    />
  );

  const toggleCategoriesMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCategoriesMenuOpen(!categoriesMenuOpen);
  };

  // Close dropdown when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            />
          </div>
          <span className={logoClasses}>Kokomatto</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item, index) => {
            if (item.isDropdown) {
              const isActive = location.pathname.startsWith('/categories');
              return (
                <div key={index} className="relative" ref={categoriesRef}>
                  <button
                    onClick={toggleCategoriesMenu}
                    className={`${navItemClasses(isActive)} flex items-center`}
                  >
                    {item.label}
                    <svg 
                      className={`ml-1 w-4 h-4 transition-transform ${categoriesMenuOpen ? 'transform rotate-180' : ''}`}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {isActive && activeIndicator}
                  </button>
                  
                  {/* Categories Dropdown for Desktop/Tablet */}
                  {categoriesMenuOpen && (
                    <div className="absolute left-0 mt-2 w-[540px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {categories.map((category, catIndex) => (
                          <Link
                            key={catIndex}
                            to={category.path}
                            className="flex items-center p-2 rounded hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="ml-3 text-gray-700">{category.name}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="bg-gray-50 px-4 py-2 rounded-b-md">
                        <Link 
                          to="/categories"
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center"
                        >
                          View All Categories
                          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={navItemClasses(isActive)}
              >
                {item.label}
                {isActive && activeIndicator}
              </Link>
            );
          })}
          <div className="flex items-center space-x-3 ml-2">
            <RegionSelector />
            <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Cart (0)
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
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
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
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
            style={{ position: 'absolute', width: '100%' }}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col">
              {navItems.map((item, index) => {
                if (item.isDropdown) {
                  return (
                    <div key={index} className="py-1">
                      <button
                        onClick={toggleCategoriesMenu}
                        className="flex items-center justify-between w-full py-3 px-4 text-left text-gray-700"
                      >
                        {item.label}
                        <svg 
                          className={`w-4 h-4 transition-transform ${categoriesMenuOpen ? 'transform rotate-180' : ''}`}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                      {categoriesMenuOpen && (
                        <div className="pl-4 pr-4 pb-2">
                          {/* Mobile Categories - Only 4 */}
                          {mobileCategories.map((category, catIndex) => (
                            <Link
                              key={catIndex}
                              to={category.path}
                              className="flex items-center py-2 border-b border-gray-100"
                            >
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img 
                                  src={category.image} 
                                  alt={category.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="ml-3 text-sm text-gray-600">{category.name}</span>
                            </Link>
                          ))}
                          <Link
                            to="/categories"
                            className="flex items-center justify-center mt-2 p-2 bg-gray-50 rounded text-indigo-600 text-sm font-medium"
                          >
                            View All Categories
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
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
                );
              })}
              <button className="mx-4 mt-3 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center">
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
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Cart (0)
              </button>
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