import React, { useState } from 'react';

const BannerForm = ({ banner, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...banner });
  
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
        
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">Banner Text</label>
          <input
            type="text"
            name="text"
            id="text"
            value={formData.text}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700">Background Color</label>
          <select
            name="backgroundColor"
            id="backgroundColor"
            value={formData.backgroundColor}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="indigo-900/30">Indigo Transparent</option>
            <option value="blue-900/30">Blue Transparent</option>
            <option value="gray-900/30">Gray Transparent</option>
            <option value="red-900/30">Red Transparent</option>
            <option value="green-900/30">Green Transparent</option>
            <option value="indigo-900">Indigo Solid</option>
            <option value="blue-900">Blue Solid</option>
            <option value="gray-900">Gray Solid</option>
            <option value="red-900">Red Solid</option>
            <option value="green-900">Green Solid</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">Text Color</label>
          <select
            name="textColor"
            id="textColor"
            value={formData.textColor}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="white">White</option>
            <option value="gray-100">Light Gray</option>
            <option value="gray-800">Dark Gray</option>
            <option value="black">Black</option>
          </select>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-1">Preview:</p>
          <div className={`bg-${formData.backgroundColor} text-${formData.textColor} p-3 rounded`}>
            {formData.text}
          </div>
        </div>
        
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

export default BannerForm; 