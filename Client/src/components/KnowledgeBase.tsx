// import React, { useState } from 'react';
// import { Search, ChevronDown, ChevronRight, Database, Code, Filter } from 'lucide-react';
// import { PrologEngine } from '../engine/PrologEngine';
// import { PrologRule, PrologFact } from '../types/prolog';
// import axios from 'axios'

// export const KnowledgeBase: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'facts' | 'rules' | 'patterns'>('facts');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['syntax']));
//   const engine = new PrologEngine();


//   await fetch("http://127.0.0.1:8000/api/sessions", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       code,
//       results: data.results,
//       rules_applied: data.rules_applied,
//       execution_time: parseFloat(data.execution_time),
//       timestamp: Date.now(),
//     }),
//   });


//   const facts = engine.getFacts();
//   const rules = engine.getRules();

//   const filteredFacts = searchQuery
//     ? engine.searchFacts(searchQuery)
//     : facts;

//   const filteredRules = searchQuery
//     ? engine.searchRules(searchQuery)
//     : rules;

//   const groupedFacts = filteredFacts.reduce((groups, fact) => {
//     if (!groups[fact.category]) {
//       groups[fact.category] = [];
//     }
//     groups[fact.category].push(fact);
//     return groups;
//   }, {} as Record<string, PrologFact[]>);

//   const groupedRules = filteredRules.reduce((groups, rule) => {
//     if (!groups[rule.category]) {
//       groups[rule.category] = [];
//     }
//     groups[rule.category].push(rule);
//     return groups;
//   }, {} as Record<string, PrologRule[]>);

//   const toggleCategory = (category: string) => {
//     const newExpanded = new Set(expandedCategories);
//     if (newExpanded.has(category)) {
//       newExpanded.delete(category);
//     } else {
//       newExpanded.add(category);
//     }
//     setExpandedCategories(newExpanded);
//   };

import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, ChevronRight, Database, Code, Filter } from 'lucide-react';
import { PrologRule, PrologFact } from '../types/prolog';

export const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facts' | 'rules' | 'patterns'>('facts');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['syntax']));
  const [facts, setFacts] = useState<PrologFact[]>([]);
  const [rules, setRules] = useState<PrologRule[]>([]);

  // Fetch facts and rules from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const factsRes = await fetch("http://127.0.0.1:8000/api/facts");
        const rulesRes = await fetch("http://127.0.0.1:8000/api/rules");
        const factsData = await factsRes.json();
        const rulesData = await rulesRes.json();

        setFacts(factsData);
        setRules(rulesData);
      } catch (err) {
        console.error("Failed to load knowledge base:", err);
      }
    };

    fetchData();
  }, []);

  const filteredFacts = searchQuery
    ? facts.filter(f => f.predicate.includes(searchQuery) || f.description.includes(searchQuery))
    : facts;

  const filteredRules = searchQuery
    ? rules.filter(r => r.description.includes(searchQuery) || r.head.includes(searchQuery))
    : rules;

  const groupedFacts = filteredFacts.reduce((groups, fact) => {
    if (!groups[fact.category]) groups[fact.category] = [];
    groups[fact.category].push(fact);
    return groups;
  }, {} as Record<string, PrologFact[]>);

  const groupedRules = filteredRules.reduce((groups, rule) => {
    if (!groups[rule.category]) groups[rule.category] = [];
    groups[rule.category].push(rule);
    return groups;
  }, {} as Record<string, PrologRule[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    newExpanded.has(category) ? newExpanded.delete(category) : newExpanded.add(category);
    setExpandedCategories(newExpanded);
  };

  // (UI part remains exactly the same below...)


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
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 lg:p-6">
        <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:items-center lg:space-y-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">Prolog Knowledge Base</h1>
            <p className="mt-1 text-sm text-gray-600 lg:text-base">
              Facts, rules, and patterns for Python code analysis
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg lg:w-80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200 lg:mt-6">
          <nav className="flex -mb-px space-x-4 overflow-x-auto lg:space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 pb-3 lg:pb-4 px-1 border-b-2 font-medium text-xs lg:text-sm whitespace-nowrap ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs ${activeTab === tab.id
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
      <div className="flex-1 p-4 overflow-y-auto lg:p-6">
        {activeTab === 'facts' && (
          <div className="space-y-4 lg:space-y-6">
            {Object.entries(groupedFacts).map(([category, categoryFacts]) => (
              <div key={category} className="bg-white border border-gray-200 shadow-sm rounded-xl">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full p-3 text-left lg:p-4 hover:bg-gray-50 rounded-t-xl"
                >
                  <div className="flex items-center space-x-3">
                    {expandedCategories.has(category) ?
                      <ChevronDown className="w-4 h-4 text-gray-500" /> :
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    }
                    <h3 className="text-base font-semibold text-gray-900 capitalize lg:text-lg">
                      {category.replace('_', ' ')} Facts
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(category)}`}>
                      {categoryFacts.length}
                    </span>
                  </div>
                </button>

                {expandedCategories.has(category) && (
                  <div className="p-3 border-t border-gray-200 lg:p-4">
                    <div className="space-y-3">
                      {categoryFacts.map((fact) => (
                        <div key={fact.id} className="p-3 rounded-lg bg-gray-50 lg:p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-mono text-xs text-green-600 break-all lg:text-sm">
                              {fact.predicate}({fact.args.map(arg => `"${arg}"`).join(', ')}).
                            </div>
                            <span className="text-xs text-gray-500">#{fact.id}</span>
                          </div>
                          <p className="text-xs text-gray-700 lg:text-sm">{fact.description}</p>
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
              <div key={category} className="bg-white border border-gray-200 shadow-sm rounded-xl">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full p-3 text-left lg:p-4 hover:bg-gray-50 rounded-t-xl"
                >
                  <div className="flex items-center space-x-3">
                    {expandedCategories.has(category) ?
                      <ChevronDown className="w-4 h-4 text-gray-500" /> :
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    }
                    <h3 className="text-base font-semibold text-gray-900 capitalize lg:text-lg">
                      {category} Rules
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(category)}`}>
                      {categoryRules.length}
                    </span>
                  </div>
                </button>

                {expandedCategories.has(category) && (
                  <div className="p-3 border-t border-gray-200 lg:p-4">
                    <div className="space-y-4">
                      {categoryRules.map((rule) => (
                        <div key={rule.id} className="p-3 rounded-lg bg-gray-50 lg:p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(rule.priority)}`}>
                                {rule.priority}
                              </span>
                              <span className="text-xs text-gray-500">#{rule.id}</span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="mb-1 font-mono text-xs text-blue-600 break-all lg:text-sm">
                              {rule.head} :-
                            </div>
                            <div className="ml-2 font-mono text-xs text-green-600 break-all lg:text-sm lg:ml-4">
                              {rule.body.join(',\n    ')}.
                            </div>
                          </div>

                          <p className="mb-2 text-xs text-gray-700 lg:text-sm">{rule.description}</p>

                          {rule.pattern && (
                            <div className="p-3 mt-3 bg-white border rounded">
                              <div className="mb-1 text-xs font-medium text-gray-500">Pattern:</div>
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
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl lg:p-6">
            <h3 className="mb-4 text-base font-semibold text-gray-900 lg:text-lg">Pattern Library</h3>
            <div className="space-y-4">
              {rules.filter(rule => rule.pattern).map((rule) => (
                <div key={rule.id} className="p-3 border border-gray-200 rounded-lg lg:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 break-all lg:text-base">{rule.head.split('(')[0]}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(rule.category)}`}>
                      {rule.category}
                    </span>
                  </div>

                  <p className="mb-3 text-xs text-gray-600 lg:text-sm">{rule.description}</p>

                  <div className="p-3 rounded bg-gray-50">
                    <div className="mb-1 text-xs font-medium text-gray-500">Regular Expression:</div>
                    <div className="font-mono text-xs text-purple-600 break-all lg:text-sm">
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