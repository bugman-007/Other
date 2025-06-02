import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSize, setActiveColor, setViewMode } from '../../store/appSlice';

const ControlPanel = () => {
  const dispatch = useDispatch();
  const { activeSize, activeColor, viewMode } = useSelector((state) => state.app);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Navy Blue', value: '#1e40af' },
    { name: 'Charcoal', value: '#334155' },
    { name: 'Forest Green', value: '#166534' },
    { name: 'Burgundy', value: '#9f1239' },
    { name: 'Royal Purple', value: '#7e22ce' },
    { name: 'Rust Orange', value: '#c2410c' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Size Options</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeSize === size
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => dispatch(setActiveSize(size))}
              aria-pressed={activeSize === size}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>View size guide for detailed measurements</span>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Color Selection</h3>
        <div className="grid grid-cols-6 gap-3" role="radiogroup" aria-label="Product color selection">
          {colors.map((color) => (
            <div key={color.value} className="flex flex-col items-center">
              <button
                className={`w-8 h-8 rounded-full transition-all ${
                  activeColor === color.value 
                    ? 'ring-2 ring-indigo-600 ring-offset-2 transform scale-110 shadow-md' 
                    : 'border border-gray-200 hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: color.value,
                  boxShadow: activeColor === color.value ? '0 2px 8px rgba(99, 102, 241, 0.2)' : 'none'
                }}
                onClick={() => dispatch(setActiveColor(color.value))}
                title={color.name}
                aria-label={`${color.name} color`}
                aria-pressed={activeColor === color.value}
              />
              <span className="mt-1 text-xs text-gray-600 font-medium">
                {color.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Viewing Mode</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-all ${
              viewMode === '3d'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => dispatch(setViewMode('3d'))}
            aria-pressed={viewMode === '3d'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="font-medium">3D View</span>
            <span className="text-xs mt-1">Interactive model</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-all ${
              viewMode === 'ar'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => dispatch(setViewMode('ar'))}
            aria-pressed={viewMode === 'ar'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">AR View</span>
            <span className="text-xs mt-1">See in your space</span>
          </button>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Need help with sizing?</span>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Size Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;