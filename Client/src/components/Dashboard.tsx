import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAnonUserId } from '../hooks/userId';
import { Code, Database, BookOpen, Activity, FileCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { AnalysisSession } from '../types/prolog';

export const Dashboard: React.FC = () => {
  const anonUserId = useAnonUserId();
  const [recentSessions, setRecentSessions] = useState<AnalysisSession[]>([]);
  const [stats, setStats] = useState({
    total_rules: 0,
    total_facts: 0,
    error_categories: 0,
    total_sessions: 0
  });

  useEffect(() => {
    if (!anonUserId) return;
    const ac = new AbortController();
    fetch(`https://debugpy.onrender.com/api/sessions?anon_user_id=${encodeURIComponent(anonUserId)}`, {
      signal: ac.signal,
      cache: "no-store",
    })
      .then(r => r.json())
      .then(setRecentSessions)
      .catch(() => {});
    return () => ac.abort();
  }, [anonUserId]);

  useEffect(() => {
    if (!anonUserId) return;
    const ac = new AbortController();
    fetch(`https://debugpy.onrender.com/api/stats?anon_user_id=${encodeURIComponent(anonUserId)}`, {
      signal: ac.signal,
      cache: "no-store",
    })
      .then(r => r.json()) 
      .then(setStats)
      .catch(() => {});
    return () => ac.abort();
  }, [anonUserId]);



  const statCards = [
    {
      title: 'Total Prolog Rules',
      value: stats.total_rules,
      icon: Database,
      color: 'bg-blue-500',
      description: 'Horn clauses for code analysis'
    },
    {
      title: 'Facts in Knowledge Base',
      value: stats.total_facts,
      icon: FileCheck,
      color: 'bg-green-500',
      description: 'Pattern definitions & mappings'
    },
    {
      title: 'Python Error Categories',
      value: stats.error_categories,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'Types of issues detected'
    },
    {
      title: 'Recent Analysis Sessions',
      value: stats.total_sessions,
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
    <div className="p-4 lg:p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
          Prolog Python Code Debugger
        </h1>
        <p className="text-sm text-gray-600 lg:text-base">
          Logic programming approach to Python code analysis and debugging
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl lg:p-6">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white lg:h-6 lg:w-6" />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 lg:text-2xl">{stat.value}</div>
                  <div className="text-sm text-gray-500">items</div>
                </div>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 lg:text-base">{stat.title}</h3>
                <p className="text-xs text-gray-600 lg:text-sm">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-6 lg:mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 lg:text-xl">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className={`${action.color} text-white rounded-xl p-4 lg:p-6 shadow-sm transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <Icon className="w-6 h-6 lg:h-8 lg:w-8" />
                  <ArrowRight className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-base font-semibold lg:text-lg">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 lg:text-xl">Recent Activity</h2>
        {recentSessions.length > 0 ? (
          <div className="space-y-3 lg:space-y-4">
            {recentSessions.map((session, index) => (
              <div key={session.id} className="flex flex-col justify-between p-3 space-y-2 rounded-lg sm:flex-row sm:items-center lg:p-4 bg-gray-50 sm:space-y-0">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 lg:text-base">Analysis Session #{index + 1}</div>
                    <div className="text-sm text-gray-600">
                      {session.results.length} issues found • {session.rulesApplied} rules applied
                    </div>
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <div className="text-sm text-gray-600">{formatTimestamp(session.timestamp)}</div>
                  <div className="text-sm text-gray-500">
                    {session.executionTime ? session.executionTime.toFixed(2) : '0.00'}ms
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No recent debugging sessions</p>
            <p className="mt-1 text-sm text-gray-500">Start analyzing code to see activity here</p>
          </div>
        )}
      </div>
    </div>
  );
};
