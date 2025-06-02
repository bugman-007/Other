import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedFooter from '../shared/SharedFooter';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || ''
  );
  
  // Listen for auth change events
  useEffect(() => {
    const handleAuthChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const role = localStorage.getItem('userRole') || '';
      setIsAuthenticated(authStatus);
      setUserRole(role);
      
      if (!authStatus) {
        navigate('/', { replace: true });
      } else if (role !== 'admin') {
        // Redirect non-admin users to their appropriate pages
        if (role === 'merchant') {
          navigate('/merchants', { replace: true });
        } else if (role === 'user') {
          navigate('/home', { replace: true });
        }
      }
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole('');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/', { replace: true });
  };
  
  // If not authenticated or not admin, don't render admin content
  if (!isAuthenticated || userRole !== 'admin') {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#464996] fixed w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <img
                  className="h-8 w-8 cursor-pointer" 
                  src="/kokomatto-logo.png"
                  alt="KOKOMATTO"
                  onClick={() => navigate('/')}
                  onError={(e) => {
                    // Fallback in case the logo doesn't load
                    e.target.src = "https://i.ibb.co/KjrQ65br/logo.png";
                    // If both fail, show text as last resort
                    e.target.onerror = () => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.alt = "KOKOMATTO";
                      e.target.className = "font-bold text-[#464996] text-lg";
                      e.target.parentElement.classList.add("justify-center");
                    };
                  }}
                />
              </div>
              <span className="text-xl font-bold text-white ml-3">Admin Portal</span>
            </div>
            
            {/* Admin actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <SharedFooter />
    </div>
  );
};

export default AdminLayout; 