import React from 'react';
import { ShoppingCart, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              <span className="ml-2 text-lg font-semibold">Raw Material Supply</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connecting street food vendors with suppliers and transporters for seamless raw material procurement and delivery.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +91 98765 43210
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                support@rawmaterialsupply.com
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Mumbai, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-sm font-semibold mb-4">For Users</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Vendor Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supplier Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transporter App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admin Panel</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Raw Material Supply Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;