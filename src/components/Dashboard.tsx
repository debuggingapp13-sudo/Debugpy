import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Database, BookOpen, Activity, FileCheck, AlertTriangle, Info, Zap, ArrowRight } from 'lucide-react';
import { PrologEngine } from '../engine/PrologEngine';
import { AnalysisSession } from '../types/prolog';

export const Dashboard: React.FC = () => {
  const [engine] = useState(() => new PrologEngine());
  const [recentSessions, setRecentSessions] = useState<AnalysisSession[]>([]);

  useEffect(() => {
    // Load recent sessions from localStorage
    const stored = localStorage.getItem('recentSessions');
    if (stored) {
      setRecentSessions(JSON.parse(stored).slice(0, 5));
    }
  }, []);

  const stats = [
    {
      title: 'Total Prolog Rules',
      value: engine.getRules().length,
      icon: Database,
      color: 'bg-blue-500',
      description: 'Horn clauses for code analysis'
    },
    {
      title: 'Facts in Knowledge Base',
      value: engine.getFacts().length,
      icon: FileCheck,
      color: 'bg-green-500',
      description: 'Pattern definitions & mappings'
    },
    {
      title: 'Python Error Patterns',
      value: new Set(engine.getRules().map(r => r.category)).size,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'Categories of issues detected'
    },
    {
      title: 'Recent Analysis Sessions',
      value: recentSessions.length,
      icon: Activity,
      color: 'bg-purple-500',
      description: 'Debugging sessions completed'
    }
  ];

  const quickActions = [
    {
      title: 'Analyze Code',
      description: 'Debug Python code with Prolog inference',
      icon: Code,
      path: '/analysis',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'View Knowledge Base',
      description: 'Browse rules, facts, and patterns',
      icon: Database,
      path: '/knowledge-base',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Learning Center',
      description: 'Learn Prolog concepts & debugging',
      icon: BookOpen,
      path: '/learning',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Prolog Python Code Debugger
        </h1>
        <p className="text-gray-600">
          Logic programming approach to Python code analysis and debugging
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">items</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className={`${action.color} text-white rounded-xl p-6 shadow-sm transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8" />
                  <ArrowRight className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {recentSessions.length > 0 ? (
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Analysis Session #{index + 1}</div>
                    <div className="text-sm text-gray-600">
                      {session.results.length} issues found • {session.rulesApplied} rules applied
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{formatTimestamp(session.timestamp)}</div>
                  <div className="text-sm text-gray-500">{session.executionTime.toFixed(2)}ms</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent debugging sessions</p>
            <p className="text-sm text-gray-500 mt-1">Start analyzing code to see activity here</p>
          </div>
        )}
      </div>
    </div>
  );
};