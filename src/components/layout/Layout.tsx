'use client';

import React, { ReactNode } from 'react';
import { useHealth } from '../../context/HealthContext';
import { format } from 'date-fns';
import { 
  Calendar, 
  User, 
  BarChart, 
  Home, 
  Settings, 
  ScrollText, 
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface LayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export default function Layout({ children, activeTab = 'dashboard' }: LayoutProps) {
  const { user } = useHealth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed z-20 bottom-4 right-4 p-2 rounded-full bg-primary text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg dark:bg-gray-800 dark:border-gray-700 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between flex-shrink-0 p-4">
          <a href="/" className="text-xl font-semibold text-primary">
            HealthTrack
          </a>
        </div>

        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="/" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'dashboard' 
                    ? 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200' 
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a 
                href="/#activities" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'activities' 
                    ? 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200' 
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <BarChart className="w-5 h-5 mr-3" />
                <span>Activities</span>
              </a>
            </li>
            <li>
              <a 
                href="/#nutrition" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'nutrition' 
                    ? 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200' 
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <ScrollText className="w-5 h-5 mr-3" />
                <span>Nutrition</span>
              </a>
            </li>
            <li>
              <a 
                href="/#calendar" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'calendar' 
                    ? 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200' 
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a 
                href="/#settings" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  activeTab === 'settings' 
                    ? 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200' 
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex-shrink-0 p-4 border-t dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
              {user.avatar ? (
                <img 
                  src={user.avatar.startsWith('/') ? user.avatar : `/${user.avatar}`} 
                  alt="User avatar" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/40';
                  }} 
                />
              ) : (
                <User className="absolute w-6 h-6 text-gray-400 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              )}
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold">
            {activeTab === 'dashboard' ? 'Dashboard' : 
             activeTab === 'activities' ? 'Activities' :
             activeTab === 'nutrition' ? 'Nutrition' :
             activeTab === 'calendar' ? 'Calendar' :
             activeTab === 'settings' ? 'Settings' : 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
 