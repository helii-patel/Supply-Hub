import React, { useState } from 'react';
import { ShoppingCart, Package, Truck, TrendingUp, Search, Filter, Star } from 'lucide-react';
import OrderHistory from './OrderHistory';
import ProductListing from './ProductListing';

const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      name: 'Total Orders',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      name: 'Pending Orders',
      value: '3',
      change: '-8%',
      changeType: 'negative',
      icon: Package,
    },
    {
      name: 'In Transit',
      value: '5',
      change: '+3%',
      changeType: 'positive',
      icon: Truck,
    },
    {
      name: 'This Month Spent',
      value: '₹12,450',
      change: '+15%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      supplier: 'Fresh Farms Co.',
      items: 'Onions, Tomatoes, Potatoes',
      total: '₹2,340',
      status: 'delivered',
      date: '2025-01-10',
    },
    {
      id: 'ORD-002',
      supplier: 'Spice Masters',
      items: 'Chili Powder, Turmeric',
      total: '₹890',
      status: 'in-transit',
      date: '2025-01-11',
    },
    {
      id: 'ORD-003',
      supplier: 'Oil Depot',
      items: 'Cooking Oil, Refined Oil',
      total: '₹1,560',
      status: 'pending',
      date: '2025-01-12',
    },
  ];

  const quickActions = [
    { name: 'Browse Products', icon: Search, color: 'green' },
    { name: 'Track Orders', icon: Truck, color: 'blue' },
    { name: 'View Suppliers', icon: Star, color: 'yellow' },
    { name: 'Price Trends', icon: TrendingUp, color: 'purple' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'in-transit': return 'blue';
      case 'pending': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  if (activeTab === 'products') {
    return <ProductListing onBack={() => setActiveTab('dashboard')} />;
  }

  if (activeTab === 'orders') {
    return <OrderHistory onBack={() => setActiveTab('dashboard')} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li className="text-sm font-medium text-green-600">Vendor Dashboard</li>
        </ol>
      </nav>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Raj!</h1>
        <p className="text-green-100">Ready to stock up on fresh ingredients for your food stall?</p>
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
                    <Icon className="h-8 w-8 text-green-600" aria-hidden="true" />
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
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    onClick={() => {
                      if (action.name === 'Browse Products') setActiveTab('products');
                      if (action.name === 'Track Orders') setActiveTab('orders');
                    }}
                    className={`w-full flex items-center p-3 text-left border-2 border-gray-200 rounded-lg hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all group`}
                  >
                    <Icon className={`h-5 w-5 text-${action.color}-600 group-hover:text-${action.color}-700 mr-3`} />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {action.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.supplier}</div>
                          <div className="text-sm text-gray-500">{order.items}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(
                            order.status
                          )}-100 text-${getStatusColor(order.status)}-800 capitalize`}
                        >
                          {order.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;