import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code, Database, BookOpen, Terminal } from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard', description: 'Overview & Stats' },
  { path: '/analysis', icon: Code, label: 'Code Analysis', description: 'Debug Python Code' },
  { path: '/knowledge-base', icon: Database, label: 'Knowledge Base', description: 'Rules & Facts' },
  { path: '/learning', icon: BookOpen, label: 'Learning Center', description: 'Prolog Concepts' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-gray-100 h-screen flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-600 rounded-lg">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Prolog Debugger</h1>
            <p className="text-sm text-gray-400">Python Code Analysis</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          Prolog Logic Programming
          <br />
          v1.0.0
        </div>
      </div>
    </div>
  );
};