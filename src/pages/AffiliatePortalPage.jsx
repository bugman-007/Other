import React, { useState, useEffect } from 'react';
import AffiliatePortalLayout from '../components/AffiliatePortalLayout';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// First, let's add the AdminChatCenter component to the AffiliatePortalPage.jsx file
import AdminChatCenter from '../components/AdminChatCenter';

const AffiliatePortalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'approved', 'rejected'

  // Check authentication and verification status
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'affiliate' && userRole !== 'merchant') {
      // Redirect to appropriate page based on role
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
      return;
    }
    
    // Fetch verification status from API/localStorage (simulating API)
    const storedVerificationStatus = localStorage.getItem('verificationStatus') || 'pending';
    setVerificationStatus(storedVerificationStatus);
    setIsVerified(storedVerificationStatus === 'approved');
  }, [navigate]);
  
  // Extract tab from URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/affiliate') {
      setActiveTab('dashboard'); // Default tab
    } else {
      // Get the last part of the URL (e.g., /affiliate/links -> links)
      const tab = path.split('/').pop();
      if (['dashboard', 'links', 'payments', 'marketing', 'profile', 'support'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [location]);

  const navigateToTab = (tab) => {
    setActiveTab(tab);
    // Navigate to the correct route matching App.js route structure
    navigate(`/affiliate/${tab}`);
  };

  // Get home page URL based on user role
  const getHomePage = () => {
    const userRole = localStorage.getItem('userRole') || '';
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'merchant':
        return '/merchants';
      case 'affiliate':
        return '/affiliate/dashboard';
      case 'user':
      default:
        return '/home';
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate(getHomePage());
  };

  // Tab definitions for easier management
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'links', label: 'My Links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    { id: 'payments', label: 'Payments', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'marketing', label: 'Marketing', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'support', label: 'Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  const stats = [
    { 
      id: 1, 
      name: 'Total Referrals', 
      value: '138', 
      change: '+12.3%',
      color: 'blue',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    { 
      id: 2, 
      name: 'Completed Purchases', 
      value: '42', 
      change: '+8.1%',
      color: 'green',
      icon: 'M5 13l4 4L19 7'
    },
    { 
      id: 3, 
      name: 'Conversion Rate', 
      value: '30.4%', 
      change: '+2.5%',
      color: 'indigo',
      icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    { 
      id: 4, 
      name: 'Commission Earned', 
      value: '$1,247.53', 
      change: '+15.3%',
      color: 'purple',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
  ];

  const recentReferrals = [
    {
      id: 1,
      referral: 'Store 1',
      date: 'Jun 1, 2023',
      status: 'Signed Up',
      commission: '$0.00',
    },
    {
      id: 2,
      referral: 'Store 2',
      date: 'May 28, 2023',
      status: 'Purchased',
      commission: '$89.99',
    },
    {
      id: 3,
      referral: 'Store 3',
      date: 'May 25, 2023',
      status: 'Purchased',
      commission: '$179.99',
    },
    {
      id: 4,
      referral: 'Store 4',
      date: 'May 22, 2023',
      status: 'Trial',
      commission: '$0.00',
    },
    {
      id: 5,
      referral: 'Store 5',
      date: 'May 20, 2023',
      status: 'Purchased',
      commission: '$59.99',
    }
  ];

  const paymentHistory = [
    { id: 1, amount: '$450.00', date: 'May 15, 2023', method: 'PayPal', status: 'Paid' },
    { id: 2, amount: '$372.53', date: 'Apr 15, 2023', method: 'PayPal', status: 'Paid' },
    { id: 3, amount: '$425.00', date: 'Mar 15, 2023', method: 'Bank Transfer', status: 'Paid' },
  ];

  // Toggle verification status for demo purposes
  const toggleVerificationStatus = () => {
    const newStatus = verificationStatus === 'pending' ? 'approved' : 
                      verificationStatus === 'approved' ? 'rejected' : 'pending';
    setVerificationStatus(newStatus);
    setIsVerified(newStatus === 'approved');
    localStorage.setItem('verificationStatus', newStatus);
  };

  // Verification Overlay Component with improved UI
  const VerificationOverlay = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-slideIn border border-gray-100">
          {verificationStatus === 'pending' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-100">
                <svg className="h-12 w-12 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">Verification Pending</h3>
              <div className="mt-3 text-gray-500 space-y-2">
                <p>
                  Your affiliate account is currently under review. This usually takes 1-2 business days.
                </p>
                <p>
                  We'll notify you once the verification is complete.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => navigate('/affiliate/support')}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                >
                  Contact Support
                </button>
                {/* Demo toggle button - would be removed in production */}
                <button
                  onClick={toggleVerificationStatus}
                  className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                >
                  Demo: Approve Account
                </button>
              </div>
            </div>
          )}
          
          {verificationStatus === 'approved' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">Verification Approved</h3>
              <div className="mt-3 text-gray-500 space-y-2">
                <p>
                  Your account has been verified! You now have full access to the affiliate portal.
                </p>
                <p>
                  Start creating links and earning commissions.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={toggleVerificationStatus}
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          )}
          
          {verificationStatus === 'rejected' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
                <svg className="h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">Verification Failed</h3>
              <div className="mt-3 text-gray-500">
                <p className="mb-3">
                  Unfortunately, we couldn't verify your account due to the following reasons:
                </p>
                <ul className="text-left text-gray-600 py-3 px-6 bg-gray-50 rounded-lg mx-auto max-w-xs space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Incomplete personal information
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Invalid business details
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Mismatch in provided documentation
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => navigate('/affiliate/support')}
                  className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Contact Support
                </button>
                {/* Demo toggle button - would be removed in production */}
                <button
                  onClick={toggleVerificationStatus}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Demo: Reset Status
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Affiliate Dashboard</h2>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Export Data
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Link
                </button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white rounded-lg shadow-md p-5 border-l-4" style={{ borderLeftColor: `var(--color-${stat.color}-500)` }}>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.name}</p>
                      <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                    </div>
                    <div className="h-12 w-12 rounded-md bg-gray-100 p-2 flex items-center justify-center">
                      <svg className={`h-8 w-8 text-${stat.color}-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`text-sm font-medium text-${stat.change.startsWith('+') ? 'green' : 'red'}-600`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500"> from last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Referrals */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-medium">Recent Referrals</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentReferrals.map((referral) => (
                      <tr key={referral.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{referral.referral}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referral.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            referral.status === 'Purchased' ? 'bg-green-100 text-green-800' : 
                            referral.status === 'Trial' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {referral.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referral.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'links':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">My Affiliate Links</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Link
              </button>
            </div>
            
            {/* Quick Link Creator */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-medium mb-4">Quick Link Generator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Product or Page URL
                  </label>
                  <input
                    type="text"
                    id="baseUrl"
                    placeholder="https://kokomatto.com/products/example"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="campaignId" className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign (Optional)
                  </label>
                  <select
                    id="campaignId"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">None</option>
                    <option value="summer23">Summer 2023</option>
                    <option value="holiday23">Holiday 2023</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="generatedLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Affiliate Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="generatedLink"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                      placeholder="Your link will appear here"
                      readOnly
                      value="https://kokomatto.com/ref/user123?campaign="
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Generate Link
                  </button>
                </div>
              </div>
            </div>
            
            {/* Active Links Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Your Active Links</h3>
              </div>
              <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clicks
                            </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conversions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Homepage</div>
                        <div className="text-sm text-gray-500">Default</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        kokomatto.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        May 12, 2023
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">243</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">18</div>
                        <div className="text-sm text-gray-500">7.4%</div>
                              </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                            </svg>
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Summer Collection</div>
                        <div className="text-sm text-gray-500">summer23</div>
                              </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        kokomatto.com/summer
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jun 1, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">187</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">23</div>
                        <div className="text-sm text-gray-500">12.3%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                            </svg>
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        </div>
                              </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </a>
                  </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of <span className="font-medium">8</span> results
                    </p>
                </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        1
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        2
                      </span>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
              </div>
            </div>
          </div>
            </div>
          </div>
        );
      
      case 'payments':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Download Statement
                      </button>
              </div>
                </div>
                
            {/* Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-2xl font-semibold mt-1">$247.53</p>
                  </div>
                  <div className="h-12 w-12 rounded-md bg-gray-100 p-2 flex items-center justify-center">
                    <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Request Payout
                      </button>
                </div>
                </div>
                
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Next Payout</p>
                    <p className="text-2xl font-semibold mt-1">Jun 15, 2023</p>
                  </div>
                  <div className="h-12 w-12 rounded-md bg-gray-100 p-2 flex items-center justify-center">
                    <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Automatic payments are processed on the 15th of each month for balances over $50.</p>
                </div>
                </div>
                
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-indigo-500">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Lifetime Earnings</p>
                    <p className="text-2xl font-semibold mt-1">$1,495.05</p>
                </div>
                  <div className="h-12 w-12 rounded-md bg-gray-100 p-2 flex items-center justify-center">
                    <svg className="h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
            </div>
          </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-green-600">+12.3%</span>
                  <span className="text-sm text-gray-500"> from last month</span>
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">+ Add New</button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-4">
                    <svg className="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">PayPal</p>
                    <p className="text-sm text-gray-500">username@example.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 mr-4">Default</span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              </div>
              
            {/* Payment History Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
              </div>
              <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Method
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {paymentHistory.map((payment) => (
                                <tr key={payment.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {payment.date}
                                  </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.amount}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {payment.method}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {payment.status}
                                    </span>
                                  </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Download
                          </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </a>
                      </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'marketing':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Marketing Materials</h2>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Request Custom Assets
                </button>
              </div>
            </div>
            
            {/* Marketing Resources */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Quick Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                    <h4 className="font-medium">Affiliate Guide</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive guide to our affiliate program, best practices, and FAQs.</p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                      Download PDF
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                  </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                </div>
                    <h4 className="font-medium">Sales Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Monthly analysis of top-performing products and campaigns.</p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    View Report
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
              </div>
              
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    </div>
                    <h4 className="font-medium">Commission Plan</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Details about commission rates, tiers, and special promotions.</p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    Learn More
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-medium">Content Calendar</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upcoming promotions, launches, and key marketing dates.</p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    View Calendar
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Banner Images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Banner Images</h3>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Filter
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sort
                  </button>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Banner 1 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <img 
                      src="https://via.placeholder.com/300x150/6366F1/FFFFFF?text=Kokomatto+Banner" 
                      alt="Banner 1" 
                      className="w-full h-full object-cover" 
                    />
                </div>
                <div className="p-4">
                    <h4 className="text-sm font-medium mb-2">Summer Collection Banner</h4>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>728 x 90 px</span>
                      <span>JPG, PNG</span>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Download
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Preview
                    </button>
                  </div>
                </div>
              </div>
              
                {/* Banner 2 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <img 
                      src="https://via.placeholder.com/300x150/4F46E5/FFFFFF?text=Special+Offer" 
                      alt="Banner 2" 
                      className="w-full h-full object-cover" 
                    />
                </div>
                <div className="p-4">
                    <h4 className="text-sm font-medium mb-2">Special Offer Banner</h4>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>300 x 250 px</span>
                      <span>JPG, PNG</span>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Download
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Preview
                    </button>
                  </div>
                </div>
              </div>
                
                {/* Banner 3 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <img 
                      src="https://via.placeholder.com/300x150/3730A3/FFFFFF?text=Free+Shipping" 
                      alt="Banner 3" 
                      className="w-full h-full object-cover" 
                    />
            </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium mb-2">Free Shipping Banner</h4>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>160 x 600 px</span>
                      <span>JPG, PNG</span>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Download
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All Banners
                </button>
              </div>
            </div>
            
            {/* Email Templates */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Welcome Email</h4>
                      <p className="text-sm text-gray-600 mt-1">Introduction to our products for new subscribers</p>
                    </div>
                    <div className="flex items-center">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4">Copy HTML</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Preview</button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Product Promotion</h4>
                      <p className="text-sm text-gray-600 mt-1">Showcase our top products with your affiliate links</p>
                    </div>
                    <div className="flex items-center">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4">Copy HTML</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Preview</button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Special Offer</h4>
                      <p className="text-sm text-gray-600 mt-1">Discount codes and limited-time promotions</p>
                    </div>
                    <div className="flex items-center">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4">Copy HTML</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Preview</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        );

      case 'profile':
  return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save Changes
              </button>
        </div>
            
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start mb-6">
                <div className="mr-6 mb-4 md:mb-0">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center relative overflow-hidden">
                    <span className="text-gray-500 text-2xl font-medium">SA</span>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
                  <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    Change Photo
                  </button>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue="Sam"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue="Affiliate"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="sam@example.com"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="(555) 123-4567"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="Digital marketer and content creator specializing in fashion and lifestyle products."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Brief description for your profile.
            </p>
          </div>
        </div>
              </div>
      </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    defaultValue="sam_affiliate"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website/Blog URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    defaultValue="https://myblog.com"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Brand Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    defaultValue="Sam's Digital Marketing"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID (optional)
                  </label>
                  <input
                    type="text"
                    id="taxId"
                    defaultValue=""
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Social Media Profiles */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-medium mb-4">Social Media Profiles</h3>
              <p className="text-sm text-gray-500 mb-4">
                Link your social media accounts to help us track your marketing efforts
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="https://facebook.com/samaffiliate"
                  />
                </div>
                <div className="flex items-center">
                  <div className="bg-pink-500 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="https://instagram.com/samaffiliate"
                  />
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-400 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="https://twitter.com/samaffiliate"
                  />
                </div>
                <div className="flex items-center">
                  <div className="bg-red-500 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'support':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
              <div className="flex space-x-3">
                <a 
                  href="mailto:affiliate-support@kokomatto.com" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </a>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <button className="flex justify-between items-center w-full text-left font-medium">
                      <span>How do I get my affiliate links?</span>
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
            </button>
                    <div className="mt-4 text-gray-600">
                      <p>You can generate affiliate links by navigating to the "My Links" section. There, you can create custom tracking links for any product or page on our website. Each link contains your unique affiliate ID to track referrals and sales.</p>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <button className="flex justify-between items-center w-full text-left font-medium">
                      <span>When and how do I get paid?</span>
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-4 text-gray-600">
                      <p>Payments are processed on the 15th of each month for balances over $50. You can choose your preferred payment method (PayPal, bank transfer, etc.) in the Payments section. Commission is calculated based on completed sales, with a 30-day cookie window for tracking.</p>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <button className="flex justify-between items-center w-full text-left font-medium">
                      <span>What commission rates do you offer?</span>
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-4 text-gray-600">
                      <p>Our standard commission rate is 10% on all sales. However, top-performing affiliates can qualify for higher rates (up to 15%) based on monthly sales volume. Special promotions may offer higher rates for limited periods.</p>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <button className="flex justify-between items-center w-full text-left font-medium">
                      <span>How do I track my performance?</span>
                      <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-4 text-gray-600">
                      <p>Your Dashboard provides real-time statistics on clicks, conversions, and earnings. You can view detailed reports by date range, campaign, or individual link in the Analytics section. We also send monthly performance reports to your registered email address.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-medium mb-4">Contact Support</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>Account Issues</option>
                      <option>Payment Question</option>
                      <option>Technical Support</option>
                      <option>Link Tracking</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe your issue in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
            <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Message
            </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      case 'admin':
        return (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
            <AdminChatCenter />
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <AffiliatePortalLayout>
      {/* Improved Header */}
      <div className="bg-white text-gray-900 relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center max-w-3xl">
              <button
                onClick={handleLogoClick}
                className="h-14 w-14 bg-white rounded-full flex items-center justify-center mr-4 hover:opacity-90 transition-opacity shadow-sm"
                title="Go to Home"
              >
                {/* <img 
                  className="h-12 w-12" 
                  src="https://i.ibb.co/KjrQ65br/logo.png" 
                  alt="KOKOMATTO" 
                  onError={(e) => {
                    // Fallback in case the logo doesn't load
                    e.target.src = "/assets/images/logo.png";
                    // If both fail, show text as last resort
                    e.target.onerror = () => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.alt = "K";
                      e.target.className = "font-bold text-indigo-600 text-xl";
                      e.target.parentElement.classList.add("justify-center");
                    };
                  }}
                /> */}
              </button>
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-1.5 bg-indigo-500 rounded-full mr-4"></div>
                  <span className="text-indigo-600 uppercase tracking-wider text-sm font-semibold">Partner Program</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">Affiliate Portal</h1>
                <p className="text-base md:text-lg max-w-3xl text-gray-600 leading-relaxed">
                  Grow your income by partnering with Kokomatto.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
              <a
                href="/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <span>Visit Store</span>
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 100-2H5z" />
                </svg>
              </a>
            <Link
                to="/affiliate/dashboard/overview"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <span>Advanced Dashboard</span>
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
          </div>
        </div>
      </div>

      {/* Improved Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap md:flex-nowrap -mb-px overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => navigateToTab(tab.id)}
              className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap flex items-center py-4 px-4 border-b-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <svg 
                  className={`mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === tab.id ? 2 : 1.5} d={tab.icon} />
                </svg>
                {tab.label}
            </button>
            ))}
          </nav>
        </div>
        </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={!isVerified ? "filter blur-sm pointer-events-none transition-all duration-300 ease-in-out" : "transition-all duration-300 ease-in-out"}>
        {renderTabContent()}
      </div>
      </div>

      {/* Verification Overlay */}
      {!isVerified && <VerificationOverlay />}
    </AffiliatePortalLayout>
  );
};

export default AffiliatePortalPage; 