import React from 'react';
import Header from './Header';
import SharedFooter from '../shared/SharedFooter';
import SharedSocialMedia from '../shared/SharedSocialMedia';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-14">
        {children}
      </main>
      {/* Floating Social Media Sidebar */}
      <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 bg-white/90 dark:bg-gray-800 shadow-xl rounded-lg py-4 px-3 hidden md:block backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-center text-xs uppercase tracking-wider text-gray-500 mb-4">Follow Us</h3>
        <SharedSocialMedia variant="sidebar" />
      </div>
      <SharedFooter />
    </div>
  );
};

export default Layout;