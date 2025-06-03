import React from 'react';
import { faCheckCircle, faClock, faBolt, faServer } from '@fortawesome/free-solid-svg-icons';

import MilestoneCard from './Dashboard/MilestoneCard';
import MilestoneProgress from './Dashboard/MilestoneProgress';
import PerformanceChart from './Dashboard/PerformanceChart';
import CompatibilityChart from './Dashboard/CompatibilityChart';
import QualityMetric from './Dashboard/QualityMetric';
import ActivityFeed from './Dashboard/ActivityFeed';
import DemoPreview from './Dashboard/DemoPreview';

// Mock data
const milestoneTasks = [
  { id: 1, name: 'Project Environment Setup', status: 'completed', progress: 100 },
  { id: 2, name: 'Core 3D Scanning Technology', status: 'in-progress', progress: 95 },
  { id: 3, name: 'Basic Model Generation System', status: 'in-progress', progress: 85 },
  { id: 4, name: 'Initial Quality Testing', status: 'in-progress', progress: 80 },
];

const qualityMetrics = [
  { name: 'Mesh Accuracy', target: 90, current: 85 },
  { name: 'Texture Fidelity', target: 90, current: 80 },
  { name: 'Size Precision', target: 85, current: 78 },
  { name: 'Color Accuracy', target: 95, current: 87 },
  { name: 'Load Performance', target: 90, current: 92 },
];

const Dashboard = () => {
  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MilestoneCard 
          title="Milestone Progress" 
          value="90%" 
          icon={faCheckCircle}
          color="#10b981"
          subtext="On track for completion"
        />
        <MilestoneCard 
          title="Time Remaining" 
          value="5 days" 
          icon={faClock}
          color="#3b82f6"
          subtext="Until milestone deadline"
        />
        <MilestoneCard 
          title="Processing Speed" 
          value="3.2 min" 
          icon={faBolt}
          color="#8b5cf6"
          subtext="Average scanning time"
        />
        <MilestoneCard 
          title="Infrastructure" 
          value="Online" 
          icon={faServer}
          color="#0d9488"
          subtext="All systems operational"
        />
      </div>
      
      {/* Middle Section: Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        
        {/* Tasks & Progress */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Milestone Tasks</h2>
          <div className="space-y-4">
            {milestoneTasks.map(task => (
              <MilestoneProgress key={task.id} task={task} />
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">Overall Milestone Progress</h3>
            <div className="progress-container">
              <div className="progress-bar bg-blue-600" style={{ width: '90%' }}></div>
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Quality Metrics */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Quality Metrics</h2>
          <div>
            {qualityMetrics.map((metric, index) => (
              <QualityMetric key={index} metric={metric} />
            ))}
          </div>
        </div>
        
        {/* Compatibility Chart */}
        <div>
          <CompatibilityChart />
        </div>
        
        {/* Recent Activities */}
        <div>
          <ActivityFeed />
        </div>
      </div>
      
      {/* Demo Preview Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Interactive Demo</h2>
        <DemoPreview />
      </div>
      
      {/* Architecture Section */}
      <div>
        <h2 className="text-lg font-medium mb-4">System Architecture</h2>
        <div className="card p-0 overflow-hidden">
          <img 
            src="https://via.placeholder.com/1200x400?text=3D+Try-On+System+Architecture" 
            alt="System Architecture" 
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;