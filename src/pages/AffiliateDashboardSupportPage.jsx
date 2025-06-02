import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AffiliateLayout from '../components/AffiliateLayout';
import { FaInfoCircle, FaQuestionCircle, FaFileAlt, FaEnvelope } from 'react-icons/fa';

const AffiliateDashboardSupportPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faq');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [activeChatTab, setActiveChatTab] = useState('support');
  const [selectedChat, setSelectedChat] = useState(null);
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'affiliate' && userRole !== 'merchant') {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the support request would go here
    alert('Support request submitted!');
    setSubject('');
    setPriority('medium');
    setMessage('');
    setAttachedFile(null);
  };

  // Sample support chats
  const supportChats = [
    { id: 1, name: 'Technical Support', avatar: 'https://placehold.co/32x32', unread: 1, lastMessage: "We've received your request about the affiliate program.", time: '1 hour ago' },
    { id: 2, name: 'Payments Team', avatar: 'https://placehold.co/32x32', unread: 0, lastMessage: 'Your commission for June has been processed.', time: 'Yesterday' },
    { id: 3, name: 'Marketing Advisor', avatar: 'https://placehold.co/32x32', unread: 2, lastMessage: 'Here are the new promotional materials for summer.', time: '2 days ago' }
  ];

  // Sample chat messages
  const chatMessages = [
    { id: 1, sender: 'support', message: "Hello! How can we help you with your affiliate account today?", time: '10:30 AM' },
    { id: 2, sender: 'affiliate', message: "Hi, I'm having trouble generating custom tracking links for my blog post.", time: '10:32 AM' },
    { id: 3, sender: 'support', message: "I'm sorry to hear that. Could you tell me what error message you're seeing?", time: '10:33 AM' },
    { id: 4, sender: 'affiliate', message: "It says 'Invalid product ID' when I try to create the link, but I'm using the correct product.", time: '10:35 AM' },
    { id: 5, sender: 'support', message: "Thanks for the details. Let me look into this for you right away. Could you share a screenshot of the error?", time: '10:36 AM' }
  ];

  return (
    <AffiliateLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Get help with any issues or questions you may have
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
          <div className="p-6 bg-white shadow rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">Reach out to our support team via email for non-urgent inquiries.</p>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                <FaEnvelope className="mr-2" /> support@kokomatto.com
              </span>
              <a 
                href="mailto:support@kokomatto.com" 
                className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="p-6 bg-white shadow rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Phone Support</h3>
            <p className="text-sm text-gray-500 mb-4">Call us directly for urgent issues requiring immediate attention.</p>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                +1 (555) 123-4567
              </span>
              <a 
                href="tel:+15551234567" 
                className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        {/* Live Chat Center */}
        <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Live Chat Support</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Connect with our affiliate support team in real-time.</p>
          </div>
          
          <div className="border-t border-gray-200">
            <div className="flex flex-col md:flex-row h-[500px] md:h-[calc(100vh-350px)]">
              {/* Chat sidebar */}
              <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col max-h-[250px] md:max-h-full md:h-full">
                <div className="p-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                      
                <div className="overflow-y-auto flex-1">
                  {supportChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 flex items-start ${
                        selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <img src={chat.avatar} alt={chat.name} className="h-8 w-8 rounded-full flex-shrink-0" />
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                          <p className="text-xs text-gray-500">{chat.time}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-indigo-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
                  
              {/* Chat content */}
              <div className="flex-1 flex flex-col h-[250px] md:h-full overflow-hidden">
                {selectedChat ? (
                  <>
                    <div className="border-b border-gray-200 p-2 md:p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={selectedChat.avatar} alt={selectedChat.name} className="h-8 w-8 rounded-full" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{selectedChat.name}</p>
                          <p className="text-xs text-gray-500">
                            Support Team
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-indigo-100 text-indigo-600 p-1 md:p-2 rounded-full">
                          <svg className="h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                        <button className="bg-indigo-100 text-indigo-600 p-1 md:p-2 rounded-full">
                          <svg className="h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'affiliate' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[75%] md:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                              msg.sender === 'affiliate'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'affiliate' ? 'text-indigo-200' : 'text-gray-500'}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 p-2 md:p-4">
                      <div className="flex items-center">
                        <button className="text-gray-500 p-1 md:p-2 rounded-full hover:text-gray-600 hover:bg-gray-100">
                          <svg className="h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 border-0 focus:ring-0 text-sm px-2 md:px-4"
                        />
                        <button className="bg-indigo-600 text-white p-1 md:p-2 rounded-full hover:bg-indigo-700">
                          <svg className="h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center p-4 md:p-6">
                      <svg
                        className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <h3 className="mt-2 text-base md:text-lg font-medium text-gray-900">No chat selected</h3>
                      <p className="mt-1 text-xs md:text-sm text-gray-500">
                        Select a conversation from the sidebar to start chatting with our support team.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Support Tabs */}
        <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('faq')}
                className={`${
                  activeTab === 'faq'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
              >
                <FaQuestionCircle className="w-5 h-5 mx-auto mb-1" />
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`${
                  activeTab === 'contact'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
              >
                <FaEnvelope className="w-5 h-5 mx-auto mb-1" />
                Contact Us
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`${
                  activeTab === 'articles'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
              >
                <FaFileAlt className="w-5 h-5 mx-auto mb-1" />
                Help Articles
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-2">How do I create an affiliate link?</h4>
                    <p className="text-sm text-gray-500">
                      You can create a new affiliate link by going to the "Links" tab in your dashboard and clicking the "Create Custom Link" button. Fill in the details for your link and it will be created instantly.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-2">When do I get paid for my referrals?</h4>
                    <p className="text-sm text-gray-500">
                      Payments are processed on the 15th of each month for the previous month's earnings. You need a minimum of $50 in your account to receive a payout.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-2">How can I track my performance?</h4>
                    <p className="text-sm text-gray-500">
                      You can view detailed statistics about your referrals and earnings in the "Dashboard" and "Earnings" sections. These include clicks, conversions, earnings by date, and more.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-2">What promotional materials are available?</h4>
                    <p className="text-sm text-gray-500">
                      We provide a variety of marketing materials including banners, product images, email templates, and more. You can find all these in the "Marketing Materials" section.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-2">Can I promote any product?</h4>
                    <p className="text-sm text-gray-500">
                      Yes, you can promote any product available on our platform. However, we recommend focusing on products that align with your audience's interests for the best conversion rates.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need assistance</option>
                      <option value="high">High - Important issue</option>
                      <option value="urgent">Urgent - Critical problem</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Please describe your issue in detail"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                      Attach a file (optional)
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={(e) => setAttachedFile(e.target.files[0])}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Help Articles</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <h4 className="text-md font-medium text-indigo-600 mb-1">Getting Started Guide</h4>
                    <p className="text-sm text-gray-500">Learn the basics of our affiliate program and how to start earning.</p>
                  </a>
                  <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <h4 className="text-md font-medium text-indigo-600 mb-1">Maximizing Your Earnings</h4>
                    <p className="text-sm text-gray-500">Tips and strategies to boost your affiliate revenue.</p>
                  </a>
                  <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <h4 className="text-md font-medium text-indigo-600 mb-1">Creating Effective Links</h4>
                    <p className="text-sm text-gray-500">Learn how to create high-converting affiliate links.</p>
                  </a>
                  <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <h4 className="text-md font-medium text-indigo-600 mb-1">Commission Structure</h4>
                    <p className="text-sm text-gray-500">Understand how our commission tiers work and how to earn more.</p>
                  </a>
                  <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <h4 className="text-md font-medium text-indigo-600 mb-1">Marketing Best Practices</h4>
                    <p className="text-sm text-gray-500">Learn the most effective ways to promote our products.</p>
                  </a>
                  <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <h4 className="text-md font-medium text-indigo-600 mb-1">Payment Methods</h4>
                    <p className="text-sm text-gray-500">Explore the different ways you can receive your affiliate payments.</p>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliateDashboardSupportPage; 