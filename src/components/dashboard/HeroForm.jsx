import React, { useState } from 'react';

const HeroForm = ({ hero, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...hero });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Background Type</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="backgroundType"
                value="image"
                checked={formData.backgroundType === 'image'}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Image</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="backgroundType"
                value="video"
                checked={formData.backgroundType === 'video'}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Video</span>
            </label>
          </div>
        </div>
        
        {formData.backgroundType === 'image' ? (
          <div>
            <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700">Background Image URL</label>
            <input
              type="text"
              name="backgroundImage"
              id="backgroundImage"
              value={formData.backgroundImage}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            
            {formData.backgroundImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <div className="h-32 w-full rounded-md overflow-hidden">
                  <img 
                    src={formData.backgroundImage} 
                    alt="Hero background preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+URL';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              type="text"
              name="videoUrl"
              id="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter a direct video URL (MP4) or YouTube embed URL
            </p>
          </div>
        )}
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
          <select
            name="height"
            id="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="40vh">Short (40vh)</option>
            <option value="50vh">Medium (50vh)</option>
            <option value="65vh">Tall (65vh)</option>
            <option value="80vh">Very Tall (80vh)</option>
            <option value="100vh">Full Height (100vh)</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="overlay"
            id="overlay"
            checked={formData.overlay}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="overlay" className="ml-2 block text-sm text-gray-700">
            Add Dark Overlay
          </label>
        </div>
        
        {formData.overlay && (
          <div>
            <label htmlFor="overlayOpacity" className="block text-sm font-medium text-gray-700">
              Overlay Opacity: {formData.overlayOpacity}%
            </label>
            <input
              type="range"
              name="overlayOpacity"
              id="overlayOpacity"
              min="10"
              max="90"
              value={formData.overlayOpacity}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
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
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeroForm; 