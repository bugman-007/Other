import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const regions = [
  { code: 'ar', name: 'Argentina', language: 'Español', currency: 'ARS' },
  { code: 'au', name: 'Australia', language: 'English', currency: 'AUD' },
  { code: 'be-nl', name: 'Belgium', language: 'Nederlands', currency: 'EUR' },
  { code: 'be-fr', name: 'Belgian', language: 'French', currency: 'EUR' },
  { code: 'br', name: 'Brazil', language: 'Portugues', currency: 'BRL' },
  { code: 'ca-en', name: 'Canada', language: 'English', currency: 'CAD' },
  { code: 'ca-fr', name: 'Canada', language: 'Français', currency: 'CAD' },
  { code: 'cl', name: 'Chile', language: 'Español', currency: 'CLP' },
  { code: 'co', name: 'Colombia', language: 'Español', currency: 'COP' },
  { code: 'dk', name: 'Danmark', language: 'Dansk', currency: 'DKK' },
  { code: 'de', name: 'Deutschland', language: 'Deutsch', currency: 'EUR' },
  { code: 'es', name: 'España', language: 'Español', currency: 'EUR' },
  { code: 'us-es', name: 'United States', language: 'Español', currency: 'USD' },
  { code: 'fr', name: 'France', language: 'Français', currency: 'EUR' },
  { code: 'hk', name: 'Hong Kong', language: 'English', currency: 'HKD' },
  { code: 'in-en', name: 'India', language: 'English', currency: 'INR' },
  { code: 'in-hi', name: 'India', language: 'हिंदी', currency: 'INR' },
  { code: 'id', name: 'Indonesia', language: 'Bahasa Indonesia', currency: 'IDR' },
  { code: 'ie', name: 'Ireland', language: 'English', currency: 'EUR' },
  { code: 'il', name: 'Israel', language: 'English', currency: 'ILS' },
  { code: 'it', name: 'Italy', language: 'Italian', currency: 'EUR' },
  { code: 'my', name: 'Malaysia', language: 'English', currency: 'MYR' },
  { code: 'mx', name: 'Mexico', language: 'Español', currency: 'MXN' },
  { code: 'nl', name: 'Nederland', language: 'Nederlands', currency: 'EUR' },
  { code: 'nz', name: 'New Zealand', language: 'English', currency: 'NZD' },
  { code: 'no', name: 'Norge', language: 'Bokmål', currency: 'NOK' },
  { code: 'at', name: 'Österreich', language: 'Deutsch', currency: 'EUR' },
  { code: 'pk', name: 'Pakistan', language: 'English', currency: 'PKR' },
  { code: 'pe', name: 'Peru', language: 'Español', currency: 'PEN' },
  { code: 'ph', name: 'Philippines', language: 'English', currency: 'PHP' },
  { code: 'pl', name: 'Polska', language: 'Polski', currency: 'PLN' },
  { code: 'pt', name: 'Portugal', language: 'Português', currency: 'EUR' },
  { code: 'ch-de', name: 'Schweiz', language: 'Deutsch', currency: 'CHF' },
  { code: 'sg', name: 'Singapore', language: 'English', currency: 'SGD' },
  { code: 'za', name: 'South Africa', language: 'English', currency: 'ZAR' },
  { code: 'ch-fr', name: 'Suisse', language: 'Français', currency: 'CHF' },
  { code: 'se', name: 'Sverige', language: 'Svenska', currency: 'SEK' },
  { code: 'ch-it', name: 'Switzerland', language: 'Italian', currency: 'CHF' },
  { code: 'tr', name: 'Türkiye', language: 'Türkçe', currency: 'TRY' },
  { code: 'ae', name: 'United Arab Emirates', language: 'English', currency: 'AED' },
  { code: 'gb', name: 'United Kingdom', language: 'English', currency: 'GBP' },
  { code: 'us', name: 'United States', language: 'English', currency: 'USD' },
  { code: 'vn', name: 'Việt Nam', language: 'Tiếng Việt', currency: 'VND' },
  { code: 'ua', name: 'Україна', language: 'Українська', currency: 'UAH' },
  { code: 'ae-ar', name: 'اإلمارات العربية المتحدة', language: 'اللغة العربية', currency: 'AED' },
  { code: 'th', name: 'ไทย', language: 'ไทย', currency: 'THB' },
  { code: 'kr', name: '대한민국', language: '한국어', currency: 'KRW' },
  { code: 'tw', name: '台灣', language: '繁體中文', currency: 'TWD' },
  { code: 'sg-zh', name: '新加坡', language: '简体中文', currency: 'SGD' },
  { code: 'jp', name: '日本', language: '日本語', currency: 'JPY' },
  { code: 'hk-zh', name: '香港', language: '繁體中文', currency: 'HKD' },
];

const currencies = [
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'USD', symbol: '$' },
  { code: 'AED', symbol: 'AED' },
  { code: 'AUD', symbol: '$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'CHF', symbol: 'CHF' },
  { code: 'CLP', symbol: '$' },
  { code: 'CNY', symbol: '¥' },
  { code: 'COP', symbol: '$' },
  { code: 'DKK', symbol: 'kr' },
  { code: 'HKD', symbol: 'HK$' },
  { code: 'IDR', symbol: 'Rp' },
  { code: 'ILS', symbol: '₪' },
  { code: 'INR', symbol: '₹' },
  { code: 'JPY', symbol: '¥' },
  { code: 'KRW', symbol: '₩' },
  { code: 'MXN', symbol: 'MXN' },
  { code: 'MYR', symbol: 'RM' },
  { code: 'NZD', symbol: '$' },
  { code: 'PEN', symbol: 'S/' },
  { code: 'PHP', symbol: '₱' },
  { code: 'PKR', symbol: '₨' },
  { code: 'PLN', symbol: 'zł' },
  { code: 'SAR', symbol: 'SAR' },
  { code: 'SEK', symbol: 'kr' },
  { code: 'SGD', symbol: 'SG$' },
  { code: 'THB', symbol: '฿' },
  { code: 'TWD', symbol: 'NT$' },
  { code: 'UAH', symbol: '₴' },
  { code: 'VND', symbol: '₫' },
  { code: 'ZAR', symbol: 'R' },
];

const RegionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('us');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const modalRef = useRef(null);

  // Get the language and region from browser or localStorage on first render
  useEffect(() => {
    const savedRegion = localStorage.getItem('region') || 'us';
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    setSelectedRegion(savedRegion);
    setSelectedCurrency(savedCurrency);
  }, []);

  // Save selected region and currency to localStorage when changed
  useEffect(() => {
    localStorage.setItem('region', selectedRegion);
    localStorage.setItem('currency', selectedCurrency);
  }, [selectedRegion, selectedCurrency]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleRegionSelect = (regionCode) => {
    setSelectedRegion(regionCode);
    // Find the selected region's default currency
    const region = regions.find(r => r.code === regionCode);
    if (region) {
      setSelectedCurrency(region.currency);
    }
    setIsOpen(false);
  };

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    setIsOpen(false);
  };

  // Find the currently selected region
  const currentRegion = regions.find(r => r.code === selectedRegion) || regions.find(r => r.code === 'us');
  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies.find(c => c.code === 'USD');

  const buttonLabel = `${currentRegion.language} | ${currentCurrency.code} ${currentCurrency.symbol}`;

  const RegionModal = () => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div 
          ref={modalRef}
          className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Select Your Region and Language</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-gray-500">
              Your current region: <span className="font-medium">{currentRegion.name} - {currentRegion.language}</span>
            </p>
            <p className="text-gray-500">
              Your current currency: <span className="font-medium">{currentCurrency.code} {currentCurrency.symbol}</span>
            </p>
          </div>
          
          {/* Regions */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose your Country/Region</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-4">
              {regions.map((region) => (
                <button
                  key={region.code}
                  onClick={() => handleRegionSelect(region.code)}
                  className={`text-left py-2 px-3 rounded-md transition-colors ${
                    selectedRegion === region.code 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{region.name}</div>
                  <div className="text-sm text-gray-500">{region.language}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Currencies */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose your Currency</h3>
            <div className="flex flex-wrap gap-2">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency.code)}
                  className={`py-2 px-4 border rounded-md transition-colors ${
                    selectedCurrency === currency.code 
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-800' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {currency.code} {currency.symbol}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1 text-sm font-medium hover:text-indigo-600 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
          />
        </svg>
        <span>{buttonLabel}</span>
      </button>
      <RegionModal />
    </>
  );
};

export default RegionSelector; 