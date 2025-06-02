import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaApple, FaFacebook, FaInstagram, FaBuilding, FaGlobe, FaIdCard } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

// Video background URL
const videoUrl = "https://media-hosting.imagekit.io/b59ef433da0b49ca/video.mp4?Expires=1838327788&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Tf00nV-7zV5XWgKuQ7nGukejW5ntHmrcNw1J4-IDMXiMdCICyFmpBZf~7SDpOkVSRtd2cCH6YuxXxPQDPjbXoY1pYaJgEWvbG2WjplhMJPpqxHA5lZpVZBiu19jjd9LWyG7O4vCOOQATMttJRnaQ27ncw3Rpdur8NK0lQ-1CYf2lKGQm5lFHoGSY0dQn5WfwkP~jKWLHcviSBIZj5Cjmmw6D37hJb37hyiLufAiPogCGieB~-mNNWHC4SSvAU7n7XeauuQL4Sn0C3VDez52uOPeCCIxoidJQzs0rJEIvgVsvlIu1yNvA6eLgOqKfPxwJQNd71TgSdWK2958jQ3nsXQ__";

const MerchantSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    email: '',
    vatNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Add fade-in animation effect
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Business name validation
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    // Website validation
    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // VAT Number validation
    if (!formData.vatNumber.trim()) {
      newErrors.vatNumber = 'VAT/Tax number is required';
    }
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms acceptance validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      
      // Simulate API call for registration
      setTimeout(() => {
        console.log('Registration data:', formData);
        
        // Mock successful registration
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'merchant');
        
        // Notify user
        alert('Account created successfully! You are now logged in.');
        
        // Navigate to merchant dashboard
        navigate('/merchants');
        
        setLoading(false);
      }, 1500);
    }
  };

  // Social sign up handlers
  const handleSocialSignup = (provider) => {
    alert(`${provider} signup not implemented yet. Please use the form instead.`);
  };

  return (
    <div className={`flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Left side - Video */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <video
          src={videoUrl}
          alt="Virtual Try-On Experience"
          className="object-cover w-full h-full absolute inset-0"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-4xl font-bold mb-6 text-shadow-lg">Merchant Registration</h2>
          <p className="text-xl text-center max-w-md text-shadow-lg">
            Join KOKOMATTO as a merchant and showcase your products with cutting-edge 3D virtual try-on technology.
          </p>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Brand Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/kokomatto-logo.png" 
              alt="KOKOMATTO Logo" 
              className="h-16 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.ibb.co/KjrQ65br/logo.png";
              }} 
            />
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Merchant Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Register to integrate 3D virtual try-on with your store
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Information Section */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-lg font-medium text-gray-800 mb-3">Business Information</h2>
              
              {/* Business Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-blue-500" />
                  </div>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.businessName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="Your company name"
                  />
                </div>
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                )}
              </div>
              
              {/* Website URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-blue-500" />
                  </div>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.website ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="https://yourstore.com"
                  />
                </div>
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                )}
              </div>
              
              {/* Email Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="text-blue-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="email@yourcompany.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              {/* VAT/Tax Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VAT/Tax Number
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-blue-500" />
                  </div>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.vatNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="Your VAT or tax identification number"
                  />
                </div>
                {errors.vatNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.vatNumber}</p>
                )}
              </div>
            </div>
            
            {/* Account Credentials Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-3">Account Credentials</h2>
              
              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-blue-500" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="Choose a username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
              
              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-blue-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="Create a strong password"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-blue-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-10 block w-full py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                    placeholder="Confirm your password"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              
              {/* Terms and Conditions */}
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                      I agree to the
                      <a href="/terms" className="text-blue-600 hover:text-blue-500 mx-1">
                        Terms of Service
                      </a>
                      and
                      <a href="/privacy" className="text-blue-600 hover:text-blue-500 ml-1">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
                )}
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Social Sign Up Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">
              <button 
                onClick={() => handleSocialSignup('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaGoogle className="text-red-500" />
              </button>
              <button 
                onClick={() => handleSocialSignup('Apple')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaApple className="text-gray-800" />
              </button>
              <button 
                onClick={() => handleSocialSignup('Facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaFacebook className="text-blue-600" />
              </button>
              <button 
                onClick={() => handleSocialSignup('Instagram')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaInstagram className="text-pink-500" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/merchant/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantSignupPage; 