'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg border-b border-sky-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-sky-900">SoapTracker</span>
          </div>
          
          <div className="flex space-x-1">
            <Link 
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === '/' 
                  ? 'bg-sky-100 text-sky-700' 
                  : 'text-gray-600 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              <Home size={20} />
              <span className="font-medium">Sales</span>
            </Link>
            
            <Link 
              href="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === '/dashboard' 
                  ? 'bg-sky-100 text-sky-700' 
                  : 'text-gray-600 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              <BarChart3 size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
