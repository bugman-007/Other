import React, { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon, PlusIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const PopupManagement = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    id: null,
    title: '',
    content: '',
    buttonText: 'OK',
    buttonColor: 'blue',
    position: 'center',
    pages: [],
    delay: 0,
    isActive: true,
    showSecondaryButton: false,
    secondaryButtonText: '',
    secondaryButtonColor: 'gray',
    imageUrl: ''
  });
  const [pageInput, setPageInput] = useState('');

  // Color options
  const colorOptions = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'red', label: 'Red' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
    { value: 'gray', label: 'Gray' }
  ];

  // Position options
  const positionOptions = [
    { value: 'center', label: 'Center' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' }
  ];

  // Mock function to fetch popups - replace with actual API call
  const fetchPopups = async () => {
    // This would typically be an API call to get popups
    // For now using mock data
    return [
      {
        id: 1,
        title: 'Welcome to Our Virtual Try-On',
        content: 'Position your device so your entire body is visible in the frame for best results.',
        buttonText: 'Got it',
        buttonColor: 'blue',
        position: 'center',
        pages: ['/try-on'],
        delay: 1,
        isActive: true
      },
      {
        id: 2,
        title: 'New Feature Available!',
        content: 'You can now save your measurements for faster try-on experiences.',
        buttonText: 'Try Now',
        buttonColor: 'green',
        secondaryButtonText: 'Later',
        secondaryButtonColor: 'gray',
        showSecondaryButton: true,
        position: 'bottom-right',
        pages: ['/'],
        delay: 2,
        isActive: true
      }
    ];
  };

  // Fetch popups on component mount
  useEffect(() => {
    const getPopups = async () => {
      try {
        setLoading(true);
        const data = await fetchPopups();
        setPopups(data);
      } catch (error) {
        console.error('Error fetching popups:', error);
      } finally {
        setLoading(false);
      }
    };

    getPopups();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add page to the list
  const handleAddPage = () => {
    if (pageInput && !formValues.pages.includes(pageInput)) {
      setFormValues(prev => ({
        ...prev,
        pages: [...prev.pages, pageInput]
      }));
      setPageInput('');
    }
  };

  // Remove page from the list
  const handleRemovePage = (pageToRemove) => {
    setFormValues(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page !== pageToRemove)
    }));
  };

  // Create or update a popup
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // This would typically be an API call to create/update a popup
      if (isEditing) {
        // Update popup
        const updatedPopups = popups.map(popup => 
          popup.id === formValues.id ? formValues : popup
        );
        setPopups(updatedPopups);
      } else {
        // Create new popup
        const newPopup = {
          ...formValues,
          id: Date.now() // Use timestamp as temp ID
        };
        setPopups([...popups, newPopup]);
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Error saving popup:', error);
    }
  };

  // Edit a popup
  const handleEdit = (popup) => {
    setFormValues(popup);
    setIsEditing(true);
    setCurrentPopup(popup);
  };

  // Delete a popup
  const handleDelete = async (id) => {
    try {
      // This would typically be an API call to delete a popup
      setPopups(popups.filter(popup => popup.id !== id));
    } catch (error) {
      console.error('Error deleting popup:', error);
    }
  };

  // Toggle popup active status
  const handleToggleActive = (id) => {
    setPopups(popups.map(popup => 
      popup.id === id ? { ...popup, isActive: !popup.isActive } : popup
    ));
  };

  // Reset form values
  const resetForm = () => {
    setFormValues({
      id: null,
      title: '',
      content: '',
      buttonText: 'OK',
      buttonColor: 'blue',
      position: 'center',
      pages: [],
      delay: 0,
      isActive: true,
      showSecondaryButton: false,
      secondaryButtonText: '',
      secondaryButtonColor: 'gray',
      imageUrl: ''
    });
    setIsEditing(false);
    setCurrentPopup(null);
  };

  if (loading) {
    return <div className="p-4">Loading popup management...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Popup Management</h2>
      
      {/* Popup List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Current Popups</h3>
        {popups.length === 0 ? (
          <p className="text-gray-500">No popups configured yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Pages</th>
                  <th className="py-2 px-4 border-b">Position</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {popups.map(popup => (
                  <tr key={popup.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{popup.title}</td>
                    <td className="py-2 px-4 border-b">
                      {popup.pages.join(', ')}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {positionOptions.find(p => p.value === popup.position)?.label || popup.position}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs ${popup.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {popup.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleToggleActive(popup.id)}
                          className="p-1 rounded hover:bg-gray-100"
                          title={popup.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {popup.isActive ? (
                            <EyeOffIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-blue-500" />
                          )}
                        </button>
                        <button 
                          onClick={() => handleEdit(popup)}
                          className="p-1 rounded hover:bg-gray-100"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => handleDelete(popup.id)}
                          className="p-1 rounded hover:bg-gray-100"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Popup Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Popup' : 'Create New Popup'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="col-span-2">
              <label htmlFor="title" className="block mb-1 font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            {/* Content */}
            <div className="col-span-2">
              <label htmlFor="content" className="block mb-1 font-medium">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formValues.content}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>
            
            {/* Image URL */}
            <div className="col-span-2">
              <label htmlFor="imageUrl" className="block mb-1 font-medium">
                Image URL (optional)
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formValues.imageUrl}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            {/* Button Text */}
            <div>
              <label htmlFor="buttonText" className="block mb-1 font-medium">
                Button Text
              </label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                value={formValues.buttonText}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            {/* Button Color */}
            <div>
              <label htmlFor="buttonColor" className="block mb-1 font-medium">
                Button Color
              </label>
              <select
                id="buttonColor"
                name="buttonColor"
                value={formValues.buttonColor}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Show Secondary Button */}
            <div className="col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="showSecondaryButton"
                  checked={formValues.showSecondaryButton}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Show Secondary Button</span>
              </label>
            </div>
            
            {/* Secondary Button Text & Color - only show if secondary button is enabled */}
            {formValues.showSecondaryButton && (
              <>
                <div>
                  <label htmlFor="secondaryButtonText" className="block mb-1 font-medium">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    id="secondaryButtonText"
                    name="secondaryButtonText"
                    value={formValues.secondaryButtonText}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required={formValues.showSecondaryButton}
                  />
                </div>
                <div>
                  <label htmlFor="secondaryButtonColor" className="block mb-1 font-medium">
                    Secondary Button Color
                  </label>
                  <select
                    id="secondaryButtonColor"
                    name="secondaryButtonColor"
                    value={formValues.secondaryButtonColor}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            {/* Position */}
            <div>
              <label htmlFor="position" className="block mb-1 font-medium">
                Position
              </label>
              <select
                id="position"
                name="position"
                value={formValues.position}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                {positionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Delay */}
            <div>
              <label htmlFor="delay" className="block mb-1 font-medium">
                Delay (seconds)
              </label>
              <input
                type="number"
                id="delay"
                name="delay"
                value={formValues.delay}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>
            
            {/* Pages */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Pages</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  placeholder="e.g., /try-on or /products/*"
                  className="flex-1 p-2 border rounded-l"
                />
                <button
                  type="button"
                  onClick={handleAddPage}
                  className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formValues.pages.map(page => (
                  <div key={page} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <span className="mr-1">{page}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePage(page)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {formValues.pages.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No pages added. Add pages where this popup should appear.
                  </p>
                )}
              </div>
            </div>
            
            {/* Active Status */}
            <div className="col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formValues.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Active</span>
              </label>
            </div>
          </div>
          
          {/* Form Buttons */}
          <div className="mt-6 flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEditing ? 'Update Popup' : 'Create Popup'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupManagement; 