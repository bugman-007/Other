import React from 'react';
import { Link } from 'react-router-dom';
import SharedFooter from './shared/SharedFooter';

// Simple header component for public pages
const PublicHeader = () => {
  return (
    <header className="bg-[#464996] fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-3">
              <img 
                className="h-8 w-8" 
                src="https://i.ibb.co/KjrQ65br/logo.png" 
                alt="Kokomatto" 
                onError={(e) => {
                  // Fallback in case the image doesn't load
                  e.target.src = "https://via.placeholder.com/32?text=K";
                }}
              />
            </div>
            <span className="text-xl font-bold text-white">Virtual Try-On</span>
          </Link>
          
          {/* Right-aligned navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#464996] bg-white hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <SharedFooter />
    </div>
  );
};

export default PublicLayout; 