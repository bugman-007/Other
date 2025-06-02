import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Casual Summer Outfit',
      type: 'Complete Outfit',
      dateAdded: '2023-05-10',
      modelType: '3D Full Body',
      previewImage: 'https://placehold.co/300x300/gray/white?text=3D+Outfit',
      modelFeatures: ['Realistic textures', 'Moving fabric simulation', 'Size adjustable'],
      lastTried: '2023-05-18'
    },
    {
      id: 2,
      name: 'Classic Denim Jeans',
      type: 'Bottom',
      dateAdded: '2023-05-12',
      modelType: '3D Lower Body',
      previewImage: 'https://placehold.co/300x300/indigo/white?text=3D+Jeans',
      modelFeatures: ['Multiple wash options', 'Fit customization', 'Stretch visualization'],
      lastTried: '2023-05-15'
    },
    {
      id: 3,
      name: 'Premium Running Shoes',
      type: 'Footwear',
      dateAdded: '2023-05-15',
      modelType: '3D Footwear',
      previewImage: 'https://placehold.co/300x300/brown/white?text=3D+Shoes',
      modelFeatures: ['Dynamic angle view', 'Size comparison', 'Color variations'],
      lastTried: '2023-05-16'
    },
    {
      id: 4,
      name: 'Smart Sunglasses',
      type: 'Accessory',
      dateAdded: '2023-05-16',
      modelType: 'AR Facial',
      previewImage: 'https://placehold.co/300x300/darkgreen/white?text=AR+Glasses',
      modelFeatures: ['Face adaptation', 'Light simulation', 'Multiple angles'],
      lastTried: '2023-05-17'
    },
    {
      id: 5,
      name: 'Business Formal Suit',
      type: 'Complete Outfit',
      dateAdded: '2023-05-18',
      modelType: '3D Full Body',
      previewImage: 'https://placehold.co/300x300/gray/white?text=3D+Suit',
      modelFeatures: ['Tailoring options', 'Multiple fabric textures', 'Accessory pairing'],
      lastTried: '2023-05-19'
    }
  ]);

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/');
    } else {
      // In a real app, we would fetch wishlist from an API here
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [navigate]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Remove item from saved models
  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  // Try on model
  const tryOnModel = (item) => {
    navigate(`/try-on/${item.id}`);
  };

  // View model details
  const viewModelDetails = (itemId) => {
    navigate(`/try-on/${itemId}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              My Saved 3D Models
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No saved 3D models</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try on items and save them to your collection for easy access.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate('/categories')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Try-On Models
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg relative">
                {/* Model preview image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.previewImage} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center cursor-pointer"
                    onClick={() => viewModelDetails(item.id)}
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.modelType}
                  </div>
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow hover:bg-red-50 focus:outline-none"
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove saved model"
                  >
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
                
                {/* Model details */}
                <div className="p-4">
                  <h3 
                    className="text-lg font-medium text-gray-900 hover:text-indigo-600 cursor-pointer" 
                    onClick={() => viewModelDetails(item.id)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.type}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.modelFeatures.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    <p>Added on {formatDate(item.dateAdded)}</p>
                    <p>Last tried on {formatDate(item.lastTried)}</p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                      onClick={() => tryOnModel(item)}
                    >
                      Try On
                    </button>
                    <button
                      className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => viewModelDetails(item.id)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-gray-50 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold mb-3">About Saved 3D Models</h3>
          <p className="text-gray-700 mb-4">
            Your saved models collection allows you to keep track of items you've tried on virtually. 
            You can quickly access these models anytime without having to search for them again.
          </p>
          <div className="bg-white p-4 rounded border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Save your favorite virtual try-on models</li>
              <li>Quickly access models you've customized</li>  
              <li>Try different combinations with saved items</li>
              <li>Share your saved models with friends</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;