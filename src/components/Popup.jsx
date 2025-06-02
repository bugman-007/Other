import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';

const Popup = ({ 
  popup, 
  onClose,
  onSecondaryAction
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    title,
    content,
    buttonText = 'OK',
    buttonColor = 'blue',
    secondaryButtonText,
    secondaryButtonColor = 'gray',
    showSecondaryButton,
    position = 'center',
    imageUrl,
    delay = 0,
  } = popup || {};

  useEffect(() => {
    if (!popup) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, (delay || 0) * 1000);

    return () => clearTimeout(timer);
  }, [popup, delay]);

  const handleClose = () => {
    setIsVisible(false);
    // Add a small delay to allow the closing animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handlePrimaryAction = () => {
    handleClose();
    // You can add additional logic here for primary button
  };

  const handleSecondaryAction = () => {
    handleClose();
    // You can add additional logic here for secondary button
  };

  if (!popup || !isVisible) return null;

  // Get position classes based on the popup position
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center':
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
  };
  
  // Get button color classes
  const getButtonColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'green':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'red':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'yellow':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'purple':
        return 'bg-purple-500 hover:bg-purple-600 text-white';
      case 'gray':
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  const primaryButtonClasses = getButtonColorClasses(buttonColor);
  const secondaryButtonClasses = getButtonColorClasses(secondaryButtonColor);
  const positionClasses = getPositionClasses();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div className={`fixed ${positionClasses} max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden z-50`}>
        <div className="p-6">
          {title && (
            <h3 className="text-xl font-bold mb-3">{title}</h3>
          )}
          
          {imageUrl && (
            <div className="mb-4">
              <img 
                src={imageUrl} 
                alt={title || 'Popup image'} 
                className="w-full rounded"
              />
            </div>
          )}
          
          {content && (
            <div className="mb-4 text-gray-700">
              <p>{content}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4 justify-end">
            {showSecondaryButton && secondaryButtonText && (
              <button
                onClick={() => {
                  if (onSecondaryAction) onSecondaryAction(popup);
                  handleSecondaryAction();
                }}
                className={`px-4 py-2 rounded ${secondaryButtonClasses}`}
              >
                {secondaryButtonText}
              </button>
            )}
            
            <button
              onClick={handlePrimaryAction}
              className={`px-4 py-2 rounded ${primaryButtonClasses}`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup; 