import React from 'react';

const QualityMetric = ({ metric }) => {
  const getColorClass = (current, target) => {
    if (current >= target) return '#10b981'; // green
    if (current >= target * 0.9) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-medium text-gray-700">{metric.name}</h3>
      <div className="mt-2">
        <div className="progress-container mb-1">
          <div 
            className="progress-bar"
            style={{ 
              width: `${metric.current}%`,
              backgroundColor: '#3b82f6'
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: getColorClass(metric.current, metric.target) }}>
            Current: {metric.current}%
          </span>
          <span>Target: {metric.target}%</span>
        </div>
      </div>
    </div>
  );
};

export default QualityMetric;