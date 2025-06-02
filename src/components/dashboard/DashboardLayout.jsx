import React from 'react';

/**
 * DashboardLayout component that provides consistent layout for dashboard views.
 * This is a simple wrapper component with standard padding and structure.
 */
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-content bg-white rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 