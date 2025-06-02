import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModel } from '../../store/appSlice';

const ProductSelector = () => {
  const dispatch = useDispatch();
  const { activeModel, availableModels } = useSelector((state) => state.app);

  // Mock data for first milestone demonstration
  const mockProducts = [
    { id: 1, name: 'T-Shirt', thumbnail: '/images/tshirt-thumb.jpg', modelUrl: '/models/tshirt.glb' },
    { id: 2, name: 'Jeans', thumbnail: '/images/jeans-thumb.jpg', modelUrl: '/models/jeans.glb' },
    { id: 3, name: 'Jacket', thumbnail: '/images/jacket-thumb.jpg', modelUrl: '/models/jacket.glb' },
    { id: 4, name: 'Dress', thumbnail: '/images/dress-thumb.jpg', modelUrl: '/models/dress.glb' },
    { id: 5, name: 'Sweater', thumbnail: '/images/sweater-thumb.jpg', modelUrl: '/models/sweater.glb' },
    { id: 6, name: 'Skirt', thumbnail: '/images/skirt-thumb.jpg', modelUrl: '/models/skirt.glb' },
  ];

  // Color coding for products in case images are not available
  const productColors = {
    'T-Shirt': '#3B82F6', // primary
    'Jeans': '#1E40AF',
    'Jacket': '#10B981', // secondary
    'Dress': '#8B5CF6', // accent
    'Sweater': '#EF4444',
    'Skirt': '#F59E0B',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Select Product</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
              activeModel === product.modelUrl
                ? 'border-primary scale-105'
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => dispatch(setActiveModel(product.modelUrl))}
          >
            <div 
              className="w-full aspect-square bg-gray-200"
              style={{
                backgroundImage: `url(${product.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: productColors[product.name] || '#f0f0f0'
              }}
            >
              {/* This span provides a fallback in case the image fails to load */}
              <span className="sr-only">{product.name}</span>
            </div>
            <div className="p-2 text-center text-sm">{product.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;