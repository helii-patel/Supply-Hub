import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, Minus, ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  supplier: string;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
}

interface ProductListingProps {
  onBack: () => void;
}

const ProductListing: React.FC<ProductListingProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'spices', name: 'Spices' },
    { id: 'oil', name: 'Oils' },
    { id: 'grains', name: 'Grains' },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Onions',
      price: 25,
      unit: 'kg',
      supplier: 'Fresh Farms Co.',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'vegetables',
      inStock: true,
      description: 'Premium quality red onions, freshly harvested'
    },
    {
      id: '2',
      name: 'Tomatoes',
      price: 35,
      unit: 'kg',
      supplier: 'Valley Vegetables',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'vegetables',
      inStock: true,
      description: 'Ripe, juicy tomatoes perfect for cooking'
    },
    {
      id: '3',
      name: 'Turmeric Powder',
      price: 180,
      unit: 'kg',
      supplier: 'Spice Masters',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4198014/pexels-photo-4198014.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'spices',
      inStock: true,
      description: 'Pure turmeric powder with vibrant color'
    },
    {
      id: '4',
      name: 'Cooking Oil',
      price: 145,
      unit: 'liter',
      supplier: 'Oil Depot',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/4198123/pexels-photo-4198123.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'oil',
      inStock: true,
      description: 'Refined sunflower cooking oil'
    },
    {
      id: '5',
      name: 'Basmati Rice',
      price: 85,
      unit: 'kg',
      supplier: 'Grain World',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4198145/pexels-photo-4198145.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'grains',
      inStock: true,
      description: 'Premium long grain basmati rice'
    },
    {
      id: '6',
      name: 'Green Chilies',
      price: 45,
      unit: 'kg',
      supplier: 'Fresh Farms Co.',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/4198456/pexels-photo-4198456.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'vegetables',
      inStock: false,
      description: 'Fresh green chilies with perfect heat'
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateCart = (productId: string, change: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      const currentQuantity = newCart[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = newQuantity;
      }
      
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
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
                <li className="text-sm font-medium text-gray-900">Products</li>
              </ol>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">Browse Products</h1>
          </div>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Cart
          {getCartItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getCartItemCount()}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-3">Supplier: {product.supplier}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-gray-500">/{product.unit}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {product.inStock && (
                      <div className="flex items-center justify-between">
                        {cart[product.id] ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateCart(product.id, -1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 bg-gray-100 rounded font-medium">
                              {cart[product.id]}
                            </span>
                            <button
                              onClick={() => updateCart(product.id, 1)}
                              className="p-1 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCart(product.id, 1)}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center justify-center"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {Object.keys(cart).length === 0 ? (
                <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    
                    return (
                      <div key={productId} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-sm text-gray-500">₹{product.price}/{product.unit}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCart(productId, -1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium">{quantity}</span>
                          <button
                            onClick={() => updateCart(productId, 1)}
                            className="p-1 rounded bg-green-600 text-white hover:bg-green-700"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {Object.keys(cart).length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold">₹{getCartTotal()}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;