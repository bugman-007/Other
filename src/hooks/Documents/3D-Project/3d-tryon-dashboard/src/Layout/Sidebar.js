import React from 'react';
import SidebarItem from './SidebarItem';
import { faChartBar, faCamera, faCube, faUsers, faServer, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">3D Try-On</h2>
      </div>
      <div>
        <SidebarItem icon={faChartBar} label="Dashboard" active={true} />
        <SidebarItem icon={faCamera} label="Scanning" />
        <SidebarItem icon={faCube} label="3D Models" />
        <SidebarItem icon={faUsers} label="Team" />
        <SidebarItem icon={faServer} label="Infrastructure" />
        <SidebarItem icon={faCog} label="Settings" />
        
        <div className="mt-auto" style={{ marginTop: '60px' }}>
          <SidebarItem icon={faSignOutAlt} label="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;