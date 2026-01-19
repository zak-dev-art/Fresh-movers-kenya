import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '🏠' },
    { path: '/create-request', name: 'Order Truck', icon: '🚛' },
    { path: '/view-requests', name: 'View Requests', icon: '📋' },
    { path: '/manage-trucks', name: 'Manage Trucks', icon: '🔧' },
    { path: '/subscription-plan', name: 'Subscription', icon: '💎' },
    { path: '/notifications', name: 'Notifications', icon: '🔔' },
    { path: '/packaging', name: 'Packaging', icon: '📦' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Fresh Movers</h1>
        <p className="text-gray-400 text-sm">Kenya Logistics</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;