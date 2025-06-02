import React, { useState, useEffect } from 'react';
import PopupEditor from './PopupEditor';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const PopupManager = () => {
  const [popups, setPopups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(null);

  // Load popups from localStorage on mount
  useEffect(() => {
    try {
      const savedPopups = JSON.parse(localStorage.getItem('popups')) || [];
      setPopups(savedPopups);
    } catch (error) {
      console.error('Error loading popups:', error);
      setPopups([]);
    }
  }, []);

  // Save popups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('popups', JSON.stringify(popups));
  }, [popups]);

  const handleAddNew = () => {
    setCurrentPopup(null);
    setIsEditing(true);
  };

  const handleEdit = (popup) => {
    setCurrentPopup(popup);
    setIsEditing(true);
  };

  const handleDelete = (popupId) => {
    if (window.confirm('Are you sure you want to delete this popup?')) {
      setPopups(popups.filter(popup => popup.id !== popupId));
    }
  };

  const toggleActive = (popupId) => {
    setPopups(popups.map(popup => 
      popup.id === popupId ? { ...popup, isActive: !popup.isActive } : popup
    ));
  };

  const handleSave = (updatedPopup) => {
    if (currentPopup) {
      // Update existing popup
      setPopups(popups.map(popup => 
        popup.id === updatedPopup.id ? updatedPopup : popup
      ));
    } else {
      // Add new popup
      const newPopup = {
        ...updatedPopup,
        id: Date.now().toString(),
        isActive: true
      };
      setPopups([...popups, newPopup]);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPopup(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Manage Popups</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Popup
        </button>
      </div>

      {isEditing ? (
        <PopupEditor 
          popup={currentPopup} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
          {popups.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No popups created yet. Click "Add New Popup" to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popups.map((popup) => (
                    <tr key={popup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {popup.title || 'Untitled Popup'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {popup.position || 'center'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {popup.pages && popup.pages.length > 0 
                          ? popup.pages.join(', ') 
                          : 'All pages'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            popup.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {popup.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleActive(popup.id)}
                            className="text-gray-600 hover:text-gray-900"
                            title={popup.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {popup.isActive ? (
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(popup)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(popup.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PopupManager; 