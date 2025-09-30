import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Database, Code, Filter } from 'lucide-react';
import { PrologEngine } from '../engine/PrologEngine';
import { PrologRule, PrologFact } from '../types/prolog';

export const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facts' | 'rules' | 'patterns'>('facts');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['syntax']));
  const engine = new PrologEngine();

  const facts = engine.getFacts();
  const rules = engine.getRules();

  const filteredFacts = searchQuery 
    ? engine.searchFacts(searchQuery)
    : facts;

  const filteredRules = searchQuery 
    ? engine.searchRules(searchQuery)
    : rules;

  const groupedFacts = filteredFacts.reduce((groups, fact) => {
    if (!groups[fact.category]) {
      groups[fact.category] = [];
    }
    groups[fact.category].push(fact);
    return groups;
  }, {} as Record<string, PrologFact[]>);

  const groupedRules = filteredRules.reduce((groups, rule) => {
    if (!groups[rule.category]) {
      groups[rule.category] = [];
    }
    groups[rule.category].push(rule);
    return groups;
  }, {} as Record<string, PrologRule[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      syntax: 'bg-red-100 text-red-800',
      indentation: 'bg-orange-100 text-orange-800',
      logic: 'bg-yellow-100 text-yellow-800',
      style: 'bg-blue-100 text-blue-800',
      performance: 'bg-green-100 text-green-800',
      syntax_error: 'bg-red-100 text-red-800',
      indentation_error: 'bg-orange-100 text-orange-800',
      logic_error: 'bg-yellow-100 text-yellow-800',
      style_warning: 'bg-blue-100 text-blue-800',
      performance_issue: 'bg-green-100 text-green-800',
      priority: 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'facts', label: 'Facts', icon: Database, count: facts.length },
    { id: 'rules', label: 'Horn Clauses', icon: Code, count: rules.length },
    { id: 'patterns', label: 'Pattern Library', icon: Filter, count: rules.filter(r => r.pattern).length },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Prolog Knowledge Base</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Facts, rules, and patterns for Python code analysis
            </p>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 lg:mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 lg:space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 pb-3 lg:pb-4 px-1 border-b-2 font-medium text-xs lg:text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {activeTab === 'facts' && (
          <div className="space-y-4 lg:space-y-6">
            {Object.entries(groupedFacts).map(([category, categoryFacts]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-3 lg:p-4 text-left hover:bg-gray-50 rounded-t-xl"
                >
                  <div className="flex items-center space-x-3">
                    {expandedCategories.has(category) ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 capitalize">
                      {category.replace('_', ' ')} Facts
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(category)}`}>
                      {categoryFacts.length}
                    </span>
                  </div>
                </button>
                
                {expandedCategories.has(category) && (
                  <div className="border-t border-gray-200 p-3 lg:p-4">
                    <div className="space-y-3">
                      {categoryFacts.map((fact) => (
                        <div key={fact.id} className="bg-gray-50 rounded-lg p-3 lg:p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-mono text-xs lg:text-sm text-green-600 break-all">
                              {fact.predicate}({fact.args.map(arg => `"${arg}"`).join(', ')}).
                            </div>
                            <span className="text-xs text-gray-500">#{fact.id}</span>
                          </div>
                          <p className="text-xs lg:text-sm text-gray-700">{fact.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4 lg:space-y-6">
            {Object.entries(groupedRules).map(([category, categoryRules]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-3 lg:p-4 text-left hover:bg-gray-50 rounded-t-xl"
                >
                  <div className="flex items-center space-x-3">
                    {expandedCategories.has(category) ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 capitalize">
                      {category} Rules
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(category)}`}>
                      {categoryRules.length}
                    </span>
                  </div>
                </button>
                
                {expandedCategories.has(category) && (
                  <div className="border-t border-gray-200 p-3 lg:p-4">
                    <div className="space-y-4">
                      {categoryRules.map((rule) => (
                        <div key={rule.id} className="bg-gray-50 rounded-lg p-3 lg:p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(rule.priority)}`}>
                                {rule.priority}
                              </span>
                              <span className="text-xs text-gray-500">#{rule.id}</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="font-mono text-xs lg:text-sm text-blue-600 mb-1 break-all">
                              {rule.head} :-
                            </div>
                            <div className="font-mono text-xs lg:text-sm text-green-600 ml-2 lg:ml-4 break-all">
                              {rule.body.join(',\n    ')}.
                            </div>
                          </div>
                          
                          <p className="text-xs lg:text-sm text-gray-700 mb-2">{rule.description}</p>
                          
                          {rule.pattern && (
                            <div className="mt-3 p-3 bg-white rounded border">
                              <div className="text-xs font-medium text-gray-500 mb-1">Pattern:</div>
                              <div className="font-mono text-xs text-purple-600 break-all">
                                {rule.pattern.toString()}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Pattern Library</h3>
            <div className="space-y-4">
              {rules.filter(rule => rule.pattern).map((rule) => (
                <div key={rule.id} className="border border-gray-200 rounded-lg p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm lg:text-base font-medium text-gray-900 break-all">{rule.head.split('(')[0]}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(rule.category)}`}>
                      {rule.category}
                    </span>
                  </div>
                  
                  <p className="text-xs lg:text-sm text-gray-600 mb-3">{rule.description}</p>
                  
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Regular Expression:</div>
                    <div className="font-mono text-xs lg:text-sm text-purple-600 break-all">
                      {rule.pattern?.toString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};