import React, { useState, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';

const PopupEditor = ({ popup, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    buttonText: 'OK',
    buttonColor: 'blue',
    secondaryButtonText: '',
    secondaryButtonColor: 'gray',
    showSecondaryButton: false,
    position: 'center',
    pages: [],
    customPage: '',
    delay: 3,
    imageUrl: '',
    isActive: true,
  });
  
  // Available pages in the app
  const availablePages = [
    { value: 'home', label: 'Home Page' },
    { value: 'categories', label: 'Categories Page' },
    { value: 'try-on', label: 'Try On Page' },
    { value: 'affiliate', label: 'Affiliate Page' },
    { value: 'login', label: 'Login Page' },
  ];
  
  // Positions for the popup
  const positions = [
    { value: 'center', label: 'Center' },
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
  ];

  useEffect(() => {
    if (popup) {
      setFormData({
        ...formData,
        ...popup,
      });
    }
  }, [popup]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePagesChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        pages: [...formData.pages, value],
      });
    } else {
      setFormData({
        ...formData,
        pages: formData.pages.filter(page => page !== value),
      });
    }
  };

  const handleAddCustomPage = () => {
    if (formData.customPage && !formData.pages.includes(formData.customPage)) {
      setFormData({
        ...formData,
        pages: [...formData.pages, formData.customPage],
        customPage: '',
      });
    }
  };

  const handleRemovePage = (page) => {
    setFormData({
      ...formData,
      pages: formData.pages.filter(p => p !== page),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {popup ? 'Edit Popup' : 'Create New Popup'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Configure how and where this popup will appear to users.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Popup Title */}
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Popup Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter popup title"
                  required
                />
              </div>
            </div>

            {/* Popup Content */}
            <div className="sm:col-span-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Popup Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  value={formData.content}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter the popup message content"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-6">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL (optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Add an image to display in your popup (leave empty for text-only popup)
              </p>
            </div>

            {/* Primary Button */}
            <div className="sm:col-span-3">
              <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">
                Primary Button Text
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="buttonText"
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="OK"
                  required
                />
              </div>
            </div>

            {/* Button Color */}
            <div className="sm:col-span-3">
              <label htmlFor="buttonColor" className="block text-sm font-medium text-gray-700">
                Primary Button Color
              </label>
              <div className="mt-1">
                <select
                  id="buttonColor"
                  name="buttonColor"
                  value={formData.buttonColor}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="gray">Gray</option>
                </select>
              </div>
            </div>

            {/* Secondary Button Toggle */}
            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="showSecondaryButton"
                  name="showSecondaryButton"
                  type="checkbox"
                  checked={formData.showSecondaryButton}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showSecondaryButton" className="ml-2 block text-sm text-gray-700">
                  Add a secondary button (e.g., "Cancel" or "Learn More")
                </label>
              </div>
            </div>

            {formData.showSecondaryButton && (
              <>
                {/* Secondary Button Text */}
                <div className="sm:col-span-3">
                  <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-gray-700">
                    Secondary Button Text
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="secondaryButtonText"
                      id="secondaryButtonText"
                      value={formData.secondaryButtonText}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Cancel"
                      required={formData.showSecondaryButton}
                    />
                  </div>
                </div>

                {/* Secondary Button Color */}
                <div className="sm:col-span-3">
                  <label htmlFor="secondaryButtonColor" className="block text-sm font-medium text-gray-700">
                    Secondary Button Color
                  </label>
                  <div className="mt-1">
                    <select
                      id="secondaryButtonColor"
                      name="secondaryButtonColor"
                      value={formData.secondaryButtonColor}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="gray">Gray</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="purple">Purple</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Position */}
            <div className="sm:col-span-3">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Popup Position
              </label>
              <div className="mt-1">
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {positions.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delay */}
            <div className="sm:col-span-3">
              <label htmlFor="delay" className="block text-sm font-medium text-gray-700">
                Display Delay (seconds)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="delay"
                  id="delay"
                  min="0"
                  max="60"
                  value={formData.delay}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                How many seconds to wait before showing the popup
              </p>
            </div>

            {/* Pages (where to show the popup) */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show on Pages
              </label>
              
              <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3">
                {availablePages.map((page) => (
                  <div key={page.value} className="flex items-center">
                    <input
                      id={`page-${page.value}`}
                      name={`page-${page.value}`}
                      type="checkbox"
                      value={page.value}
                      checked={formData.pages.includes(page.value)}
                      onChange={handlePagesChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`page-${page.value}`} className="ml-2 block text-sm text-gray-700">
                      {page.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <label htmlFor="customPage" className="block text-sm font-medium text-gray-700">
                  Add Custom Page Path
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="customPage"
                    id="customPage"
                    value={formData.customPage}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    placeholder="/custom-page"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomPage}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {formData.pages.length > 0 && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Pages:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.pages.map(page => (
                      <div key={page} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        {page}
                        <button
                          type="button"
                          onClick={() => handleRemovePage(page)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.pages.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  If no pages are selected, the popup will appear on all pages.
                </p>
              )}
            </div>
          </div>

          <div className="pt-5 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {popup ? 'Update Popup' : 'Create Popup'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PopupEditor; 