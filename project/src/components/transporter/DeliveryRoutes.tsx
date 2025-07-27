import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Clock, CheckCircle, Package } from 'lucide-react';

export default function DeliveryRoutes() {
  const [selectedRoute, setSelectedRoute] = useState('route1');

  const routes = [
    {
      id: 'route1',
      name: 'North Delhi Route',
      status: 'active',
      deliveries: [
        {
          id: 'DEL001',
          vendor: 'Raj Kumar',
          phone: '+91 9876543210',
          address: 'Shop 15, Food Street, Karol Bagh',
          items: ['Onions (10kg)', 'Tomatoes (5kg)'],
          status: 'picked',
          scheduledTime: '10:30 AM',
          estimatedTime: '11:00 AM',
          priority: 'high'
        },
        {
          id: 'DEL002',
          vendor: 'Priya Foods',
          phone: '+91 9876543211',
          address: 'Shop 22, Market Square, Rajouri Garden',
          items: ['Potatoes (15kg)'],
          status: 'pending',
          scheduledTime: '11:30 AM',
          estimatedTime: '12:00 PM',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'route2',
      name: 'Central Delhi Route',
      status: 'pending',
      deliveries: [
        {
          id: 'DEL003',
          vendor: 'Street Delights',
          phone: '+91 9876543212',
          address: 'Shop 8, Food Junction, Connaught Place',
          items: ['Flour (8kg)', 'Oil (2L)'],
          status: 'pending',
          scheduledTime: '02:00 PM',
          estimatedTime: '02:30 PM',
          priority: 'low'
        }
      ]
    }
  ];

  const currentRoute = routes.find(route => route.id === selectedRoute);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'picked':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    // Update delivery status logic here
    console.log(`Updating delivery ${deliveryId} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Delivery Routes</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Route Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Routes</h3>
            <div className="space-y-3">
              {routes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedRoute === route.id
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{route.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                      route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {route.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {route.deliveries.length} deliveries
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Route Details */}
        <div className="lg:col-span-2">
          {currentRoute && (
            <div className="space-y-6">
              {/* Route Header */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{currentRoute.name}</h3>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      <Navigation className="w-4 h-4" />
                      <span>Navigate</span>
                    </button>
                    <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span>View Map</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{currentRoute.deliveries.length}</div>
                    <div className="text-sm text-gray-600">Total Stops</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {currentRoute.deliveries.filter(d => d.status === 'picked').length}
                    </div>
                    <div className="text-sm text-gray-600">Picked Up</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {currentRoute.deliveries.filter(d => d.status === 'delivered').length}
                    </div>
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                </div>
              </div>

              {/* Delivery List */}
              <div className="space-y-4">
                {currentRoute.deliveries.map((delivery, index) => (
                  <div key={delivery.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            delivery.status === 'delivered' ? 'bg-green-500' :
                            delivery.status === 'picked' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{delivery.vendor}</h4>
                            <div className="flex items-center space-x-2 text-gray-600 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{delivery.address}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600 mt-1">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">{delivery.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(delivery.status)}`}>
                            {delivery.status}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getPriorityColor(delivery.priority)}`}>
                            {delivery.priority} priority
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Items to Deliver</h5>
                          <div className="space-y-1">
                            {delivery.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                                <Package className="w-4 h-4" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Timing</h5>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Scheduled: {delivery.scheduledTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>ETA: {delivery.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="border-t pt-4">
                        <div className="flex flex-wrap gap-2">
                          {delivery.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(delivery.id, 'picked')}
                              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Package className="w-4 h-4" />
                              <span>Mark as Picked</span>
                            </button>
                          )}
                          
                          {delivery.status === 'picked' && (
                            <button
                              onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Mark as Delivered</span>
                            </button>
                          )}
                          
                          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>Call Vendor</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Navigation className="w-4 h-4" />
                            <span>Get Directions</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}