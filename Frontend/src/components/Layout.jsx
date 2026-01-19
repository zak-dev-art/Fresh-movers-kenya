import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;