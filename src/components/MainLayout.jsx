import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header / Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
