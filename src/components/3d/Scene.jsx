import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PresentationControls,
  Html,
  Grid,
  ContactShadows,
  useProgress,
  Stars
} from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import DummyModel from './DummyModel';

// Improved loading component with progress bar
const LoadingSpinner = () => {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-800/95 to-purple-800/95 backdrop-blur-sm">
      <div className="flex flex-col items-center max-w-md text-center px-6 py-8 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-indigo-500/30 shadow-2xl">
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
        <div className="text-xl text-white font-bold mb-2">Loading 3D Experience</div>
        <div className="text-indigo-200 mb-4">Preparing your virtual try-on experience</div>
        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-indigo-300 text-sm">{Math.round(progress)}% loaded</div>
      </div>
    </div>
  );
};

// Professional control hints
const ControlsHint = () => {
  const [showHints, setShowHints] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowHints(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!showHints) return null;
  
  return (
    <div className="absolute bottom-6 right-6 bg-gray-900/70 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-lg border border-gray-700 z-10 text-sm max-w-xs animate-fade-in">
      {/* <div className="font-medium mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Interactive 3D Controls
      </div>
      <ul className="list-disc pl-5 text-gray-300 space-y-1">
        <li>Click and drag to rotate the view</li>
        <li>Scroll to zoom in and out</li>
        <li>Double-click to reset camera</li>
      </ul> */}
    </div>
  );
};

// Interactive marker points on the model with enhanced styling
const FeaturePoints = ({ color }) => {
  const [hovered, setHovered] = useState(null);
  
  const features = [
    { position: [0, 1.5, 0.5], label: 'Premium Fabric', details: 'Sourced from sustainable materials' },
    { position: [-1, 0.5, 0.5], label: 'Custom Fit', details: 'Adaptable to your measurements' },
    { position: [1, 0.5, 0.5], label: 'Advanced Stitching', details: 'Reinforced for durability' },
    { position: [0, -1, 0.5], label: 'Special Finish', details: 'Water and stain resistant' }
  ];
  
  return features.map((feature, index) => (
    <group key={index} position={feature.position}>
      <mesh
        onPointerOver={() => setHovered(index)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color={hovered === index ? '#10b981' : '#6366f1'} 
          emissive={hovered === index ? '#10b981' : '#6366f1'}
          emissiveIntensity={hovered === index ? 2 : 1}
        />
      </mesh>
      {hovered === index && (
        <Html position={[0.1, 0.1, 0]} className="pointer-events-none">
          <div className="bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-xl w-44 shadow-xl border border-indigo-500/30 animate-fade-in">
            <div className="text-sm font-bold text-indigo-400">{feature.label}</div>
            <div className="text-xs mt-1 text-gray-200">{feature.details}</div>
          </div>
        </Html>
      )}
    </group>
  ));
};

// Professional 3D viewer header
const ViewerHeader = () => (
  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-transparent z-10 p-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="h-8 w-8 relative overflow-hidden rounded-full bg-indigo-600 p-1 mr-2">
          <img 
            src="https://i.ibb.co/KjrQ65br/logo.png" 
            alt="Kokomatto" 
            className="object-contain h-full w-full"
          />
        </div>
        <span className="text-white font-medium">Kokomatto 3D Viewer</span>
      </div>
      <div className="flex space-x-2">
        <button className="bg-gray-800/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs transition-colors hover:bg-gray-700 border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <button className="bg-gray-800/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs transition-colors hover:bg-gray-700 border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// New component for webcam virtual try-on
const WebcamTryOn = () => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraLoading, setCameraLoading] = useState(false);

  const startCamera = async () => {
    setCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraActive(true);
          setCameraPermission(true);
          setCameraLoading(false);
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission(false);
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {cameraActive ? (
        <>
          <video 
            ref={videoRef} 
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            playsInline
            muted
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          <div className="absolute top-4 right-4 z-20 flex space-x-2">
            <button 
              onClick={stopCamera}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-gray-900/70 backdrop-blur-sm text-white p-3 rounded-xl border border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm">Live Camera Active</span>
            </div>
            <div className="text-xs text-gray-300">Move around to see how the clothes fit</div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 rounded-lg p-6 text-center">
          {cameraLoading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-sm">Activating camera...</p>
            </div>
          ) : cameraPermission === false ? (
            <div className="max-w-md">
              <div className="bg-red-600/20 p-3 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-white text-sm">Camera access denied. Please check your browser permissions.</p>
              </div>
              <button
                onClick={startCamera}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium transition-all shadow-lg border border-indigo-500/50"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="max-w-md">
              <div className="bg-indigo-600/20 p-4 rounded-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-indigo-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-white mb-2">Virtual Mirror</h3>
                <p className="text-indigo-200 text-sm mb-4">Activate your camera to see how these clothes look on you in real-time.</p>
                <div className="flex justify-center space-x-3 text-xs text-indigo-300">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Real-time
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    No recording
                  </div>
                </div>
              </div>
              <button
                onClick={startCamera}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center w-full shadow-lg border border-indigo-500/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Activate Camera
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Add sidebar panel component to fill blank areas
const SidePanel = ({ setViewMode, activeMode, activeColor }) => {
  const panelItems = [
    { id: '3d', icon: 'cube', label: '3D View' },
    { id: 'camera', icon: 'camera', label: 'Camera Try-On' },
    { id: 'ar', icon: 'mobile', label: 'AR Mode' },
    { id: 'info', icon: 'info', label: 'Product Info' }
  ];

  const productInfo = {
    name: "Premium Fashion Item",
    material: "Sustainable cotton blend",
    fit: "Regular fit",
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Machine wash cold"
  };

  const renderIcon = (icon) => {
    switch(icon) {
      case 'cube':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        );
      case 'camera':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'mobile':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* View mode tabs */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg mb-4">
        <div className="p-2 grid grid-cols-4 gap-1">
          {panelItems.map(item => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center px-2 py-3 rounded-lg transition-all ${
                activeMode === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setViewMode(item.id)}
            >
              {renderIcon(item.icon)}
              <span className="mt-1 text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info panel */}
      {activeMode === 'info' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg p-4 mb-4 flex-grow">
          <h3 className="text-lg font-semibold text-white mb-3">Product Details</h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">Name</div>
              <div className="text-sm text-white">{productInfo.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Material</div>
              <div className="text-sm text-white">{productInfo.material}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Fit</div>
              <div className="text-sm text-white">{productInfo.fit}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Available Sizes</div>
              <div className="flex space-x-2 mt-1">
                {productInfo.sizes.map(size => (
                  <div key={size} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-xs font-medium text-white border border-gray-700">
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Care Instructions</div>
              <div className="text-sm text-white">{productInfo.care}</div>
            </div>
          </div>
        </div>
      )}

      {/* Color selection panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-white mb-3">Available Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {['#2563eb', '#db2777', '#16a34a', '#9333ea', '#ea580c', '#475569', '#fbbf24', '#ef4444'].map((color, index) => (
            <button
              key={index}
              className={`w-full aspect-square rounded-lg transition-all ${
                activeColor === color ? 'ring-2 ring-white ring-offset-1 ring-offset-gray-800 scale-105' : ''
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Suggestion panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg p-4 flex-grow">
        <h3 className="text-sm font-semibold text-white mb-3">You might also like</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(item => (
            <div key={item} className="flex items-center space-x-3 pb-3 border-b border-gray-800">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-xs text-white truncate">Similar Product {item}</div>
                <div className="text-xs text-indigo-400">$99.99</div>
              </div>
              <button className="flex-shrink-0 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 p-1.5 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Scene component
const Scene = () => {
  const { activeColor, viewMode: reduxViewMode } = useSelector((state) => state.app);
  const [isLoading, setIsLoading] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'camera', 'ar', 'info'
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  
  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show feature points after initial loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLabels(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (reduxViewMode === 'ar') {
      setViewMode('ar');
    }
  }, [reduxViewMode]);
  
  // Handle color selection
  const handleColorSelect = (color) => {
    if (dispatch) {
      dispatch({ type: 'app/setActiveColor', payload: color });
    }
  };
  
  // Render icons for the mobile tab navigation
  const renderIcon = (icon) => {
    switch(icon) {
      case 'cube':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        );
      case 'camera':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'mobile':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="rounded-xl overflow-hidden shadow-xl w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-4">
        {/* Main 3D or Camera View - takes up 3/4 of the space on desktop, full width on mobile */}
        <div className="col-span-1 lg:col-span-3 h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] relative">
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${viewMode === '3d' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {/* 3D View */}
            <div className="canvas-container relative w-full h-full rounded-xl overflow-hidden shadow-xl">
              {/* Gradient background with depth effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%236366f1\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
              </div>
              
              {/* Professional viewer border and frame */}
              <div className="absolute inset-0 border border-gray-700 rounded-xl"></div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-indigo-900/10 to-transparent"></div>
              
              {isLoading && <LoadingSpinner />}
              
              <ViewerHeader />
              <ControlsHint />
              
              {/* Advanced 3D Canvas */}
              <Canvas 
                ref={canvasRef}
                camera={{ position: [3, 1, 5], fov: 35 }}
                shadows
                dpr={[1, 2]} // Improved resolution
                gl={{ 
                  antialias: true,
                  alpha: true,
                  preserveDrawingBuffer: true,
                  powerPreference: "high-performance"
                }}
                className="w-full h-full"
              >
                <color attach="background" args={['#111827']} /> {/* Darker, richer background */}
                
                {/* Improved lighting setup */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
                <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#6366f1" />
                <pointLight position={[0, 3, 0]} intensity={0.2} color="#8b5cf6" />
                
                <Suspense fallback={null}>
                  <PresentationControls
                    global
                    polar={[-Math.PI / 4, Math.PI / 2]}
                    azimuth={[-Math.PI / 2, Math.PI / 2]}
                    config={{ mass: 1, tension: 170, friction: 26 }}
                    snap={{ mass: 2, tension: 300, friction: 30 }}
                  >
                    <group position={[0, 0, 0]}>
                      <DummyModel color={activeColor} />
                      {showLabels && <FeaturePoints color={activeColor} />}
                      
                      {/* Professional grid floor */}
                      <Grid
                        position={[0, -2.05, 0]}
                        args={[20, 20]}
                        cellSize={0.5}
                        cellThickness={0.6}
                        cellColor="#6366f1"
                        sectionSize={3}
                        sectionThickness={1.5}
                        sectionColor="#818cf8"
                        fadeDistance={25}
                        fadeStrength={1.5}
                      />
                      
                      {/* Enhanced contact shadows */}
                      <ContactShadows 
                        position={[0, -2, 0]} 
                        opacity={0.5} 
                        scale={10} 
                        blur={1.5} 
                        far={5} 
                        color="#000000" 
                      />
                      
                      {/* Ambient glow effect */}
                      <mesh position={[0, -1.9, 0]}>
                        <sphereGeometry args={[1.5, 32, 32]} />
                        <meshBasicMaterial 
                          color="#4f46e5" 
                          transparent={true}
                          opacity={0.1}
                        />
                      </mesh>
                    </group>
                  </PresentationControls>
                  
                  {/* Better environment for reflections */}
                  <Environment preset="city" />
                  
                  {/* Subtle star background for depth */}
                  <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                </Suspense>
                
                <OrbitControls 
                  enablePan={false} 
                  enableZoom={true} 
                  minPolarAngle={Math.PI / 6} 
                  maxPolarAngle={Math.PI / 2}
                  minDistance={3}
                  maxDistance={10}
                  makeDefault
                />
              </Canvas>
              
              {/* Feature highlight indicator with improved design */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent text-white p-4 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium">3D Model Active</span>
                  </div>
                  <div className="text-xs text-gray-400 hidden sm:block">Interact with the model to explore features</div>
                </div>
              </div>
            </div>
          </div>

          {/* Camera View */}
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${viewMode === 'camera' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <WebcamTryOn />
          </div>

          {/* AR mode overlay with improved design */}
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${viewMode === 'ar' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md text-white">
              <div className="bg-gray-900 px-4 py-6 sm:p-8 rounded-xl sm:rounded-2xl max-w-md mx-4 text-center border border-indigo-500/40 shadow-2xl transform transition-all duration-300 ease-out scale-100">
                <div className="text-indigo-400 text-xs sm:text-sm font-bold mb-2 uppercase tracking-wider">AUGMENTED REALITY</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AR Experience Loading</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 text-gray-300">Preparing to project this item into your environment. For best results, ensure you're in a well-lit area with enough space.</p>
                <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 mb-4 sm:mb-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 sm:h-3 rounded-full" style={{width: '45%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
                </div>
                <button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all flex items-center justify-center w-full border border-indigo-500/50 shadow-lg hover:shadow-indigo-500/20"
                  onClick={() => setViewMode('3d')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Return to 3D View
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Side panel - horizontal on mobile, vertical on desktop */}
        <div className="col-span-1 lg:h-[550px] bg-gray-900/95 backdrop-blur-md p-4 rounded-xl border border-gray-800 shadow-xl overflow-x-auto lg:overflow-y-auto">
          {/* Mobile/Tablet View - Horizontal Tabs */}
          <div className="lg:hidden">
            <div className="pb-4 mb-4 border-b border-gray-800">
              <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
                {[
                  { id: '3d', icon: 'cube', label: '3D View' },
                  { id: 'camera', icon: 'camera', label: 'Camera Try-On' },
                  { id: 'ar', icon: 'mobile', label: 'AR Mode' },
                  { id: 'info', icon: 'info', label: 'Product Info' }
                ].map(item => (
                  <button
                    key={item.id}
                    className={`flex-shrink-0 flex items-center px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                      viewMode === item.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setViewMode(item.id)}
                  >
                    {renderIcon(item.icon)}
                    <span className="ml-2 text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection grid - horizontal */}
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h3 className="text-sm font-semibold text-white mb-3">Choose Color</h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['#2563eb', '#db2777', '#16a34a', '#9333ea', '#ea580c', '#475569', '#fbbf24', '#ef4444'].map((color, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square rounded-lg transition-all ${
                      activeColor === color ? 'ring-2 ring-white ring-offset-1 ring-offset-gray-800 scale-105' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${index + 1}`}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            {/* Product info or other content based on selected tab */}
            {viewMode === 'info' && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="text-base font-semibold text-white mb-3">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Material</div>
                    <div className="text-sm text-white">Sustainable cotton blend</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Fit</div>
                    <div className="text-sm text-white">Regular fit</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Available Sizes</div>
                    <div className="flex space-x-1">
                      {["XS", "S", "M", "L", "XL"].map(size => (
                        <div key={size} className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-xs font-medium text-white border border-gray-700">
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Care</div>
                    <div className="text-sm text-white">Machine wash cold</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop View - Vertical Panel */}
          <div className="hidden lg:block h-full">
            <SidePanel setViewMode={setViewMode} activeMode={viewMode} activeColor={activeColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to hide scrollbars but keep functionality
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
document.head.appendChild(style);

export default Scene;