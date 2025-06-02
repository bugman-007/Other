import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// Data structures moved outside for cleaner component
const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '49',
    annualPrice: '470',
    discount: '20',
    period: 'per month',
    description: 'Perfect for small businesses starting with virtual try-on',
    features: [
      'API integration for 1 e-commerce store',
      '3D virtual try-on functionality',
      '10 product uploads per month',
      'Basic analytics dashboard',
      'Email support'
    ],
    highlight: false,
    cta: 'Get Started'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '149',
    annualPrice: '1430',
    discount: '20',
    period: 'per month',
    description: 'Enhanced features for growing businesses',
    features: [
      'API integration for up to 5 e-commerce stores',
      'Advanced 3D virtual try-on functionality',
      '50 product uploads per month',
      'Live chat customer support',
      'Comprehensive analytics',
      'Priority email & chat support'
    ],
    highlight: true,
    cta: 'Get Started'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '349',
    annualPrice: '3350',
    discount: '20',
    period: 'per month',
    description: 'Complete solution for large businesses',
    features: [
      'API integration for up to 10 e-commerce stores',
      'Premium 3D virtual try-on functionality',
      'Unlimited product uploads',
      'Live chat and video call customer support',
      'Advanced analytics and reporting',
      'Dedicated account manager',
      'Custom integration support'
    ],
    highlight: false,
    cta: 'Get Started'
  }
];

const categories = [
  {
    id: 'clothing',
    title: 'Clothing',
    image: '/images/categories/clothing.jpg',
    description: 'Virtual try-on for shirts, dresses, pants and more'
  },
  {
    id: 'footwear',
    title: 'Footwear',
    image: '/images/categories/footwear.jpg',
    description: 'See how shoes look and fit before buying'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: '/images/categories/accessories.jpg',
    description: 'Try on glasses, watches, jewelry and more'
  },
  {
    id: 'custom',
    title: 'Custom Products',
    image: '/images/categories/custom.jpg',
    description: 'Scan and upload your own products'
  }
];

// Banner component - simplified to just "Coming soon"
const AdminBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  return (
    <div 
      className={`relative bg-indigo-900/30 backdrop-blur-sm text-white border-t border-white/20 transition-all duration-300 ${
        showBanner ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
      }`} 
      style={{ minHeight: showBanner ? '40px' : '0px' }}
    >
      <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
        <div className="pr-14 text-center flex items-center justify-center h-full">
          <p className="font-medium text-sm md:text-base">Coming soon</p>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            type="button"
            className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 focus:outline-none"
            onClick={() => setShowBanner(false)}
          >
            <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Steps component for "How It Works" section
const StepCard = ({ icon, title, description }) => (
  <div className="pt-6">
    <div className="flow-root bg-white rounded-lg px-6 pb-8">
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
            {icon}
          </span>
        </div>
        <h3 className="mt-6 text-lg font-medium text-gray-900 tracking-tight">{title}</h3>
        <p className="mt-3 text-base text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

// PricingCard component
const PricingCard = ({ plan }) => (
  <div 
    className={`${
      plan.highlight 
        ? 'border-indigo-600 border-2' 
        : 'border border-gray-200'
    } rounded-lg shadow-sm divide-y divide-gray-200 flex flex-col transition-transform duration-300 hover:shadow-md hover:-translate-y-1`}
  >
    <div className="p-6">
      <h2 className="text-xl font-medium text-gray-900">{plan.name}</h2>
      <p className="mt-3 text-sm text-gray-500">{plan.description}</p>
      <p className="mt-6">
        <span className="text-3xl font-extrabold text-gray-900">${plan.price}</span>
        <span className="text-base font-medium text-gray-500">{plan.period}</span>
      </p>
      <Link
        to="/pricing"
        className={`mt-6 block w-full py-2 px-6 border border-transparent rounded-md text-center font-medium ${
          plan.highlight
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
        }`}
      >
        {plan.cta}
      </Link>
    </div>
    <div className="pt-5 pb-6 px-6">
      <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
      <ul className="mt-4 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex">
            <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="ml-2 text-sm text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Enhanced CategoryCard component with improved fallback
const CategoryCard = ({ category }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="group relative bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        {!imageError ? (
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-xl font-bold text-gray-500">{category.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{category.title}</h3>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600">{category.description}</p>
        <div className="mt-4">
          <Link
            to={`/categories/${category.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Try Now
            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// VideoPopup component - to show videos based on device and language
const VideoPopup = ({ isOpen, onClose, videoSources }) => {
  const popupRef = useRef(null);
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Get browser language on mount
  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = browserLang.split('-')[0];
    if (['en', 'es', 'fr', 'de', 'it'].includes(lang)) {
      setCurrentLanguage(lang);
    }
  }, []);
  
  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSelectedDevice('mobile');
      } else if (window.innerWidth < 1024) {
        setSelectedDevice('tablet');
      } else {
        setSelectedDevice('desktop');
      }
    };
    
    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Default fallback video if no specific one is found
  const defaultVideo = 'https://kokomatto.netlify.app/hero.mp4';
  
  // Get the correct video based on device and language
  const getVideoSource = () => {
    if (!videoSources) return defaultVideo;
    
    // Try to find exact match for device + language
    const exactMatch = videoSources.find(
      source => source.device === selectedDevice && source.language === currentLanguage
    );
    if (exactMatch) return exactMatch.url;
    
    // Try to find match for device with any language
    const deviceMatch = videoSources.find(source => source.device === selectedDevice);
    if (deviceMatch) return deviceMatch.url;
    
    // Fallback to first available video or default
    return videoSources[0]?.url || defaultVideo;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div ref={popupRef} className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Product Overview</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="relative aspect-video bg-black">
          <video 
            className="w-full h-full object-contain" 
            controls 
            autoPlay
            key={getVideoSource()} // Force reload when source changes
          >
            <source src={getVideoSource()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Select Device:</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedDevice('desktop')}
                  className={`px-3 py-1.5 rounded text-sm ${selectedDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Desktop
                </button>
                <button 
                  onClick={() => setSelectedDevice('tablet')}
                  className={`px-3 py-1.5 rounded text-sm ${selectedDevice === 'tablet' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Tablet
                </button>
                <button 
                  onClick={() => setSelectedDevice('mobile')}
                  className={`px-3 py-1.5 rounded text-sm ${selectedDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Mobile
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">Select Language:</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentLanguage('en')}
                  className={`px-3 py-1.5 rounded text-sm ${currentLanguage === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setCurrentLanguage('es')}
                  className={`px-3 py-1.5 rounded text-sm ${currentLanguage === 'es' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Español
                </button>
                <button 
                  onClick={() => setCurrentLanguage('fr')}
                  className={`px-3 py-1.5 rounded text-sm ${currentLanguage === 'fr' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Français
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main HomePage component - updating only the Categories Section
const HomePage = () => {
  // Add state for category display settings
  const [categoryDisplaySettings, setCategoryDisplaySettings] = useState({
    desktop: 8,
    tablet: 4,
    mobile: 2
  });

  // Load category display settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('categoryDisplaySettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setCategoryDisplaySettings(parsedSettings);
      } catch (error) {
        console.error('Error parsing category display settings:', error);
      }
    }
  }, []);

  // Add state for user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  
  // Add this useEffect for checking authentication
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(authStatus);
    setUserRole(role || '');
  }, []);

  // Icons for How It Works section
  const stepIcons = [
    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>,
    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>,
    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>,
    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  ];

  // Step data
  const steps = [
    {
      title: "1. Subscribe to a Plan",
      description: "Choose the subscription tier that fits your business needs and get instant access to our API."
    },
    {
      title: "2. Integrate the API",
      description: "Add our shortcode or plugin to your e-commerce platform with just a few clicks."
    },
    {
      title: "3. Scan Your Products",
      description: "Upload and create 3D models of your products for customers to try virtually."
    },
    {
      title: "4. Customer Body Scan",
      description: "Customers use their camera to create a personal virtual model for accurate fitting."
    },
    {
      title: "5. Virtual Try-On",
      description: "Customers see how products look and fit on their body in real-time 3D visualization."
    },
    {
      title: "6. Customer Support",
      description: "Offer chat or video call assistance to help customers with their shopping experience."
    }
  ];

  // Enhanced categories with more items (8 total) for PC/tablet and keeping 4 for mobile
  const enhancedCategories = [
    {
      id: 'mens-clothing',
      title: "Men's Clothing",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'Virtual try-on for shirts, suits, pants and more men\'s apparel'
    },
    {
      id: 'womens-clothing',
      title: "Women's Clothing",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'See how dresses, blouses, skirts and other women\'s items fit your shape'
    },
    {
      id: 'footwear',
      title: 'Footwear',
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'Try on shoes, boots, and sandals to find your perfect fit'
    },
    {
      id: 'accessories',
      title: 'Accessories',
      image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: 'Virtual try-on for glasses, watches, jewelry and more'
    },
    {
      id: 'athletic',
      title: 'Athletic Wear',
      image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'Try on activewear, sports jerseys, and workout gear'
    },
    {
      id: 'formal',
      title: 'Formal Wear',
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'Find the perfect formal attire for special occasions'
    },
    {
      id: 'outerwear',
      title: 'Outerwear',
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'Try on jackets, coats, and other outerwear items'
    },
    {
      id: 'custom',
      title: 'Custom Products',
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: 'Scan and upload your own products for a personalized try-on experience'
    }
  ];

  // Add this inside the HomePage component to create the navigation menu
  const [pages, setPages] = useState([]);
  const [footerPages, setFooterPages] = useState({
    main: [],
    company: [],
    legal: [],
    resources: []
  });

  // Load pages from localStorage that were configured in the dashboard
  useEffect(() => {
    try {
      const pagesData = JSON.parse(localStorage.getItem('websitePages') || '[]');
      if (pagesData.length > 0) {
        setPages(pagesData.filter(page => page.inMainMenu && page.status === 'published')
          .sort((a, b) => (a.mainMenuOrder || 0) - (b.mainMenuOrder || 0)));
        
        // Organize footer pages by section
        const footerData = {
          main: [],
          company: [],
          legal: [],
          resources: []
        };
        
        pagesData.filter(page => page.inFooter && page.status === 'published')
          .forEach(page => {
            const section = page.footerSection || 'main';
            if (footerData[section]) {
              footerData[section].push(page);
            } else {
              footerData.main.push(page);
            }
          });
        
        setFooterPages(footerData);
      }
    } catch (error) {
      console.error('Error loading website pages:', error);
    }
  }, []);

  // Add state for billing option toggle
  const [annualBilling, setAnnualBilling] = useState(false);

  // Add state for video popup
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoSources, setVideoSources] = useState([
    { device: 'desktop', language: 'en', url: 'https://kokomatto.netlify.app/hero.mp4' },
    { device: 'tablet', language: 'en', url: 'https://kokomatto.netlify.app/hero.mp4' },
    { device: 'mobile', language: 'en', url: 'https://kokomatto.netlify.app/hero.mp4' }
  ]);

  // Load video sources from localStorage if available (set from dashboard)
  useEffect(() => {
    try {
      const savedVideoSources = JSON.parse(localStorage.getItem('dashboardVideoSources'));
      if (savedVideoSources && Array.isArray(savedVideoSources) && savedVideoSources.length > 0) {
        // Make sure we keep the tablet video path
        const newSources = [...savedVideoSources];
        const tabletSourceIndex = newSources.findIndex(source => source.device === 'tablet');
        
        if (tabletSourceIndex !== -1) {
          newSources[tabletSourceIndex].url = '/assets/videos/tablet.mp4';
        } else {
          newSources.push({ 
            device: 'tablet', 
            language: 'en', 
            url: '/assets/videos/tablet.mp4' 
          });
        }
        
        setVideoSources(newSources);
      }
    } catch (error) {
      console.error('Error loading video sources:', error);
    }
  }, []);

  return (
    <Layout>
      {/* Main content */}
      <div className="flex-grow">
        {/* Banner positioned above the hero section */}
        <AdminBanner />
        
        {/* Hero Section with full-width background image and buttons */}
        <div className="relative">
          {/* Full-width background image - replaced with video */}
          <div 
            className="relative w-full overflow-hidden"
            style={{
              height: '65vh', // Maintained the same height
            }}
          >
            {/* Background video */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://kokomatto.netlify.app/hero.mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for better text readability */}
            
            {/* Add buttons back centered in the hero */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-wrap justify-center gap-4 z-10">
                  <Link
                    to="/try-on"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg font-medium transition-colors duration-200 flex items-center shadow-lg"
                  >
                    Try Demo
                  </Link>
                  <Link
                    to="/pricing"
                    className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-8 rounded-md text-lg font-medium transition-colors duration-200 flex items-center shadow-lg"
                  >
                    View Pricing
                  </Link>
                  <button
                    onClick={() => setShowVideoPopup(true)}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-md text-lg font-medium transition-colors duration-200 flex items-center shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    See Video
                  </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Popup */}
        <VideoPopup 
          isOpen={showVideoPopup} 
          onClose={() => setShowVideoPopup(false)} 
          videoSources={videoSources}
        />
        
        {/* Text section with proper spacing and style matching other sections */}
        <div className="hidden md:block bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Revolutionize</h2>
              <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">E-Commerce with 3D Try-On</h3>
              <p className="mt-4 text-lg text-gray-600">
                Increase sales and reduce returns with our cutting-edge 3D virtual try-on API. Let customers try before they buy, directly on your e-commerce platform.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-indigo-600 text-sm font-semibold uppercase tracking-wider mb-2">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Integration, Powerful Results</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
              Our 3D virtual try-on API seamlessly integrates with your e-commerce platform.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                  <StepCard 
                    key={index}
                    icon={stepIcons[index]}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
        </section>

        {/* Pricing/Subscription Section */}
        <div className="bg-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Subscription Plans for Every Business
              </p>
              <p className="max-w-xl mt-4 mx-auto text-lg text-gray-500">
                Choose the plan that fits your business needs and start transforming your e-commerce experience.
              </p>
              
              {/* Billing toggle switch */}
              <div className="relative flex items-center justify-center mt-8 mb-4">
                <span className={`mr-4 text-sm ${!annualBilling ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Monthly Billing</span>
                <button 
                  onClick={() => setAnnualBilling(!annualBilling)}
                  className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors ease-in-out duration-200 ${
                    annualBilling ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                  aria-pressed={annualBilling}
                  aria-labelledby="billing-toggle"
                >
                  <span className="sr-only">Toggle billing frequency</span>
                  <span 
                    className={`${
                      annualBilling ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
                  />
                </button>
                <span className={`ml-4 text-sm ${annualBilling ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                  Annual Billing 
                  <span className="ml-1.5 py-0.5 px-1.5 bg-green-100 text-green-800 text-xs rounded">Save 20%</span>
                </span>
              </div>
            </div>
              
            <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className={`${plan.highlight ? 'border-indigo-600 border-2' : 'border border-gray-200'} rounded-lg shadow-sm divide-y divide-gray-200 flex flex-col transition-transform duration-300 hover:shadow-md hover:-translate-y-1`}>
                  <div className="p-6">
                    <h2 className="text-xl font-medium text-gray-900">{plan.name}</h2>
                    <p className="mt-3 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-6">
                      <span className="text-3xl font-extrabold text-gray-900">
                        ${annualBilling ? plan.annualPrice : plan.price}
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        {annualBilling ? '/year' : plan.period}
                      </span>
                      
                      {annualBilling && (
                        <span className="ml-2 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          Save {plan.discount}%
                        </span>
                      )}
                    </p>
                    
                    {annualBilling && (
                      <p className="text-sm text-gray-500 mt-1">
                        Equivalent to ${Math.round(plan.annualPrice / 12)} per month
                      </p>
                    )}
                    
                    <Link
                      to="/pricing"
                      className={`mt-6 block w-full py-2 px-6 border border-transparent rounded-md text-center font-medium ${
                        plan.highlight
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                  <div className="pt-5 pb-6 px-6">
                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                    <ul className="mt-4 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex">
                          <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-2 text-sm text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section - Display categories based on admin settings */}
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Categories</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Explore Our Virtual Try-On Categories
              </p>
              <p className="max-w-xl mt-4 mx-auto text-lg text-gray-500">
                See how our technology works for different products and styles.
              </p>
            </div>
              
            <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Display categories based on device type settings from admin */}
              {enhancedCategories.map((category, index) => (
                <div key={category.id} 
                  className={`
                    ${index >= categoryDisplaySettings.mobile ? 'hidden' : ''} 
                    ${index >= categoryDisplaySettings.tablet ? 'sm:hidden' : ''} 
                    ${index >= categoryDisplaySettings.desktop ? 'lg:hidden' : ''}
                    ${index < categoryDisplaySettings.mobile ? '' : 'sm:block'}
                    ${index < categoryDisplaySettings.tablet ? '' : 'lg:block'}
                  `}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/categories"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - Start your free trial today */}
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Transform how your customers shop.</span>
              <span className="block">Start your free trial today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              No credit card required. Get started with our 14-day free trial and experience how 3D virtual try-on can revolutionize your e-commerce business.
            </p>
              <Link 
              to="/signup"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Sign up for free
              </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;