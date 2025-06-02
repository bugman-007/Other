import React, { useState } from 'react';

const BannerEditor = ({ banner, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    text: banner?.text || '',
    enabled: banner?.enabled || true,
    bgColor: banner?.bgColor || '#3B82F6', // Blue default
    textColor: banner?.textColor || '#FFFFFF', // White default
    position: banner?.position || 'top', // 'top' or 'bottom'
    linkText: banner?.linkText || '',
    linkUrl: banner?.linkUrl || '',
    showOnPages: banner?.showOnPages || ['all'],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePageSelection = (e) => {
    const { value, checked } = e.target;
    
    if (value === 'all' && checked) {
      setFormData({
        ...formData,
        showOnPages: ['all']
      });
      return;
    }
    
    let updatedPages = [...formData.showOnPages];
    
    if (checked) {
      updatedPages = updatedPages.filter(page => page !== 'all');
      updatedPages.push(value);
    } else {
      updatedPages = updatedPages.filter(page => page !== value);
      if (updatedPages.length === 0) {
        updatedPages = ['all'];
      }
    }
    
    setFormData({
      ...formData,
      showOnPages: updatedPages
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const pageOptions = [
    { value: 'all', label: 'All Pages' },
    { value: 'home', label: 'Home Page' },
    { value: 'try-on', label: 'Try-On Page' },
    { value: 'product', label: 'Product Pages' },
    { value: 'categories', label: 'Categories Page' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Banner Text
            </label>
            <textarea
              name="text"
              id="text"
              rows={2}
              value={formData.text}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              id="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
              Enable Banner
            </label>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
                Background Color
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  value={formData.bgColor}
                  onChange={handleChange}
                  className="w-8 h-8 border-0 p-0"
                />
                <input
                  type="text"
                  value={formData.bgColor}
                  onChange={handleChange}
                  name="bgColor"
                  className="ml-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">
                Text Color
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  name="textColor"
                  id="textColor"
                  value={formData.textColor}
                  onChange={handleChange}
                  className="w-8 h-8 border-0 p-0"
                />
                <input
                  type="text"
                  value={formData.textColor}
                  onChange={handleChange}
                  name="textColor"
                  className="ml-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <select
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="linkText" className="block text-sm font-medium text-gray-700">
                Link Text (Optional)
              </label>
              <input
                type="text"
                name="linkText"
                id="linkText"
                value={formData.linkText}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Learn More"
              />
            </div>
            
            <div>
              <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-700">
                Link URL (Optional)
              </label>
              <input
                type="url"
                name="linkUrl"
                id="linkUrl"
                value={formData.linkUrl}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="https://example.com/page"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show on Pages
            </label>
            <div className="grid grid-cols-2 gap-2">
              {pageOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    name="showOnPages"
                    value={option.value}
                    checked={formData.showOnPages.includes(option.value)}
                    onChange={handlePageSelection}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Banner
          </button>
        </div>
      </form>
      
      {showPreview && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div 
            className="p-3 relative"
            style={{ backgroundColor: formData.bgColor, color: formData.textColor }}
          >
            <div className="container mx-auto px-4 flex items-center justify-between">
              <p className="text-sm font-medium">{formData.text}</p>
              {formData.linkText && (
                <a 
                  href={formData.linkUrl || '#'} 
                  className="text-sm font-medium underline ml-4"
                  style={{ color: formData.textColor }}
                >
                  {formData.linkText}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerEditor; 