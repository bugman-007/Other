import React, { useState } from 'react';

const MarketingMaterialsUpload = () => {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Brand Guidelines - English',
      description: 'Complete brand guidelines for US and UK markets',
      fileType: 'pdf',
      size: '2.4 MB',
      downloadUrl: '#',
      language: 'en-US',
      country: 'US,GB,CA,AU',
      uploadDate: '2023-08-15'
    },
    {
      id: 2,
      title: 'Social Media Templates - Spanish',
      description: 'Templates for Instagram, Facebook, and Twitter for Spanish-speaking markets',
      fileType: 'zip',
      size: '15.7 MB',
      downloadUrl: '#',
      language: 'es-ES',
      country: 'ES,MX,CO,AR',
      uploadDate: '2023-09-21'
    },
    {
      id: 3,
      title: 'Product Photography - Global',
      description: 'High-resolution product images for all markets',
      fileType: 'zip',
      size: '32.5 MB',
      downloadUrl: '#',
      language: 'all',
      country: 'all',
      uploadDate: '2023-07-05'
    },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    fileType: 'pdf',
    language: 'en-US',
    country: 'all',
    file: null
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMaterial(prev => ({
        ...prev,
        file,
        fileType: file.name.split('.').pop().toLowerCase(),
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to a server/storage
    // For this demo, we'll just add it to our local state
    const newId = materials.length > 0 ? Math.max(...materials.map(m => m.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    
    const newMaterialEntry = {
      id: newId,
      title: newMaterial.title,
      description: newMaterial.description,
      fileType: newMaterial.fileType,
      size: newMaterial.size || '0 MB',
      downloadUrl: '#',
      language: newMaterial.language,
      country: newMaterial.country,
      uploadDate: today
    };
    
    setMaterials([...materials, newMaterialEntry]);
    setNewMaterial({
      title: '',
      description: '',
      fileType: 'pdf',
      language: 'en-US',
      country: 'all',
      file: null
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setMaterials(materials.filter(material => material.id !== id));
    }
  };

  // Format countries for display
  const formatCountries = (countryString) => {
    if (countryString === 'all') return 'Global (All Countries)';
    const countries = countryString.split(',');
    if (countries.length <= 3) {
      return countries.join(', ');
    }
    return `${countries.slice(0, 2).join(', ')} +${countries.length - 2} more`;
  };

  // Get language label from code
  const getLanguageLabel = (code) => {
    const languages = {
      'all': 'All Languages',
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'es-ES': 'Spanish (Spain)',
      'es-MX': 'Spanish (Mexico)',
      'fr-FR': 'French',
      'de-DE': 'German',
      'it-IT': 'Italian',
      'ja-JP': 'Japanese',
      'ko-KR': 'Korean',
      'zh-CN': 'Chinese (Simplified)',
      'zh-TW': 'Chinese (Traditional)',
      'pt-BR': 'Portuguese (Brazil)',
      'ru-RU': 'Russian',
      'ar-SA': 'Arabic'
    };
    return languages[code] || code;
  };

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Marketing Materials</h2>
          <p className="text-xs sm:text-sm text-gray-500">Manage marketing materials for affiliates</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="-ml-0.5 sm:-ml-1 mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Material
        </button>
      </div>

      {/* Material List - Responsive Table */}
      <div className="overflow-x-auto -mx-3 sm:mx-0 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-4 sm:mb-6">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs sm:text-sm font-semibold text-gray-900 sm:pl-6">Material</th>
              <th scope="col" className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Languages</th>
              <th scope="col" className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Regions</th>
              <th scope="col" className="px-3 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Uploaded</th>
              <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {materials.map((material) => (
              <tr key={material.id}>
                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-xs sm:text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-md">
                      {material.fileType === 'pdf' && (
                        <svg className="h-4 w-4 sm:h-6 sm:w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      )}
                      {material.fileType === 'zip' && (
                        <svg className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2h2v2H6V6zm0 4h8v6H6v-6z" clipRule="evenodd" />
                        </svg>
                      )}
                      {material.fileType === 'mp4' && (
                        <svg className="h-4 w-4 sm:h-6 sm:w-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <div className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-1">{material.title}</div>
                      <div className="text-gray-500 text-xs hidden sm:block line-clamp-1">{material.description}</div>
                      <div className="text-gray-400 text-xs sm:hidden">{material.size}</div>
                      
                      {/* Mobile-only language and region info */}
                      <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getLanguageLabel(material.language).substring(0, 6)}
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {formatCountries(material.country).substring(0, 6)}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getLanguageLabel(material.language)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                  {formatCountries(material.country)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                  {material.uploadDate}
                </td>
                <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-xs sm:text-sm font-medium sm:pr-6">
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => window.open(material.downloadUrl, '_blank')}
                    >
                      <span className="sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                      <span className="hidden sm:block">Download</span>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(material.id)}
                    >
                      <span className="sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </span>
                      <span className="hidden sm:block">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new material - Improved for mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-center justify-center min-h-screen pt-4 px-2 sm:px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full max-w-[calc(100%-1rem)]">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-3 sm:px-4 pt-4 sm:pt-5 pb-3 sm:pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 mb-3 sm:mb-4">Add Marketing Material</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={newMaterial.title}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            name="description"
                            id="description"
                            rows="2"
                            value={newMaterial.description}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div>
                          <label htmlFor="file" className="block text-xs sm:text-sm font-medium text-gray-700">File</label>
                          <input
                            type="file"
                            name="file"
                            id="file"
                            required
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-xs sm:text-sm text-gray-500
                              file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4
                              file:rounded-md file:border-0
                              file:text-xs sm:file:text-sm file:font-semibold
                              file:bg-indigo-50 file:text-indigo-700
                              hover:file:bg-indigo-100"
                          />
                        </div>

                        <div>
                          <label htmlFor="language" className="block text-xs sm:text-sm font-medium text-gray-700">Language</label>
                          <select
                            id="language"
                            name="language"
                            value={newMaterial.language}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-2 sm:pl-3 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                          >
                            <option value="all">All Languages</option>
                            <option value="en-US">English (US)</option>
                            <option value="en-GB">English (UK)</option>
                            <option value="es-ES">Spanish (Spain)</option>
                            <option value="es-MX">Spanish (Mexico)</option>
                            <option value="fr-FR">French</option>
                            <option value="de-DE">German</option>
                            <option value="it-IT">Italian</option>
                            <option value="ja-JP">Japanese</option>
                            <option value="ko-KR">Korean</option>
                            <option value="zh-CN">Chinese (Simplified)</option>
                            <option value="zh-TW">Chinese (Traditional)</option>
                            <option value="pt-BR">Portuguese (Brazil)</option>
                            <option value="ru-RU">Russian</option>
                            <option value="ar-SA">Arabic</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-gray-700">Countries/Regions</label>
                          <select
                            id="country"
                            name="country"
                            value={newMaterial.country}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-2 sm:pl-3 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                          >
                            <option value="all">Global (All Countries)</option>
                            <option value="US,CA">North America</option>
                            <option value="GB,FR,DE,IT,ES">Europe</option>
                            <option value="JP,CN,KR">Asia</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                            <option value="ES">Spain</option>
                            <option value="IT">Italy</option>
                            <option value="JP">Japan</option>
                            <option value="CN">China</option>
                            <option value="IN">India</option>
                            <option value="BR">Brazil</option>
                            <option value="MX">Mexico</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-xs sm:text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingMaterialsUpload; 