import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import huggingFaceService from '../../services/huggingFaceService';

/**
 * Professional Virtual Try-On Component with Hugging Face API Integration
 * Uses AI-powered image generation for realistic virtual try-on
 */
const VirtualTryOnModel = ({ selectedGarment = 'tshirt', selectedSize = 'M', selectedColor = '#3b82f6' }) => {
  const [activeView, setActiveView] = useState('front');
  const [isLoading, setIsLoading] = useState(false);
  const [tryOnImage, setTryOnImage] = useState(null);
  const [error, setError] = useState(null);
  const userMeasurements = useSelector((state) => state.app.userMeasurements);
  
  // Get the color name from the hex value for better prompting
  const getColorName = (hex) => {
    const colorMap = {
      '#1e40af': 'Navy Blue',
      '#334155': 'Charcoal',
      '#166534': 'Forest Green',
      '#9f1239': 'Burgundy',
      '#7e22ce': 'Royal Purple',
      '#c2410c': 'Rust Orange',
      '#3b82f6': 'Royal Blue'
    };
    
    return colorMap[hex] || 'Blue';
  };
  
  // Size adjustment based on selected size
  const sizeFactors = {
    'XS': 0.9,
    'S': 0.95,
    'M': 1.0,
    'L': 1.05,
    'XL': 1.1,
    'XXL': 1.15
  };
  
  const sizeFactor = sizeFactors[selectedSize] || 1.0;
  
  // Garment styles based on type, size, and color
  const getGarmentStyle = () => {
    // Base style with selected color
    const baseStyle = {
      backgroundColor: selectedColor,
      opacity: 0.9,
      transition: 'all 0.3s ease',
      transform: `scale(${sizeFactor})`,
      transformOrigin: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid rgba(0,0,0,0.1)'
    };
    
    switch(selectedGarment) {
      case 'tshirt':
        return {
          top: { 
            ...baseStyle,
            position: 'absolute',
            top: '25%',
            left: '37%',
            width: '26%',
            height: '20%',
            borderRadius: '10px 10px 0 0',
            zIndex: 10
          },
          leftSleeve: {
            ...baseStyle,
            position: 'absolute',
            top: '25%',
            left: '28%',
            width: '12%',
            height: '10%',
            transform: `scale(${sizeFactor}) rotate(25deg)`,
            borderRadius: '10px 0 10px 10px',
            zIndex: 9
          },
          rightSleeve: {
            ...baseStyle,
            position: 'absolute',
            top: '25%',
            right: '28%',
            width: '12%',
            height: '10%',
            transform: `scale(${sizeFactor}) rotate(-25deg)`,
            borderRadius: '0 10px 10px 10px',
            zIndex: 9
          }
        };
      case 'jacket':
        return {
          top: { 
            ...baseStyle,
            position: 'absolute',
            top: '23%',
            left: '35%',
            width: '30%',
            height: '25%',
            borderRadius: '12px 12px 0 0',
            zIndex: 10
          },
          leftSleeve: {
            ...baseStyle,
            position: 'absolute',
            top: '23%',
            left: '25%',
            width: '14%',
            height: '18%',
            transform: `scale(${sizeFactor}) rotate(25deg)`,
            borderRadius: '12px 0 10px 10px',
            zIndex: 9
          },
          rightSleeve: {
            ...baseStyle,
            position: 'absolute',
            top: '23%',
            right: '25%',
            width: '14%',
            height: '18%',
            transform: `scale(${sizeFactor}) rotate(-25deg)`,
            borderRadius: '0 12px 10px 10px',
            zIndex: 9
          },
          collar: {
            ...baseStyle,
            position: 'absolute',
            top: '22%',
            left: '44%',
            width: '12%',
            height: '8%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '5px',
            zIndex: 11
          }
        };
      case 'pants':
        return {
          waist: { 
            ...baseStyle,
            position: 'absolute',
            top: '45%',
            left: '38%',
            width: '24%',
            height: '8%',
            borderRadius: '5px 5px 0 0',
            zIndex: 10
          },
          leftLeg: {
            ...baseStyle,
            position: 'absolute',
            top: '52%',
            left: '38%',
            width: '10%',
            height: '35%',
            borderRadius: '0 0 5px 5px',
            zIndex: 10
          },
          rightLeg: {
            ...baseStyle,
            position: 'absolute',
            top: '52%',
            right: '38%',
            width: '10%',
            height: '35%',
            borderRadius: '0 0 5px 5px',
            zIndex: 10
          }
        };
      case 'dress':
        return {
          top: { 
            ...baseStyle,
            position: 'absolute',
            top: '25%',
            left: '37%',
            width: '26%',
            height: '15%',
            borderRadius: '10px 10px 0 0',
            zIndex: 10
          },
          skirt: {
            ...baseStyle,
            position: 'absolute',
            top: '40%',
            left: '33%',
            width: '34%',
            height: '30%',
            borderRadius: '0 0 40% 40%',
            zIndex: 10
          },
          leftStrap: {
            ...baseStyle,
            position: 'absolute',
            top: '22%',
            left: '38%',
            width: '4%',
            height: '5%',
            transform: `scale(${sizeFactor}) rotate(25deg)`,
            borderRadius: '5px',
            zIndex: 9
          },
          rightStrap: {
            ...baseStyle,
            position: 'absolute',
            top: '22%',
            right: '38%',
            width: '4%',
            height: '5%',
            transform: `scale(${sizeFactor}) rotate(-25deg)`,
            borderRadius: '5px',
            zIndex: 9
          }
        };
      default:
        return {};
    }
  };
  
  // Get styles for current garment
  const garmentStyles = getGarmentStyle();
  
  // Generate try-on image with Hugging Face when garment, size, or color changes
  useEffect(() => {
    const generateTryOn = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const colorName = getColorName(selectedColor);
        const result = await huggingFaceService.generateTryOn(
          selectedGarment,
          colorName,
          selectedSize
        );
        
        setTryOnImage(result);
      } catch (err) {
        console.error('Error generating try-on image:', err);
        setError('Failed to generate try-on image. Using fallback display.');
      } finally {
        setIsLoading(false);
      }
    };
    
    generateTryOn();
  }, [selectedGarment, selectedSize, selectedColor]);
  
  return (
    <div className="relative w-full h-full">
      {/* If we have a try-on image from Hugging Face, show it; otherwise fall back to CSS display */}
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 font-medium">Generating try-on image...</p>
          <p className="text-gray-500 text-sm mt-2">This might take a few seconds</p>
        </div>
      ) : tryOnImage && !error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <img 
            src={tryOnImage} 
            alt={`Virtual try-on of ${selectedGarment}`}
            className="max-h-full max-w-full object-contain"
          />
          
          {/* Size indicator */}
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm text-sm">
            <div className="font-medium text-gray-900">Size: {selectedSize}</div>
            <div className="text-gray-700 flex items-center">
              <span>Color:</span> 
              <span className="ml-2 w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor }}></span>
            </div>
          </div>
          
          {/* Selected garment info */}
          <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm text-sm">
            <div className="font-medium text-gray-900">{selectedGarment.charAt(0).toUpperCase() + selectedGarment.slice(1)}</div>
            <div className="text-gray-700">Virtual Try-On</div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div 
            className="h-full w-full bg-center bg-contain bg-no-repeat"
            style={{ 
              backgroundImage: `url('/images/model_silhouette.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center'
            }}
          >
            {/* Fallback: CSS Garment Overlays */}
            {Object.entries(garmentStyles).map(([part, style]) => (
              <div key={part} style={style}></div>
            ))}
          </div>
          
          {/* Size indicator */}
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm text-sm">
            <div className="font-medium text-gray-900">Size: {selectedSize}</div>
            <div className="text-gray-700 flex items-center">
              <span>Color:</span> 
              <span className="ml-2 w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor }}></span>
            </div>
          </div>
          
          {/* Selected garment info */}
          <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm text-sm">
            <div className="font-medium text-gray-900">{selectedGarment.charAt(0).toUpperCase() + selectedGarment.slice(1)}</div>
            <div className="text-gray-700">Virtual Try-On</div>
          </div>
          
          {/* Error notice if applicable */}
          {error && (
            <div className="absolute bottom-16 left-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
              <p className="text-xs mt-1">Using CSS visualization as fallback.</p>
            </div>
          )}
        </div>
      )}
      
      {/* View controls - show for both CSS and AI modes */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        <button 
          onClick={() => setActiveView('front')}
          className={`px-3 py-1 rounded-lg ${
            activeView === 'front' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Front
        </button>
        <button 
          onClick={() => setActiveView('side')}
          className={`px-3 py-1 rounded-lg ${
            activeView === 'side' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Side
        </button>
        <button 
          onClick={() => setActiveView('back')}
          className={`px-3 py-1 rounded-lg ${
            activeView === 'back' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Back
        </button>
      </div>
      
      {/* Measurement visualization - show for both modes */}
      {userMeasurements && (
        <div className="absolute bottom-20 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm text-xs max-w-[150px] z-10">
          <div className="font-medium text-gray-900 mb-1">Your Measurements</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Height:</span>
              <span className="font-medium">{userMeasurements.height} cm</span>
            </div>
            <div className="flex justify-between">
              <span>Chest:</span>
              <span className="font-medium">{userMeasurements.chest} cm</span>
            </div>
            <div className="flex justify-between">
              <span>Waist:</span>
              <span className="font-medium">{userMeasurements.waist} cm</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Information panel - stays the same */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white/90 to-transparent py-4 px-6 z-10">
        <div className="max-w-lg mx-auto">
          <div className="text-sm text-gray-600">
            <strong className="font-medium text-gray-900">AI-Powered Virtual Try-On</strong>
            <p className="mt-1">Using Hugging Face's ML models to generate realistic try-on visualizations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnModel; 