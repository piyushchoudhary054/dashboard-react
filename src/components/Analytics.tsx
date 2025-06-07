import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Initial data
const initialPerformanceData = [
  { id: 1, month: 'Jan', sales: 4000, users: 2400, revenue: 2400 },
  { id: 2, month: 'Feb', sales: 3000, users: 1398, revenue: 2210 },
  { id: 3, month: 'Mar', sales: 2000, users: 9800, revenue: 2290 },
  { id: 4, month: 'Apr', sales: 2780, users: 3908, revenue: 2000 },
  { id: 5, month: 'May', sales: 1890, users: 4800, revenue: 2181 },
  { id: 6, month: 'Jun', sales: 2390, users: 3800, revenue: 2500 },
];

const initialCategoryData = [
  { id: 1, name: 'Electronics', value: 35, color: '#3B82F6' },
  { id: 2, name: 'Clothing', value: 25, color: '#8B5CF6' },
  { id: 3, name: 'Home & Garden', value: 20, color: '#10B981' },
  { id: 4, name: 'Sports', value: 12, color: '#F59E0B' },
  { id: 5, name: 'Books', value: 8, color: '#EF4444' },
];

const initialConversionData = [
  { id: 1, stage: 'Visitors', value: 10000, color: '#E5E7EB' },
  { id: 2, stage: 'Leads', value: 3000, color: '#BFDBFE' },
  { id: 3, stage: 'Opportunities', value: 800, color: '#93C5FD' },
  { id: 4, stage: 'Customers', value: 200, color: '#3B82F6' },
];

export const Analytics: React.FC = () => {
  // State for all data
  const [performanceData, setPerformanceData] = useState(initialPerformanceData);
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [conversionData, setConversionData] = useState(initialConversionData);
  
  // State for form inputs
  const [newPerformance, setNewPerformance] = useState({
    month: '',
    sales: 0,
    users: 0,
    revenue: 0
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    value: 0,
    color: '#3B82F6'
  });
  const [newConversion, setNewConversion] = useState({
    stage: '',
    value: 0,
    color: '#E5E7EB'
  });
  
  // State for editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<'performance' | 'category' | 'conversion' | null>(null);
  
  // CRUD operations for Performance Data
  const addPerformanceData = () => {
    const newId = Math.max(...performanceData.map(item => item.id), 0) + 1;
    setPerformanceData([
      ...performanceData,
      { id: newId, ...newPerformance }
    ]);
    setNewPerformance({ month: '', sales: 0, users: 0, revenue: 0 });
  };
  
  const updatePerformanceData = () => {
    if (editingId) {
      setPerformanceData(performanceData.map(item => 
        item.id === editingId ? { id: editingId, ...newPerformance } : item
      ));
      setEditingId(null);
      setEditMode(null);
      setNewPerformance({ month: '', sales: 0, users: 0, revenue: 0 });
    }
  };
  
  const deletePerformanceData = (id: number) => {
    setPerformanceData(performanceData.filter(item => item.id !== id));
  };
  
  const editPerformanceData = (item: typeof performanceData[0]) => {
    setEditingId(item.id);
    setEditMode('performance');
    setNewPerformance({
      month: item.month,
      sales: item.sales,
      users: item.users,
      revenue: item.revenue
    });
  };
  
  // CRUD operations for Category Data
  const addCategoryData = () => {
    const newId = Math.max(...categoryData.map(item => item.id), 0) + 1;
    setCategoryData([
      ...categoryData,
      { id: newId, ...newCategory }
    ]);
    setNewCategory({ name: '', value: 0, color: '#3B82F6' });
  };
  
  const updateCategoryData = () => {
    if (editingId) {
      setCategoryData(categoryData.map(item => 
        item.id === editingId ? { id: editingId, ...newCategory } : item
      ));
      setEditingId(null);
      setEditMode(null);
      setNewCategory({ name: '', value: 0, color: '#3B82F6' });
    }
  };
  
  const deleteCategoryData = (id: number) => {
    setCategoryData(categoryData.filter(item => item.id !== id));
  };
  
  const editCategoryData = (item: typeof categoryData[0]) => {
    setEditingId(item.id);
    setEditMode('category');
    setNewCategory({
      name: item.name,
      value: item.value,
      color: item.color
    });
  };
  
  // CRUD operations for Conversion Data
  const addConversionData = () => {
    const newId = Math.max(...conversionData.map(item => item.id), 0) + 1;
    setConversionData([
      ...conversionData,
      { id: newId, ...newConversion }
    ]);
    setNewConversion({ stage: '', value: 0, color: '#E5E7EB' });
  };
  
  const updateConversionData = () => {
    if (editingId) {
      setConversionData(conversionData.map(item => 
        item.id === editingId ? { id: editingId, ...newConversion } : item
      ));
      setEditingId(null);
      setEditMode(null);
      setNewConversion({ stage: '', value: 0, color: '#E5E7EB' });
    }
  };
  
  const deleteConversionData = (id: number) => {
    setConversionData(conversionData.filter(item => item.id !== id));
  };
  
  const editConversionData = (item: typeof conversionData[0]) => {
    setEditingId(item.id);
    setEditMode('conversion');
    setNewConversion({
      stage: item.stage,
      value: item.value,
      color: item.color
    });
  };
  
  // Additional metrics calculation
  const totalSales = performanceData.reduce((sum, item) => sum + item.sales, 0);
  const totalUsers = performanceData.reduce((sum, item) => sum + item.users, 0);
  const avgOrderValue = totalSales > 0 ? (totalSales / performanceData.length).toFixed(2) : 0;
  const conversionRate = conversionData.length > 0 
    ? ((conversionData[conversionData.length - 1].value / conversionData[0].value) * 100).toFixed(2)
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Deep insights into your business performance and trends.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Sales', value: `₹${totalSales.toLocaleString()}`, change: '+12.3%', color: 'text-green-600' },
          { title: 'Active Users', value: totalUsers.toLocaleString(), change: '+8.7%', color: 'text-green-600' },
          { title: 'Conversion Rate', value: `${conversionRate}%`, change: '-1.2%', color: 'text-red-600' },
          { title: 'Avg. Order Value', value: `₹${avgOrderValue}`, change: '+5.8%', color: 'text-green-600' },
        ].map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{metric.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              <span className={`text-sm font-medium ${metric.color}`}>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trends</h3>
            <button 
              onClick={() => setEditMode(editMode === 'performance' ? null : 'performance')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editMode === 'performance' ? 'Cancel' : 'Edit Data'}
            </button>
          </div>
          
          {editMode === 'performance' && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-md font-medium mb-2 dark:text-white">
                {editingId ? 'Edit Data' : 'Add New Data'}
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Month"
                  value={newPerformance.month}
                  onChange={(e) => setNewPerformance({...newPerformance, month: e.target.value})}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Sales"
                  value={newPerformance.sales}
                  onChange={(e) => setNewPerformance({...newPerformance, sales: Number(e.target.value)})}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Users"
                  value={newPerformance.users}
                  onChange={(e) => setNewPerformance({...newPerformance, users: Number(e.target.value)})}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Revenue"
                  value={newPerformance.revenue}
                  onChange={(e) => setNewPerformance({...newPerformance, revenue: Number(e.target.value)})}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex gap-2">
                {editingId ? (
                  <>
                    <button 
                      onClick={updatePerformanceData}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setNewPerformance({ month: '', sales: 0, users: 0, revenue: 0 });
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={addPerformanceData}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Data
                  </button>
                )}
              </div>
              
              {performanceData.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2 dark:text-white">Existing Data</h5>
                  <div className="max-h-40 overflow-y-auto">
                    {performanceData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 border-b">
                        <span className="text-sm dark:text-white">{item.month}: Sales ₹{item.sales}, Users {item.users}</span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => editPerformanceData(item)}
                            className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deletePerformanceData(item.id)}
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
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg)', 
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Sales" />
              <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} name="Users" />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h3>
            <button 
              onClick={() => setEditMode(editMode === 'category' ? null : 'category')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editMode === 'category' ? 'Cancel' : 'Edit Data'}
            </button>
          </div>
          
          {editMode === 'category' && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-md font-medium mb-2 dark:text-white">
                {editingId ? 'Edit Category' : 'Add New Category'}
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={newCategory.value}
                  onChange={(e) => setNewCategory({...newCategory, value: Number(e.target.value)})}
                  className="p-2 border rounded"
                />
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                  className="p-1 border rounded"
                />
              </div>
              <div className="flex gap-2">
                {editingId ? (
                  <>
                    <button 
                      onClick={updateCategoryData}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setNewCategory({ name: '', value: 0, color: '#3B82F6' });
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={addCategoryData}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!newCategory.name || newCategory.value <= 0}
                  >
                    Add Category
                  </button>
                )}
              </div>
              
              {categoryData.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2 dark:text-white">Existing Categories</h5>
                  <div className="max-h-40 overflow-y-auto">
                    {categoryData.map(item => (
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
                            onClick={() => editCategoryData(item)}
                            className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteCategoryData(item.id)}
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
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`${value}%`, name]}
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg)', 
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Funnel</h3>
            <button 
              onClick={() => setEditMode(editMode === 'conversion' ? null : 'conversion')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editMode === 'conversion' ? 'Cancel' : 'Edit Data'}
            </button>
          </div>
          
          {editMode === 'conversion' && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-md font-medium mb-2 dark:text-white">
                {editingId ? 'Edit Stage' : 'Add New Stage'}
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Stage Name"
                  value={newConversion.stage}
                  onChange={(e) => setNewConversion({...newConversion, stage: e.target.value})}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={newConversion.value}
                  onChange={(e) => setNewConversion({...newConversion, value: Number(e.target.value)})}
                  className="p-2 border rounded"
                />
                <input
                  type="color"
                  value={newConversion.color}
                  onChange={(e) => setNewConversion({...newConversion, color: e.target.value})}
                  className="p-1 border rounded"
                />
              </div>
              <div className="flex gap-2">
                {editingId ? (
                  <>
                    <button 
                      onClick={updateConversionData}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setNewConversion({ stage: '', value: 0, color: '#E5E7EB' });
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={addConversionData}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!newConversion.stage || newConversion.value <= 0}
                  >
                    Add Stage
                  </button>
                )}
              </div>
              
              {conversionData.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2 dark:text-white">Existing Stages</h5>
                  <div className="max-h-40 overflow-y-auto">
                    {conversionData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 border-b">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm dark:text-white">{item.stage}: {item.value}</span>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => editConversionData(item)}
                            className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteConversionData(item.id)}
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
            <BarChart data={conversionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="stage" type="category" stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg)', 
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" name="Count">
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Growth Metrics</h3>
            <button 
              onClick={() => alert('Export data to CSV')}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Export Data
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                label: 'Monthly Recurring Revenue', 
                value: `₹${(totalSales * 0.3).toLocaleString()}`, 
                growth: '+15%',
                calculation: '30% of total sales'
              },
              { 
                label: 'Customer Acquisition Cost', 
                value: `₹${(totalSales * 0.1 / (totalUsers || 1)).toFixed(2)}`, 
                growth: '-8%',
                calculation: '10% of sales / total users'
              },
              { 
                label: 'Customer Lifetime Value', 
                value: `₹${(totalSales * 1.5 / (totalUsers || 1)).toFixed(2)}`, 
                growth: '+22%',
                calculation: '1.5x of sales / total users'
              },
              { 
                label: 'Churn Rate', 
                value: `${(performanceData.length > 0 ? (1 - (performanceData[performanceData.length - 1].users / performanceData[0].users)) * 100 : 0).toFixed(2)}%`, 
                growth: '-12%',
                calculation: '1 - (last month users / first month users)'
              },
            ].map((metric, index) => (
              <div key={index} className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{metric.label}</p>
                  <span className={`text-sm font-medium ${
                    metric.growth.startsWith('+') ? 'text-green-600' : 
                    metric.growth.startsWith('-') && (metric.label.includes('Cost') || metric.label.includes('Churn')) 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {metric.growth}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{metric.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.calculation}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h4 className="text-md font-medium text-blue-800 dark:text-blue-200 mb-1">Insights</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {totalSales > 50000 ? 'Strong sales performance this period!' : 'Sales are below target, consider promotions.'}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {totalUsers > 5000 ? 'User growth is healthy.' : 'Need to focus on user acquisition.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};