import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Popup from './Popup';

const PopupManager = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [popups, setPopups] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;

  // Mock function to fetch popups - replace with actual API call
  const fetchPopups = async () => {
    // This would typically be an API call to get popups from backend
    // For now using mock data
    return [
      {
        id: 1,
        title: 'Welcome to Our Virtual Try-On',
        content: 'Position your device so your entire body is visible in the frame for best results.',
        buttonText: 'Got it',
        buttonColor: 'blue',
        position: 'center',
        pages: ['/try-on'],
        delay: 1,
        isActive: true
      },
      {
        id: 2,
        title: 'New Feature Available!',
        content: 'You can now save your measurements for faster try-on experiences.',
        buttonText: 'Try Now',
        buttonColor: 'green',
        secondaryButtonText: 'Later',
        secondaryButtonColor: 'gray',
        showSecondaryButton: true,
        position: 'bottom-right',
        pages: ['/'],
        delay: 2,
        isActive: true
      }
    ];
  };

  useEffect(() => {
    // Fetch popups when component mounts
    const getPopups = async () => {
      try {
        const fetchedPopups = await fetchPopups();
        setPopups(fetchedPopups);
      } catch (error) {
        console.error('Error fetching popups:', error);
      }
    };

    getPopups();
  }, []);

  useEffect(() => {
    // Check if there's a popup to show on the current page
    const popupForCurrentPage = popups.find(popup => {
      return popup.isActive && popup.pages.some(page => {
        // Handle exact match
        if (page === currentPath) return true;
        
        // Handle wildcard paths (e.g., "/products/*")
        if (page.endsWith('/*')) {
          const basePath = page.slice(0, -2);
          return currentPath.startsWith(basePath);
        }
        
        return false;
      });
    });

    // If we found a popup for this page, show it
    if (popupForCurrentPage && !activePopup) {
      setActivePopup(popupForCurrentPage);
    } else if (!popupForCurrentPage && activePopup) {
      // Clear active popup when navigating away from a page
      setActivePopup(null);
    }
  }, [currentPath, popups, activePopup]);

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  // Only render if there's an active popup
  if (!activePopup) return null;

  return <Popup popup={activePopup} onClose={handleClosePopup} />;
};

export default PopupManager; 