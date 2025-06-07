import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, TrendingUp, Eye, ArrowUp, ArrowDown, Plus, Trash2, Edit, Download } from 'lucide-react';

// Initial data
const initialMetrics = [
  { 
    id: 1,
    title: 'Total Revenue', 
    value: '$45,231', 
    change: '12.5%', 
    trend: 'up', 
    icon: 'DollarSign' 
  },
  { 
    id: 2,
    title: 'Active Users', 
    value: '2,345', 
    change: '8.7%', 
    trend: 'up', 
    icon: 'Users' 
  },
  { 
    id: 3,
    title: 'Conversion Rate', 
    value: '3.2%', 
    change: '1.2%', 
    trend: 'down', 
    icon: 'TrendingUp' 
  },
  { 
    id: 4,
    title: 'Page Views', 
    value: '12,893', 
    change: '5.4%', 
    trend: 'up', 
    icon: 'Eye' 
  }
];

const initialRevenueData = [
  { id: 1, name: 'Jan', value: 4000 },
  { id: 2, name: 'Feb', value: 3000 },
  { id: 3, name: 'Mar', value: 5000 },
  { id: 4, name: 'Apr', value: 2780 },
  { id: 5, name: 'May', value: 1890 },
  { id: 6, name: 'Jun', value: 2390 },
];

const initialTrafficData = [
  { id: 1, name: 'Direct', value: 35, color: '#3B82F6' },
  { id: 2, name: 'Organic', value: 25, color: '#8B5CF6' },
  { id: 3, name: 'Social', value: 20, color: '#10B981' },
  { id: 4, name: 'Referral', value: 12, color: '#F59E0B' },
  { id: 5, name: 'Email', value: 8, color: '#EF4444' },
];

const initialActivities = [
  { id: 1, user: 'Sarah Johnson', action: 'created new project', time: '2 minutes ago' },
  { id: 2, user: 'Michael Chen', action: 'completed task', time: '1 hour ago' },
  { id: 3, user: 'Emily Rodriguez', action: 'updated design system', time: '3 hours ago' },
  { id: 4, user: 'David Wilson', action: 'approved budget request', time: '5 hours ago' }
];

const iconMap = {
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Plus,
  Trash2,
  Edit,
  Download
};

export const Dashboard: React.FC = () => {
  // State for all data
  const [metrics, setMetrics] = useState(initialMetrics);
  const [revenueData, setRevenueData] = useState(initialRevenueData);
  const [trafficData, setTrafficData] = useState(initialTrafficData);
  const [activities, setActivities] = useState(initialActivities);
  
  // State for form inputs
  const [newMetric, setNewMetric] = useState({
    title: '',
    value: '',
    change: '',
    trend: 'up',
    icon: 'DollarSign'
  });
  const [newRevenue, setNewRevenue] = useState({
    name: '',
    value: 0
  });
  const [newTraffic, setNewTraffic] = useState({
    name: '',
    value: 0,
    color: '#3B82F6'
  });
  const [newActivity, setNewActivity] = useState({
    user: '',
    action: ''
  });
  
  // State for editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<'metric' | 'revenue' | 'traffic' | 'activity' | null>(null);
  
  // CRUD operations for Metrics
  const addMetric = () => {
    const newId = Math.max(...metrics.map(item => item.id), 0) + 1;
    setMetrics([
      ...metrics,
      { id: newId, ...newMetric }
    ]);
    setNewMetric({ title: '', value: '', change: '', trend: 'up', icon: 'DollarSign' });
  };
  
  const updateMetric = () => {
    if (editingId) {
      setMetrics(metrics.map(item => 
        item.id === editingId ? { id: editingId, ...newMetric } : item
      ));
      setEditingId(null);
      setEditMode(null);
      setNewMetric({ title: '', value: '', change: '', trend: 'up', icon: 'DollarSign' });
    }
  };
  
  const deleteMetric = (id: number) => {
    setMetrics(metrics.filter(item => item.id !== id));
  };
  
  const editMetric = (item: typeof metrics[0]) => {
    setEditingId(item.id);
    setEditMode('metric');
    setNewMetric({
      title: item.title,
      value: item.value,
      change: item.change,
      trend: item.trend,
      icon: item.icon
    });
  };
  
  // CRUD operations for Revenue Data
  const addRevenueData = () => {
    const newId = Math.max(...revenueData.map(item => item.id), 0) + 1;
    setRevenueData([
      ...revenueData,
      { id: newId, ...newRevenue }
    ]);
    setNewRevenue({ name: '', value: 0 });
  };
  
  const updateRevenueData = () => {
    if (editingId) {
      setRevenueData(revenueData.map(item => 
        item.id === editingId ? { id: editingId, ...newRevenue } : item
      ));
      setEditingId(null);
      setEditMode(null);
      setNewRevenue({ name: '', value: 0 });
    }
  };
  
  const deleteRevenueData = (id: number) => {
    setRevenueData(revenueData.filter(item => item.id !== id));
  };
  
  const editRevenueData = (item: typeof revenueData[0]) => {
    setEditingId(item.id);
    setEditMode('revenue');
    setNewRevenue({
      name: item.name,
      value: item.value
    });
  };
  
  // CRUD operations for Traffic Data
  const addTrafficData = () => {
    const newId = Math.max(...trafficData.map(item => item.id), 0) + 1;
    setTrafficData([
      ...trafficData,
      { id: newId, ...newTraffic }
    ]);
    setNewTraffic({ name: '', value: 0, color: '#3B82F6' });
  };
  
  const updateTrafficData = () => {
    if (editingId) {
      setTrafficData(trafficData.map(item => 
        item.id === editingId ? { id: editingId, ...newTraffic } : item
      ));
      setEditingId(null);
      setEditMode(null);
      setNewTraffic({ name: '', value: 0, color: '#3B82F6' });
    }
  };
  
  const deleteTrafficData = (id: number) => {
    setTrafficData(trafficData.filter(item => item.id !== id));
  };
  
  const editTrafficData = (item: typeof trafficData[0]) => {
    setEditingId(item.id);
    setEditMode('traffic');
    setNewTraffic({
      name: item.name,
      value: item.value,
      color: item.color
    });
  };
  
  // CRUD operations for Activities
  const addActivity = () => {
    const newId = Math.max(...activities.map(item => item.id), 0) + 1;
    const now = new Date();
    const timeAgo = 'just now';
    
    setActivities([
      { id: newId, ...newActivity, time: timeAgo },
      ...activities
    ]);
    setNewActivity({ user: '', action: '' });
  };
  
  const deleteActivity = (id: number) => {
    setActivities(activities.filter(item => item.id !== id));
  };
  
  // Calculate total revenue for metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, here's what's happening with your business today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Metrics</h3>
            <button 
              onClick={() => setEditMode(editMode === 'metric' ? null : 'metric')}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          {editMode === 'metric' && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-md font-medium mb-2 dark:text-white">
                {editingId ? 'Edit Metric' : 'Add New Metric'}
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={newMetric.title}
                  onChange={(e) => setNewMetric({...newMetric, title: e.target.value})}
                  className="p-2 border rounded dark:bg-gray-800"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={newMetric.value}
                  onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
                  className="p-2 border rounded dark:bg-gray-800"
                />
                <input
                  type="text"
                  placeholder="Change"
                  value={newMetric.change}
                  onChange={(e) => setNewMetric({...newMetric, change: e.target.value})}
                  className="p-2 border rounded dark:bg-gray-800"
                />
                <select
                  value={newMetric.trend}
                  onChange={(e) => setNewMetric({...newMetric, trend: e.target.value as 'up' | 'down'})}
                  className="p-2 border rounded dark:bg-gray-800"
                >
                  <option value="up">Up</option>
                  <option value="down">Down</option>
                </select>
                <select
                  value={newMetric.icon}
                  onChange={(e) => setNewMetric({...newMetric, icon: e.target.value as keyof typeof iconMap})}
                  className="p-2 border rounded dark:bg-gray-800 col-span-2"
                >
                  <option value="DollarSign">Dollar</option>
                  <option value="Users">Users</option>
                  <option value="TrendingUp">Trend</option>
                  <option value="Eye">Eye</option>
                </select>
              </div>
              <div className="flex gap-2">
                {editingId ? (
                  <>
                    <button 
                      onClick={updateMetric}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setNewMetric({ title: '', value: '', change: '', trend: 'up', icon: 'DollarSign' });
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={addMetric}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!newMetric.title || !newMetric.value}
                  >
                    Add Metric
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {metrics.map((metric, index) => {
              const Icon = iconMap[metric.icon as keyof typeof iconMap];
              const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
              
              return (
                <div key={metric.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="h-4 w-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.title}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button 
                      onClick={() => editMetric(metric)}
                      className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteMetric(metric.id)}
                      className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setEditMode(editMode === 'revenue' ? null : 'revenue')}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => alert('Exporting revenue data...')}
                  className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {editMode === 'revenue' && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-md font-medium mb-2 dark:text-white">
                  {editingId ? 'Edit Data Point' : 'Add New Data'}
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Month"
                    value={newRevenue.name}
                    onChange={(e) => setNewRevenue({...newRevenue, name: e.target.value})}
                    className="p-2 border rounded dark:bg-gray-800"
                  />
                  <input
                    type="number"
                    placeholder="Value"
                    value={newRevenue.value}
                    onChange={(e) => setNewRevenue({...newRevenue, value: Number(e.target.value)})}
                    className="p-2 border rounded dark:bg-gray-800"
                  />
                </div>
                <div className="flex gap-2">
                  {editingId ? (
                    <>
                      <button 
                        onClick={updateRevenueData}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => {
                          setEditingId(null);
                          setNewRevenue({ name: '', value: 0 });
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={addRevenueData}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      disabled={!newRevenue.name || newRevenue.value <= 0}
                    >
                      Add Data
                    </button>
                  )}
                </div>
                
                {revenueData.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium mb-2 dark:text-white">Existing Data</h5>
                    <div className="max-h-40 overflow-y-auto">
                      {revenueData.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-2 border-b">
                          <span className="text-sm dark:text-white">{item.name}: ₹{item.value}</span>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => editRevenueData(item)}
                              className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteRevenueData(item.id)}
                              className="px-2 py-0.5 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg)', 
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  fill="url(#gradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Total Revenue: ${totalRevenue.toLocaleString()}
                </span>
                <span className={`text-sm font-medium ${
                  totalRevenue > 20000 ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {totalRevenue > 20000 ? 'On track' : 'Needs improvement'}
                </span>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
              <button 
                onClick={() => setEditMode(editMode === 'traffic' ? null : 'traffic')}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {editMode === 'traffic' && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-md font-medium mb-2 dark:text-white">
                  {editingId ? 'Edit Traffic Source' : 'Add New Source'}
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Source Name"
                    value={newTraffic.name}
                    onChange={(e) => setNewTraffic({...newTraffic, name: e.target.value})}
                    className="p-2 border rounded dark:bg-gray-800"
                  />
                  <input
                    type="number"
                    placeholder="Percentage"
                    value={newTraffic.value}
                    onChange={(e) => setNewTraffic({...newTraffic, value: Number(e.target.value)})}
                    className="p-2 border rounded dark:bg-gray-800"
                  />
                  <input
                    type="color"
                    value={newTraffic.color}
                    onChange={(e) => setNewTraffic({...newTraffic, color: e.target.value})}
                    className="p-1 border rounded dark:bg-gray-800 col-span-2"
                  />
                </div>
                <div className="flex gap-2">
                  {editingId ? (
                    <>
                      <button 
                        onClick={updateTrafficData}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => {
                          setEditingId(null);
                          setNewTraffic({ name: '', value: 0, color: '#3B82F6' });
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={addTrafficData}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      disabled={!newTraffic.name || newTraffic.value <= 0}
                    >
                      Add Source
                    </button>
                  )}
                </div>
                
                {trafficData.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium mb-2 dark:text-white">Existing Sources</h5>
                    <div className="max-h-40 overflow-y-auto">
                      {trafficData.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-2 border-b">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm dark:text-white">{item.name}: {item.value}%</span>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => editTrafficData(item)}
                              className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteTrafficData(item.id)}
                              className="px-2 py-0.5 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ 
                      backgroundColor: 'var(--tooltip-bg)', 
                      border: '1px solid var(--tooltip-border)',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {trafficData.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setEditMode(editMode === 'activity' ? null : 'activity')}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setActivities([])}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {editMode === 'activity' && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-md font-medium mb-2 dark:text-white">Add New Activity</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="User Name"
                value={newActivity.user}
                onChange={(e) => setNewActivity({...newActivity, user: e.target.value})}
                className="p-2 border rounded dark:bg-gray-800 col-span-2"
              />
              <input
                type="text"
                placeholder="Action"
                value={newActivity.action}
                onChange={(e) => setNewActivity({...newActivity, action: e.target.value})}
                className="p-2 border rounded dark:bg-gray-800 col-span-2"
              />
            </div>
            <button 
              onClick={addActivity}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={!newActivity.user || !newActivity.action}
            >
              Add Activity
            </button>
          </div>
        )}
        
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors relative">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <button 
                  onClick={() => deleteActivity(activity.id)}
                  className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 absolute top-2 right-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No activities to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
};