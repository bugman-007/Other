import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

// Sample marketing materials with language and country targeting
const allMarketingMaterials = [
  {
    id: 1,
    title: 'Brand Guidelines - English',
    description: 'Complete brand guidelines including logo usage, color palette, and typography.',
    fileType: 'pdf',
    size: '2.4 MB',
    downloadUrl: '#',
    language: 'en-US',
    country: 'US,GB,CA,AU',
    date: '2023-08-15'
  },
  {
    id: 2,
    title: 'Social Media Templates',
    description: 'Ready-to-use templates for Instagram, Facebook, and Twitter promotions.',
    fileType: 'zip',
    size: '15.7 MB',
    downloadUrl: '#',
    language: 'all',
    country: 'all',
    date: '2023-09-10'
  },
  {
    id: 3,
    title: 'Product Photography',
    description: 'High-resolution product images for marketing campaigns.',
    fileType: 'zip',
    size: '32.5 MB',
    downloadUrl: '#',
    language: 'all',
    country: 'all',
    date: '2023-07-22'
  },
  {
    id: 4,
    title: 'Email Marketing Templates - US',
    description: 'HTML email templates designed for high conversion rates.',
    fileType: 'html',
    size: '1.8 MB',
    downloadUrl: '#',
    language: 'en-US',
    country: 'US',
    date: '2023-09-05'
  },
  {
    id: 5,
    title: 'Promotional Videos - English',
    description: 'Short product demonstration videos for online advertising.',
    fileType: 'mp4',
    size: '45.2 MB',
    downloadUrl: '#',
    language: 'en-US',
    country: 'US,GB,CA,AU',
    date: '2023-08-30'
  },
  {
    id: 6,
    title: 'Spanish Market Guides',
    description: 'Marketing guides specifically for Spanish-speaking markets.',
    fileType: 'pdf',
    size: '3.1 MB',
    downloadUrl: '#',
    language: 'es-ES',
    country: 'ES,MX,CO,AR',
    date: '2023-08-12'
  },
  {
    id: 7,
    title: 'French Promotional Videos',
    description: 'Product videos with French narration and captions.',
    fileType: 'mp4',
    size: '38.6 MB',
    downloadUrl: '#',
    language: 'fr-FR',
    country: 'FR,CA,BE,CH',
    date: '2023-07-15'
  },
  {
    id: 8,
    title: 'German Market Research',
    description: 'Market analysis and audience insights for German-speaking regions.',
    fileType: 'pdf',
    size: '5.2 MB',
    downloadUrl: '#',
    language: 'de-DE',
    country: 'DE,AT,CH',
    date: '2023-09-18'
  }
];

// File type icons
const FileIcon = ({ type }) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      );
    case 'zip':
      return (
        <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
      );
    case 'html':
      return (
        <div className="bg-indigo-100 text-indigo-700 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      );
    case 'mp4':
      return (
        <div className="bg-purple-100 text-purple-700 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="bg-gray-100 text-gray-700 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      );
  }
};

const MarketingMaterialsPage = () => {
  const [userLanguage, setUserLanguage] = useState('en-US');
  const [userCountry, setUserCountry] = useState('US');
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pdf, video, templates
  const [marketingMaterials, setMarketingMaterials] = useState([]);

  // Load user preferences
  useEffect(() => {
    // In a real app, these would be loaded from user profile/preferences
    // For demo, we'll simulate loading from localStorage
    const storedLanguage = localStorage.getItem('userLanguage');
    const storedCountry = localStorage.getItem('userCountry');
    
    if (storedLanguage) setUserLanguage(storedLanguage);
    if (storedCountry) setUserCountry(storedCountry);
  }, []);

  // Filter materials based on user preferences and selected filter
  useEffect(() => {
    let filtered = [...allMarketingMaterials];
    
    // Filter by user language and country if not showing all
    if (!showAllMaterials) {
      filtered = filtered.filter(material => {
        // Check language match (allow materials marked for all languages)
        const languageMatch = material.language === 'all' || material.language === userLanguage;
        
        // Check country match (allow materials marked for all countries)
        const countryMatch = material.country === 'all' || material.country.split(',').includes(userCountry);
        
        return languageMatch && countryMatch;
      });
    }
    
    // Apply file type filter
    if (filter !== 'all') {
      if (filter === 'video') {
        filtered = filtered.filter(material => material.fileType === 'mp4');
      } else if (filter === 'templates') {
        filtered = filtered.filter(material => material.fileType === 'html' || material.fileType === 'zip');
      } else {
        filtered = filtered.filter(material => material.fileType === filter);
      }
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setMarketingMaterials(filtered);
  }, [userLanguage, userCountry, showAllMaterials, filter]);

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden">
        <div className="max-w-full overflow-hidden">
          <div className="mb-6 sm:mb-8 border-b border-gray-200 pb-4 sm:pb-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Marketing Materials</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Access our marketing resources to help promote Kokomatto products to potential merchants.
            </p>
            
            {/* Filter controls - Improved for mobile */}
            <div className="mt-4 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md ${filter === 'all' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  All Types
                </button>
                <button 
                  onClick={() => setFilter('pdf')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md ${filter === 'pdf' ? 'bg-red-100 text-red-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Documents
                </button>
                <button 
                  onClick={() => setFilter('video')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md ${filter === 'video' ? 'bg-purple-100 text-purple-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Videos
                </button>
                <button 
                  onClick={() => setFilter('templates')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md ${filter === 'templates' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Templates
                </button>
              </div>
              <div className="flex items-center">
                <label className="flex items-center text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={showAllMaterials}
                    onChange={() => setShowAllMaterials(!showAllMaterials)}
                    className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-1.5 sm:ml-2 text-gray-600">Show all languages and regions</span>
                </label>
              </div>
            </div>
          </div>

          {/* Language/Region Information - Improved for mobile */}
          {!showAllMaterials && (
            <div className="mb-4 sm:mb-6 bg-blue-50 rounded-lg p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-1.5 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs sm:text-sm text-blue-700 w-full sm:w-auto">
                Showing materials for <span className="font-medium">{userLanguage === 'en-US' ? 'English (US)' : userLanguage}</span> in <span className="font-medium">{userCountry}</span>
                <a href="/affiliate/settings" className="ml-1 sm:ml-2 underline hover:text-blue-800 block sm:inline-block mt-1 sm:mt-0">Change preferences</a>
              </p>
            </div>
          )}

          {/* No materials message */}
          {marketingMaterials.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
              <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                No marketing materials are available for your current language and region settings.
              </p>
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={() => setShowAllMaterials(true)}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Show all available materials
                </button>
              </div>
            </div>
          )}

          {/* Marketing Materials Grid - Improved for mobile */}
          {marketingMaterials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {marketingMaterials.map((material) => (
                <div key={material.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-3 sm:p-6">
                    <div className="flex items-start">
                      <FileIcon type={material.fileType} />
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">{material.title}</h3>
                        <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-2">{material.description}</p>
                        
                        {/* Language and Country Tags */}
                        <div className="mt-1.5 sm:mt-2 flex flex-wrap gap-1">
                          {material.language !== 'all' && (
                            <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {material.language}
                            </span>
                          )}
                          {material.country !== 'all' && material.country.split(',').map((country, index) => (
                            <span key={index} className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                              {country}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded-md uppercase text-xs font-medium">
                              {material.fileType}
                            </span>
                            <span className="ml-1.5 sm:ml-2">{material.size}</span>
                          </div>
                          <a
                            href={material.downloadUrl}
                            className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-indigo-500 text-xs sm:text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Custom Marketing Materials Request - Improved for mobile */}
          <div className="mt-8 sm:mt-12 bg-indigo-50 rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-3/4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Need Custom Marketing Materials?</h2>
                <p className="mt-2 text-xs sm:text-sm lg:text-base text-gray-600 max-w-3xl">
                  If you need customized marketing materials for specific campaigns or audiences, our team can help create tailored resources to boost your conversion rates.
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex flex-shrink-0">
                <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Request Custom Materials
                </button>
              </div>
            </div>
          </div>

          {/* Usage Guidelines - Improved for mobile */}
          <div className="mt-8 sm:mt-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Usage Guidelines</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md rounded">
              <ul className="divide-y divide-gray-200">
                <li className="px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Maintain Brand Integrity</p>
                      <p className="text-xs sm:text-sm text-gray-500">Always follow our brand guidelines when using logos and visual elements.</p>
                    </div>
                  </div>
                </li>
                <li className="px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">No Modification</p>
                      <p className="text-xs sm:text-sm text-gray-500">Do not alter, crop, or distort the provided marketing materials.</p>
                    </div>
                  </div>
                </li>
                <li className="px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Attribution Required</p>
                      <p className="text-xs sm:text-sm text-gray-500">Include proper attribution to Kokomatto when using these materials in your marketing.</p>
                    </div>
                  </div>
                </li>
                <li className="px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Content Usage Rights</p>
                      <p className="text-xs sm:text-sm text-gray-500">These materials are for promoting Kokomatto products only and may not be used for other purposes.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketingMaterialsPage; 