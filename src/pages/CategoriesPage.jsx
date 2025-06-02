import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories data 
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'underwear', name: 'Underwear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'bags', name: 'Bags' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'sportswear', name: 'Sportswear' },
    { id: 'formal', name: 'Formal Wear' },
    { id: 'swimwear', name: 'Swimwear' },
    { id: 'sleepwear', name: 'Sleepwear' },
    { id: 'jewelry', name: 'Jewelry' }
  ];
  
  // Demo items data with tags for e-commerce implementation
  const items = [
    { id: 1, name: 'T-Shirt', category: 'clothing', image: 'https://images.pexels.com/photos/6347567/pexels-photo-6347567.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Basic', 'Easy Integration'] },
    { id: 2, name: 'Jeans', category: 'clothing', image: 'https://images.pexels.com/photos/9769853/pexels-photo-9769853.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Complex Fit', 'Size Recommendation'] },
    { id: 3, name: 'Leather Jacket', category: 'outerwear', image: 'https://images.pexels.com/photos/5730956/pexels-photo-5730956.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Premium', 'Material Simulation'] },
    { id: 4, name: 'Dress', category: 'clothing', image: 'https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Movement Simulation', 'Fabric Flow'] },
    { id: 5, name: 'Sneakers', category: 'footwear', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Foot Scanning', '3D Rotation'] },
    { id: 6, name: 'Handbag', category: 'bags', image: 'https://images.pexels.com/photos/5214139/pexels-photo-5214139.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Accessory Pairing', 'Size Comparison'] },
    { id: 7, name: 'Sunglasses', category: 'accessories', image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Face Mapping', 'AR Compatible'] },
    { id: 8, name: 'Bra', category: 'underwear', image: 'https://images.pexels.com/photos/6311680/pexels-photo-6311680.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Fit Technology', 'Size Prediction'] },
    { id: 9, name: 'Boxers', category: 'underwear', image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Comfort Simulation', 'Basic Integration'] },
    { id: 10, name: 'Watch', category: 'accessories', image: 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Wrist Sizing', 'AR Enabled'] },
    { id: 11, name: 'Boots', category: 'footwear', image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['3D Rotation', 'Fit Analysis'] },
    { id: 12, name: 'Backpack', category: 'bags', image: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Volume Estimation', 'Visual Sizing'] },
    { id: 13, name: 'Sweater', category: 'clothing', image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Texture Rendering', 'Layering Simulation'] },
    { id: 14, name: 'Running Shoes', category: 'sportswear', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Performance Visualization', '3D Rotation'] },
    { id: 15, name: 'Suit', category: 'formal', image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Complete Outfit', 'Advanced Tailoring'] },
    { id: 16, name: 'Swimsuit', category: 'swimwear', image: 'https://images.pexels.com/photos/1386809/pexels-photo-1386809.jpeg?auto=compress&cs=tinysrgb&w=300', tags: ['Material Simulation', 'UV Protection Visual'] }
  ];
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Product Categories Demo</h1>
          <p className="text-lg text-gray-600">
            Experience our 3D try-on technology across various product categories. This demonstration showcases how your customers
            will be able to virtually try products from your e-commerce store. Select a category below to explore the possibilities.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-wrap justify-center gap-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link 
                    to={`/try-on/${item.id}`}
                    className="block w-full text-center bg-primary text-white py-2 rounded-md"
                  >
                    Try On Demo
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No demo items found</h3>
            <p className="text-gray-600">Try selecting a different category or contact us to request a custom demo for your specific products.</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6 mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">For E-commerce Merchants</h2>
          <p className="text-gray-700 mb-4">
            Our 3D try-on technology is designed to help e-commerce businesses increase conversion rates and reduce returns. 
            This demo area allows you to explore how the technology works across different product categories.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-lg mb-2">How to use this demo:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Browse through different product categories that match your e-commerce offerings</li>
              <li>Click "Try On Demo" on any product to experience the 3D try-on interface</li>
              <li>See how your customers would interact with your products in a virtual environment</li>
              <li>Contact our sales team to discuss implementing this technology on your website</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;