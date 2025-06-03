// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar, 
  faCamera, 
  faCube, 
  faUsers, 
  faServer, 
  faCog, 
  faSignOutAlt,
  faHome,
  faSearch,
  faBell,
  faUser,
  faChevronDown,
  faCheckCircle,
  faClock,
  faBolt,
  faExclamationTriangle,
  faArrowRight,
  faCode,
  faTshirt,
  faUndo,
  faRedo,
  faDesktop,
  faMobile,
  faTablet,
  faCubes,
  faLayerGroup,
  faTools,
  faChartLine,
  faTimes,
  faBars,
  faCalendarAlt,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDemoTab, setActiveDemoTab] = useState('preview');
  const [selectedModel, setSelectedModel] = useState('tshirt');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [showNotifications, setShowNotifications] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Animate the progress over time
    const taskTimer = setTimeout(() => {
      setCompletedTasks(1);
      setTimeout(() => {
        setCompletedTasks(2);
        setTimeout(() => {
          setCompletedTasks(3);
        }, 800);
      }, 800);
    }, 1500);
    
    return () => {
      clearInterval(timer);
      clearTimeout(taskTimer);
    };
  }, []);

  // Performance data
  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Scanning Speed',
        data: [32, 40, 45, 55, 60, 65, 70],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Modeling Time',
        data: [50, 55, 65, 70, 75, 78, 82],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Rendering Performance',
        data: [70, 75, 78, 82, 85, 87, 89],
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Compatibility data
  const compatibilityData = {
    labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Mobile'],
    datasets: [
      {
        label: 'Compatibility',
        data: [98, 95, 97, 96, 92],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 1
      }
    ]
  };

  // Device usage data
  const deviceUsageData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        label: 'Device Usage',
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1
      }
    ]
  };

  // System readiness data
  const systemReadinessData = {
    labels: ['Scanning', 'Modeling', 'Texturing', 'Physics', 'Rendering', 'API'],
    datasets: [
      {
        label: 'Current Status',
        data: [90, 85, 80, 75, 92, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        borderColor: 'rgba(59, 130, 246, 1)',
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        fill: true
      },
      {
        label: 'Target',
        data: [90, 90, 90, 85, 90, 95],
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        borderColor: 'rgba(107, 114, 128, 0.8)',
        pointBackgroundColor: 'rgba(107, 114, 128, 0.8)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(107, 114, 128, 1)',
        fill: true
      }
    ]
  };

  const milestoneTasks = [
    { id: 1, name: 'Project Environment Setup', status: 'completed', progress: 100 },
    { id: 2, name: 'Core 3D Scanning Technology', status: 'in-progress', progress: 95 },
    { id: 3, name: 'Basic Model Generation System', status: 'in-progress', progress: 85 },
    { id: 4, name: 'Initial Quality Testing', status: 'in-progress', progress: 80 },
  ];

  const recentActivities = [
    { id: 1, action: 'Updated scanning algorithm', user: 'David Chen', time: '2 hours ago', type: 'code' },
    { id: 2, action: 'Completed mesh optimization tests', user: 'Lisa Wong', time: '4 hours ago', type: 'test' },
    { id: 3, action: 'Deployed staging environment', user: 'James Rodriguez', time: '8 hours ago', type: 'deploy' },
    { id: 4, action: 'Added texture compression feature', user: 'Alex Johnson', time: '1 day ago', type: 'feature' },
  ];

  const notifications = [
    { id: 1, title: 'System Update Complete', message: 'The latest scan algorithm has been deployed', time: '10 minutes ago', unread: true },
    { id: 2, title: 'New Comment', message: 'David left a comment on your 3D model', time: '2 hours ago', unread: true },
    { id: 3, title: 'Task Completed', message: 'Mesh optimization has been completed', time: '3 hours ago', unread: false },
    { id: 4, title: 'Meeting Reminder', message: 'Team meeting in 30 minutes', time: '28 minutes ago', unread: false },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#3b82f6';
      case 'pending': return '#9ca3af';
      default: return '#9ca3af';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'code': return <FontAwesomeIcon icon={faCode} className="text-indigo-500" />;
      case 'test': return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'deploy': return <FontAwesomeIcon icon={faServer} className="text-blue-500" />;
      case 'feature': return <FontAwesomeIcon icon={faBolt} className="text-amber-500" />;
      default: return <FontAwesomeIcon icon={faCog} className="text-gray-500" />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-indigo-900 to-indigo-700 text-white transition-all duration-300 ease-in-out flex flex-col shadow-xl`}>
        <div className="p-4 flex items-center justify-between border-b border-indigo-800">
          {isSidebarOpen ? (
            <h2 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faCube} className="mr-2" />
              3D Try-On
            </h2>
          ) : (
            <FontAwesomeIcon icon={faCube} className="text-xl mx-auto" />
          )}
          <button onClick={toggleSidebar} className="text-white hover:text-gray-200 focus:outline-none">
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <div className="px-4 py-6">
            {isSidebarOpen && <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">Dashboard</p>}
            
            <div className="space-y-1">
              <div className="flex items-center px-4 py-3 bg-indigo-800 rounded-lg text-white cursor-pointer">
                <FontAwesomeIcon icon={faChartBar} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
                {isSidebarOpen && <span>Overview</span>}
              </div>
              
              <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                <FontAwesomeIcon icon={faCamera} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
                {isSidebarOpen && <span>Scanning</span>}
              </div>
              
              <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                <FontAwesomeIcon icon={faCubes} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
                {isSidebarOpen && <span>3D Models</span>}
              </div>
              
              <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                <FontAwesomeIcon icon={faLayerGroup} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
                {isSidebarOpen && <span>Textures</span>}
              </div>
            </div>

            {isSidebarOpen && (
              <>
                <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-8 mb-3">Management</p>
                
                <div className="space-y-1">
                  <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                    <span>Team</span>
                  </div>
                  
                  <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                    <FontAwesomeIcon icon={faServer} className="mr-3" />
                    <span>Infrastructure</span>
                  </div>
                  
                  <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                    <FontAwesomeIcon icon={faTools} className="mr-3" />
                    <span>Settings</span>
                  </div>
                  
                  <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
                    <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                    <span>Analytics</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg cursor-pointer transition-colors duration-200">
            <FontAwesomeIcon icon={faSignOutAlt} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">3D Try-On Technology Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="relative">
                <button 
                  className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start">
                            <div className={`mt-1 mr-3 rounded-full p-1 ${notification.unread ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-500'}`}>
                              <FontAwesomeIcon icon={faBell} className="text-sm" />
                            </div>
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <p className="font-medium">Admin</p>
                  <p className="text-xs text-gray-500">{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 ml-1" />
              </div>
            </div>
          </div>
          
          {/* Sub Navigation */}
          <div className="flex items-center px-6 py-2 bg-gray-50 border-t border-b border-gray-200 text-sm">
            <div className="flex items-center text-indigo-600">
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              <span>Home</span>
            </div>
            <FontAwesomeIcon icon={faAngleRight} className="mx-2 text-gray-400" />
            <div className="text-gray-600">First Milestone</div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Status Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Milestone Status</h2>
              <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                90% Complete
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Milestone Progress</p>
                    <p className="text-3xl font-bold mt-1 text-indigo-600">90%</p>
                    <p className="text-xs text-gray-500 mt-1">On track for completion</p>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                    <FontAwesomeIcon icon={faChartLine} size="lg" />
                  </div>
                </div>
                <div className="mt-4 w-full h-1 bg-gray-200 rounded">
                  <div className="h-1 bg-indigo-600 rounded" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Time Remaining</p>
                    <p className="text-3xl font-bold mt-1 text-blue-600">5 days</p>
                    <p className="text-xs text-gray-500 mt-1">Until milestone deadline</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-600">On Schedule</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Processing Speed</p>
                    <p className="text-3xl font-bold mt-1 text-purple-600">3.2 min</p>
                    <p className="text-xs text-gray-500 mt-1">Average scanning time</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                    <FontAwesomeIcon icon={faBolt} size="lg" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-600">36% faster than target</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Infrastructure</p>
                    <p className="text-3xl font-bold mt-1 text-teal-600">Online</p>
                    <p className="text-xs text-gray-500 mt-1">All systems operational</p>
                  </div>
                  <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                    <FontAwesomeIcon icon={faServer} size="lg" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-600">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Performance Metrics</h2>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="h-80">
                <Line 
                  data={performanceData} 
                  options={{
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
                  }} 
                />
              </div>
            </div>
            
            {/* Tasks & Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">Milestone Tasks</h2>
              
              <div className="space-y-5">
                {milestoneTasks.map((task, index) => (
                  <div key={task.id} className="relative">
                    <div className={`absolute left-0 top-0 h-full w-1 rounded ${index <= completedTasks ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    <div className="ml-4">
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${index <= completedTasks ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            {index <= completedTasks ? (
                              <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span className={`text-sm font-medium ml-2 ${index <= completedTasks ? 'text-gray-800' : 'text-gray-600'}`}>{task.name}</span>
                        </div>
                        <span className="text-sm font-medium">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000 ease-out" 
                          style={{ 
                            width: `${task.progress}%`, 
                            backgroundColor: getStatusColor(task.status) 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-md font-medium mb-3">Overall Milestone Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: '90%' }}></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Platform Compatibility</h2>
              <div className="h-64">
                <Bar 
                  data={compatibilityData} 
                  options={{
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
                  }} 
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Device Usage</h2>
              <div className="h-64 flex items-center justify-center">
                <div style={{ width: '80%', height: '80%' }}>
                  <Doughnut 
                    data={deviceUsageData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">System Readiness</h2>
              <div className="h-64">
                <Radar 
                  data={systemReadinessData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        angleLines: {
                          display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
          
          {/* Interactive Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Demo Preview */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                      activeDemoTab === 'preview' 
                        ? 'text-indigo-600 border-b-2 border-indigo-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveDemoTab('preview')}
                  >
                    Demo Preview
                  </button>
                  <button
                    className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                      activeDemoTab === 'code' 
                        ? 'text-indigo-600 border-b-2 border-indigo-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveDemoTab('code')}
                  >
                    Implementation
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {activeDemoTab === 'preview' ? (
                  <div className="bg-gray-100 rounded-lg overflow-hidden flex" style={{ height: '400px' }}>
                    <div className="w-1/3 bg-gray-900 p-4 text-white">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faTshirt} className="mr-2" />
                        3D Model Gallery
                      </h3>
                      
                      <div className="space-y-3">
                        <div 
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center ${selectedModel === 'tshirt' ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                          onClick={() => setSelectedModel('tshirt')}
                        >
                          <div className="h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                            <FontAwesomeIcon icon={faTshirt} />
                          </div>
                          <div>
                            <div className="font-medium">Basic T-Shirt</div>
                            <div className="text-xs opacity-70">
                              {selectedModel === 'tshirt' ? 'Selected' : 'Click to select'}
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center ${selectedModel === 'jacket' ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                          onClick={() => setSelectedModel('jacket')}
                        >
                          <div className="h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                            <FontAwesomeIcon icon={faTshirt} />
                          </div>
                          <div>
                            <div className="font-medium">Denim Jacket</div>
                            <div className="text-xs opacity-70">
                              {selectedModel === 'jacket' ? 'Selected' : 'Click to select'}
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center ${selectedModel === 'dress' ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                          onClick={() => setSelectedModel('dress')}
                        >
                          <div className="h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                            <FontAwesomeIcon icon={faTshirt} />
                          </div>
                          <div>
                            <div className="font-medium">Summer Dress</div>
                            <div className="text-xs opacity-70">
                              {selectedModel === 'dress' ? 'Selected' : 'Click to select'}
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center ${selectedModel === 'jeans' ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                          onClick={() => setSelectedModel('jeans')}
                        >
                          <div className="h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                            <FontAwesomeIcon icon={faTshirt} />
                          </div>
                          <div>
                            <div className="font-medium">Slim Jeans</div>
                            <div className="text-xs opacity-70">
                              {selectedModel === 'jeans' ? 'Selected' : 'Click to select'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-2/3 relative">
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-64 h-64 mx-auto relative">
                            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FontAwesomeIcon 
                                icon={faTshirt} 
                                style={{ 
                                  fontSize: '8rem', 
                                  color: selectedColor === 'blue' ? '#3b82f6' : 
                                         selectedColor === 'black' ? '#1f2937' : 
                                         selectedColor === 'red' ? '#ef4444' : '#3b82f6'
                                }} 
                              />
                            </div>
                          </div>
                          
                          <div className="mt-8 bg-white py-3 px-6 rounded-full inline-flex shadow-lg">
                            <button 
                              className={`w-8 h-8 rounded-full mx-2 border-2 ${selectedColor === 'blue' ? 'border-indigo-600' : 'border-white'}`}
                              style={{ backgroundColor: '#3b82f6' }}
                              onClick={() => setSelectedColor('blue')}
                            ></button>
                            <button 
                              className={`w-8 h-8 rounded-full mx-2 border-2 ${selectedColor === 'black' ? 'border-indigo-600' : 'border-white'}`}
                              style={{ backgroundColor: '#1f2937' }}
                              onClick={() => setSelectedColor('black')}
                            ></button>
                            <button 
                              className={`w-8 h-8 rounded-full mx-2 border-2 ${selectedColor === 'red' ? 'border-indigo-600' : 'border-white'}`}
                              style={{ backgroundColor: '#ef4444' }}
                              onClick={() => setSelectedColor('red')}
                            ></button>
                            
                            <div className="mx-3 h-8 w-px bg-gray-300"></div>
                            
                            <button className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                              <FontAwesomeIcon icon={faUndo} />
                            </button>
                            <button className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                              <FontAwesomeIcon icon={faRedo} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-3">
                        <div className="font-medium">
                          {selectedModel === 'tshirt' ? 'Basic T-Shirt' : 
                           selectedModel === 'jacket' ? 'Denim Jacket' :
                           selectedModel === 'dress' ? 'Summer Dress' :
                           'Slim Jeans'}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                            <span>Fit: 98% match</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                            <span>High quality visualization</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center">
                          <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                          Try another item
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-900 text-gray-200 rounded-lg p-6 overflow-auto" style={{ height: '400px' }}>
                    <pre className="text-sm font-mono">
                      <code>
{`import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDViewer = () => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState('tshirt');
  const [color, setColor] = useState('#3b82f6');
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Load 3D model
    const loader = new GLTFLoader();
    const modelPath = \`/models/\${model}.glb\`;
    
    loader.load(
      modelPath,
      (gltf) => {
        // Clear existing models
        scene.children.forEach(child => {
          if (child.type === 'Group') {
            scene.remove(child);
          }
        });
        
        const modelObject = gltf.scene;
        
        // Apply material color
        modelObject.traverse((node) => {
          if (node.isMesh) {
            node.material.color.set(color);
          }
        });
        
        scene.add(modelObject);
        setIsLoading(false);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [model, color]);
  
  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-2"></div>
            <p className="text-indigo-600 font-medium">Loading 3D model...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDViewer;`}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Recent Activities</h2>
                <div className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">View all</div>
              </div>
              
              <div className="space-y-5">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-md flex items-center justify-center bg-gray-100">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{activity.user}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-700 w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center">
                Load More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
          
          {/* Architecture Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">System Architecture</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
              <div className="relative aspect-[21/9]">
                <svg viewBox="0 0 1000 430" className="w-full h-full" style={{ fontFamily: 'sans-serif' }}>
                  {/* Client Layer */}
                  <g>
                    <rect x="50" y="30" width="900" height="80" rx="5" fill="#e0e7ff" />
                    <text x="60" y="50" fontSize="16" fontWeight="bold" fill="#4338ca">Client Side</text>
                    
                    <rect x="80" y="60" width="200" height="40" rx="5" fill="#818cf8" />
                    <text x="180" y="85" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Mobile App</text>
                    
                    <rect x="320" y="60" width="200" height="40" rx="5" fill="#818cf8" />
                    <text x="420" y="85" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Web Application</text>
                    
                    <rect x="560" y="60" width="200" height="40" rx="5" fill="#818cf8" />
                    <text x="660" y="85" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Merchant Dashboard</text>
                    
                    <rect x="800" y="60" width="120" height="40" rx="5" fill="#818cf8" />
                    <text x="860" y="85" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Plugins</text>
                  </g>
                  
                  {/* API Layer */}
                  <g>
                    <rect x="50" y="130" width="900" height="80" rx="5" fill="#dbeafe" />
                    <text x="60" y="150" fontSize="16" fontWeight="bold" fill="#1e40af">API Layer</text>
                    
                    <rect x="80" y="160" width="300" height="40" rx="5" fill="#3b82f6" />
                    <text x="230" y="185" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">API Gateway</text>
                    
                    <rect x="400" y="160" width="200" height="40" rx="5" fill="#3b82f6" />
                    <text x="500" y="185" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Authentication Service</text>
                    
                    <rect x="620" y="160" width="300" height="40" rx="5" fill="#3b82f6" />
                    <text x="770" y="185" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Webhook Service</text>
                  </g>
                  
                  {/* Core Services */}
                  <g>
                    <rect x="50" y="230" width="900" height="80" rx="5" fill="#dcfce7" />
                    <text x="60" y="250" fontSize="16" fontWeight="bold" fill="#166534">Core Services</text>
                    
                    <rect x="80" y="260" width="200" height="40" rx="5" fill="#10b981" />
                    <text x="180" y="285" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">3D Scanning Service</text>
                    
                    <rect x="300" y="260" width="200" height="40" rx="5" fill="#10b981" />
                    <text x="400" y="285" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">3D Modeling Service</text>
                    
                    <rect x="520" y="260" width="200" height="40" rx="5" fill="#10b981" />
                    <text x="620" y="285" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Rendering Engine</text>
                    
                    <rect x="740" y="260" width="200" height="40" rx="5" fill="#10b981" />
                    <text x="840" y="285" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Virtual Try-On Engine</text>
                  </g>
                  
                  {/* Storage Layer */}
                  <g>
                    <rect x="50" y="330" width="900" height="80" rx="5" fill="#ffedd5" />
                    <text x="60" y="350" fontSize="16" fontWeight="bold" fill="#9a3412">Storage & Infrastructure</text>
                    
                    <rect x="80" y="360" width="200" height="40" rx="5" fill="#f97316" />
                    <text x="180" y="385" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">3D Asset Database</text>
                    
                    <rect x="300" y="360" width="200" height="40" rx="5" fill="#f97316" />
                    <text x="400" y="385" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Metadata Database</text>
                    
                    <rect x="520" y="360" width="200" height="40" rx="5" fill="#f97316" />
                    <text x="620" y="385" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Content Delivery Network</text>
                    
                    <rect x="740" y="360" width="200" height="40" rx="5" fill="#f97316" />
                    <text x="840" y="385" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Kubernetes Cluster</text>
                  </g>
                  
                  {/* Connection Lines */}
                  <g stroke="#64748b" strokeWidth="1" strokeDasharray="5,5">
                    {/* Client to API */}
                    <line x1="180" y1="100" x2="180" y2="160" />
                    <line x1="420" y1="100" x2="420" y2="160" />
                    <line x1="660" y1="100" x2="660" y2="160" />
                    <line x1="860" y1="100" x2="860" y2="160" />
                    
                    {/* API to Core */}
                    <line x1="180" y1="200" x2="180" y2="260" />
                    <line x1="400" y1="200" x2="400" y2="260" />
                    <line x1="620" y1="200" x2="620" y2="260" />
                    <line x1="840" y1="200" x2="840" y2="260" />
                    
                    {/* Core to Storage */}
                    <line x1="180" y1="300" x2="180" y2="360" />
                    <line x1="400" y1="300" x2="400" y2="360" />
                    <line x1="620" y1="300" x2="620" y2="360" />
                    <line x1="840" y1="300" x2="840" y2="360" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white py-4 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600 mb-4 md:mb-0">
                <span className="font-medium">3D Try-On Technology Project</span> &copy; 2025 | First Milestone Progress Dashboard
              </div>
              <div className="flex space-x-4">
                <button className="text-xs text-gray-600 hover:text-indigo-600">Documentation</button>
                <button className="text-xs text-gray-600 hover:text-indigo-600">API</button>
                <button className="text-xs text-gray-600 hover:text-indigo-600">Support</button>
                <button className="text-xs text-gray-600 hover:text-indigo-600">Privacy Policy</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;