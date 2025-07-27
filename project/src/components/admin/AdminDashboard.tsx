import React, { useState } from 'react';
import { Users, ShoppingCart, Truck, TrendingUp, UserCheck, UserX, BarChart3, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      name: 'Total Users',
      value: '1,248',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      breakdown: { vendors: 856, suppliers: 234, transporters: 158 }
    },
    {
      name: 'Active Orders',
      value: '324',
      change: '+8%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      name: 'Total Revenue',
      value: '₹2,45,680',
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      name: 'Deliveries Today',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: Truck,
    },
  ];

  const pendingApprovals = [
    {
      id: 'SUP-001',
      name: 'Green Valley Farms',
      type: 'supplier',
      email: 'contact@greenvalley.com',
      phone: '+91 98765 43210',
      location: 'Pune, Maharashtra',
      registeredOn: '2025-01-10',
      documents: ['GST Certificate', 'Business License', 'Bank Details'],
    },
    {
      id: 'TRP-001',
      name: 'Fast Logistics',
      type: 'transporter',
      email: 'info@fastlogistics.com',
      phone: '+91 87654 32109',
      location: 'Mumbai, Maharashtra',
      registeredOn: '2025-01-11',
      documents: ['Transport License', 'Vehicle Registration', 'Insurance'],
    },
    {
      id: 'SUP-002',
      name: 'Spice Garden',
      type: 'supplier',
      email: 'orders@spicegarden.com',
      phone: '+91 76543 21098',
      location: 'Nashik, Maharashtra',
      registeredOn: '2025-01-12',
      documents: ['GST Certificate', 'Quality Certification'],
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      message: 'New order ORD-324 placed by Raj Kumar',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'user',
      message: 'New supplier registration: Green Valley Farms',
      timestamp: '15 minutes ago',
      status: 'warning'
    },
    {
      id: 3,
      type: 'delivery',
      message: 'Order ORD-320 delivered successfully',
      timestamp: '32 minutes ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'system',
      message: 'Daily backup completed',
      timestamp: '1 hour ago',
      status: 'info'
    },
    {
      id: 5,
      type: 'order',
      message: 'Order ORD-315 cancelled by customer',
      timestamp: '2 hours ago',
      status: 'error'
    },
  ];

  const topPerformers = {
    suppliers: [
      { name: 'Fresh Farms Co.', orders: 156, revenue: '₹45,230', rating: 4.9 },
      { name: 'Spice Masters', orders: 134, revenue: '₹38,450', rating: 4.8 },
      { name: 'Valley Vegetables', orders: 98, revenue: '₹28,670', rating: 4.7 },
    ],
    transporters: [
      { name: 'Quick Transport', deliveries: 245, onTime: '96%', rating: 4.9 },
      { name: 'Express Delivery', deliveries: 198, onTime: '94%', rating: 4.8 },
      { name: 'Fast Logistics', deliveries: 167, onTime: '92%', rating: 4.6 },
    ],
    vendors: [
      { name: 'Mumbai Chaat Corner', orders: 78, spent: '₹23,450', active: true },
      { name: 'Raj Kumar Street Food', orders: 65, spent: '₹18,230', active: true },
      { name: 'Priya Snacks', orders: 52, spent: '₹15,670', active: true },
    ],
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      case 'delivery': return <Truck className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'green';
      case 'warning': return 'yellow';
      case 'error': return 'red';
      case 'info': return 'blue';
      default: return 'gray';
    }
  };

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action} user ${id}`);
    // Implement approval logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li className="text-sm font-medium text-gray-600">Admin Dashboard</li>
        </ol>
      </nav>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Control Panel</h1>
        <p className="text-gray-200">Monitor and manage the entire raw material supply platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-600" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                {item.breakdown && (
                  <div className="mt-3 text-xs text-gray-500">
                    Vendors: {item.breakdown.vendors} • Suppliers: {item.breakdown.suppliers} • Transporters: {item.breakdown.transporters}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending Approvals */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
            </div>
            <div className="overflow-hidden max-h-96 overflow-y-auto">
              <div className="space-y-4 p-6">
                {pendingApprovals.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{user.type}</p>
                        <p className="text-xs text-gray-500">Registered: {user.registeredOn}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.type === 'supplier' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <p className="text-gray-500">Email: {user.email}</p>
                        <p className="text-gray-500">Phone: {user.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Location: {user.location}</p>
                        <p className="text-gray-500">Documents: {user.documents.join(', ')}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleApproval(user.id, 'approve')}
                        className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(user.id, 'reject')}
                        className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="overflow-hidden max-h-96 overflow-y-auto">
              <div className="space-y-3 p-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full bg-${getActivityColor(activity.status)}-100`}>
                      <div className={`text-${getActivityColor(activity.status)}-600`}>
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Suppliers</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.suppliers.map((supplier, index) => (
                <div key={supplier.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                      <p className="text-xs text-gray-500">{supplier.orders} orders • ⭐ {supplier.rating}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{supplier.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Transporters</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.transporters.map((transporter, index) => (
                <div key={transporter.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transporter.name}</p>
                      <p className="text-xs text-gray-500">{transporter.deliveries} deliveries • ⭐ {transporter.rating}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">{transporter.onTime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Active Vendors</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.vendors.map((vendor, index) => (
                <div key={vendor.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-xs text-gray-500">{vendor.orders} orders</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{vendor.spent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;