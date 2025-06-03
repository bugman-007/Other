import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div 
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="sidebar-item-icon" />
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;