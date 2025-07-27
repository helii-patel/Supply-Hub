import React, { useState } from 'react';
import Layout from '../shared/Layout';
import TransporterSidebar from './TransporterSidebar';
import DeliveryRoutes from './DeliveryRoutes';
import { Truck, MapPin, Clock, DollarSign } from 'lucide-react';

export default function TransporterDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  const stats = [
    { label: 'Today\'s Deliveries', value: '8', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Routes', value: '3', icon: MapPin, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Completed Today', value: '12', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Today\'s Earnings', value: '₹2,400', icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-100' }
  ];

  const activeDeliveries = [
    { id: 'DEL001', vendor: 'Raj Kumar', address: 'Shop 15, Food Street', status: 'picked', time: '10:30 AM', items: 5 },
    { id: 'DEL002', vendor: 'Priya Foods', address: 'Shop 22, Market Square', status: 'in_transit', time: '11:15 AM', items: 3 },
    { id: 'DEL003', vendor: 'Street Delights', address: 'Shop 8, Food Junction', status: 'pending', time: '12:00 PM', items: 7 }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'routes':
        return <DeliveryRoutes />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bg}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveView('routes')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                >
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">View Routes</span>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                  <Truck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Update Status</span>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">View History</span>
                </button>
              </div>
            </div>

            {/* Active Deliveries */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Deliveries</h3>
                <button
                  onClick={() => setActiveView('routes')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Routes
                </button>
              </div>
              
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{delivery.vendor}</h4>
                        <p className="text-sm text-gray-600">{delivery.address}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        delivery.status === 'picked' ? 'bg-blue-100 text-blue-800' :
                        delivery.status === 'in_transit' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {delivery.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>Scheduled: {delivery.time}</span>
                        <span>{delivery.items} items</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {delivery.status === 'pending' && (
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                            Mark Picked
                          </button>
                        )}
                        {delivery.status === 'picked' && (
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                            Mark Delivered
                          </button>
                        )}
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-50">
                          Call Vendor
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout
      title="Transporter Dashboard"
      sidebar={<TransporterSidebar activeView={activeView} setActiveView={setActiveView} />}
    >
      {renderContent()}
    </Layout>
  );
}