import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CodeAnalysis } from './components/CodeAnalysis';
import { KnowledgeBase } from './components/KnowledgeBase';
import { LearningCenter } from './components/LearningCenter';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<CodeAnalysis />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/learning" element={<LearningCenter />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;