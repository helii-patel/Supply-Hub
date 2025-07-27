import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, User, LogOut, Menu, X, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vendor': return 'green';
      case 'supplier': return 'amber';
      case 'transporter': return 'blue';
      case 'admin': return 'gray';
      default: return 'gray';
    }
  };

  const roleColor = getRoleColor(user?.role || '');

  const notifications = [
    { id: 1, message: 'New order received', time: '5 min ago' },
    { id: 2, message: 'Delivery completed', time: '1 hour ago' },
    { id: 3, message: 'Stock low on tomatoes', time: '2 hours ago' },
  ];

  return (
    <header className={`bg-white shadow-sm border-b-2 border-${roleColor}-500 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className={`h-8 w-8 bg-${roleColor}-100 rounded-lg flex items-center justify-center`}>
              <ShoppingCart className={`h-5 w-5 text-${roleColor}-600`} />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">
                Raw Material Supply
              </h1>
              <p className={`text-xs text-${roleColor}-600 capitalize`}>
                {user?.role} Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className={`text-xs text-${roleColor}-600 capitalize`}>{user?.role}</p>
              </div>
              <div className={`h-8 w-8 bg-${roleColor}-100 rounded-full flex items-center justify-center`}>
                <User className={`h-4 w-4 text-${roleColor}-600`} />
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-3">
              <div className="flex items-center space-x-3 px-2">
                <div className={`h-10 w-10 bg-${roleColor}-100 rounded-full flex items-center justify-center`}>
                  <User className={`h-5 w-5 text-${roleColor}-600`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className={`text-xs text-${roleColor}-600 capitalize`}>{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;