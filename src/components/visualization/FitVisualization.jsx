import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Heat map colors for fit visualization
const fitColorScale = {
  tight: '#FF4500', // Orange-red for tight areas
  snug: '#FFA500',  // Orange for snug fit
  perfect: '#32CD32', // Green for perfect fit
  relaxed: '#00BFFF', // Light blue for relaxed fit
  loose: '#0000FF'  // Blue for loose fit
};

const FitVisualization = ({ selectedGarment, selectedSize }) => {
  const [activeTab, setActiveTab] = useState('heatmap');
  const userMeasurements = useSelector((state) => state.app.userMeasurements);
  
  // Sample fit data by body region - in a real app, this would be calculated
  // based on garment dimensions and user measurements
  const sampleFitData = {
    tshirt: {
      XS: { chest: 'tight', shoulders: 'tight', waist: 'snug', length: 'perfect' },
      S: { chest: 'snug', shoulders: 'perfect', waist: 'perfect', length: 'perfect' },
      M: { chest: 'perfect', shoulders: 'perfect', waist: 'relaxed', length: 'perfect' },
      L: { chest: 'relaxed', shoulders: 'relaxed', waist: 'loose', length: 'relaxed' },
      XL: { chest: 'loose', shoulders: 'loose', waist: 'loose', length: 'loose' },
    },
    jacket: {
      XS: { chest: 'tight', shoulders: 'tight', waist: 'tight', sleeves: 'tight' },
      S: { chest: 'snug', shoulders: 'snug', waist: 'perfect', sleeves: 'perfect' },
      M: { chest: 'perfect', shoulders: 'perfect', waist: 'relaxed', sleeves: 'perfect' },
      L: { chest: 'relaxed', shoulders: 'relaxed', waist: 'loose', sleeves: 'relaxed' },
      XL: { chest: 'loose', shoulders: 'loose', waist: 'loose', sleeves: 'loose' },
    },
    dress: {
      XS: { chest: 'tight', waist: 'tight', hips: 'tight', length: 'perfect' },
      S: { chest: 'snug', waist: 'perfect', hips: 'snug', length: 'perfect' },
      M: { chest: 'perfect', waist: 'relaxed', hips: 'perfect', length: 'perfect' },
      L: { chest: 'relaxed', waist: 'loose', hips: 'relaxed', length: 'relaxed' },
      XL: { chest: 'loose', waist: 'loose', hips: 'loose', length: 'loose' },
    },
    pants: {
      XS: { waist: 'tight', hips: 'tight', inseam: 'perfect', thighs: 'tight' },
      S: { waist: 'snug', hips: 'snug', inseam: 'perfect', thighs: 'perfect' },
      M: { waist: 'perfect', hips: 'perfect', inseam: 'perfect', thighs: 'perfect' },
      L: { waist: 'relaxed', hips: 'relaxed', inseam: 'perfect', thighs: 'relaxed' },
      XL: { waist: 'loose', hips: 'loose', inseam: 'perfect', thighs: 'loose' },
    }
  };
  
  // Generate fit recommendation based on user measurements
  const getFitRecommendation = () => {
    if (!userMeasurements) return 'M'; // Default recommendation
    
    // In a real application, this would be a complex algorithm
    // Here's a simplified example for a t-shirt
    if (selectedGarment === 'tshirt' || selectedGarment === 'jacket') {
      const chestMeasurement = userMeasurements.chest;
      if (chestMeasurement < 90) return 'XS';
      if (chestMeasurement < 100) return 'S';
      if (chestMeasurement < 110) return 'M';
      if (chestMeasurement < 120) return 'L';
      return 'XL';
    } else if (selectedGarment === 'pants') {
      const waistMeasurement = userMeasurements.waist;
      if (waistMeasurement < 75) return 'XS';
      if (waistMeasurement < 85) return 'S';
      if (waistMeasurement < 95) return 'M';
      if (waistMeasurement < 105) return 'L';
      return 'XL';
    } else if (selectedGarment === 'dress') {
      // For dresses, consider both chest and hips
      const chestMeasurement = userMeasurements.chest;
      const hipsMeasurement = userMeasurements.hips;
      
      const chestSize = 
        chestMeasurement < 90 ? 'XS' :
        chestMeasurement < 100 ? 'S' :
        chestMeasurement < 110 ? 'M' :
        chestMeasurement < 120 ? 'L' : 'XL';
        
      const hipsSize = 
        hipsMeasurement < 90 ? 'XS' :
        hipsMeasurement < 100 ? 'S' :
        hipsMeasurement < 110 ? 'M' :
        hipsMeasurement < 120 ? 'L' : 'XL';
      
      // Take the larger of the two sizes to ensure comfort
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
      const chestIndex = sizeOrder.indexOf(chestSize);
      const hipsIndex = sizeOrder.indexOf(hipsSize);
      
      return sizeOrder[Math.max(chestIndex, hipsIndex)];
    }
    
    return 'M'; // Default fallback
  };
  
  const recommendedSize = getFitRecommendation();
  const garmentFitData = sampleFitData[selectedGarment] || sampleFitData.tshirt;
  const currentFitData = garmentFitData[selectedSize] || garmentFitData.M;
  
  // Define body regions based on garment type
  const bodyRegions = {
    tshirt: ['chest', 'shoulders', 'waist', 'length'],
    jacket: ['chest', 'shoulders', 'waist', 'sleeves'],
    dress: ['chest', 'waist', 'hips', 'length'],
    pants: ['waist', 'hips', 'inseam', 'thighs']
  };
  
  const regions = bodyRegions[selectedGarment] || bodyRegions.tshirt;

  // Render the fit map with body silhouette
  const renderHeatMap = () => {
    // Different silhouettes for different garment types
    const silhouettes = {
      tshirt: (
        <svg className="w-full max-w-xs mx-auto" viewBox="0 0 240 300">
          {/* Head (simplified) */}
          <circle cx="120" cy="40" r="20" fill="#e0e0e0" />
          
          {/* Neck */}
          <rect x="110" y="60" width="20" height="10" fill="#e0e0e0" />
          
          {/* Shoulders */}
          <rect 
            x="70" 
            y="70" 
            width="100" 
            height="20" 
            fill={fitColorScale[currentFitData.shoulders]} 
            opacity="0.8" 
            rx="5"
            className="transition-all duration-300"
            data-region="shoulders"
          />
          
          {/* Chest */}
          <rect 
            x="80" 
            y="90" 
            width="80" 
            height="40" 
            fill={fitColorScale[currentFitData.chest]} 
            opacity="0.8" 
            className="transition-all duration-300"
            data-region="chest"
          />
          
          {/* Torso */}
          <rect 
            x="85" 
            y="130" 
            width="70" 
            height="50" 
            fill={fitColorScale[currentFitData.waist]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="waist"
          />
          
          {/* T-shirt sleeve (left) */}
          <path 
            d="M70,70 L50,100 L65,110 L80,90 Z" 
            fill={fitColorScale[currentFitData.shoulders]} 
            opacity="0.8"
            className="transition-all duration-300"
          />
          
          {/* T-shirt sleeve (right) */}
          <path 
            d="M170,70 L190,100 L175,110 L160,90 Z" 
            fill={fitColorScale[currentFitData.shoulders]} 
            opacity="0.8"
            className="transition-all duration-300"
          />
          
          {/* T-shirt length indicator */}
          <rect 
            x="85" 
            y="180" 
            width="70" 
            height="5" 
            fill={fitColorScale[currentFitData.length]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="length"
          />
          
          {/* Lower body (for reference) */}
          <path d="M85,185 L85,250 Q85,270 100,270 Q115,270 115,250 L115,185 Z" fill="#e0e0e0" opacity="0.3" />
          <path d="M155,185 L155,250 Q155,270 140,270 Q125,270 125,250 L125,185 Z" fill="#e0e0e0" opacity="0.3" />
        </svg>
      ),
      
      jacket: (
        <svg className="w-full max-w-xs mx-auto" viewBox="0 0 240 300">
          {/* Head (simplified) */}
          <circle cx="120" cy="40" r="20" fill="#e0e0e0" />
          
          {/* Neck */}
          <rect x="110" y="60" width="20" height="10" fill="#e0e0e0" />
          
          {/* Shoulders */}
          <rect 
            x="70" 
            y="70" 
            width="100" 
            height="20" 
            fill={fitColorScale[currentFitData.shoulders]} 
            opacity="0.8" 
            rx="5"
            className="transition-all duration-300"
            data-region="shoulders"
          />
          
          {/* Chest */}
          <rect 
            x="80" 
            y="90" 
            width="80" 
            height="40" 
            fill={fitColorScale[currentFitData.chest]} 
            opacity="0.8" 
            className="transition-all duration-300"
            data-region="chest"
          />
          
          {/* Torso */}
          <rect 
            x="85" 
            y="130" 
            width="70" 
            height="70" 
            fill={fitColorScale[currentFitData.waist]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="waist"
          />
          
          {/* Jacket sleeve (left) */}
          <path 
            d="M70,70 L30,110 L40,140 L65,110 Z" 
            fill={fitColorScale[currentFitData.sleeves]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="sleeves"
          />
          
          {/* Jacket sleeve (right) */}
          <path 
            d="M170,70 L210,110 L200,140 L175,110 Z" 
            fill={fitColorScale[currentFitData.sleeves]} 
            opacity="0.8"
            className="transition-all duration-300"
          />
          
          {/* Lower body (for reference) */}
          <path d="M85,200 L85,250 Q85,270 100,270 Q115,270 115,250 L115,200 Z" fill="#e0e0e0" opacity="0.3" />
          <path d="M155,200 L155,250 Q155,270 140,270 Q125,270 125,250 L125,200 Z" fill="#e0e0e0" opacity="0.3" />
        </svg>
      ),
      
      pants: (
        <svg className="w-full max-w-xs mx-auto" viewBox="0 0 240 400">
          {/* Upper body (for reference) */}
          <rect x="90" y="20" width="60" height="80" fill="#e0e0e0" opacity="0.3" rx="5" />
          
          {/* Waist */}
          <rect 
            x="85" 
            y="100" 
            width="70" 
            height="20" 
            fill={fitColorScale[currentFitData.waist]} 
            opacity="0.8"
            rx="5"
            className="transition-all duration-300"
            data-region="waist"
          />
          
          {/* Hips */}
          <rect 
            x="75" 
            y="120" 
            width="90" 
            height="30" 
            fill={fitColorScale[currentFitData.hips]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="hips"
          />
          
          {/* Thighs */}
          <rect 
            x="80" 
            y="150" 
            width="30" 
            height="50" 
            fill={fitColorScale[currentFitData.thighs]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="thighs"
          />
          <rect 
            x="130" 
            y="150" 
            width="30" 
            height="50" 
            fill={fitColorScale[currentFitData.thighs]} 
            opacity="0.8"
            className="transition-all duration-300"
          />
          
          {/* Legs */}
          <rect 
            x="80" 
            y="200" 
            width="30" 
            height={currentFitData.inseam === 'perfect' ? "160" : "150"} 
            fill={fitColorScale[currentFitData.inseam]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="inseam"
          />
          <rect 
            x="130" 
            y="200" 
            width="30" 
            height={currentFitData.inseam === 'perfect' ? "160" : "150"} 
            fill={fitColorScale[currentFitData.inseam]} 
            opacity="0.8"
            className="transition-all duration-300"
          />
        </svg>
      ),
      
      dress: (
        <svg className="w-full max-w-xs mx-auto" viewBox="0 0 240 400">
          {/* Head (simplified) */}
          <circle cx="120" cy="40" r="20" fill="#e0e0e0" />
          
          {/* Neck */}
          <rect x="110" y="60" width="20" height="10" fill="#e0e0e0" />
          
          {/* Shoulders */}
          <rect x="70" y="70" width="100" height="20" fill="#e0e0e0" rx="5" opacity="0.3" />
          
          {/* Chest */}
          <rect 
            x="80" 
            y="90" 
            width="80" 
            height="40" 
            fill={fitColorScale[currentFitData.chest]} 
            opacity="0.8" 
            className="transition-all duration-300"
            data-region="chest"
          />
          
          {/* Waist */}
          <rect 
            x="85" 
            y="130" 
            width="70" 
            height="30" 
            fill={fitColorScale[currentFitData.waist]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="waist"
          />
          
          {/* Hips/Skirt top */}
          <rect 
            x="75" 
            y="160" 
            width="90" 
            height="40" 
            fill={fitColorScale[currentFitData.hips]} 
            opacity="0.8"
            className="transition-all duration-300"
            data-region="hips"
          />
          
          {/* Skirt length */}
          <path 
            d="M75,200 L75,320 Q120,330 165,320 L165,200 Z" 
            fill={fitColorScale[currentFitData.length]} 
            opacity="0.7"
            className="transition-all duration-300"
            data-region="length"
          />
        </svg>
      )
    };
    
    return silhouettes[selectedGarment] || silhouettes.tshirt;
  };

  // Render a table with detailed fit information
  const renderDetailsTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Body Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Fit Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Your Measurement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Garment Measurement
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {regions.map(region => {
              const fit = currentFitData[region];
              
              // In a real app, these would be calculated based on actual measurements
              const userMeasure = userMeasurements ? 
                (region === 'chest' ? userMeasurements.chest : 
                region === 'waist' ? userMeasurements.waist :
                region === 'hips' ? userMeasurements.hips :
                region === 'inseam' ? userMeasurements.inseam : 
                '--') : '--';
                
              const garmentMeasure = calculateGarmentMeasurement(region, fit, userMeasure);
              
              return (
                <tr key={region} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                    {region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span 
                      className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                      style={{
                        backgroundColor: `${fitColorScale[fit]}30`,
                        color: fit === 'perfect' ? '#166534' : 
                               fit === 'tight' || fit === 'loose' ? '#7C2D12' : '#1E40AF'
                      }}
                    >
                      {fit.charAt(0).toUpperCase() + fit.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userMeasure !== '--' ? `${userMeasure} cm` : '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {garmentMeasure !== '--' ? `${garmentMeasure} cm` : '--'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  // Helper function to calculate approximate garment measurements
  // In a real app, this would use actual garment specs
  const calculateGarmentMeasurement = (region, fit, userMeasure) => {
    if (userMeasure === '--') return '--';
    
    // Apply a multiplier based on fit
    const fitMultipliers = {
      tight: 0.92,
      snug: 0.97,
      perfect: 1.03,
      relaxed: 1.10,
      loose: 1.20
    };
    
    return Math.round(parseFloat(userMeasure) * fitMultipliers[fit]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Fit Visualization</h2>
        <p className="text-gray-600">See how this {selectedGarment} in size {selectedSize} will fit you</p>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-center">
        <div className="bg-white rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <span className="font-medium text-gray-800">Recommended size: </span>
          <span className="text-indigo-700 font-bold">{recommendedSize}</span>
          <p className="text-sm text-gray-600 mt-1">
            {selectedSize === recommendedSize ? 
              'This is your ideal size based on your measurements.' : 
              `Consider trying size ${recommendedSize} for a better fit.`}
          </p>
        </div>
      </div>
      
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'heatmap'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Visual Fit Map
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'details'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Detailed Fit
          </button>
        </nav>
      </div>
      
      <div className="mt-4">
        {activeTab === 'heatmap' ? (
          <div>
            <div className="mb-4 flex justify-center">
              {renderHeatMap()}
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-5 gap-1 max-w-md">
                {Object.entries(fitColorScale).map(([fit, color]) => (
                  <div key={fit} className="flex flex-col items-center justify-center text-center">
                    <div 
                      className="w-6 h-6 rounded-full mb-1" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-gray-600 capitalize">{fit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Hover over the colored regions to see detailed fit information</p>
            </div>
          </div>
        ) : (
          <div>{renderDetailsTable()}</div>
        )}
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Understanding Your Fit</h3>
        <div className="text-sm text-gray-600">
          <p className="mb-1">
            <span className="font-medium">Tight:</span> The garment will fit closely to your body with minimal ease.
          </p>
          <p className="mb-1">
            <span className="font-medium">Snug:</span> A comfortable close fit with limited movement.
          </p>
          <p className="mb-1">
            <span className="font-medium">Perfect:</span> Ideal balance of comfort and fit, with appropriate ease.
          </p>
          <p className="mb-1">
            <span className="font-medium">Relaxed:</span> Looser fit with more room and movement.
          </p>
          <p>
            <span className="font-medium">Loose:</span> Very generous fit, may appear oversized.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FitVisualization; 