import React, { useState } from 'react';
import Layout from '../components/Layout';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    period: 'monthly',
    description: 'Perfect for small businesses with a single e-commerce store',
    features: [
      'API integration for 1 e-commerce store',
      'Basic 3D virtual try-on functionality',
      '10 product uploads per month',
      'Standard materials and textures',
      'Basic analytics dashboard',
      'Email support (response within 48 hours)',
      'Basic documentation and integration guides'
    ],
    limitations: [
      'No chat or video support for merchants',
      'Limited customization options',
      'Basic reporting only'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149,
    period: 'monthly',
    description: 'Enhanced features for growing businesses with multiple stores',
    features: [
      'API integration for up to 5 e-commerce stores',
      'Advanced 3D virtual try-on with better rendering',
      '50 product uploads per month',
      'Enhanced materials and textures',
      'Live chat customer support',
      'Comprehensive analytics',
      'Priority email & chat support (response within 24 hours)',
      'Developer API access',
      'Advanced documentation and integration guides'
    ],
    limitations: [
      'No video call support',
      'Limited white labeling options'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 349,
    period: 'monthly',
    description: 'Complete solution for large businesses with multiple stores',
    features: [
      'API integration for up to 10 e-commerce stores',
      'Premium 3D virtual try-on with highest quality rendering',
      'Unlimited product uploads',
      'Premium materials and textures',
      'Live chat and video call customer support',
      'Advanced analytics and custom reporting',
      'White labeling options',
      'Priority support with dedicated account manager (response within 4 hours)',
      'Custom integration support',
      'Full developer API access',
      'Comprehensive documentation and personalized onboarding'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  {
    id: 1,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
  },
  {
    id: 2,
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, we'll prorate the amount based on the time remaining in your billing cycle."
  },
  {
    id: 3,
    question: "Is there a free trial?",
    answer: "Yes, you can try our platform for free for 14 days with no obligation or credit card required."
  },
  {
    id: 4,
    question: "How does the product upload system work?",
    answer: "You can upload your products through our intuitive dashboard. Our system will process the images and create 3D models automatically, or you can provide your own 3D models."
  },
  {
    id: 5,
    question: "How do I integrate the API with my e-commerce platform?",
    answer: "We provide detailed documentation and integration guides for all major e-commerce platforms, including Shopify, WooCommerce, Magento, and custom solutions."
  },
  {
    id: 6,
    question: "What kind of support do you offer?",
    answer: "We offer email support for all plans, with chat support available for Professional and Enterprise plans. Enterprise customers also receive dedicated account management and priority support."
  },
  {
    id: 7,
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of your current billing period."
  },
  {
    id: 8,
    question: "Do you offer custom development services?",
    answer: "Yes, our Enterprise plan includes custom development and integration services. Contact our sales team to discuss your specific requirements."
  },
  {
    id: 9,
    question: "How secure is your platform?",
    answer: "We take security very seriously. Our platform is hosted on secure cloud infrastructure with regular security audits, data encryption, and compliance with industry standards."
  },
  {
    id: 10,
    question: "What happens to my data if I cancel?",
    answer: "Your data will be stored for 30 days after cancellation, giving you time to export anything you need. After 30 days, all your data will be permanently deleted from our systems."
  }
];

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const getAnnualPrice = (monthlyPrice) => {
    // 20% discount for annual billing
    const annualPrice = monthlyPrice * 12 * 0.8;
    return Math.floor(annualPrice / 12);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">
              Choose the perfect plan for your business needs
            </p>
            <div className="relative mt-6 bg-white shadow-md rounded-lg p-1 flex self-center sm:mt-8">
              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`relative w-1/2 rounded-md py-2 px-6 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 ${
                  billingPeriod === 'monthly'
                    ? 'bg-indigo-600 border-indigo-700 shadow-sm text-white'
                    : 'border border-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod('annual')}
                className={`relative w-1/2 rounded-md py-2 px-6 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 ${
                  billingPeriod === 'annual'
                    ? 'bg-indigo-600 border-indigo-700 shadow-sm text-white'
                    : 'border border-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                Annual billing
                <span className="absolute -top-2 -right-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-lg shadow-md divide-y divide-gray-200 ${
                  plan.popular 
                    ? 'border-2 border-indigo-500 transform md:scale-105 z-10 bg-white' 
                    : 'border border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute inset-x-0 top-0 transform -translate-y-1/2 flex justify-center">
                    <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl leading-6 font-bold text-gray-900 flex items-center">
                    {plan.name}
                  </h2>
                  <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                  <div className="mt-8 flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">
                      ${billingPeriod === 'monthly' ? plan.price : getAnnualPrice(plan.price)}
                    </span>
                    <span className="text-base font-medium text-gray-500 ml-1">/mo</span>
                  </div>
                  {billingPeriod === 'annual' && (
                    <p className="mt-1 text-sm text-green-600">
                      Billed as ${getAnnualPrice(plan.price) * 12}/year
                    </p>
                  )}
                  <a
                    href="#"
                    className={`mt-8 block w-full py-3 px-6 rounded-md text-center text-sm font-medium ${
                      plan.popular 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                        : 'bg-gray-50 text-indigo-700 hover:bg-gray-100 focus:ring-indigo-500 border border-gray-300'
                    } shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
                  >
                    {plan.cta}
                  </a>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">Limitations</h3>
                      <ul className="mt-4 space-y-3">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="ml-3 text-sm text-gray-700">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section - Enhanced version */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can't find the answer you're looking for? Contact our{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                customer support team
              </a>.
            </p>
          </div>
          <div className="mt-12 max-w-4xl mx-auto">
            <dl className="space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <div key={faq.id} className="pt-6">
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="text-left w-full flex justify-between items-start text-gray-900 focus:outline-none"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <span className="ml-6 h-7 flex items-center">
                        <svg
                          className={`${expandedFaq === faq.id ? 'rotate-180' : 'rotate-0'} h-6 w-6 transform transition-transform duration-200 ease-in-out text-indigo-600`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd className={`mt-2 pr-12 transition-all duration-200 ease-in-out ${expandedFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Subscription Comparison Table */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Detailed Plan Comparison</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Compare our plans in detail to find the perfect fit for your business needs.
            </p>
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                    Basic
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-indigo-600 uppercase tracking-wider w-[180px] bg-indigo-50">
                    Professional
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Price (Monthly)</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">$49/month</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center bg-indigo-50">$149/month</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">$349/month</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">E-commerce Stores</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">1 store</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center bg-indigo-50">Up to 5 stores</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">Up to 10 stores</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Product Uploads</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">10/month</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center bg-indigo-50">50/month</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Support Response Time</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">48 hours</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center bg-indigo-50">24 hours</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">4 hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">White Labeling</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center bg-indigo-50">
                    <svg className="h-5 w-5 text-yellow-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Custom Development</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center bg-indigo-50">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to revolutionize your e-commerce experience?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200 max-w-lg mx-auto">
            Start your free 14-day trial today. No credit card required. Upgrade, downgrade, or cancel anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 sm:w-auto"
            >
              Start free trial
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 ml-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70"
            >
              Contact sales
            </a>
          </div>
          <p className="mt-6 text-sm text-indigo-200">
            Have questions? Contact our sales team at <span className="font-medium text-white">sales@kokomatto.com</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage; 