import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { setActiveModel, setActiveColor, setViewMode } from '../store/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import ReviewPopup from '../components/common/ReviewPopup';

// Custom hook for screen size detection
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 640,
    isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// Main TryOnPage component with improved responsiveness
const TryOnPage = () => {
  const dispatch = useDispatch();
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Navy Blue');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturingImage, setCapturingImage] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [bodyMeasured, setBodyMeasured] = useState(false);
  const [activeTab, setActiveTab] = useState('camera');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneContainerRef = useRef(null);
  
  // Available sizes for the product
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Available colors with their hex values
  const availableColors = [
    { name: 'Navy Blue', hex: '#0a192f' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Red', hex: '#e63946' },
    { name: 'Green', hex: '#2a9d8f' },
    { name: 'Yellow', hex: '#f4a261' }
  ];
  
  // Garment types
  const garmentTypes = [
    { id: 'tshirt', name: 'T-Shirt', icon: 'shirt', scanType: 'full' },
    { id: 'jacket', name: 'Jacket', icon: 'jacket', scanType: 'full' },
    { id: 'pants', name: 'Pants', icon: 'pants', scanType: 'full' },
    { id: 'dress', name: 'Dress', icon: 'dress', scanType: 'full' },
    { id: 'glasses', name: 'Glasses', icon: 'glasses', scanType: 'partial' },
    { id: 'watch', name: 'Watch', icon: 'watch', scanType: 'partial' },
    { id: 'shoes', name: 'Shoes', icon: 'shoes', scanType: 'partial' }
  ];
  
  const [selectedGarment, setSelectedGarment] = useState(garmentTypes[0].id);

  // Measurements for different sizes
  const measurements = {
    'XS': { chest: '32-34"', waist: '26-28"', hips: '34-36"', length: '26"' },
    'S': { chest: '35-37"', waist: '29-31"', hips: '37-39"', length: '27"' },
    'M': { chest: '38-40"', waist: '32-34"', hips: '40-42"', length: '28"' },
    'L': { chest: '41-43"', waist: '35-37"', hips: '43-45"', length: '29"' },
    'XL': { chest: '44-46"', waist: '38-40"', hips: '46-48"', length: '30"' },
    'XXL': { chest: '47-49"', waist: '41-43"', hips: '49-51"', length: '31"' },
  };

  // Start camera feed
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: isMobile ? 'environment' : 'user'
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access your camera. Please make sure you've granted camera permissions.");
    }
  };
  
  // Stop camera feed
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };
  
  // Capture image from camera
  const captureImage = () => {
    if (!videoRef.current) return;
    
    setCapturingImage(true);
    
    setTimeout(() => {
      if (canvasRef.current && videoRef.current) {
        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // In a real app, you would send this image to a body measurement API
        setCapturingImage(false);
        processCapturedImage();
      }
    }, 1000); // Small delay for flash effect
  };
  
  // Process the captured image (simulate API call)
  const processCapturedImage = () => {
    setProcessingImage(true);
    
    // Simulate processing time
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        setTimeout(() => {
          setProcessingImage(false);
          setBodyMeasured(true);
          setActiveTab('customize');
        }, 500);
      }
      setLoadingProgress(progress);
    }, 300);
  };
  
  // Handle completing the try-on process
  const completeTryOn = () => {
    // Show the review popup after try-on is complete
    setShowReviewPopup(true);
  };
  
  // Handle review submission
  const handleReviewSubmit = (reviewData) => {
    // In a real app, you would send this review data to your backend
    console.log('Review submitted:', reviewData);
    
    // Store review in localStorage for demo purposes
    const existingReviews = JSON.parse(localStorage.getItem('tryOnReviews') || '[]');
    existingReviews.push(reviewData);
    localStorage.setItem('tryOnReviews', JSON.stringify(existingReviews));
    
    // Close the review popup after submission
    setTimeout(() => {
      setShowReviewPopup(false);
    }, 2000);
  };
  
  // Reset the try-on process
  const resetTryOn = () => {
    stopCamera();
    setBodyMeasured(false);
    setActiveTab('camera');
  };
  
  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
    dispatch(setActiveColor(color.hex));
  };
  
  // Handle garment selection
  const handleGarmentSelect = (garmentId) => {
    setSelectedGarment(garmentId);
    // In a real app, you would dispatch an action to change the 3D model
  };
  
  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  // Auto-start camera when tab is "camera"
  useEffect(() => {
    if (activeTab === 'camera' && !cameraActive) {
      startCamera();
    }
  }, [activeTab, cameraActive]);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen w-full">
        {/* Main Content with improved responsive width */}
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Header with improved alignment and responsive text */}
          <div className="mb-6 sm:mb-8 text-left sm:text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Virtual Try-On Experience
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600">
              Try on clothes and accessories virtually with our cutting-edge 3D technology
            </p>
            <button
              onClick={() => setShowInstructions(true)}
              className="mt-3 inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How To Scan
            </button>
          </div>
          
          {/* Instructions Modal */}
          {showInstructions && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl mx-4 overflow-auto" style={{ maxHeight: '90vh' }}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">How To Use Our Virtual Try-On</h2>
                    <button 
                      onClick={() => setShowInstructions(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Scan Types */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-3">Types of Body Scans</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="text-lg font-medium text-indigo-700 mb-2">Full Body Scan</h4>
                          <p className="text-gray-700 mb-3">Required for garments such as shirts, dresses, pants, jackets, and suits.</p>
                          <div className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3" 
                              alt="Full Body Scan" 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                              <ul className="text-white text-sm space-y-1">
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Stand 6-8 feet from camera
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Wear form-fitting clothes
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  A-pose with arms slightly away from body
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="text-lg font-medium text-indigo-700 mb-2">Partial Scan</h4>
                          <p className="text-gray-700 mb-3">For accessories like glasses, watches, or shoes that only need specific body parts.</p>
                          <div className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1629795348218-2f5b1c9190b0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3" 
                              alt="Partial Scan" 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                              <ul className="text-white text-sm space-y-1">
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Position camera 1-2 feet from target area
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Hold position steady for accurate scan
                                </li>
                                <li className="flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Good lighting is crucial
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Step-by-Step Instructions */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-3">Step-by-Step Process</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-indigo-600 font-bold text-xl mb-2">Step 1</div>
                          <h4 className="font-medium text-gray-900">Select Item Type</h4>
                          <p className="text-sm text-gray-600 mt-1">Choose clothing item or accessory you want to try on.</p>
                          <div className="mt-3 h-32 bg-gray-200 rounded flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-indigo-600 font-bold text-xl mb-2">Step 2</div>
                          <h4 className="font-medium text-gray-900">Prepare for Scan</h4>
                          <p className="text-sm text-gray-600 mt-1">Follow the positioning instructions for item type.</p>
                          <div className="mt-3 h-32 bg-gray-200 rounded flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-indigo-600 font-bold text-xl mb-2">Step 3</div>
                          <h4 className="font-medium text-gray-900">Capture & Process</h4>
                          <p className="text-sm text-gray-600 mt-1">Our AI processes your scan to create accurate measurements.</p>
                          <div className="mt-3 h-32 bg-gray-200 rounded flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-indigo-600 font-bold text-xl mb-2">Step 4</div>
                          <h4 className="font-medium text-gray-900">Try On & Customize</h4>
                          <p className="text-sm text-gray-600 mt-1">See how items look on you and try different colors/styles.</p>
                          <div className="mt-3 h-32 bg-gray-200 rounded flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">Tips for Best Results</h3>
                      <ul className="text-blue-700 space-y-2">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Ensure good, even lighting without harsh shadows
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Use a plain background if possible
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          For full-body scans, have someone else take the picture if possible
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Hold very still during the scanning process
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setShowInstructions(false)}
                      className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Got it, let's try on!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Process Steps with improved mobile spacing */}
          <div className="mb-6 sm:mb-8">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <nav aria-label="Progress" className="mb-5">
                <ol className="flex items-center justify-center">
                  <li className={`relative pr-4 sm:pr-8 md:pr-20 ${activeTab === 'camera' ? 'text-indigo-600' : 'text-gray-500'}`}>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 flex items-center justify-center rounded-full ${activeTab === 'camera' ? 'bg-indigo-600' : bodyMeasured ? 'bg-green-500' : 'bg-gray-300'} text-white`}>
                        {bodyMeasured ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          "1"
                        )}
                      </div>
                      <div className="ml-2 text-sm font-medium">Scan</div>
                    </div>
                    <div className={`absolute top-4 w-full h-0.5 ${bodyMeasured ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  </li>
                  
                  <li className={`relative px-4 sm:px-8 md:px-20 ${activeTab === 'customize' ? 'text-indigo-600' : bodyMeasured ? 'text-gray-900' : 'text-gray-400'}`}>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 flex items-center justify-center rounded-full ${activeTab === 'customize' ? 'bg-indigo-600' : 'bg-gray-300'} text-white`}>
                        2
                      </div>
                      <div className="ml-2 text-sm font-medium">Customize</div>
                    </div>
                    <div className="absolute top-4 w-full h-0.5 bg-gray-300"></div>
                  </li>
                  
                  <li className={`relative pl-4 sm:pl-8 md:pl-20 ${activeTab === 'results' ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 flex items-center justify-center rounded-full ${activeTab === 'results' ? 'bg-indigo-600' : 'bg-gray-300'} text-white`}>
                        3
                      </div>
                      <div className="ml-2 text-sm font-medium">Results</div>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Tab content with improved responsive layout */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Camera/Scan Tab */}
            {activeTab === 'camera' && (
              <div className="p-3 sm:p-5 md:p-6">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Body Scanning</h2>
                  
                  <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-indigo-800">Instructions</h3>
                        <div className="mt-1 text-xs sm:text-sm text-indigo-700">
                          <p>1. Stand 6-8 feet away from your camera</p>
                          <p>2. Ensure your full body is visible</p>
                          <p>3. Wear form-fitting clothing for best results</p>
                          <p>4. Stand straight with arms slightly away from your body</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* More responsive video container */}
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-[4/3] mb-4 w-full max-w-2xl mx-auto">
                    {/* Camera feed */}
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Camera guidelines overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                        <path d="M100,50 L100,25 L125,25" stroke="white" strokeWidth="2" opacity="0.7" />
                        <path d="M300,50 L300,25 L275,25" stroke="white" strokeWidth="2" opacity="0.7" />
                        <path d="M100,250 L100,275 L125,275" stroke="white" strokeWidth="2" opacity="0.7" />
                        <path d="M300,250 L300,275 L275,275" stroke="white" strokeWidth="2" opacity="0.7" />
                        <rect x="120" y="50" width="160" height="200" stroke="white" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      </svg>
                    </div>
                    
                    {/* Capture flash effect */}
                    <AnimatePresence>
                      {capturingImage && (
                        <motion.div 
                          className="absolute inset-0 bg-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Processing overlay */}
                    <AnimatePresence>
                      {processingImage && (
                        <motion.div 
                          className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <h3 className="text-white font-medium text-lg mb-3">Analyzing your body measurements</h3>
                          <div className="w-full max-w-sm bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{width: `${loadingProgress}%`}}
                            ></div>
                          </div>
                          <p className="text-gray-300 text-sm">Please wait while our AI analyzes your proportions ({loadingProgress}%)</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Hidden canvas for image capture */}
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* More responsive button layout for mobile */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          if (cameraActive) {
                            stopCamera();
                          } else {
                            startCamera();
                          }
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
                      >
                        {cameraActive ? 'Stop Camera' : 'Start Camera'}
                      </button>
                      
                      {isMobile && cameraActive && (
                        <button
                          onClick={() => {
                            // Switch camera facing mode
                            stopCamera();
                            setTimeout(startCamera, 300);
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
                        >
                          Switch Camera
                        </button>
                      )}
                    </div>
                    
                    <button
                      onClick={captureImage}
                      disabled={!cameraActive || processingImage}
                      className={`px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2 sm:mt-0 ${
                        cameraActive && !processingImage
                          ? 'bg-indigo-600 hover:bg-indigo-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Capture Image
                    </button>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Privacy Information</h3>
                    <p className="text-xs text-gray-500">
                      Your privacy is important to us. Your body measurements are processed securely and never stored 
                      unless you explicitly save them. Images are processed on your device when possible.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Customize Tab with improved mobile layout */}
            {activeTab === 'customize' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left side: 3D model - more responsive */}
                <div className="h-[350px] sm:h-[450px] md:h-auto relative bg-gray-50 flex items-center justify-center" ref={sceneContainerRef}>
                  {isLoading ? (
                    <div className="text-center p-6">
                      <div className="mb-3">
                        <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <p className="text-gray-600">Loading your virtual model...</p>
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      {/* Placeholder for the 3D model - in a real app this would show the loaded 3D model */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center px-6">
                          <div className="text-indigo-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-lg font-medium text-gray-700 mb-1">Your 3D Model</p>
                          <p className="text-sm text-gray-600 mb-4">
                            Your virtual model will appear here with the selected garment.
                          </p>
                          <button
                            onClick={() => setIsLoading(true)}
                            className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            Generate Model
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right side: Customization controls - better padding for mobile */}
                <div className="p-3 sm:p-5 md:p-6 border-t md:border-t-0 md:border-l border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Customize Your Look</h2>
                  
                  {/* Garment Type Selection - better spacing on mobile */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">Garment Type</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {garmentTypes.map((garment) => (
                        <button
                          key={garment.id}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            selectedGarment === garment.id
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleGarmentSelect(garment.id)}
                        >
                          <div className="w-10 h-10 flex items-center justify-center mb-1">
                            {garment.icon === 'shirt' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 ${selectedGarment === garment.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                                <path d="M20 8l-2-4h-4l-2 4h4v12h4V8zM4 8l2-4h4l2 4h-4v12H4V8z"/>
                              </svg>
                            )}
                            {garment.icon === 'jacket' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 ${selectedGarment === garment.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                                <path d="M16 3h3l2 4-8 5.5V21h-2v-8.5L3 7l2-4h3"/>
                                <path d="M8 3h8"/>
                              </svg>
                            )}
                            {garment.icon === 'pants' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 ${selectedGarment === garment.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                                <path d="M6 2l-4 20h6l2-13 2 13h6l-4-20z"/>
                              </svg>
                            )}
                            {garment.icon === 'dress' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 ${selectedGarment === garment.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                                <path d="M7 2h10v4H7z"/>
                                <path d="M12 6v16M7 6c0 6-3 11-4 12h18c-1-1-4-6-4-12"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-medium ${selectedGarment === garment.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                            {garment.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Size Selection - better layout for small screens */}
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3">
                      <h3 className="text-sm font-medium text-gray-700">Size</h3>
                      <span className="text-xs text-indigo-600 font-medium mt-1 sm:mt-0">Based on your measurements</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          className={`py-2 border text-sm font-medium rounded-md transition-colors ${
                            selectedSize === size
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'border-gray-300 text-gray-700 hover:border-indigo-300'
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    
                    {/* Size comparison */}
                    <div className="mt-3 text-xs text-gray-500">
                      <div className="flex justify-between items-center mb-1">
                        <span>Your measurements</span>
                        <span className="font-medium text-gray-700">{measurements[selectedSize].chest} chest</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Color Selection - better responsive spacing */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">Color: {selectedColor}</h3>
                    <div className="flex flex-wrap gap-3">
                      {availableColors.map(color => (
                        <motion.button
                          key={color.name}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-10 h-10 rounded-full focus:outline-none ${
                            selectedColor === color.name
                              ? 'ring-2 ring-indigo-600 ring-offset-2'
                              : 'ring-1 ring-gray-200'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Add a "Complete Try-On" button in the customize tab */}
          {activeTab === 'customize' && bodyMeasured && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={completeTryOn}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Complete Try-On
              </button>
            </div>
          )}

          {/* Review Popup */}
          <ReviewPopup
            visible={showReviewPopup}
            onClose={() => setShowReviewPopup(false)}
            onSubmit={handleReviewSubmit}
            type="customer"
          />
        </div>
      </div>
    </Layout>
  );
};

export default TryOnPage;