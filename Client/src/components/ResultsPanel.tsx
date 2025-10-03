import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '../types/prolog';

interface ResultsPanelProps {
  results: AnalysisResult[];
  isAnalyzing: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, isAnalyzing }) => {
  const getIcon = (type: string, priority: string) => {
    if (type === 'error') {
      return priority === 'high' ? AlertCircle : AlertTriangle;
    }
    return Info;
  };

  const getPriorityColor = (type: string, priority: string) => {
    if (type === 'error') {
      switch (priority) {
        case 'high': return 'text-red-600 bg-red-50 border-red-200';
        case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
        default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      }
    } else {
      switch (priority) {
        case 'high': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'medium': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      syntax: 'Syntax Error',
      indentation: 'Indentation Error',
      logic: 'Logic Error',
      style: 'Style Warning',
      performance: 'Performance Issue'
    };
    return labels[category] || category;
  };

  return (
    <div className="flex flex-col bg-white mt-[8rem]">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 lg:p-4">
        <h2 className="text-base font-semibold text-gray-900 lg:text-lg">Analysis Results</h2>
        <p className="text-xs text-gray-600 lg:text-sm">
          Issues found by Prolog rule evaluation
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isAnalyzing ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
              <p className="text-gray-600">Running Prolog inference...</p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">No Issues Found</h3>
              <p className="text-gray-600">Your code looks good!</p>
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-2 lg:p-4 lg:space-y-3">
            {results.map((result, index) => {
              const Icon = getIcon(result.type, result.priority);
              const colorClasses = getPriorityColor(result.type, result.priority);
              
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-3 lg:p-4 ${colorClasses}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col justify-between mb-1 space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                        <h4 className="text-xs font-medium lg:text-sm">
                          {getCategoryLabel(result.category)}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="px-1 font-mono bg-gray-200 rounded">
                            Line {result.line}
                          </span>
                          <span className="font-semibold uppercase">
                            {result.priority}
                          </span>
                        </div>
                      </div>
                      <p className="mb-2 text-xs lg:text-sm">{result.message}</p>
                      {result.suggestion && (
                        <p className="text-xs opacity-75">
                          💡 {result.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};