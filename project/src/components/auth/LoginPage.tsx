import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Truck, Store, Package, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('vendor');
  const { login } = useAuth();

  const roles = [
    { id: 'vendor', name: 'Street Food Vendor', icon: Store, color: 'bg-green-500' },
    { id: 'supplier', name: 'Supplier', icon: Package, color: 'bg-blue-500' },
    { id: 'transporter', name: 'Transporter', icon: Truck, color: 'bg-purple-500' },
    { id: 'admin', name: 'Admin', icon: Shield, color: 'bg-red-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Raw Material <span className="text-green-600">Supply Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting street food vendors with suppliers through seamless logistics
          </p>
          <div className="grid grid-cols-2 gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.id} className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                  <div className={`p-2 rounded-lg ${role.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{role.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Role</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedRole === role.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === role.id ? 'text-green-600' : 'text-gray-500'
                    }`} />
                    <div className="text-xs font-medium text-gray-700">{role.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: any email/password combination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}