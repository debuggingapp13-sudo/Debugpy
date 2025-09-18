import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CodeAnalysis } from './components/CodeAnalysis';
import { KnowledgeBase } from './components/KnowledgeBase';
import { LearningCenter } from './components/LearningCenter';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Prolog Debugger</h1>
              <div className="w-10" /> {/* Spacer for centering */}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<CodeAnalysis />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/learning" element={<LearningCenter />} />
          </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;