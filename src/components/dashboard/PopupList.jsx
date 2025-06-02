import React from 'react';
import { FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

const PopupList = ({ popups, onEdit, onDelete, onToggleStatus }) => {
  // Helper to display pages in a readable format
  const formatPages = (pages) => {
    if (!pages || pages.length === 0) return 'None';
    if (pages.includes('all')) return 'All Pages';
    
    return pages.map(page => {
      switch(page) {
        case 'home': return 'Home';
        case 'try-on': return 'Try-On';
        case 'product': return 'Products';
        case 'categories': return 'Categories';
        default: return page;
      }
    }).join(', ');
  };

  return (
    <div className="mt-4">
      {popups.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No popups created yet. Create your first popup to enhance user experience.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pages
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {popups.map((popup) => (
                <tr key={popup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {popup.imageUrl && (
                        <div className="flex-shrink-0 h-10 w-10 mr-4">
                          <img className="h-10 w-10 rounded-full object-cover" src={popup.imageUrl} alt="" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{popup.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{popup.content.substring(0, 50)}{popup.content.length > 50 ? '...' : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPages(popup.pages)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {popup.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${popup.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {popup.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onToggleStatus(popup.id)}
                        className="text-gray-400 hover:text-gray-600"
                        title={popup.enabled ? 'Disable' : 'Enable'}
                      >
                        {popup.enabled ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                      <button
                        onClick={() => onEdit(popup)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(popup.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
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
  );
};

export default PopupList; 