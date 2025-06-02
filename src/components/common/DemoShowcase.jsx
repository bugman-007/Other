import React, { useState, useEffect } from 'react';

const DemoShowcase = () => {
  const [demoIndex, setDemoIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  
  // Demo types: 0 = woman trying dress, 1 = man trying pants, 2 = video consultation
  const demoTypes = [
    { 
      title: 'Woman trying on a dress', 
      clothingColors: [
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Green', value: '#10B981' }
      ],
      clothing: 'dress',
      personBackground: 'woman-model'
    },
    { 
      title: 'Man trying on pants', 
      clothingColors: [
        { name: 'Navy', value: '#1E40AF' },
        { name: 'Black', value: '#1F2937' },
        { name: 'Beige', value: '#D4A76A' },
        { name: 'Gray', value: '#6B7280' }
      ],
      clothing: 'pants',
      personBackground: 'man-model'
    },
    { 
      title: 'Live video consultation', 
      clothingColors: [],
      clothing: '',
      personBackground: 'bg-gray-100'
    }
  ];
  
  // Sample dress product images from online sources - modern high-quality dress images
  const dressImages = [
    'https://images.pexels.com/photos/15107600/pexels-photo-15107600.jpeg?auto=compress&cs=tinysrgb&w=300', // Modern elegant dress
    'https://images.pexels.com/photos/11679854/pexels-photo-11679854.jpeg?auto=compress&cs=tinysrgb&w=300', // Fashion collection dress
    'https://images.pexels.com/photos/7691178/pexels-photo-7691178.jpeg?auto=compress&cs=tinysrgb&w=300', // Stylish casual dress
    'https://images.pexels.com/photos/10614032/pexels-photo-10614032.jpeg?auto=compress&cs=tinysrgb&w=300'  // Designer dress
  ];
  
  // Sample pants product images from online sources - modern high-quality pants images
  const pantsImages = [
    'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg?auto=compress&cs=tinysrgb&w=300', // Designer pants
    'https://images.pexels.com/photos/7691262/pexels-photo-7691262.jpeg?auto=compress&cs=tinysrgb&w=300', // Fashion pants
    'https://images.pexels.com/photos/9769874/pexels-photo-9769874.jpeg?auto=compress&cs=tinysrgb&w=300', // Modern jeans
    'https://images.pexels.com/photos/3373335/pexels-photo-3373335.jpeg?auto=compress&cs=tinysrgb&w=300'  // Stylish pants
  ];
  
  // Person image URLs - professional fashion and tech models
  const personImages = {
    consultant: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=300', // Professional fashion stylist
    customer: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'    // Modern customer
  };

  // Auto-cycle through demos
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % demoTypes.length;
        setSelectedColor(0); // Reset selected color when changing demo
        return newIndex;
      });
    }, 8000); // Change every 8 seconds (longer time for better user experience)
    
    return () => clearInterval(interval);
  }, []);
  
  const currentDemo = demoTypes[demoIndex];
  
  // Animation classes for transitions
  const getAnimationClass = () => {
    return 'animate-fadeIn';
  };
  
  // Helper function to render a placeholder where image would be
  const renderPlaceholder = (color, text) => {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: color}}>
        <span className="text-white font-medium text-sm opacity-80">{text}</span>
      </div>
    );
  };
  
  return (
    <div className="demo-showcase">
      {/* Demo Header */}
      <div className="demo-header p-3 text-dark flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="demo-window-controls flex space-x-1.5">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
        <div className="text-sm font-semibold text-gray-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          Kokomatto
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Demo Content */}
      <div className="demo-content">
        {/* Demo Type 0: Woman trying on dress */}
        {demoIndex === 0 && (
          <div className={`absolute inset-0 flex ${getAnimationClass()}`}>
            {/* Left side: Woman model with realistic model */}
            <div className={`w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 backdrop-blur-sm rounded-lg w-5/6 h-5/6 relative">
                  {/* 3D Model Display Area */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl overflow-hidden border border-indigo-500/30 shadow-2xl">
                    {/* Grid Pattern for 3D effect */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTItMmgydjJoLTJ2LTJ6bS00IDRoMnYyaC0ydi0yem0tNCAxMGgydjJoLTJ2LTJ6bTYtMTBoMnYyaC0ydi0yem0tMi02aDJ2MmgtMnYtMnptLTYgMGgydjJoLTJ2LTJ6bTggMTBoMnYyaC0ydi0yem0tOCA2aDJ2MmgtMnYtMnptMC0xNGg0djJoLTR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    
                    {/* Holographic Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
                    
                    {/* Animated scanning line effect */}
                    <div className="absolute inset-x-0 h-px bg-indigo-500/70 blur-[1px] animate-scanning-line"></div>
                    
                    {/* 3D Model placeholder with advanced look */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="w-48 h-48 relative mb-4">
                        {/* Rotating rings */}
                        <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-2 border border-purple-500/40 rounded-full animate-reverse-spin"></div>
                        <div className="absolute inset-4 border border-blue-500/30 rounded-full animate-spin-slow"></div>
                        
                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-bold text-white mb-2">Advanced 3D Model</h2>
                      <p className="text-gray-300 mb-4 max-w-xs text-center">Our AI-powered 3D rendering engine will display your perfect fit in real-time</p>
                      
                      {/* Color indicator */}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="w-3 h-3 rounded-full" style={{backgroundColor: currentDemo.clothingColors[selectedColor].value}}></span>
                        <span className="text-sm text-white/80">{currentDemo.clothingColors[selectedColor].name} selected</span>
                      </div>
                      
                      {/* Measurements display */}
                      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-xs">
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-400">Height</div>
                          <div className="text-white text-sm">175cm</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-400">Shoulders</div>
                          <div className="text-white text-sm">42cm</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-400">Waist</div>
                          <div className="text-white text-sm">74cm</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls and AR Interface elements */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  3D Model
                </div>
                
                <div className="bg-indigo-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  AR View
                </div>
              </div>
              
              {/* 3D View indicator */}
              <div className="absolute top-4 right-4 text-xs text-white bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium flex items-center z-10">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Ready for 3D
              </div>
              
              {/* Bottom control bar */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 flex space-x-6 z-10">
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right side: Dress options */}
            <div className="w-1/2 bg-white p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <div className="text-gray-800 font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Select Style
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="text-primary">4</span>
                  <span className="mx-1">/</span>
                  <span>12 items</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="product-option bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                    <div className="aspect-square bg-purple-50 rounded-md mb-1.5 overflow-hidden relative group">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        <span className="text-xs text-purple-400">Style {index + 1}</span>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white rounded-full p-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-medium text-gray-800">Style {index + 1}</div>
                      <div className="text-xs text-primary font-semibold">$149.99</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex-grow">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Color
                    </div>
                    <div className="flex space-x-2">
                      {currentDemo.clothingColors.map((color, idx) => (
                        <div 
                          key={idx} 
                          className={`color-option ${selectedColor === idx ? 'active' : ''}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(idx)}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      Size
                    </div>
                    <div className="flex space-x-1">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size, idx) => (
                        <div key={idx} className="w-7 h-7 flex items-center justify-center text-xs bg-gray-50 rounded-full hover:bg-gray-100 cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors">
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-grow h-10 bg-accent rounded-lg text-white flex items-center justify-center text-sm font-medium transition-colors hover:bg-accent/90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Demo Type 1: Man trying on pants */}
        {demoIndex === 1 && (
          <div className={`absolute inset-0 flex ${getAnimationClass()}`}>
            {/* Left side: Man model with pants */}
            <div className={`w-1/2 bg-gradient-to-br from-slate-800 to-gray-900 relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 backdrop-blur-sm rounded-lg w-5/6 h-5/6 relative">
                  {/* 3D Model Display Area */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900/30 rounded-xl overflow-hidden border border-blue-500/30 shadow-2xl">
                    {/* Grid Pattern for 3D effect */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTItMmgydjJoLTJ2LTJ6bS00IDRoMnYyaC0ydi0yem0tNCAxMGgydjJoLTJ2LTJ6bTYtMTBoMnYyaC0ydi0yem0tMi02aDJ2MmgtMnYtMnptLTYgMGgydjJoLTJ2LTJ6bTggMTBoMnYyaC0ydi0yem0tOCA2aDJ2MmgtMnYtMnptMC0xNGg0djJoLTR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    
                    {/* Holographic Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
                    
                    {/* Animated scanning line effect */}
                    <div className="absolute inset-x-0 h-px bg-blue-500/70 blur-[1px] animate-scanning-line"></div>
                    
                    {/* 3D Model placeholder with advanced look */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="w-48 h-48 relative mb-4">
                        {/* Rotating rings */}
                        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-2 border border-cyan-500/40 rounded-full animate-reverse-spin"></div>
                        <div className="absolute inset-4 border border-slate-500/30 rounded-full animate-spin-slow"></div>
                        
                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-bold text-white mb-2">Advanced 3D Model</h2>
                      <p className="text-gray-300 mb-4 max-w-xs text-center">Visualize fit and style with realistic 3D rendering</p>
                      
                      {/* Color indicator */}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="w-3 h-3 rounded-full" style={{backgroundColor: currentDemo.clothingColors[selectedColor].value}}></span>
                        <span className="text-sm text-white/80">{currentDemo.clothingColors[selectedColor].name} selected</span>
                      </div>
                      
                      {/* Measurements display */}
                      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-xs">
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-400">Waist</div>
                          <div className="text-white text-sm">34"</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-400">Inseam</div>
                          <div className="text-white text-sm">32"</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-400">Size</div>
                          <div className="text-white text-sm">L</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls and AR Interface elements */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  3D Model
                </div>
                
                <div className="bg-blue-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  AR View
                </div>
              </div>
              
              {/* 3D View indicator */}
              <div className="absolute top-4 right-4 text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-600 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium flex items-center z-10">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Ready for 3D
              </div>
              
              {/* Bottom control bar */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 flex space-x-6 z-10">
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right side: Pants options */}
            <div className="w-1/2 bg-white p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <div className="text-gray-800 font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Select Style
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="text-primary">4</span>
                  <span className="mx-1">/</span>
                  <span>12 items</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="product-option bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                    <div className="aspect-square bg-blue-50 rounded-md mb-1.5 overflow-hidden relative group">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        <span className="text-xs text-blue-400">Style {index + 1}</span>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white rounded-full p-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-medium text-gray-800">Style {index + 1}</div>
                      <div className="text-xs text-primary font-semibold">$89.99</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex-grow">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Color
                    </div>
                    <div className="flex space-x-2">
                      {currentDemo.clothingColors.map((color, idx) => (
                        <div 
                          key={idx} 
                          className={`color-option ${selectedColor === idx ? 'active' : ''}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(idx)}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      Size
                    </div>
                    <div className="flex space-x-1">
                      {['30', '32', '34', '36', '38'].map((size, idx) => (
                        <div key={idx} className="w-7 h-7 flex items-center justify-center text-xs bg-gray-50 rounded-full hover:bg-gray-100 cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors">
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-grow h-10 bg-primary rounded-lg text-white flex items-center justify-center text-sm font-medium transition-colors hover:bg-primary/90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Demo Type 2: Video consultation */}
        {demoIndex === 2 && (
          <div className={`absolute inset-0 ${getAnimationClass()}`}>
            <div className="h-full flex flex-col">
              {/* Video call interface */}
              <div className="flex-grow flex">
                {/* Merchant view */}
                <div className="w-1/2 bg-gray-900 p-2">
                  <div className="video-call-view h-full">
                    <div className="absolute inset-0 overflow-hidden">
                      <img 
                        src={personImages.consultant} 
                        alt="Fashion Consultant"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%23FFF' text-anchor='middle' alignment-baseline='middle'%3EConsultant%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded-md">
                      Fashion Consultant
                    </div>
                  </div>
                </div>
                
                {/* Customer view */}
                <div className="w-1/2 bg-gray-900 p-2">
                  <div className="video-call-view h-full">
                    <div className="absolute inset-0 overflow-hidden">
                      <img 
                        src={personImages.customer} 
                        alt="Customer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234B5563'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%23FFF' text-anchor='middle' alignment-baseline='middle'%3ECustomer%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded-md">
                      You
                    </div>
                    <div className="absolute top-2 right-2 p-1">
                      <div className="w-20 h-24 rounded overflow-hidden shadow-lg border border-white bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video call controls */}
              <div className="video-call-controls">
                <div className="video-call-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="video-call-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="video-call-button end-call">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="video-call-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Demo Controls */}
      <div className="bg-gray-800 py-2.5 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
          <span className="text-white text-xs font-medium">{currentDemo.title}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {demoTypes.map((_, index) => (
              <button 
                key={index} 
                onClick={() => {
                  setDemoIndex(index);
                  setSelectedColor(0);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === demoIndex ? 'bg-white scale-110' : 'bg-gray-500 hover:bg-gray-400'}`}
                aria-label={`View demo ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <button className="hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoShowcase; 