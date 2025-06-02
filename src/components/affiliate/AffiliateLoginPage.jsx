import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaApple, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

// Video URL for background
const videoUrl = "https://media-hosting.imagekit.io/b59ef433da0b49ca/video.mp4?Expires=1838327788&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Tf00nV-7zV5XWgKuQ7nGukejW5ntHmrcNw1J4-IDMXiMdCICyFmpBZf~7SDpOkVSRtd2cCH6YuxXxPQDPjbXoY1pYaJgEWvbG2WjplhMJPpqxHA5lZpVZBiu19jjd9LWyG7O4vCOOQATMttJRnaQ27ncw3Rpdur8NK0lQ-1CYf2lKGQm5lFHoGSY0dQn5WfwkP~jKWLHcviSBIZj5Cjmmw6D37hJb37hyiLufAiPogCGieB~-mNNWHC4SSvAU7n7XeauuQL4Sn0C3VDez52uOPeCCIxoidJQzs0rJEIvgVsvlIu1yNvA6eLgOqKfPxwJQNd71TgSdWK2958jQ3nsXQ__";

const AffiliateLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add fade-in animation effect
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulating authentication check
    setTimeout(() => {
      // For demo purposes only - in real app this would verify with a backend
      if (username === 'affiliate' && password === 'affiliate123') {
        // Affiliate login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'affiliate');
        
        // Call the onLogin prop function if provided
        if (onLogin) {
          onLogin('affiliate');
        }
        
        // Navigate to affiliate dashboard
        navigate('/affiliate/dashboard');
      } else {
        // Invalid credentials
        setError('Invalid username or password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  // Removing actual login functionality from social buttons
  const handleSocialLogin = (provider) => {
    // Just show a message that this is for front-end only
    alert(`${provider} login is not implemented yet. Please use username/password login.`);
  };

  return (
    <div className={`flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Left side - Video without overlay */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        {/* No overlay/shade as requested */}
        <video
          src={videoUrl}
          alt="Affiliate Portal"
          className="object-cover w-full h-full absolute inset-0"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-4xl font-bold mb-6 text-shadow-lg">Affiliate Portal</h2>
          <p className="text-xl text-center max-w-md text-shadow-lg">
            Sign in to access your affiliate dashboard, manage links, and track your earnings.
          </p>
        </div>
      </div>

      {/* Right side - Login Form with improved design */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-12">
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
            Affiliate Login
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to access your affiliate dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-blue-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-blue-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
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
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:translate-y-[-2px] ${
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
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* Social Login Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">
              <button 
                onClick={() => handleSocialLogin('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaGoogle className="text-red-500" />
              </button>
              <button 
                onClick={() => handleSocialLogin('Apple')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaApple className="text-gray-800" />
              </button>
              <button 
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaFacebook className="text-blue-600" />
              </button>
              <button 
                onClick={() => handleSocialLogin('Instagram')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300"
              >
                <FaInstagram className="text-pink-500" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/affiliate/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Apply now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateLoginPage; 