import React, { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';

interface Order {
  id: string;
  supplier: string;
  items: { name: string; quantity: number; unit: string; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  transporter?: string;
  deliveryAddress: string;
}

interface OrderHistoryProps {
  onBack: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: 'ORD-001',
      supplier: 'Fresh Farms Co.',
      items: [
        { name: 'Onions', quantity: 10, unit: 'kg', price: 25 },
        { name: 'Tomatoes', quantity: 5, unit: 'kg', price: 35 },
        { name: 'Potatoes', quantity: 8, unit: 'kg', price: 20 },
      ],
      total: 585,
      status: 'delivered',
      orderDate: '2025-01-10',
      deliveryDate: '2025-01-11',
      transporter: 'Quick Transport',
      deliveryAddress: 'Shop 15, Street Food Market, Andheri West',
    },
    {
      id: 'ORD-002',
      supplier: 'Spice Masters',
      items: [
        { name: 'Chili Powder', quantity: 2, unit: 'kg', price: 180 },
        { name: 'Turmeric', quantity: 1, unit: 'kg', price: 160 },
      ],
      total: 520,
      status: 'in-transit',
      orderDate: '2025-01-11',
      transporter: 'Express Delivery',
      deliveryAddress: 'Shop 15, Street Food Market, Andheri West',
    },
    {
      id: 'ORD-003',
      supplier: 'Oil Depot',
      items: [
        { name: 'Cooking Oil', quantity: 5, unit: 'liter', price: 145 },
        { name: 'Refined Oil', quantity: 3, unit: 'liter', price: 155 },
      ],
      total: 1190,
      status: 'confirmed',
      orderDate: '2025-01-12',
      deliveryAddress: 'Shop 15, Street Food Market, Andheri West',
    },
    {
      id: 'ORD-004',
      supplier: 'Valley Vegetables',
      items: [
        { name: 'Green Chilies', quantity: 3, unit: 'kg', price: 45 },
        { name: 'Coriander', quantity: 2, unit: 'kg', price: 25 },
      ],
      total: 185,
      status: 'pending',
      orderDate: '2025-01-12',
      deliveryAddress: 'Shop 15, Street Food Market, Andheri West',
    },
    {
      id: 'ORD-005',
      supplier: 'Grain World',
      items: [
        { name: 'Basmati Rice', quantity: 10, unit: 'kg', price: 85 },
      ],
      total: 850,
      status: 'cancelled',
      orderDate: '2025-01-09',
      deliveryAddress: 'Shop 15, Street Food Market, Andheri West',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <Package className="h-4 w-4" />;
      case 'in-transit': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'confirmed': return 'blue';
      case 'in-transit': return 'purple';
      case 'delivered': return 'green';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="mr-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <nav className="flex mb-2" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <button onClick={onBack} className="text-sm text-green-600 hover:text-green-700">
                    Dashboard
                  </button>
                </li>
                <li className="text-sm text-gray-500">/</li>
                <li>
                  <button onClick={() => setSelectedOrder(null)} className="text-sm text-green-600 hover:text-green-700">
                    Orders
                  </button>
                </li>
                <li className="text-sm text-gray-500">/</li>
                <li className="text-sm font-medium text-gray-900">{selectedOrder.id}</li>
              </ol>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Information</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Order ID:</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedOrder.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Supplier:</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedOrder.supplier}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Order Date:</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedOrder.orderDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Status:</dt>
                  <dd className="text-sm font-medium">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(selectedOrder.status)}-100 text-${getStatusColor(selectedOrder.status)}-800 capitalize`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1">{selectedOrder.status.replace('-', ' ')}</span>
                    </span>
                  </dd>
                </div>
                {selectedOrder.transporter && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Transporter:</dt>
                    <dd className="text-sm font-medium text-gray-900">{selectedOrder.transporter}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Information</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Delivery Address:</dt>
                  <dd className="text-sm text-gray-900">{selectedOrder.deliveryAddress}</dd>
                </div>
                {selectedOrder.deliveryDate && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Delivered On:</dt>
                    <dd className="text-sm font-medium text-gray-900">{selectedOrder.deliveryDate}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.price}/{item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      Total Amount:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹{selectedOrder.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <nav className="flex mb-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <button onClick={onBack} className="text-sm text-green-600 hover:text-green-700">
                  Dashboard
                </button>
              </li>
              <li className="text-sm text-gray-500">/</li>
              <li className="text-sm font-medium text-gray-900">Order History</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.supplier}</div>
                        <div className="text-sm text-gray-500">{order.orderDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.slice(0, 2).map(item => item.name).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(order.status)}-100 text-${getStatusColor(order.status)}-800 capitalize`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-green-600 hover:text-green-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;