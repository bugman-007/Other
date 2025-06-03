import React from 'react';

const MilestoneProgress = ({ task }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981'; // green
      case 'in-progress': return '#3b82f6'; // blue
      case 'pending': return '#d1d5db'; // gray
      default: return '#d1d5db';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 items-center">
        <span className="text-sm font-medium">{task.name}</span>
        <span className="text-sm font-medium">{task.progress}%</span>
      </div>
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${task.progress}%`, 
            backgroundColor: getStatusColor(task.status) 
          }}
        ></div>
      </div>
    </div>
  );
};

export default MilestoneProgress;