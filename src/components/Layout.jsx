import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SharedHeader from './shared/SharedHeader';
import SharedFooter from './shared/SharedFooter';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  // Listen for auth change events
  useEffect(() => {
    const handleAuthChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      
      if (!authStatus) {
        navigate('/', { replace: true });
      }
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login', { replace: true });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SharedHeader onLogout={handleLogout} />
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <SharedFooter />
    </div>
  );
};

export default Layout; 