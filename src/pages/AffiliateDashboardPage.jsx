import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AffiliateLayout from '../components/AffiliateLayout';
import { FaLink, FaUsers, FaMoneyBillWave, FaChartLine, FaCopy, FaExternalLinkAlt, FaDownload, FaBullhorn, FaExchangeAlt, 
         FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaYoutube, FaGlobe, FaLanguage, FaEdit, FaPlus, FaTrash, FaCheck, FaShare } from 'react-icons/fa';

const AffiliateDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCustomLinkForm, setShowCustomLinkForm] = useState(false);
  const [customLinkName, setCustomLinkName] = useState('');
  const [customLinkUrl, setCustomLinkUrl] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [userLanguage, setUserLanguage] = useState('en-US');
  const [userCurrency, setUserCurrency] = useState('USD');
  const [userCountry, setUserCountry] = useState('United States');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [editingSocialChannel, setEditingSocialChannel] = useState(null);
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [newSocialChannel, setNewSocialChannel] = useState({
    platform: 'facebook',
    url: '',
    displayName: ''
  });
  const [copiedSocialShare, setCopiedSocialShare] = useState(false);
  
  // Social media channels by language with default values
  const defaultSocialMediaChannels = {
    'en-US': {
      facebook: 'https://www.facebook.com/profile.php?id=61568471678358',
      instagram: 'https://www.instagram.com/koko_matto/',
      twitter: 'https://x.com/KOKOMATTO2025',
      tiktok: 'http://www.tiktok.com/@kokomattoalldress',
      youtube: 'http://www.youtube.com/@KokoMatto-Allwear',
      currency: 'USD',
      currencySymbol: '$',
      language: 'English'
    },
    'es-ES': {
      facebook: 'https://www.facebook.com/profile.php?id=61568471678358',
      instagram: 'https://www.instagram.com/koko_matto/',
      twitter: 'https://x.com/KOKOMATTO2025',
      tiktok: 'http://www.tiktok.com/@kokomattoalldress',
      youtube: 'http://www.youtube.com/@KokoMatto-Allwear',
      currency: 'EUR',
      currencySymbol: '€',
      language: 'Spanish'
    },
    'fr-FR': {
      facebook: 'https://www.facebook.com/profile.php?id=61568471678358',
      instagram: 'https://www.instagram.com/koko_matto/',
      twitter: 'https://x.com/KOKOMATTO2025',
      tiktok: 'http://www.tiktok.com/@kokomattoalldress',
      youtube: 'http://www.youtube.com/@KokoMatto-Allwear',
      currency: 'EUR',
      currencySymbol: '€',
      language: 'French'
    },
    'de-DE': {
      facebook: 'https://www.facebook.com/profile.php?id=61568471678358',
      instagram: 'https://www.instagram.com/koko_matto/',
      twitter: 'https://x.com/KOKOMATTO2025',
      tiktok: 'http://www.tiktok.com/@kokomattoalldress',
      youtube: 'http://www.youtube.com/@KokoMatto-Allwear',
      currency: 'EUR',
      currencySymbol: '€',
      language: 'German'
    },
    'it-IT': {
      facebook: 'https://www.facebook.com/kokomatto.it',
      instagram: 'https://www.instagram.com/koko_matto_it/',
      twitter: 'https://x.com/KOKOMATTO_IT',
      tiktok: 'https://tiktok.com/@kokobeoservices_it',
      youtube: 'https://www.youtube.com/channel/UCawx5NAc4oJqNfDwyJtpGQQ/it',
      currency: 'EUR',
      currencySymbol: '€',
      language: 'Italian'
    },
    'zh-CN': {
      facebook: 'https://www.facebook.com/kokomatto.cn',
      instagram: 'https://www.instagram.com/koko_matto_cn/',
      twitter: 'https://x.com/KOKOMATTO_CN',
      tiktok: 'https://tiktok.com/@kokobeoservices_cn',
      youtube: 'https://www.youtube.com/channel/UCawx5NAc4oJqNfDwyJtpGQQ/zh-cn',
      currency: 'CNY',
      currencySymbol: '¥',
      language: 'Chinese'
    },
    'ja-JP': {
      facebook: 'https://www.facebook.com/kokomatto.jp',
      instagram: 'https://www.instagram.com/koko_matto_jp/',
      twitter: 'https://x.com/KOKOMATTO_JP',
      tiktok: 'https://tiktok.com/@kokobeoservices_jp',
      youtube: 'https://www.youtube.com/channel/UCawx5NAc4oJqNfDwyJtpGQQ/ja',
      currency: 'JPY',
      currencySymbol: '¥',
      language: 'Japanese'
    }
  };
  
  // Initialize affiliate's custom social channels from localStorage or empty object
  const [affiliateSocialChannels, setAffiliateSocialChannels] = useState(() => {
    const savedChannels = localStorage.getItem('affiliateSocialChannels');
    return savedChannels ? JSON.parse(savedChannels) : {};
  });

  // Combined social media channels (default + affiliate custom)
  const [socialMediaChannels, setSocialMediaChannels] = useState(() => {
    const combined = {...defaultSocialMediaChannels};
    const savedChannels = localStorage.getItem('affiliateSocialChannels');
    if (savedChannels) {
      const affiliateChannels = JSON.parse(savedChannels);
      Object.keys(affiliateChannels).forEach(lang => {
        combined[lang] = {...(combined[lang] || {}), ...affiliateChannels[lang]};
      });
    }
    return combined;
  });

  // Save affiliate social channels to localStorage when updated
  useEffect(() => {
    localStorage.setItem('affiliateSocialChannels', JSON.stringify(affiliateSocialChannels));
    
    // Update combined channels
    const combined = {...defaultSocialMediaChannels};
    Object.keys(affiliateSocialChannels).forEach(lang => {
      combined[lang] = {...(combined[lang] || {}), ...affiliateSocialChannels[lang]};
    });
    setSocialMediaChannels(combined);
  }, [affiliateSocialChannels]);

  // Handle adding a new social channel
  const handleAddSocialChannel = () => {
    if (!newSocialChannel.url || !newSocialChannel.platform) return;
    
    setAffiliateSocialChannels(prev => {
      const updated = {...prev};
      if (!updated[selectedLanguage]) {
        updated[selectedLanguage] = {};
      }
      updated[selectedLanguage][newSocialChannel.platform] = newSocialChannel.url;
      return updated;
    });
    
    // Reset form
    setNewSocialChannel({
      platform: 'facebook',
      url: '',
      displayName: ''
    });
    setShowAddSocialModal(false);
  };
  
  // Handle editing a social channel
  const handleEditSocialChannel = (platform) => {
    setEditingSocialChannel(platform);
    
    // Pre-fill form with existing data
    const channelUrl = socialMediaChannels[selectedLanguage]?.[platform] || '';
    setNewSocialChannel({
      platform,
      url: channelUrl,
      displayName: ''
    });
  };
  
  // Save edited social channel
  const handleSaveEditedChannel = () => {
    if (!newSocialChannel.url || !editingSocialChannel) return;
    
    setAffiliateSocialChannels(prev => {
      const updated = {...prev};
      if (!updated[selectedLanguage]) {
        updated[selectedLanguage] = {};
      }
      updated[selectedLanguage][editingSocialChannel] = newSocialChannel.url;
      return updated;
    });
    
    // Reset form
    setEditingSocialChannel(null);
    setNewSocialChannel({
      platform: 'facebook',
      url: '',
      displayName: ''
    });
  };
  
  // Handle deleting a custom social channel
  const handleDeleteSocialChannel = (platform) => {
    setAffiliateSocialChannels(prev => {
      const updated = {...prev};
      if (updated[selectedLanguage] && updated[selectedLanguage][platform]) {
        const newLangChannels = {...updated[selectedLanguage]};
        delete newLangChannels[platform];
        updated[selectedLanguage] = newLangChannels;
      }
      return updated;
    });
  };
  
  // Copy social channel sharing link
  const copyShareLink = (platform) => {
    const url = socialMediaChannels[selectedLanguage][platform];
    if (url) {
      navigator.clipboard.writeText(url);
      setCopiedSocialShare(platform);
      setTimeout(() => setCopiedSocialShare(false), 2000);
    }
  };

  // Available languages
  const availableLanguages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸', currency: 'USD', symbol: '$' },
    { code: 'es-ES', name: 'Spanish (Spain)', flag: '🇪🇸', currency: 'EUR', symbol: '€' },
    { code: 'fr-FR', name: 'French (France)', flag: '🇫🇷', currency: 'EUR', symbol: '€' },
    { code: 'de-DE', name: 'German (Germany)', flag: '🇩🇪', currency: 'EUR', symbol: '€' },
    { code: 'it-IT', name: 'Italian (Italy)', flag: '🇮🇹', currency: 'EUR', symbol: '€' },
    { code: 'zh-CN', name: 'Chinese (China)', flag: '🇨🇳', currency: 'CNY', symbol: '¥' },
    { code: 'ja-JP', name: 'Japanese (Japan)', flag: '🇯🇵', currency: 'JPY', symbol: '¥' },
  ];
  
  // Detect user language and location
  useEffect(() => {
    // In a real application, this would be done with a geolocation API or IP detection service
    // For demo purposes, we'll use browser's language as a fallback
    const detectUserLocation = async () => {
      try {
        // Mock IP detection (in real implementation, this would call a geolocation API)
        // This is a simplified example - in production use a service like ipapi.co, ipstack, etc.
        const browserLanguage = navigator.language || 'en-US';
        const languageCode = availableLanguages.find(lang => lang.code === browserLanguage) 
          ? browserLanguage 
          : 'en-US';
          
        setUserLanguage(languageCode);
        setSelectedLanguage(languageCode);
        
        // Set country and currency based on language code
        const langData = availableLanguages.find(lang => lang.code === languageCode);
        if (langData) {
          setUserCurrency(langData.currency);
          // Extract country name from language name
          const countryName = langData.name.split('(')[1]?.replace(')', '') || 'United States';
          setUserCountry(countryName);
        }
      } catch (error) {
        console.error('Error detecting location:', error);
        // Default to English/USD if detection fails
        setUserLanguage('en-US');
        setUserCurrency('USD');
        setUserCountry('United States');
        setSelectedLanguage('en-US');
      }
    };
    
    detectUserLocation();
  }, []);
  
  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    
    // Update preferred language in localStorage for persistence
    localStorage.setItem('preferredLanguage', languageCode);
    
    // In a full implementation, this would also update the UI language
    // and potentially reload content in the selected language
  };
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'affiliate' && userRole !== 'merchant') {
      // Redirect to appropriate page based on role
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }
  }, [navigate]);
  
  // Extract tab from URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/affiliate/dashboard') {
      setActiveTab('overview'); // Default tab
    } else {
      // Get the last part of the URL (e.g., /affiliate/dashboard/links -> links)
      const tab = path.split('/').pop();
      if (['overview', 'links', 'earnings', 'materials', 'social', 'profile', 'settings', 'support'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [location]);

  const navigateToTab = (tab) => {
    setActiveTab(tab);
    navigate(`/affiliate/dashboard/${tab}`);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreateCustomLink = () => {
    // Logic to create custom link would go here
    setShowCustomLinkForm(false);
    setCustomLinkName('');
    setCustomLinkUrl('');
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    // Redirect to login page
    navigate('/login');
  };

  // Sample data
  const stats = [
    { id: 1, name: 'Total Clicks', value: '728', icon: <FaUsers className="h-6 w-6 text-purple-500" /> },
    { id: 2, name: 'Total Conversions', value: '79', icon: <FaExchangeAlt className="h-6 w-6 text-green-500" /> },
    { id: 3, name: 'Conversion Rate', value: '10.9%', icon: <FaChartLine className="h-6 w-6 text-indigo-500" /> },
    { id: 4, name: 'Earnings This Month', value: '$384.50', icon: <FaMoneyBillWave className="h-6 w-6 text-green-500" /> },
  ];

  const referralLinks = [
    { 
      id: 1, 
      name: 'Main Try-On Page', 
      url: 'https://kokomatto.com/try-on?ref=AF7721', 
      clicks: 437,
      conversions: 53,
      lastClicked: '2 hours ago' 
    },
    { 
      id: 2, 
      name: 'Summer Collection', 
      url: 'https://kokomatto.com/summer-collection?ref=AF7721', 
      clicks: 183,
      conversions: 19,
      lastClicked: '4 hours ago' 
    },
    { 
      id: 3, 
      name: 'Accessories Page', 
      url: 'https://kokomatto.com/accessories?ref=AF7721', 
      clicks: 108,
      conversions: 7,
      lastClicked: '1 day ago' 
    },
  ];

  const recentReferrals = [
    { id: 1, date: '2023-09-18', source: 'Instagram', earnings: '$12.50', status: 'Paid' },
    { id: 2, date: '2023-09-17', source: 'Twitter', earnings: '$8.75', status: 'Paid' },
    { id: 3, date: '2023-09-15', source: 'Blog', earnings: '$24.00', status: 'Pending' },
    { id: 4, date: '2023-09-12', source: 'Facebook', earnings: '$15.25', status: 'Paid' },
  ];

  const paymentHistory = [
    { id: 1, date: '2023-09-01', amount: '$245.75', method: 'PayPal', status: 'Completed' },
    { id: 2, date: '2023-08-01', amount: '$187.50', method: 'Bank Transfer', status: 'Completed' },
    { id: 3, date: '2023-07-01', amount: '$320.00', method: 'PayPal', status: 'Completed' },
  ];

  const marketingMaterials = [
    { id: 1, name: 'Product Overview PDF', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'Social Media Templates', type: 'ZIP', size: '8.7 MB' },
    { id: 3, name: 'Brand Guidelines', type: 'PDF', size: '3.1 MB' },
    { id: 4, name: 'Promotional Video', type: 'MP4', size: '24.2 MB' },
  ];

  // Navigation tabs for the dashboard
  const tabs = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'links', label: 'Affiliate Links' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'materials', label: 'Marketing' },
    { id: 'social', label: 'Social Media' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'support', label: 'Support' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
            
            {/* Stats cards with enhanced styling */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-gray-50 p-3 rounded-lg">
                        {stat.icon}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                        <dd className="flex items-baseline mt-1">
                          <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Referral Links Section */}
            <div className="bg-white shadow-md rounded-lg border border-gray-100 mb-8">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Referral Links</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Share these links to earn commissions.</p>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-5">
                  {referralLinks.map((link) => (
                    <div key={link.id} className="border border-gray-200 rounded-md p-5 hover:border-gray-300 transition-colors duration-200">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="text-md font-medium text-gray-900">{link.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{link.clicks} clicks, {link.conversions} conversions</span>
                          <button
                            onClick={() => handleCopyLink(link.url)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          >
                            <FaCopy className="mr-1 h-4 w-4" />
                            {copiedLink ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 break-all bg-gray-50 p-2 rounded">{link.url}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500">Last clicked: {link.lastClicked}</span>
                          <span className="text-xs font-medium text-indigo-600">Conversion Rate: {(link.conversions / link.clicks * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setShowCustomLinkForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <FaLink className="mr-2 -ml-1 h-4 w-4" />
                    Create Custom Link
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Link Modal */}
            {showCustomLinkForm && (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                        <FaLink className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Create Custom Referral Link</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Create a unique referral link for your marketing campaigns.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <label htmlFor="custom-link-name" className="block text-sm font-medium text-gray-700">
                        Link Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="custom-link-name"
                          id="custom-link-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. Fall Campaign"
                          value={customLinkName}
                          onChange={(e) => setCustomLinkName(e.target.value)}
                        />
                      </div>
                      <label htmlFor="custom-link-url" className="block text-sm font-medium text-gray-700 mt-4">
                        Destination URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="custom-link-url"
                          id="custom-link-url"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. https://kokomatto.com/fall-collection"
                          value={customLinkUrl}
                          onChange={(e) => setCustomLinkUrl(e.target.value)}
                        />
                      </div>
                      <div className="mt-5 sm:mt-6 flex space-x-2">
                        <button
                          type="button"
                          className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                          onClick={handleCreateCustomLink}
                        >
                          Create Link
                        </button>
                        <button
                          type="button"
                          className="flex-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                          onClick={() => setShowCustomLinkForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-white shadow-md rounded-lg border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Referrals</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {recentReferrals.map((referral) => (
                        <li key={referral.id} className="py-4 hover:bg-gray-50 transition-colors duration-150 px-2 -mx-2 rounded">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {referral.source}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {referral.date}
                              </p>
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                referral.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {referral.status}
                              </span>
                            </div>
                            <div className="flex-shrink-0 text-sm font-medium text-indigo-600">
                              {referral.earnings}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      View All Referrals
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Payment History</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {paymentHistory.map((payment) => (
                        <li key={payment.id} className="py-4 hover:bg-gray-50 transition-colors duration-150 px-2 -mx-2 rounded">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {payment.date}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {payment.method}
                              </p>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {payment.status}
                              </span>
                            </div>
                            <div className="flex-shrink-0 text-sm font-medium text-indigo-600">
                              {payment.amount}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      View Payment History
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'links':
        return (
          <div>
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Affiliate Links</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage and track all your affiliate links in one place.</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-6 flex justify-between items-center">
                  <h4 className="text-md font-medium text-gray-900">Current Links</h4>
                  <button 
                    onClick={() => setShowCustomLinkForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Custom Link
                  </button>
                </div>

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Link URL</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Statistics</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {referralLinks.map((link) => (
                        <tr key={link.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{link.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{link.url}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex flex-col">
                              <span>Clicks: <span className="font-medium">{link.clicks}</span></span>
                              <span>Conversions: <span className="font-medium">{link.conversions}</span></span>
                              <span>Rate: <span className="font-medium">{(link.conversions / link.clicks * 100).toFixed(1)}%</span></span>
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleCopyLink(link.url)}
                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                              >
                                <FaCopy className="h-4 w-4" />
                              </button>
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                <FaExternalLinkAlt className="h-4 w-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Create Custom Link Form */}
            {showCustomLinkForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Create Custom Affiliate Link</h3>
                    <button onClick={() => setShowCustomLinkForm(false)} className="text-gray-400 hover:text-gray-500">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="link-name" className="block text-sm font-medium text-gray-700">Link Name</label>
                      <input
                        type="text"
                        id="link-name"
                        value={customLinkName}
                        onChange={(e) => setCustomLinkName(e.target.value)}
                        placeholder="e.g. Summer Sale Campaign"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="target-url" className="block text-sm font-medium text-gray-700">Target URL</label>
                      <input
                        type="text"
                        id="target-url"
                        value={customLinkUrl}
                        onChange={(e) => setCustomLinkUrl(e.target.value)}
                        placeholder="https://kokomatto.com/product/12345"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Your affiliate ID (AF7721) will automatically be added to the URL.</p>
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        onClick={() => setShowCustomLinkForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateCustomLink}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                      >
                        Create Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Link Performance</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Top Performing Links</h4>
                  <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-center">
                    <p className="text-gray-500">Performance chart will be displayed here</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Link Creation Tips</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>Create specific links for different marketing campaigns to track their effectiveness.</li>
                    <li>Use descriptive names for your links to easily identify them later.</li>
                    <li>Share your links on platforms where your target audience is most active.</li>
                    <li>Test different call-to-actions to see which generates more clicks and conversions.</li>
                    <li>Regularly check your link performance to optimize your marketing strategy.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'earnings':
        return (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Earnings & Payment History</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your commission payments are processed on the 15th of each month.</p>
              </div>
              
              <div className="border-t border-gray-200">
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Current Balance</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">$247.53</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    PayPal - affiliate@example.com
                    <button className="ml-2 text-indigo-600 text-sm hover:text-indigo-500">Change</button>
                  </dd>
                </div>
                
                <div className="px-4 py-5 sm:px-6">
                  <h4 className="text-md font-medium text-gray-900">Previous Payments</h4>
                  <div className="mt-4">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Method
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">View</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {paymentHistory.map((payment) => (
                                  <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {payment.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {payment.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {payment.method}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {payment.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Receipt
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Earnings Analytics</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Track your commission performance over time.</p>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Last 30 Days</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">$384.50</dd>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Last 90 Days</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">$1,247.53</dd>
                      </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Year to Date</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">$5,347.80</dd>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500">Monthly Earnings (2023)</h4>
                    <div className="mt-2 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'materials':
        return (
          <div>
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Marketing Materials</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Download assets to help promote Kokomatto's 3D try-on technology</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">Kokomatto Overview Slide Deck</h4>
                      <p className="mt-1 text-sm text-gray-500">Presentation explaining the benefits of virtual try-on technology.</p>
                      <div className="mt-4">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                          <FaDownload className="mr-1.5 h-4 w-4" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">Product Screenshots</h4>
                      <p className="mt-1 text-sm text-gray-500">High-resolution images showing the Kokomatto platform in action.</p>
                      <div className="mt-4">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                          <FaDownload className="mr-1.5 h-4 w-4" />
                          Download ZIP
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">Demo Video</h4>
                      <p className="mt-1 text-sm text-gray-500">Walkthrough of the 3D try-on experience highlighting key features.</p>
                      <div className="mt-4">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                          <FaDownload className="mr-1.5 h-4 w-4" />
                          Download MP4
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h4 className="text-lg font-medium text-gray-900">Social Media Templates</h4>
                  <p className="mt-1 text-sm text-gray-500 mb-6">Ready-to-use graphics and copy for your social media channels</p>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-40 bg-purple-100 flex items-center justify-center">
                        <FaBullhorn className="h-12 w-12 text-purple-500" />
                      </div>
                      <div className="p-3">
                        <h5 className="text-sm font-medium text-gray-900">Instagram Post Templates</h5>
                        <div className="mt-2">
                          <button className="w-full inline-flex items-center justify-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-40 bg-blue-100 flex items-center justify-center">
                        <FaBullhorn className="h-12 w-12 text-blue-500" />
                      </div>
                      <div className="p-3">
                        <h5 className="text-sm font-medium text-gray-900">Facebook Graphics</h5>
                        <div className="mt-2">
                          <button className="w-full inline-flex items-center justify-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-40 bg-green-100 flex items-center justify-center">
                        <FaBullhorn className="h-12 w-12 text-green-500" />
                      </div>
                      <div className="p-3">
                        <h5 className="text-sm font-medium text-gray-900">Email Templates</h5>
                        <div className="mt-2">
                          <button className="w-full inline-flex items-center justify-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-40 bg-red-100 flex items-center justify-center">
                        <FaBullhorn className="h-12 w-12 text-red-500" />
                      </div>
                      <div className="p-3">
                        <h5 className="text-sm font-medium text-gray-900">Blog Banners</h5>
                        <div className="mt-2">
                          <button className="w-full inline-flex items-center justify-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'social':
        return (
          <div>
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Social Media Channels</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Connect with Kokomatto across various platforms
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-500">Language:</span>
                    <select 
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                      {availableLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name} ({lang.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {/* Current language info */}
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <FaLanguage className="h-6 w-6 text-indigo-500 mr-2" />
                    <h4 className="text-md font-medium text-gray-900">
                      Currently showing {socialMediaChannels[selectedLanguage]?.language || 'English'} social channels
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    When visitors access the website, they will be automatically directed to social media channels 
                    in their preferred language based on their location. Default is English (USD currency).
                  </p>
                </div>
                
                {/* Add new social channel button */}
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={() => setShowAddSocialModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Social Channel
                  </button>
                </div>
                
                {/* Social Media Links */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Facebook */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-md transition-all duration-300">
                    <div className="h-24 bg-blue-500 flex items-center justify-center">
                      <FaFacebook className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">Facebook</h4>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {socialMediaChannels[selectedLanguage]?.facebook || 'Not set'}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <a 
                          href={socialMediaChannels[selectedLanguage]?.facebook} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex items-center text-sm font-medium hover:text-blue-800"
                        >
                          <span>Visit Page</span>
                          <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                        </a>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => copyShareLink('facebook')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Copy link"
                          >
                            {copiedSocialShare === 'facebook' ? <FaCheck className="h-4 w-4 text-green-500" /> : <FaShare className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => handleEditSocialChannel('facebook')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          {affiliateSocialChannels[selectedLanguage]?.facebook && (
                            <button 
                              onClick={() => handleDeleteSocialChannel('facebook')}
                              className="text-gray-500 hover:text-red-600"
                              title="Remove custom channel"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instagram */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-pink-300 hover:shadow-md transition-all duration-300">
                    <div className="h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
                      <FaInstagram className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">Instagram</h4>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {socialMediaChannels[selectedLanguage]?.instagram || 'Not set'}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <a 
                          href={socialMediaChannels[selectedLanguage]?.instagram}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-pink-600 flex items-center text-sm font-medium hover:text-pink-800"
                        >
                          <span>Visit Page</span>
                          <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                        </a>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => copyShareLink('instagram')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Copy link"
                          >
                            {copiedSocialShare === 'instagram' ? <FaCheck className="h-4 w-4 text-green-500" /> : <FaShare className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => handleEditSocialChannel('instagram')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          {affiliateSocialChannels[selectedLanguage]?.instagram && (
                            <button 
                              onClick={() => handleDeleteSocialChannel('instagram')}
                              className="text-gray-500 hover:text-red-600"
                              title="Remove custom channel"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Twitter/X */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-black hover:shadow-md transition-all duration-300">
                    <div className="h-24 bg-black flex items-center justify-center">
                      <FaTwitter className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">Twitter / X</h4>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {socialMediaChannels[selectedLanguage]?.twitter || 'Not set'}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <a 
                          href={socialMediaChannels[selectedLanguage]?.twitter}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-gray-800 flex items-center text-sm font-medium hover:text-gray-600"
                        >
                          <span>Visit Page</span>
                          <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                        </a>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => copyShareLink('twitter')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Copy link"
                          >
                            {copiedSocialShare === 'twitter' ? <FaCheck className="h-4 w-4 text-green-500" /> : <FaShare className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => handleEditSocialChannel('twitter')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          {affiliateSocialChannels[selectedLanguage]?.twitter && (
                            <button 
                              onClick={() => handleDeleteSocialChannel('twitter')}
                              className="text-gray-500 hover:text-red-600"
                              title="Remove custom channel"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* TikTok */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-pink-300 hover:shadow-md transition-all duration-300">
                    <div className="h-24 bg-black flex items-center justify-center">
                      <FaTiktok className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">TikTok</h4>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {socialMediaChannels[selectedLanguage]?.tiktok || 'Not set'}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <a 
                          href={socialMediaChannels[selectedLanguage]?.tiktok}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-gray-800 flex items-center text-sm font-medium hover:text-gray-600"
                        >
                          <span>Visit Page</span>
                          <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                        </a>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => copyShareLink('tiktok')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Copy link"
                          >
                            {copiedSocialShare === 'tiktok' ? <FaCheck className="h-4 w-4 text-green-500" /> : <FaShare className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => handleEditSocialChannel('tiktok')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          {affiliateSocialChannels[selectedLanguage]?.tiktok && (
                            <button 
                              onClick={() => handleDeleteSocialChannel('tiktok')}
                              className="text-gray-500 hover:text-red-600"
                              title="Remove custom channel"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* YouTube */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-red-300 hover:shadow-md transition-all duration-300">
                    <div className="h-24 bg-red-600 flex items-center justify-center">
                      <FaYoutube className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium text-gray-900">YouTube</h4>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {socialMediaChannels[selectedLanguage]?.youtube || 'Not set'}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <a 
                          href={socialMediaChannels[selectedLanguage]?.youtube}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-red-600 flex items-center text-sm font-medium hover:text-red-800"
                        >
                          <span>Visit Channel</span>
                          <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                        </a>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => copyShareLink('youtube')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Copy link"
                          >
                            {copiedSocialShare === 'youtube' ? <FaCheck className="h-4 w-4 text-green-500" /> : <FaShare className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => handleEditSocialChannel('youtube')}
                            className="text-gray-500 hover:text-indigo-600"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          {affiliateSocialChannels[selectedLanguage]?.youtube && (
                            <button 
                              onClick={() => handleDeleteSocialChannel('youtube')}
                              className="text-gray-500 hover:text-red-600"
                              title="Remove custom channel"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add Social Channel Modal */}
            {showAddSocialModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {editingSocialChannel ? 'Edit Social Channel' : 'Add Social Channel'}
                    </h3>
                    <button 
                      onClick={() => {
                        setShowAddSocialModal(false);
                        setEditingSocialChannel(null);
                        setNewSocialChannel({
                          platform: 'facebook',
                          url: '',
                          displayName: ''
                        });
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {!editingSocialChannel && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                        <select
                          value={newSocialChannel.platform}
                          onChange={(e) => setNewSocialChannel({...newSocialChannel, platform: e.target.value})}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="twitter">Twitter / X</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                        </select>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="text"
                        value={newSocialChannel.url}
                        onChange={(e) => setNewSocialChannel({...newSocialChannel, url: e.target.value})}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="e.g. https://facebook.com/your-page"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Name (Optional)</label>
                      <input
                        type="text"
                        value={newSocialChannel.displayName}
                        onChange={(e) => setNewSocialChannel({...newSocialChannel, displayName: e.target.value})}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Your page name"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        setShowAddSocialModal(false);
                        setEditingSocialChannel(null);
                      }}
                      className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editingSocialChannel ? handleSaveEditedChannel : handleAddSocialChannel}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {editingSocialChannel ? 'Save Changes' : 'Add Channel'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Social Media Integration Guide */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Social Media Marketing Tips</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Best practices for promoting Kokomatto on social media
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="prose prose-indigo max-w-none">
                  <h4>Sharing Affiliate Links on Social Media</h4>
                  <p>
                    When sharing content on social media, be sure to include your unique affiliate links
                    to track conversions and maximize your earnings. Here are platform-specific tips:
                  </p>
                  
                  <ul className="mt-4 space-y-3">
                    <li className="flex">
                      <FaFacebook className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium">Facebook:</span> Create engaging posts showcasing the 3D try-on experience. 
                        Include before/after images and video demonstrations.
                      </div>
                    </li>
                    
                    <li className="flex">
                      <FaInstagram className="h-5 w-5 text-pink-600 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium">Instagram:</span> Use Stories and Reels to show the 3D try-on in action. 
                        Use the "link in bio" feature to add your affiliate link.
                      </div>
                    </li>
                    
                    <li className="flex">
                      <FaTwitter className="h-5 w-5 text-gray-800 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium">Twitter/X:</span> Share quick updates and highlight unique features.
                        Use shortened links to save space in tweets.
                      </div>
                    </li>
                    
                    <li className="flex">
                      <FaTiktok className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium">TikTok:</span> Create trending, short-form content showing the try-on process.
                        Direct viewers to the link in your bio.
                      </div>
                    </li>
                    
                    <li className="flex">
                      <FaYoutube className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium">YouTube:</span> Create detailed tutorials and reviews of the 3D try-on experience.
                        Include your affiliate link in the video description.
                      </div>
                    </li>
                  </ul>
                  
                  <h4 className="mt-6">Language and Currency Considerations</h4>
                  <p>
                    When promoting to different markets, consider creating content in the local language
                    and mentioning prices in local currency. This helps build trust and improves conversion rates.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md mt-4">
                    <h5 className="font-medium">Pro Tip: Multi-Language Promotion</h5>
                    <p className="text-sm">
                      If you have followers from different countries, consider creating separate posts in different
                      languages or using captions that address multiple languages. Direct users to the appropriate
                      language-specific affiliate link based on their location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your profile details</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                      Profile Photo
                    </label>
                    <div className="mt-2 flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center">
                        <span className="text-white font-medium">SA</span>
                      </div>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      defaultValue="Sarah"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      defaultValue="Adams"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      defaultValue="sarah.adams@example.com"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      defaultValue="+1 (555) 987-6543"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website/Blog
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        defaultValue="sarahadams.blog"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue="Fashion influencer specializing in sustainable fashion and lifestyle content. Based in Los Angeles with a focus on helping my audience discover ethical fashion options."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. This will be displayed publicly.
                    </p>
                  </div>
                </div>
                <div className="pt-6 sm:pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Account Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account preferences</p>
              </div>
              <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
                <h4 className="text-md font-medium text-gray-900">Payment Information</h4>
                <div className="mt-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded">
                        <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.32 15.32h5.36v-1.8H9.32v1.8zm0-5.36v1.8h5.36v-1.8H9.32zM20 4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-500">Connected: sarah.adams@example.com</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Add Payment Method</h5>
                    <div className="mt-2 flex space-x-3">
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                        + Bank Account
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                        + Credit Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
                <h4 className="text-md font-medium text-gray-900">Notification Preferences</h4>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-payments"
                        name="email-payments"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-payments" className="font-medium text-gray-700">
                        Payment notifications
                      </label>
                      <p className="text-gray-500">Receive emails when you get paid or when there are issues with payments.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-marketing"
                        name="email-marketing"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-marketing" className="font-medium text-gray-700">
                        Marketing updates
                      </label>
                      <p className="text-gray-500">Receive emails about new features, promotional opportunities, and tips.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-referrals"
                        name="email-referrals"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-referrals" className="font-medium text-gray-700">
                        Referral activity
                      </label>
                      <p className="text-gray-500">Receive emails when you get new referrals or conversions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-md font-medium text-gray-900">Security</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Change Password
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'support':
        return (
          <div>
            {/* Contact Support Section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Support</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Get help with any issues or questions about your affiliate account</p>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Email Support */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">Email Us</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          For general inquiries and non-urgent matters
                        </p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-gray-600">General: affiliate-support@kokomatto.com</p>
                          <p className="text-sm text-gray-600">Commission Issues: payments@kokomatto.com</p>
                        </div>
                        <div className="mt-3">
                          <a href="mailto:affiliate-support@kokomatto.com" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                            Contact Support
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone Support */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">Call Us</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Available during business hours
                        </p>
                        <div className="mt-3">
                          <a href="tel:+18001234567" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +1 (800) 123-4567
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* WhatsApp Support */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">WhatsApp Support</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Connect with regional support via WhatsApp
                        </p>
                        
                        {/* Country-based WhatsApp numbers */}
                        <div className="mt-3">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-700 mr-2">Your Region:</span>
                              <select className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="us">United States (English)</option>
                                <option value="ca">Canada (English/French)</option>
                                <option value="mx">Mexico (Spanish)</option>
                                <option value="br">Brazil (Portuguese)</option>
                                <option value="es">Spain (Spanish)</option>
                                <option value="fr">France (French)</option>
                                <option value="de">Germany (German)</option>
                                <option value="it">Italy (Italian)</option>
                              </select>
                            </div>
                            
                            <a href="https://wa.me/18001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              Message on WhatsApp
                            </a>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          <p>WhatsApp support is available Monday-Friday, 9AM-6PM in your local time zone.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Live Chat */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">Live Chat</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Chat with our support team in real-time
                        </p>
                        <div className="mt-3">
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Start Chat
                        </button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  
                {/* Regional Support Information */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Regional Support Information</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Our system automatically detects your country based on your IP address and provides region-specific support options.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                      <h5 className="font-medium text-gray-800">Detected Information:</h5>
                      <ul className="mt-1 text-gray-600 space-y-1">
                        <li><span className="font-medium">Country:</span> United States</li>
                        <li><span className="font-medium">Language:</span> English</li>
                        <li><span className="font-medium">IP Region:</span> North America</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Support Availability:</h5>
                      <ul className="mt-1 text-gray-600 space-y-1">
                        <li><span className="font-medium">Phone:</span> 24/7</li>
                        <li><span className="font-medium">WhatsApp:</span> 9AM - 6PM EST</li>
                        <li><span className="font-medium">Email:</span> 24/7 (response within 24h)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                          </div>
                        </div>
                        
            {/* Chat Center */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Chat Center</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Connect with our support team via chat</p>
              </div>
              
              <div className="border-t border-gray-200">
                <div className="flex flex-col h-[400px] md:h-[500px]">
                  {/* Chat content */}
                  <div className="flex-1 overflow-hidden">
                    {activeChat ? (
                      <div className="h-full flex flex-col">
                        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                              <span>S</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Support Agent</p>
                              <p className="text-xs text-gray-500">Affiliate Support Team</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                          <div className="flex justify-start">
                            <div className="bg-gray-200 rounded-lg px-4 py-2 max-w-[75%]">
                              <p className="text-sm">Hello! How can I help you with your affiliate account today?</p>
                              <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                          </div>
                        </div>
                        
                          <div className="flex justify-end">
                            <div className="bg-indigo-600 text-white rounded-lg px-4 py-2 max-w-[75%]">
                              <p className="text-sm">Hi! I have a question about my recent commission payment.</p>
                              <p className="text-xs text-indigo-200 mt-1">10:32 AM</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-start">
                            <div className="bg-gray-200 rounded-lg px-4 py-2 max-w-[75%]">
                              <p className="text-sm">I'd be happy to help with that. Could you please provide your affiliate ID or the date of the payment you're inquiring about?</p>
                              <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 p-4">
                          <div className="flex items-center">
                            <button className="text-gray-500 p-2 rounded-full hover:text-gray-600 hover:bg-gray-100">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                            </button>
                            <input
                              type="text"
                              placeholder="Type your message..."
                              className="flex-1 border-0 focus:ring-0 text-sm px-4"
                            />
                            <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center p-6">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">Start a conversation</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Connect with our support team for assistance with your affiliate account.
                          </p>
                          <div className="mt-6">
                          <button
                              type="button"
                              onClick={() => setActiveChat(true)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                              <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Start New Chat
                          </button>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Frequently Asked Questions */}
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Frequently Asked Questions</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Quick answers to common affiliate questions</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md p-4">
                    <h4 className="text-base font-medium text-gray-900">How are commissions calculated?</h4>
                    <p className="mt-2 text-sm text-gray-500">
                      Commissions are calculated based on the final purchase amount after any discounts and before taxes and shipping. You earn 10% on first-time customers and 5% on returning customers that came through your affiliate link.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h4 className="text-base font-medium text-gray-900">When are affiliate payments processed?</h4>
                    <p className="mt-2 text-sm text-gray-500">
                      Affiliate payments are processed on the 15th of each month for the previous month's earnings. There is a minimum payout threshold of $50. If your earnings don't reach this threshold, they'll roll over to the next payment period.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h4 className="text-base font-medium text-gray-900">How long does the cookie last?</h4>
                    <p className="mt-2 text-sm text-gray-500">
                      Our affiliate tracking cookie lasts for 30 days. This means that if someone clicks your affiliate link and makes a purchase within 30 days, you'll receive the commission.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h4 className="text-base font-medium text-gray-900">Can I promote specific products?</h4>
                    <p className="mt-2 text-sm text-gray-500">
                      Yes! You can create custom affiliate links for specific products or collections. Simply use the "Create Custom Link" feature in your dashboard to generate these specialized links.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all FAQs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="w-full text-center py-6">
          <p className="text-gray-500">Select a tab to view content</p>
        </div>;
    }
  };

  return (
    <AffiliateLayout>
      <div className="min-h-screen bg-gray-100">
        <div className="pt-16">
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white shadow-sm mt-6 rounded-lg">
                <div className="px-4 sm:px-6 lg:px-8">
                  <nav className="flex overflow-x-auto py-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => navigateToTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm mx-1 first:ml-0`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              <div className="mt-6 pb-12">
                {renderTabContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliateDashboardPage; 