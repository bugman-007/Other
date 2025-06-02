import React from 'react';
import AffiliateDashboardHeader from './headers/AffiliateDashboardHeader';

const AffiliateLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AffiliateDashboardHeader />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default AffiliateLayout; 