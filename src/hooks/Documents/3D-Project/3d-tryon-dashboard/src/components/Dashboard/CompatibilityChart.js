import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const compatibilityData = [
  { name: 'Chrome', compatibility: 98 },
  { name: 'Safari', compatibility: 95 },
  { name: 'Firefox', compatibility: 97 },
  { name: 'Edge', compatibility: 96 },
  { name: 'Mobile', compatibility: 92 },
];

const CompatibilityChart = () => {
  const data = {
    labels: compatibilityData.map(item => item.name),
    datasets: [
      {
        label: 'Compatibility (%)',
        data: compatibilityData.map(item => item.compatibility),
        backgroundColor: '#3b82f6',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
      <h2 className="text-lg font-medium mb-4">Platform Compatibility</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CompatibilityChart;