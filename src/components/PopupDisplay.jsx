import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const PopupDisplay = () => {
  const [popups, setPopups] = useState([]);
  const [visiblePopups, setVisiblePopups] = useState({});
  const [currentPath, setCurrentPath] = useState('');

  // Load popups from localStorage on mount
  useEffect(() => {
    const storedPopups = localStorage.getItem('popups');
    if (storedPopups) {
      try {
        const parsedPopups = JSON.parse(storedPopups);
        setPopups(parsedPopups.filter(popup => popup.isActive));
      } catch (error) {
        console.error('Error parsing popups:', error);
      }
    }
  }, []);

  // Set current path and check which popups should be displayed
  useEffect(() => {
    const path = window.location.hash.replace('#/', '').split('/')[0] || 'home';
    setCurrentPath(path);
    
    // Determine which popups should be visible based on path and settings
    const newVisiblePopups = {};
    
    popups.forEach(popup => {
      // Skip if this popup has been dismissed and is set to show only once
      const popupDismissed = localStorage.getItem(`popup_dismissed_${popup.id}`);
      if (popup.showOnce && popupDismissed) return;
      
      // Check if popup should be shown on current page
      const shouldShowOnPage = popup.pages.length === 0 || popup.pages.includes(path);
      if (!shouldShowOnPage) return;
      
      // Set timeout for displaying the popup after delay
      if (popup.delay > 0) {
        setTimeout(() => {
          setVisiblePopups(prevState => ({
            ...prevState,
            [popup.id]: true
          }));
        }, popup.delay * 1000);
      } else {
        newVisiblePopups[popup.id] = true;
      }
      
      // Set auto-hide timeout if enabled
      if (popup.autoHide && popup.autoHideDelay > 0) {
        setTimeout(() => {
          setVisiblePopups(prevState => ({
            ...prevState,
            [popup.id]: false
          }));
        }, (popup.delay + popup.autoHideDelay) * 1000);
      }
    });
    
    setVisiblePopups(newVisiblePopups);
  }, [popups]);

  const handleClosePopup = (popupId) => {
    // Mark popup as dismissed if it should only be shown once
    const popup = popups.find(p => p.id === popupId);
    if (popup && popup.showOnce) {
      localStorage.setItem(`popup_dismissed_${popupId}`, 'true');
    }
    
    setVisiblePopups(prevState => ({
      ...prevState,
      [popupId]: false
    }));
  };

  const handleButtonClick = (popup) => {
    // Handle button click - navigate or close
    if (popup.buttonUrl) {
      if (popup.buttonUrl.startsWith('http')) {
        window.open(popup.buttonUrl, '_blank');
      } else {
        window.location.href = `#/${popup.buttonUrl}`;
      }
    }
    handleClosePopup(popup.id);
  };

  const getPositionClasses = (position) => {
    switch (position) {
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'top':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <>
      {popups.map(popup => (
        visiblePopups[popup.id] && (
          <div 
            key={popup.id}
            className={`fixed z-50 max-w-md shadow-lg rounded-lg ${getPositionClasses(popup.position)}`}
            style={{
              backgroundColor: popup.backgroundColor,
              color: popup.textColor,
              maxWidth: '90vw'
            }}
          >
            <div className="relative p-5">
              <button 
                onClick={() => handleClosePopup(popup.id)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10"
                aria-label="Close"
              >
                <FiX size={20} style={{ color: popup.textColor }} />
              </button>
              
              {popup.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img 
                    src={popup.imageUrl} 
                    alt="" 
                    className="max-h-60 rounded-md"
                  />
                </div>
              )}
              
              {popup.title && (
                <h3 className="text-xl font-bold mb-2">
                  {popup.title}
                </h3>
              )}
              
              {popup.content && (
                <div className="mb-4 whitespace-pre-wrap">
                  {popup.content}
                </div>
              )}
              
              {popup.buttonText && (
                <button
                  onClick={() => handleButtonClick(popup)}
                  className="px-4 py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {popup.buttonText}
                </button>
              )}
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default PopupDisplay; 