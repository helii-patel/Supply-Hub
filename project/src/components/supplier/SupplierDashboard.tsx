import React, { useState } from 'react';
import { Package, ShoppingCart, Truck, TrendingUp, Plus, Edit, Eye } from 'lucide-react';

const SupplierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      name: 'Total Products',
      value: '42',
      change: '+5%',
      changeType: 'positive',
      icon: Package,
    },
    {
      name: 'Active Orders',
      value: '18',
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      name: 'Pending Deliveries',
      value: '7',
      change: '-3%',
      changeType: 'negative',
      icon: Truck,
    },
    {
      name: 'Monthly Revenue',
      value: '₹45,280',
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      vendor: 'Raj Kumar (Street Food)',
      items: 'Onions (10kg), Tomatoes (5kg)',
      total: '₹585',
      status: 'confirmed',
      date: '2025-01-12',
    },
    {
      id: 'ORD-002',
      vendor: 'Priya Snacks',
      items: 'Potatoes (15kg), Chilies (3kg)',
      total: '₹435',
      status: 'pending',
      date: '2025-01-12',
    },
    {
      id: 'ORD-003',
      vendor: 'Mumbai Chaat Corner',
      items: 'Onions (20kg), Coriander (2kg)',
      total: '₹550',
      status: 'ready',
      date: '2025-01-11',
    },
  ];

  const inventory = [
    { name: 'Fresh Onions', stock: 500, unit: 'kg', price: 25, status: 'in-stock' },
    { name: 'Tomatoes', stock: 150, unit: 'kg', price: 35, status: 'low-stock' },
    { name: 'Potatoes', stock: 300, unit: 'kg', price: 20, status: 'in-stock' },
    { name: 'Green Chilies', stock: 25, unit: 'kg', price: 45, status: 'low-stock' },
    { name: 'Coriander', stock: 80, unit: 'kg', price: 25, status: 'in-stock' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'blue';
      case 'pending': return 'yellow';
      case 'ready': return 'green';
      case 'delivered': return 'green';
      case 'in-stock': return 'green';
      case 'low-stock': return 'yellow';
      case 'out-of-stock': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li className="text-sm font-medium text-amber-600">Supplier Dashboard</li>
        </ol>
      </nav>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Farm Fresh Co.!</h1>
        <p className="text-amber-100">Manage your inventory and fulfill orders from street food vendors.</p>
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
                    <Icon className="h-8 w-8 text-amber-600" aria-hidden="true" />
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
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left border-2 border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-all group">
                <Plus className="h-5 w-5 text-amber-600 group-hover:text-amber-700 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Add New Product
                </span>
              </button>
              <button className="w-full flex items-center p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <Edit className="h-5 w-5 text-blue-600 group-hover:text-blue-700 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Update Inventory
                </span>
              </button>
              <button className="w-full flex items-center p-3 text-left border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group">
                <Eye className="h-5 w-5 text-green-600 group-hover:text-green-700 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  View All Orders
                </span>
              </button>
              <button className="w-full flex items-center p-3 text-left border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group">
                <TrendingUp className="h-5 w-5 text-purple-600 group-hover:text-purple-700 mr-3" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Sales Analytics
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                  View all
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.vendor}</div>
                          <div className="text-sm text-gray-500">{order.items}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(
                            order.status
                          )}-100 text-${getStatusColor(order.status)}-800 capitalize`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {order.status === 'pending' && (
                          <button className="text-amber-600 hover:text-amber-900 mr-3">
                            Confirm
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            Mark Ready
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Inventory Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.stock} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.price}/{item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(
                          item.status
                        )}-100 text-${getStatusColor(item.status)}-800 capitalize`}
                      >
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-amber-600 hover:text-amber-900 mr-3">
                        Edit
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Update Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;