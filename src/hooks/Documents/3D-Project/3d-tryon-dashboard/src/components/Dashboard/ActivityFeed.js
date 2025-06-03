import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCheckCircle, faServer, faBolt, faExclamationTriangle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const recentActivities = [
  { id: 1, action: 'Updated scanning algorithm', user: 'David Chen', time: '2 hours ago', type: 'code' },
  { id: 2, action: 'Completed mesh optimization tests', user: 'Lisa Wong', time: '4 hours ago', type: 'test' },
  { id: 3, action: 'Deployed staging environment', user: 'James Rodriguez', time: '8 hours ago', type: 'deploy' },
  { id: 4, action: 'Added texture compression feature', user: 'Alex Johnson', time: '1 day ago', type: 'feature' },
  { id: 5, action: 'Fixed lighting issues in scanning', user: 'Sarah Kim', time: '1 day ago', type: 'fix' },
];

const ActivityItem = ({ activity }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'code': return <FontAwesomeIcon icon={faCode} className="text-purple-500" />;
      case 'test': return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'deploy': return <FontAwesomeIcon icon={faServer} className="text-blue-500" />;
      case 'feature': return <FontAwesomeIcon icon={faBolt} className="text-yellow-500" />;
      case 'fix': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />;
      default: return null;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'code': return '#8b5cf6'; // purple
      case 'test': return '#10b981'; // green
      case 'deploy': return '#3b82f6'; // blue
      case 'feature': return '#eab308'; // yellow
      case 'fix': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  return (
    <div className="flex items-start space-x-3 py-3 border-b" style={{ borderColor: '#f1f5f9' }}>
      <div className="mt-1" style={{ color: getIconColor(activity.type) }}>
        {getIcon(activity.type)}
      </div>
      <div>
        <p className="text-sm font-medium">{activity.action}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span>{activity.user}</span>
          <span className="mx-1">•</span>
          <span>{activity.time}</span>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = () => {
  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
      <div>
        {recentActivities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      <button className="mt-4 text-blue-600 text-sm font-medium flex items-center">
        View All Activities <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
      </button>
    </div>
  );
};

export default ActivityFeed;