import React, { useState, useRef } from 'react';
import { Play, Download, Upload, RotateCcw, Clock, Target, AlertTriangle } from 'lucide-react';
import { PrologEngine } from '../engine/PrologEngine';
import { AnalysisResult, InferenceTrace, AnalysisSession } from '../types/prolog';
import { sampleCode } from '../data/sampleCode';
import { MonacoEditor } from './MonacoEditor';
import { ResultsPanel } from './ResultsPanel';
import { InferenceTracePanel } from './InferenceTracePanel';

export const CodeAnalysis: React.FC = () => {
  const [code, setCode] = useState('# Enter your Python code here...\n');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [trace, setTrace] = useState<InferenceTrace[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [rulesApplied, setRulesApplied] = useState(0);
  const [showMobileResults, setShowMobileResults] = useState(false);
  const engine = useRef(new PrologEngine());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeCode = async () => {
    if (!code.trim() || code.trim() === '# Enter your Python code here...') {
      alert('Please enter some Python code to analyze');
      return;
    }

    setIsAnalyzing(true);
    setResults([]);
    setTrace([]);

    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const analysis = engine.current.analyzeCode(code);
    
    setResults(analysis.results);
    setTrace(analysis.trace);
    setExecutionTime(analysis.executionTime);
    setRulesApplied(analysis.rulesApplied);
    setIsAnalyzing(false);
    setShowMobileResults(true);

    // Save to recent sessions
    const session: AnalysisSession = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      code,
      results: analysis.results,
      rulesApplied: analysis.rulesApplied,
      executionTime: analysis.executionTime
    };

    const recentSessions = JSON.parse(localStorage.getItem('recentSessions') || '[]');
    recentSessions.unshift(session);
    localStorage.setItem('recentSessions', JSON.stringify(recentSessions.slice(0, 10)));
  };

  const loadSample = (type: 'beginner' | 'intermediate' | 'advanced') => {
    setCode(sampleCode[type]);
    setResults([]);
    setTrace([]);
  };

  const clearCode = () => {
    setCode('# Enter your Python code here...\n');
    setResults([]);
    setTrace([]);
    setExecutionTime(0);
    setRulesApplied(0);
    setShowMobileResults(false);
  };

  const downloadResults = () => {
    const report = {
      timestamp: new Date().toISOString(),
      code,
      results,
      executionTime,
      rulesApplied,
      summary: {
        totalIssues: results.length,
        highPriority: results.filter(r => r.priority === 'high').length,
        mediumPriority: results.filter(r => r.priority === 'medium').length,
        lowPriority: results.filter(r => r.priority === 'low').length,
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prolog-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
        setResults([]);
        setTrace([]);
      };
      reader.readAsText(file);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 lg:p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Code Analysis</h1>
            <p className="text-sm lg:text-base text-gray-600">Prolog-based Python code debugging</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {/* Sample Code Buttons */}
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => loadSample('beginner')}
                className="flex-1 sm:flex-none px-2 lg:px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs lg:text-sm"
              >
                Beginner
              </button>
              <button
                onClick={() => loadSample('intermediate')}
                className="flex-1 sm:flex-none px-2 lg:px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-xs lg:text-sm"
              >
                Intermediate
              </button>
              <button
                onClick={() => loadSample('advanced')}
                className="flex-1 sm:flex-none px-2 lg:px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs lg:text-sm"
              >
                Advanced
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Upload Python file"
              >
                <Upload className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
              </button>
              
              <button
                onClick={downloadResults}
                disabled={results.length === 0}
                className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors"
                title="Download results"
              >
                <Download className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
              </button>
              
              <button
                onClick={clearCode}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Clear code"
              >
                <RotateCcw className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
              </button>

              <button
                onClick={analyzeCode}
                disabled={isAnalyzing}
                className="flex items-center justify-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors min-w-0"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs lg:text-sm hidden sm:inline">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="text-xs lg:text-sm hidden sm:inline">Apply Rules</span>
                    <span className="text-xs lg:text-sm sm:hidden">Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {(results.length > 0 || rulesApplied > 0) && (
          <div className="mt-3 lg:mt-4 flex flex-wrap items-center gap-3 lg:gap-6 text-xs lg:text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                Execution: {executionTime.toFixed(2)}ms
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                Rules Applied: {rulesApplied}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                Issues Found: {results.length}
              </span>
            </div>
            {results.length > 0 && (
              <div className="flex items-center space-x-1 lg:space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor('high')}`}>
                  High: {results.filter(r => r.priority === 'high').length}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor('medium')}`}>
                  Med: {results.filter(r => r.priority === 'medium').length}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor('low')}`}>
                  Low: {results.filter(r => r.priority === 'low').length}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Code Editor */}
        <div className={`${showMobileResults ? 'hidden' : 'flex'} lg:flex lg:w-3/5 flex-col`}>
          <div className="flex-1 lg:border-r border-gray-200">
            <MonacoEditor
              value={code}
              onChange={setCode}
              language="python"
              theme="vs-dark"
            />
          </div>
          
          {/* Mobile Results Toggle */}
          {results.length > 0 && (
            <div className="lg:hidden p-3 bg-white border-t border-gray-200">
              <button
                onClick={() => setShowMobileResults(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>View Results ({results.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Results and Trace */}
        <div className={`${showMobileResults ? 'flex' : 'hidden'} lg:flex lg:w-2/5 flex-col`}>
          {/* Mobile Back Button */}
          <div className="lg:hidden p-3 bg-white border-b border-gray-200">
            <button
              onClick={() => setShowMobileResults(false)}
              className="flex items-center space-x-2 text-blue-600"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Back to Code</span>
            </button>
          </div>
          
          <div className="h-1/2 border-b border-gray-200">
            <ResultsPanel results={results} isAnalyzing={isAnalyzing} />
          </div>
          <div className="h-1/2">
            <InferenceTracePanel trace={trace} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".py,.txt"
        onChange={uploadFile}
        className="hidden"
      />
    </div>
  );
};