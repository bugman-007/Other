import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MilestoneCard = ({ title, value, icon, color, subtext }) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-2 rounded`} style={{ backgroundColor: color }}>
          <FontAwesomeIcon icon={icon} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;