import React, { useState } from 'react';
import HtmlEditor from './HtmlEditor';

const CategoryForm = ({ category, onSave, onCancel, allCategories = [] }) => {
  const [formData, setFormData] = useState(
    category ? 
    { 
      ...category,
      displaySettings: category.displaySettings || {
        desktop: 4,
        tablet: 3,
        mobile: 2
      },
      articles: category.articles || []
    } : 
    { 
      name: '', 
      image: '', 
      description: '', 
      htmlDescription: '',
      parentCategoryId: '',
      displaySettings: {
        desktop: 4,
        tablet: 3,
        mobile: 2
      },
      articles: []
    }
  );
  
  const [activeTab, setActiveTab] = useState('basic');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleHtmlDescriptionChange = (content) => {
    setFormData({ ...formData, htmlDescription: content });
  };
  
  const handleDisplaySettingChange = (device, value) => {
    setFormData({
      ...formData,
      displaySettings: {
        ...formData.displaySettings,
        [device]: parseInt(value, 10)
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  // Filter out current category from parent options to prevent circular references
  const parentCategoryOptions = allCategories.filter(c => c.id !== formData.id);
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'basic'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Basic Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'description'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('display')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'display'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Display Settings
          </button>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mt-4">
        {activeTab === 'basic' && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                id="image"
                required
                value={formData.image}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <div className="h-32 w-32 rounded-md overflow-hidden">
                    <img 
                      src={formData.image} 
                      alt="Category preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="parentCategoryId" className="block text-sm font-medium text-gray-700">Parent Category</label>
              <select
                name="parentCategoryId"
                id="parentCategoryId"
                value={formData.parentCategoryId || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">None (Top Level)</option>
                {parentCategoryOptions.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">Set a parent category to create a hierarchical structure</p>
            </div>
          </>
        )}
        
        {activeTab === 'description' && (
          <>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Simple Description</label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">Simple text description for this category</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">HTML Description</label>
              <HtmlEditor 
                value={formData.htmlDescription} 
                onChange={handleHtmlDescriptionChange} 
                height="250px"
              />
              <p className="mt-1 text-sm text-gray-500">Rich HTML description for more complex formatting and content</p>
            </div>
          </>
        )}
        
        {activeTab === 'display' && (
          <>
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">Items Per Row</h3>
              <p className="text-sm text-gray-500 mb-4">Control how many items display per row on different devices</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="desktop" className="block text-sm font-medium text-gray-700">Desktop</label>
                  <input
                    type="number"
                    id="desktop"
                    min="1"
                    max="6"
                    value={formData.displaySettings.desktop}
                    onChange={(e) => handleDisplaySettingChange('desktop', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">Items per row on large screens</p>
                </div>
                
                <div>
                  <label htmlFor="tablet" className="block text-sm font-medium text-gray-700">Tablet</label>
                  <input
                    type="number"
                    id="tablet"
                    min="1"
                    max="4"
                    value={formData.displaySettings.tablet}
                    onChange={(e) => handleDisplaySettingChange('tablet', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">Items per row on medium screens</p>
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                  <input
                    type="number"
                    id="mobile"
                    min="1"
                    max="2"
                    value={formData.displaySettings.mobile}
                    onChange={(e) => handleDisplaySettingChange('mobile', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">Items per row on small screens</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {category ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm; 