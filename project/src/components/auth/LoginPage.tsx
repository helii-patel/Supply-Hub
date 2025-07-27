import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, Truck, Factory, Shield, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('vendor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: 'vendor', name: 'Street Food Vendor', icon: ShoppingCart, color: 'green', demo: 'vendor@demo.com' },
    { id: 'supplier', name: 'Supplier', icon: Factory, color: 'amber', demo: 'supplier@demo.com' },
    { id: 'transporter', name: 'Transporter', icon: Truck, color: 'blue', demo: 'transporter@demo.com' },
    { id: 'admin', name: 'Admin', icon: Shield, color: 'gray', demo: 'admin@demo.com' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password, selectedRole);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const fillDemoCredentials = (role: string, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword('demo123');
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Raw Material Supply
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect vendors, suppliers, and transporters
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedRole === role.id
                          ? `border-${role.color}-500 bg-${role.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mx-auto mb-1 ${
                        selectedRole === role.id 
                          ? `text-${role.color}-600` 
                          : 'text-gray-500'
                      }`} />
                      <span className={`text-xs font-medium ${
                        selectedRole === role.id 
                          ? `text-${role.color}-700` 
                          : 'text-gray-600'
                      }`}>
                        {role.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => fillDemoCredentials(role.id, role.demo)}
                    className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50 transition-colors"
                  >
                    {role.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                selectedRoleData?.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                selectedRoleData?.color === 'amber' ? 'bg-amber-600 hover:bg-amber-700' :
                selectedRoleData?.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                'bg-gray-600 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                `Sign in as ${selectedRoleData?.name}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;