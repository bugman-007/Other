import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample subscriptions/orders data for a 3D try-on platform
  const [orders, setOrders] = useState([
    {
      id: 'SUB-2023-8761',
      date: '2023-05-15',
      total: 49.99,
      status: 'active',
      planName: 'Professional Plan',
      planFeatures: [
        'Up to 100 products',
        'Advanced analytics',
        'API integration',
        'Customer support',
        'Custom branding'
      ],
      paymentMethod: {
        type: 'Credit Card',
        last4: '4242',
        expiry: '05/25'
      },
      billingCycle: 'Monthly',
      nextBillingDate: '2023-06-15'
    },
    {
      id: 'SUB-2023-6532',
      date: '2023-04-28',
      total: 399.99,
      status: 'active',
      planName: 'Enterprise Plan',
      planFeatures: [
        'Unlimited products',
        'Advanced analytics',
        'API integration',
        'Priority support',
        'Custom branding',
        'Dedicated account manager',
        'Custom development'
      ],
      paymentMethod: {
        type: 'Credit Card',
        last4: '1234',
        expiry: '08/24'
      },
      billingCycle: 'Annual',
      nextBillingDate: '2024-04-28'
    },
    {
      id: 'SUB-2023-9102',
      date: '2023-05-10',
      total: 19.99,
      status: 'trial',
      planName: 'Basic Plan - Trial',
      planFeatures: [
        'Up to 20 products',
        'Basic analytics',
        'Standard support',
        'Standard branding'
      ],
      trialEnd: '2023-05-24',
      paymentMethod: {
        type: 'Not yet provided'
      }
    },
    {
      id: 'SUB-2023-5478',
      date: '2023-02-18',
      total: 29.99,
      status: 'expired',
      planName: 'Basic Plan',
      planFeatures: [
        'Up to 20 products',
        'Basic analytics',
        'Standard support',
        'Standard branding'
      ],
      paymentMethod: {
        type: 'Credit Card',
        last4: '5678',
        expiry: '03/23'
      },
      billingCycle: 'Monthly',
      cancelledAt: '2023-05-18',
      cancellationReason: 'Upgraded to Professional Plan'
    },
    {
      id: 'ADD-2023-3210',
      date: '2023-05-05',
      total: 99.99,
      status: 'completed',
      addonName: 'AI Size Recommendation Engine',
      addonFeatures: [
        'One-time purchase',
        'AI-powered size recommendations',
        'Integration with existing 3D models',
        '30-day satisfaction guarantee'
      ],
      paymentMethod: {
        type: 'PayPal',
        email: 'j***@example.com'
      }
    }
  ]);

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/');
    } else {
      // In a real app, we would fetch orders/subscriptions from an API here
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [navigate]);

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get order status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trial':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Subscriptions & Add-ons
          </h2>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {/* Order Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['all', 'active', 'trial', 'pending', 'expired', 'completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab 
                      ? 'border-indigo-500 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'all' 
                  ? "You don't have any active subscriptions yet." 
                  : `You don't have any ${activeTab} subscriptions.`}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/pricing')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Pricing Plans
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
                    <div className="flex justify-between items-center flex-wrap">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                          {order.planName || order.addonName}
                          <span className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          {order.id} • Started on {formatDate(order.date)} • ${order.total.toFixed(2)}/{order.billingCycle?.toLowerCase() || 'one-time'}
                        </p>
                      </div>
                      <div className="flex mt-2 sm:mt-0">
                        {order.status === 'active' && (
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                          >
                            Manage Plan
                          </button>
                        )}
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {(order.planFeatures || order.addonFeatures).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-sm font-medium text-gray-900">Payment Information</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.paymentMethod.type}
                      {order.paymentMethod.last4 && ` ending in ${order.paymentMethod.last4}`}
                      {order.paymentMethod.expiry && ` (Expires: ${order.paymentMethod.expiry})`}
                      {order.paymentMethod.email && `: ${order.paymentMethod.email}`}
                    </p>
                    
                    {order.status === 'trial' && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Trial Ends On</h4>
                        <p className="mt-1 text-sm text-gray-500">{formatDate(order.trialEnd)}</p>
                      </div>
                    )}
                    
                    {order.status === 'active' && order.nextBillingDate && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Next Billing Date</h4>
                        <p className="mt-1 text-sm text-gray-500">{formatDate(order.nextBillingDate)}</p>
                      </div>
                    )}
                    
                    {order.status === 'expired' && (
                      <>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">Expired On</h4>
                          <p className="mt-1 text-sm text-gray-500">{formatDate(order.cancelledAt)}</p>
                        </div>
                        {order.cancellationReason && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900">Reason</h4>
                            <p className="mt-1 text-sm text-gray-500">{order.cancellationReason}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      {order.billingCycle && (
                        <>
                          <span className="text-sm font-medium text-gray-900">Billing: </span>
                          <span className="text-sm font-bold text-gray-900">${order.total.toFixed(2)} / {order.billingCycle}</span>
                        </>
                      )}
                      {!order.billingCycle && (
                        <>
                          <span className="text-sm font-medium text-gray-900">Total: </span>
                          <span className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</span>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      {order.status === 'active' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Change Plan
                        </button>
                      )}
                      {order.status === 'trial' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Upgrade Now
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Support
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage; 