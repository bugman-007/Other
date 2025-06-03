import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">3D Try-On Technology Dashboard</h1>
          <p className="text-sm text-gray-500">
            First Milestone Progress • {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faUser} size="sm" />
            </div>
            <span className="font-medium">Admin</span>
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;