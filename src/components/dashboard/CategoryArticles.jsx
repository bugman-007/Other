import React, { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaCog } from 'react-icons/fa';

const CategoryArticles = ({ category, onUpdateCategory }) => {
  const [articles, setArticles] = useState(category.articles || []);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showDisplaySettings, setShowDisplaySettings] = useState(false);
  const [displaySettings, setDisplaySettings] = useState(
    category.displaySettings || {
      desktop: 4,
      tablet: 3,
      mobile: 2
    }
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial render
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleSaveArticle = (article) => {
    let updatedArticles;
    
    if (editingArticle) {
      // Update existing article
      updatedArticles = articles.map(a => 
        a.id === article.id ? article : a
      );
    } else {
      // Add new article
      updatedArticles = [...articles, article];
    }
    
    setArticles(updatedArticles);
    setIsAddingArticle(false);
    setEditingArticle(null);
    
    // Update parent category with new articles
    onUpdateCategory({
      ...category,
      articles: updatedArticles
    });
  };
  
  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(a => a.id !== articleId);
      setArticles(updatedArticles);
      
      // Update parent category with new articles
      onUpdateCategory({
        ...category,
        articles: updatedArticles
      });
    }
  };
  
  const handleToggleStatus = (article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    const updatedArticle = { ...article, status: newStatus };
    
    const updatedArticles = articles.map(a => 
      a.id === article.id ? updatedArticle : a
    );
    
    setArticles(updatedArticles);
    
    // Update parent category with new articles
    onUpdateCategory({
      ...category,
      articles: updatedArticles
    });
  };

  const handleSaveDisplaySettings = () => {
    // Update parent category with new display settings
    onUpdateCategory({
      ...category,
      displaySettings: displaySettings
    });
    setShowDisplaySettings(false);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Articles in "{category.name}"</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowDisplaySettings(true)}
            className="flex items-center bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 text-sm"
          >
            <FaCog className="mr-1.5" /> Display Settings
          </button>
          <button
            onClick={() => setIsAddingArticle(true)}
            className="flex items-center bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 text-sm"
          >
            <FaPlus className="mr-1.5" /> Add Article
          </button>
        </div>
      </div>
      
      {/* Display Settings Form */}
      {showDisplaySettings && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-4">Category Display Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desktop Items Per Row
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={displaySettings.desktop}
                onChange={(e) => setDisplaySettings({
                  ...displaySettings,
                  desktop: parseInt(e.target.value, 10) || 4
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tablet Items Per Row
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={displaySettings.tablet}
                onChange={(e) => setDisplaySettings({
                  ...displaySettings,
                  tablet: parseInt(e.target.value, 10) || 3
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Items Per Row
              </label>
              <input
                type="number"
                min="1"
                max="4"
                value={displaySettings.mobile}
                onChange={(e) => setDisplaySettings({
                  ...displaySettings,
                  mobile: parseInt(e.target.value, 10) || 2
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowDisplaySettings(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDisplaySettings}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
      
      {/* Add/Edit Article Form */}
      {(isAddingArticle || editingArticle) && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingArticle ? 'Edit Article' : 'Add New Article'}
          </h3>
          <ArticleForm 
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={() => {
              setIsAddingArticle(false);
              setEditingArticle(null);
            }}
          />
        </div>
      )}
      
      {/* Article List */}
      {articles.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Mobile Card View */}
          {isMobile ? (
            <div className="divide-y divide-gray-200">
              {articles.map((article) => (
                <div key={article.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-xs text-gray-500 mb-1">{formatDate(article.createdAt)}</div>
                      <div className="text-xs text-gray-500 mb-2 line-clamp-2">{article.summary}</div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-4">
                    <button
                      onClick={() => setEditingArticle(article)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                      title="Edit Article"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(article)}
                      className={`${
                        article.status === 'published' 
                          ? 'text-yellow-600 hover:text-yellow-900' 
                          : 'text-green-600 hover:text-green-900'
                      } p-1`}
                      title={article.status === 'published' ? 'Set to Draft' : 'Publish'}
                    >
                      {article.status === 'published' ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete Article"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
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
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{article.summary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-16 w-16 rounded-md overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(article.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingArticle(article)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          title="Edit Article"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(article)}
                          className={`${
                            article.status === 'published' 
                              ? 'text-yellow-600 hover:text-yellow-900' 
                              : 'text-green-600 hover:text-green-900'
                          } mr-3`}
                          title={article.status === 'published' ? 'Set to Draft' : 'Publish'}
                        >
                          {article.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Article"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No articles in this category yet. Click "Add Article" to create one.
        </div>
      )}
    </div>
  );
};

export default CategoryArticles;