import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import VendorDashboard from './components/vendor/VendorDashboard';
import SupplierDashboard from './components/supplier/SupplierDashboard';
import TransporterDashboard from './components/transporter/TransporterDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'vendor':
        return <VendorDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      case 'transporter':
        return <TransporterDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;