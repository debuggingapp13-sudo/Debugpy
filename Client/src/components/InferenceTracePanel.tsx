import React from 'react';
import { Play, CheckCircle, XCircle, Target, Clock } from 'lucide-react';
import { InferenceTrace } from '../types/prolog';

interface InferenceTracePanelProps {
  trace: InferenceTrace[];
  isAnalyzing: boolean;
}

export const InferenceTracePanel: React.FC<InferenceTracePanelProps> = ({ 
  trace, 
  isAnalyzing 
}) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'evaluating': return Play;
      case 'pattern_matched': return Target;
      case 'fired': return CheckCircle;
      case 'no_match': return XCircle;
      default: return Play;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'evaluating': return 'text-blue-600';
      case 'pattern_matched': return 'text-green-600';
      case 'fired': return 'text-green-700';
      case 'no_match': return 'text-gray-500';
      default: return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 lg:p-4">
        <h2 className="text-base font-semibold text-gray-900 lg:text-lg">Inference Trace</h2>
        <p className="text-xs text-gray-600 lg:text-sm">
          Step-by-step rule evaluation process
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isAnalyzing ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
              <p className="text-gray-600">Tracing inference...</p>
            </div>
          </div>
        ) : trace.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">No Trace Data</h3>
              <p className="text-gray-600">Run analysis to see inference trace</p>
            </div>
          </div>
        ) : (
          <div className="p-3 lg:p-4">
            <div className="space-y-2">
              {trace.map((step, index) => {
                const Icon = getActionIcon(step.action);
                const colorClass = getActionColor(step.action);
                
                return (
                  <div
                    key={index}
                    className="flex items-center p-2 space-x-2 rounded-lg lg:space-x-3 hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-5 h-5 font-mono text-xs text-gray-600 bg-gray-100 rounded-full lg:w-6 lg:h-6">
                        {step.step}
                      </div>
                    </div>
                    <Icon className={`h-4 w-4 flex-shrink-0 ${colorClass}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col justify-between space-y-1 sm:flex-row sm:items-center sm:space-y-0">
                        <p className="text-xs font-medium text-gray-900 truncate lg:text-sm">
                          {step.rule}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          step.action === 'fired' ? 'bg-green-100 text-green-800' :
                          step.action === 'pattern_matched' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {step.action.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600 break-words">{step.result}</p>
                      {step.unification && (
                        <p className="mt-1 text-xs text-purple-600">
                          Unification: {step.unification}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};