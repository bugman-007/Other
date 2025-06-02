/**
 * This file contains mock data for product models
 * In a real implementation, this would be fetched from an API
 */

export const dummyModels = [
    {
      id: 1,
      name: 'Basic T-Shirt',
      category: 'clothing',
      type: 't-shirt',
      thumbnail: 'https://via.placeholder.com/150',
      modelUrl: '/models/tshirt.glb', // This would be a real path in production
      price: 24.99,
      description: 'A comfortable basic t-shirt made of 100% cotton.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'White', value: '#FFFFFF' },
        { name: 'Black', value: '#000000' },
        { name: 'Red', value: '#FF0000' },
        { name: 'Blue', value: '#0000FF' },
        { name: 'Green', value: '#00FF00' },
      ],
      defaultColor: '#FFFFFF',
      defaultSize: 'M',
    },
    {
      id: 2,
      name: 'Slim Jeans',
      category: 'clothing',
      type: 'jeans',
      thumbnail: 'https://via.placeholder.com/150',
      modelUrl: '/models/jeans.glb', // This would be a real path in production
      price: 49.99,
      description: 'Stylish slim jeans with a modern fit.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Blue Denim', value: '#4A6997' },
        { name: 'Black', value: '#000000' },
        { name: 'Grey', value: '#808080' },
      ],
      defaultColor: '#4A6997',
      defaultSize: 'M',
    },
    {
      id: 3,
      name: 'Leather Jacket',
      category: 'outerwear',
      type: 'jacket',
      thumbnail: 'https://via.placeholder.com/150',
      modelUrl: '/models/jacket.glb', // This would be a real path in production
      price: 199.99,
      description: 'Classic leather jacket with a timeless design.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Brown', value: '#8B4513' },
        { name: 'Black', value: '#000000' },
      ],
      defaultColor: '#8B4513',
      defaultSize: 'M',
    },
    {
      id: 4,
      name: 'Summer Dress',
      category: 'clothing',
      type: 'dress',
      thumbnail: 'https://via.placeholder.com/150',
      modelUrl: '/models/dress.glb', // This would be a real path in production
      price: 79.99,
      description: 'Light and flowy summer dress perfect for warm days.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'White', value: '#FFFFFF' },
        { name: 'Blue', value: '#ADD8E6' },
        { name: 'Pink', value: '#FFC0CB' },
        { name: 'Yellow', value: '#FFFF00' },
      ],
      defaultColor: '#FFC0CB',
      defaultSize: 'M',
    },
    {
      id: 5,
      name: 'Wool Sweater',
      category: 'clothing',
      type: 'sweater',
      thumbnail: 'https://via.placeholder.com/150',
      modelUrl: '/models/sweater.glb', // This would be a real path in production
      price: 89.99,
      description: 'Cozy wool sweater for colder weather.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Beige', value: '#F5F5DC' },
        { name: 'Grey', value: '#808080' },
        { name: 'Navy', value: '#000080' },
        { name: 'Burgundy', value: '#800020' },
      ],
      defaultColor: '#F5F5DC',
      defaultSize: 'M',
    },
    {
      id: 6,
      name: 'Pleated Skirt',
      category: 'clothing',
      type: 'skirt',
      thumbnail: 'https://via.placeholder.com/150',
      modelUrl: '/models/skirt.glb', // This would be a real path in production
      price: 59.99,
      description: 'Elegant pleated skirt that goes with everything.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Navy', value: '#000080' },
        { name: 'Beige', value: '#F5F5DC' },
        { name: 'Plaid', value: '#8B0000' },
      ],
      defaultColor: '#000000',
      defaultSize: 'M',
    },
  ];