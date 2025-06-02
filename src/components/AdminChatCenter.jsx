import React, { useState, useEffect } from 'react';

const AdminChatCenter = () => {
  const [activeTab, setActiveTab] = useState('merchants');
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for merchant chats
  const merchantChats = [
    { id: 1, name: 'Fashion Boutique', avatar: 'https://placehold.co/32x32', unread: 3, lastMessage: 'We need help with our product integration', time: '10:23 AM', type: 'merchant' },
    { id: 2, name: 'Elegant Styles', avatar: 'https://placehold.co/32x32', unread: 0, lastMessage: 'Thanks for helping with our API setup!', time: 'Yesterday', type: 'merchant' },
    { id: 3, name: 'Urban Threads', avatar: 'https://placehold.co/32x32', unread: 1, lastMessage: 'When will the new feature be available?', time: '2 days ago', type: 'merchant' },
  ];

  // Sample data for affiliate chats
  const affiliateChats = [
    { id: 1, name: 'Sarah Adams', avatar: 'https://placehold.co/32x32', unread: 2, lastMessage: 'I have a question about my commission', time: '1 hour ago', type: 'affiliate' },
    { id: 2, name: 'James Wilson', avatar: 'https://placehold.co/32x32', unread: 0, lastMessage: 'Could you review my promotional materials?', time: 'Yesterday', type: 'affiliate' },
    { id: 3, name: 'Emma Rodriguez', avatar: 'https://placehold.co/32x32', unread: 1, lastMessage: 'My tracking links aren\'t working correctly', time: '3 days ago', type: 'affiliate' },
  ];

  // Sample chat messages
  const chatMessages = [
    { id: 1, sender: 'user', message: "Hello! I need some help with my recent commission payment.", time: '10:30 AM' },
    { id: 2, sender: 'admin', message: "Hi there! I'd be happy to help you with that. Could you please provide your affiliate ID or merchant ID?", time: '10:32 AM' },
    { id: 3, sender: 'user', message: "Sure, my ID is AF7721. I was expecting a payment on the 15th but haven't received it yet.", time: '10:33 AM' },
    { id: 4, sender: 'admin', message: "Thank you for providing your ID. Let me check that for you right away. It looks like there was a verification hold on your account. I've cleared that now, and the payment should be processed within 24-48 hours.", time: '10:35 AM' },
    { id: 5, sender: 'user', message: "That's great news, thank you for the quick resolution!", time: '10:36 AM' },
  ];

  // Filter chats based on search query
  const filteredChats = (chats) => {
    if (!searchQuery) return chats;
    return chats.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Support Center</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage support communications with merchants and affiliates</p>
      </div>
      
      <div className="border-t border-gray-200">
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Chat sidebar */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col max-h-[250px] md:max-h-full md:h-full">
            <div className="border-b border-gray-200">
              <div className="flex px-3 py-2">
                <button
                  onClick={() => setActiveTab('merchants')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded ${
                    activeTab === 'merchants'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Merchants
                </button>
                <button
                  onClick={() => setActiveTab('affiliates')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded ${
                    activeTab === 'affiliates'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Affiliates
                </button>
              </div>
              
              <div className="p-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
            </div>
            
            <div className="overflow-y-auto flex-1">
              {activeTab === 'merchants' ? (
                filteredChats(merchantChats).map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 flex items-start ${
                      selectedChat?.id === chat.id && selectedChat?.type === 'merchant' ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      {chat.name.charAt(0)}
                    </div>
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
                ))
              ) : (
                filteredChats(affiliateChats).map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 flex items-start ${
                      selectedChat?.id === chat.id && selectedChat?.type === 'affiliate' ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      {chat.name.charAt(0)}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                        <p className="text-xs text-gray-500">{chat.time}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-purple-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
          
          {/* Chat content */}
          <div className="flex-1 flex flex-col h-[350px] md:h-full overflow-hidden">
            {selectedChat ? (
              <>
                <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${selectedChat.type === 'merchant' ? 'bg-indigo-500' : 'bg-purple-500'}`}>
                      {selectedChat.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{selectedChat.name}</p>
                      <p className="text-xs text-gray-500">
                        {selectedChat.type === 'merchant' ? 'Merchant' : 'Affiliate'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-lg ${
                          msg.sender === 'admin'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-indigo-200' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center">
                    <button className="text-gray-500 p-2 rounded-full hover:text-gray-600 hover:bg-gray-100">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 border-0 focus:ring-0 text-sm px-4"
                    />
                    <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No chat selected</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a conversation from the sidebar to start chatting.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stats and Analytics */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Support Analytics</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Conversations</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{merchantChats.filter(c => c.unread > 0).length + affiliateChats.filter(c => c.unread > 0).length}</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Response Time (Avg)</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">4.2m</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Merchant Satisfaction</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">96%</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Affiliate Satisfaction</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">94%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatCenter; 