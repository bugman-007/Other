import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex full-height">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="p-4">
          {children}
        </main>
        <footer className="bg-white p-4 border-t text-center text-sm text-gray-500">
          <p>3D Try-On Technology Project &copy; 2025 | First Milestone Progress Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;