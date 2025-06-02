import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SharedSocialMedia from './SharedSocialMedia';

const SharedFooter = () => {
  // Languages and currencies options
  const languages = [
    { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it-IT', label: 'Italiano', flag: '🇮🇹' },
    { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
    { code: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD' },
    { code: 'EUR', symbol: '€', label: 'EUR' },
    { code: 'GBP', symbol: '£', label: 'GBP' },
    { code: 'JPY', symbol: '¥', label: 'JPY' },
    { code: 'CAD', symbol: 'CA$', label: 'CAD' },
    { code: 'AUD', symbol: 'AU$', label: 'AUD' },
  ];

  // State for language and currency
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en-US');
  const [currency, setCurrency] = useState(localStorage.getItem('preferredCurrency') || 'USD');
  
  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    // Additionally, you could dispatch a custom event for other components to react to
    window.dispatchEvent(new Event('languagechange'));
  };
  
  // Handle currency change
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
    window.dispatchEvent(new Event('currencychange'));
  };

  // Footer link sections
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Careers", url: "/careers" },
        { label: "Press", url: "/press" },
        { label: "Blog", url: "/blog" },
        { label: "Contact", url: "/contact" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", url: "/help" },
        { label: "Safety Center", url: "/safety" },
        { label: "Community Guidelines", url: "/community-guidelines" },
        { label: "Cookies Policy", url: "/cookies" },
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Terms of Service", url: "/terms" },
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Virtual Try-On", url: "/try-on" },
        { label: "Merchant Portal", url: "/merchants" },
        { label: "Affiliate Program", url: "/affiliate/signup" },
      ]
    },
  ];

  // Newsletter form handling
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically make an API call to subscribe the user
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Newsletter Section */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest products, features and updates.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l outline-none border border-gray-700 focus:border-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r font-medium transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm mt-2">
                  Thank you for subscribing!
                </p>
              )}
            </form>
            
            {/* Social Media Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
              <SharedSocialMedia variant="footer" language={language.split('-')[0]} />
            </div>
            
            {/* Language and Currency Selector */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="language-select" className="block text-gray-400 text-sm mb-2">
                  Language
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={handleLanguageChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="currency-select" className="block text-gray-400 text-sm mb-2">
                  Currency
                </label>
                <select
                  id="currency-select"
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* App Store Links Section */}
        <div className="mt-10 border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <h3 className="text-lg font-semibold mb-4 sm:mb-0 sm:mr-4">Get our mobile app:</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-black border border-gray-600 rounded-lg px-4 py-2 h-12 min-w-[135px] transition-transform hover:scale-105"
                aria-label="Download on the Apple App Store"
              >
                <img 
                  src={require('../../assets/images/appstore.png')} 
                  alt="Download on the App Store" 
                  style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-black border border-gray-600 rounded-lg px-4 py-2 h-12 min-w-[135px] transition-transform hover:scale-105"
                aria-label="Get it on Google Play"
              >
                <img 
                  src={require('../../assets/images/playstore.png')} 
                  alt="Get it on Google Play" 
                  style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} KOKOMATTO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter; 