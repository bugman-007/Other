import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const performanceData = [
  { name: 'Day 1', scanning: 32, modeling: 50, rendering: 70 },
  { name: 'Day 2', scanning: 40, modeling: 55, rendering: 75 },
  { name: 'Day 3', scanning: 45, modeling: 65, rendering: 78 },
  { name: 'Day 4', scanning: 55, modeling: 70, rendering: 82 },
  { name: 'Day 5', scanning: 60, modeling: 75, rendering: 85 },
  { name: 'Day 6', scanning: 65, modeling: 78, rendering: 87 },
  { name: 'Day 7', scanning: 70, modeling: 82, rendering: 89 },
];

const PerformanceChart = () => {
  const data = {
    labels: performanceData.map(item => item.name),
    datasets: [
      {
        label: 'Scanning Speed',
        data: performanceData.map(item => item.scanning),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Modeling Time',
        data: performanceData.map(item => item.modeling),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Rendering Performance',
        data: performanceData.map(item => item.rendering),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Performance Metrics</h2>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PerformanceChart;