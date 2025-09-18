import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code, Database, BookOpen, Terminal, X } from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard', description: 'Overview & Stats' },
  { path: '/analysis', icon: Code, label: 'Code Analysis', description: 'Debug Python Code' },
  { path: '/knowledge-base', icon: Database, label: 'Knowledge Base', description: 'Rules & Facts' },
  { path: '/learning', icon: BookOpen, label: 'Learning Center', description: 'Prolog Concepts' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-gray-100 
        flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

      {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-600 rounded-lg">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white">Prolog Debugger</h1>
            <p className="text-xs lg:text-sm text-gray-400">Python Code Analysis</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <div className="flex-1">
                <div className="font-medium text-sm lg:text-base">{item.label}</div>
                <div className="text-xs opacity-75 hidden lg:block">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
        <div className="p-3 lg:p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          Prolog Logic Programming
          <br />
          v1.0.0
        </div>
      </div>
      </div>
    </>
    </div>
  );
};