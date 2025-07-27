import React, { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, Navigation, Phone, Package } from 'lucide-react';

const TransporterDashboard: React.FC = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  const stats = [
    {
      name: 'Active Deliveries',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Truck,
    },
    {
      name: 'Completed Today',
      value: '12',
      change: '+5',
      changeType: 'positive',
      icon: CheckCircle,
    },
    {
      name: 'Total Distance',
      value: '156 km',
      change: '+23 km',
      changeType: 'positive',
      icon: Navigation,
    },
    {
      name: 'Today Earnings',
      value: '₹2,850',
      change: '+₹450',
      changeType: 'positive',
      icon: Package,
    },
  ];

  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      vendor: 'Raj Kumar (Street Food)',
      supplier: 'Fresh Farms Co.',
      pickup: 'Wholesale Market, Andheri East',
      delivery: 'Street Food Market, Andheri West',
      status: 'picked-up',
      priority: 'high',
      items: 'Onions (10kg), Tomatoes (5kg), Potatoes (8kg)',
      estimatedTime: '30 mins',
      distance: '12 km',
      payment: '₹585',
      vendorPhone: '+91 98765 43210',
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      vendor: 'Priya Snacks',
      supplier: 'Spice Masters',
      pickup: 'Spice Market, Dadar',
      delivery: 'Linking Road, Bandra',
      status: 'assigned',
      priority: 'medium',
      items: 'Chili Powder (2kg), Turmeric (1kg)',
      estimatedTime: '45 mins',
      distance: '18 km',
      payment: '₹520',
      vendorPhone: '+91 87654 32109',
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      vendor: 'Mumbai Chaat Corner',
      supplier: 'Oil Depot',
      pickup: 'Industrial Area, Kurla',
      delivery: 'Mohammed Ali Road',
      status: 'ready-for-pickup',
      priority: 'high',
      items: 'Cooking Oil (5L), Refined Oil (3L)',
      estimatedTime: '55 mins',
      distance: '25 km',
      payment: '₹1,190',
      vendorPhone: '+91 76543 21098',
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-004',
      vendor: 'Tasty Treats',
      supplier: 'Valley Vegetables',
      pickup: 'APMC Market, Vashi',
      delivery: 'Carter Road, Bandra',
      status: 'in-transit',
      priority: 'medium',
      items: 'Green Chilies (3kg), Coriander (2kg)',
      estimatedTime: '20 mins',
      distance: '22 km',
      payment: '₹185',
      vendorPhone: '+91 65432 10987',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'yellow';
      case 'ready-for-pickup': return 'blue';
      case 'picked-up': return 'purple';
      case 'in-transit': return 'blue';
      case 'delivered': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'ready-for-pickup': return <MapPin className="h-4 w-4" />;
      case 'picked-up': return <Truck className="h-4 w-4" />;
      case 'in-transit': return <Navigation className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    // Update delivery status logic here
    console.log(`Updating delivery ${deliveryId} to ${newStatus}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li className="text-sm font-medium text-blue-600">Transporter Dashboard</li>
        </ol>
      </nav>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Quick Transport!</h1>
        <p className="text-blue-100">You have 8 active deliveries scheduled for today.</p>
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
                    <Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
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

      {/* Delivery Routes */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Today's Delivery Routes</h3>
            <span className="text-sm text-gray-500">{deliveries.length} deliveries</span>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-4 p-6">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(
                          delivery.status
                        )}-100 text-${getStatusColor(delivery.status)}-800`}
                      >
                        {getStatusIcon(delivery.status)}
                        <span className="ml-1 capitalize">{delivery.status.replace('-', ' ')}</span>
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getPriorityColor(
                          delivery.priority
                        )}-100 text-${getPriorityColor(delivery.priority)}-800 capitalize`}
                      >
                        {delivery.priority} Priority
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{delivery.payment}</p>
                      <p className="text-xs text-gray-500">{delivery.distance} • {delivery.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Order Details</h4>
                      <p className="text-sm text-gray-600">ID: {delivery.orderId}</p>
                      <p className="text-sm text-gray-600">Vendor: {delivery.vendor}</p>
                      <p className="text-sm text-gray-600">Supplier: {delivery.supplier}</p>
                      <p className="text-sm text-gray-600">Items: {delivery.items}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Route</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Pickup</p>
                            <p className="text-sm text-gray-900">{delivery.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Navigation className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Delivery</p>
                            <p className="text-sm text-gray-900">{delivery.delivery}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Vendor
                      </button>
                      <button className="flex items-center text-sm text-green-600 hover:text-green-700">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      {delivery.status === 'assigned' && (
                        <button
                          onClick={() => updateDeliveryStatus(delivery.id, 'picked-up')}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {delivery.status === 'picked-up' && (
                        <button
                          onClick={() => updateDeliveryStatus(delivery.id, 'in-transit')}
                          className="px-3 py-1 text-xs font-medium text-white bg-purple-600 rounded hover:bg-purple-700 transition-colors"
                        >
                          Start Delivery
                        </button>
                      )}
                      {delivery.status === 'in-transit' && (
                        <button
                          onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {delivery.status === 'ready-for-pickup' && (
                        <button
                          onClick={() => updateDeliveryStatus(delivery.id, 'picked-up')}
                          className="px-3 py-1 text-xs font-medium text-white bg-amber-600 rounded hover:bg-amber-700 transition-colors"
                        >
                          Confirm Pickup
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">On-time Deliveries</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Delivery Time</span>
              <span className="text-sm font-medium text-gray-900">28 mins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Rating</span>
              <span className="text-sm font-medium text-yellow-600">4.8/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Deliveries</span>
              <span className="text-sm font-medium text-gray-900">84</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Distance Covered</span>
              <span className="text-sm font-medium text-gray-900">1,248 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Earnings</span>
              <span className="text-sm font-medium text-green-600">₹18,450</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Next Deliveries</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900">ORD-005</p>
              <p className="text-gray-600">Spice Market → Colaba</p>
              <p className="text-xs text-gray-500">Scheduled: 3:30 PM</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">ORD-006</p>
              <p className="text-gray-600">APMC → Powai</p>
              <p className="text-xs text-gray-500">Scheduled: 4:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterDashboard;