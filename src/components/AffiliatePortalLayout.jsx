import React from 'react';
import AffiliatePortalHeader from './headers/AffiliatePortalHeader';

const AffiliatePortalLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AffiliatePortalHeader />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default AffiliatePortalLayout; 