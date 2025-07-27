import React, { useState } from 'react';
import { Search, Filter, Star, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function ProductListing() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'grains', name: 'Grains & Flour' },
    { id: 'oils', name: 'Oils & Spices' },
    { id: 'dairy', name: 'Dairy Products' }
  ];

  const products = [
    { id: '1', name: 'Fresh Onions', category: 'vegetables', price: 25, unit: 'kg', supplier: 'Green Valley Farms', rating: 4.8, stock: 500, image: 'https://images.pexels.com/photos/1306818/pexels-photo-1306818.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '2', name: 'Red Tomatoes', category: 'vegetables', price: 30, unit: 'kg', supplier: 'Fresh Harvest Co.', rating: 4.6, stock: 300, image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '3', name: 'Wheat Flour', category: 'grains', price: 45, unit: 'kg', supplier: 'Golden Grains', rating: 4.9, stock: 200, image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '4', name: 'Sunflower Oil', category: 'oils', price: 120, unit: 'liter', supplier: 'Pure Oils Ltd.', rating: 4.7, stock: 150, image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '5', name: 'Fresh Potatoes', category: 'vegetables', price: 20, unit: 'kg', supplier: 'Farm Fresh', rating: 4.5, stock: 400, image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-healthy-144248.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '6', name: 'Basmati Rice', category: 'grains', price: 80, unit: 'kg', supplier: 'Premium Grains', rating: 4.8, stock: 180, image: 'https://images.pexels.com/photos/1854650/pexels-photo-1854650.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateCart = (productId: string, change: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Browse Products</h2>
        {getTotalItems() > 0 && (
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">{getTotalItems()} items in cart</span>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-12">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">by {product.supplier}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-gray-600">/{product.unit}</span>
                </div>
                <span className="text-sm text-gray-500">{product.stock} {product.unit} available</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCart(product.id, -1)}
                    disabled={!cart[product.id]}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{cart[product.id] || 0}</span>
                  <button
                    onClick={() => updateCart(product.id, 1)}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {cart[product.id] > 0 && (
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="font-bold text-green-600">₹{(cart[product.id] * product.price).toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Checkout ({getTotalItems()} items)</span>
          </button>
        </div>
      )}
    </div>
  );
}