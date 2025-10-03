import React, { useState, useRef } from 'react';
import { Play, Download, Upload, RotateCcw, Clock, Target, AlertTriangle } from 'lucide-react';
import { AnalysisResult, InferenceTrace, AnalysisSession } from '../types/prolog';
import { sampleCode } from '../data/sampleCode';
import { MonacoEditor } from './MonacoEditor';
import { ResultsPanel } from './ResultsPanel';
import { InferenceTracePanel } from './InferenceTracePanel';
import { useAnonUserId } from "../hooks/userId";

export const CodeAnalysis: React.FC = () => {  
  const anonUserId = useAnonUserId();
  const [code, setCode] = useState('# Enter your Python code here...\n');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [trace, setTrace] = useState<InferenceTrace[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [rulesApplied, setRulesApplied] = useState(0);
  const [showMobileResults, setShowMobileResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeCode = async () => {
    if (!code.trim() || code.trim() === '# Enter your Python code here...') {
      alert('Please enter some Python code to analyze');
      return;
    }

    setIsAnalyzing(true);
    setResults([]);
    setTrace([]);

    try {
      //  Call backend analyzer
      const response = await fetch("https://debugpy.onrender.com/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, anonUserId }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      setResults(data.results || []);
      setTrace(data.trace || []);
      setExecutionTime(parseFloat(data.execution_time) || 0);
      setRulesApplied(data.rules_applied || 0);
      setShowMobileResults(true);

      // Save session to MongoDB
      try {
        const saveSessionRes = await fetch("https://debugpy.onrender.com/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            results: data.results || [],
            rules_applied: data.rules_applied || 0,
            execution_time: parseFloat(data.execution_time) || 0,
            timestamp: Date.now(),
            anon_user_id: anonUserId, 
            user_type: "anonymous",
          }),
        });

        if (saveSessionRes.ok) {
          console.log("Analysis session saved to database");
        } else {
          console.warn(" Failed to save session to DB");
        }
      } catch (saveErr) {
        console.error("🔥 Error saving session:", saveErr);
      }

      // Also save locally for offline view
      const session: AnalysisSession = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        code,
        results: data.results || [],
        rulesApplied: data.rules_applied || 0,
        executionTime: parseFloat(data.execution_time) || 0,
      };
      const recentSessions = JSON.parse(localStorage.getItem("recentSessions") || "[]");
      recentSessions.unshift(session);
      localStorage.setItem("recentSessions", JSON.stringify(recentSessions.slice(0, 10)));

    } catch (error) {
      console.error("Error analyzing code:", error);
      alert("Failed to analyze code. Make sure the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
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
    <div className="relative flex flex-col bg-gray-50">
      {/* Header */}
      <div className="top-0 z-20 lg:h-32 p-3 bg-white border-b border-gray-200 lg:fixed lg:w-[78%] lg:p-4">
        <div className="flex flex-col justify-between space-y-3 position lg:flex-row lg:items-center lg:space-y-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">Code Analysis</h1>
            <p className="text-sm text-gray-600 lg:text-base">Prolog-based Python code debugging</p>
          </div>
          
          <div className="flex flex-col items-stretch space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
            {/* Sample Code Buttons */}
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => loadSample('beginner')}
                className="flex-1 px-2 py-2 text-xs text-green-700 transition-colors bg-green-100 rounded-lg sm:flex-none lg:px-3 hover:bg-green-200 lg:text-sm"
              >
                Beginner
              </button>
              <button
                onClick={() => loadSample('intermediate')}
                className="flex-1 px-2 py-2 text-xs text-yellow-700 transition-colors bg-yellow-100 rounded-lg sm:flex-none lg:px-3 hover:bg-yellow-200 lg:text-sm"
              >
                Intermediate
              </button>
              <button
                onClick={() => loadSample('advanced')}
                className="flex-1 px-2 py-2 text-xs text-red-700 transition-colors bg-red-100 rounded-lg sm:flex-none lg:px-3 hover:bg-red-200 lg:text-sm"
              >
                Advanced
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                title="Upload Python file"
              >
                <Upload className="w-3 h-3 text-gray-600 lg:h-4 lg:w-4" />
              </button>
              
              <button
                onClick={downloadResults}
                disabled={results.length === 0}
                className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                title="Download results"
              >
                <Download className="w-3 h-3 text-gray-600 lg:h-4 lg:w-4" />
              </button>
              
              <button
                onClick={clearCode}
                className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                title="Clear code"
              >
                <RotateCcw className="w-3 h-3 text-gray-600 lg:h-4 lg:w-4" />
              </button>

              <button
                onClick={analyzeCode}
                disabled={isAnalyzing}
                className="flex items-center justify-center min-w-0 px-3 py-2 space-x-1 text-white transition-colors bg-green-600 rounded-lg lg:space-x-2 lg:px-4 hover:bg-green-700 disabled:bg-gray-400"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white rounded-full lg:w-4 lg:h-4 border-t-transparent animate-spin" />
                    <span className="hidden text-xs lg:text-sm sm:inline">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 lg:h-4 lg:w-4" />
                    <span className="hidden text-xs lg:text-sm sm:inline">Apply Rules</span>
                    <span className="text-xs lg:text-sm sm:hidden">Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {(results.length > 0 || rulesApplied > 0) && (
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs lg:mt-4 lg:gap-6 lg:text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Execution: {executionTime.toFixed(2)}ms
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Rules Applied: {rulesApplied}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-gray-500" />
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
      <div className="flex flex-col flex-1 overflow-hidden lg:flex-row">
        {/* Left Panel - Code Editor */}
        <div className={`${showMobileResults ? 'hidden' : 'flex'} lg:flex lg:w-3/5 flex-col`}>
          <div className="flex-1 border-gray-200 lg:border-r">
            <MonacoEditor
              value={code}
              onChange={setCode}
              language="python"
              theme="vs-dark"
            />
          </div>
          
          {/* Mobile Results Toggle */}
          {results.length > 0 && (
            <div className="p-3 bg-white border-t border-gray-200 lg:hidden">
              <button
                onClick={() => setShowMobileResults(true)}
                className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>View Results ({results.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Results and Trace */}
        <div className={`${showMobileResults ? 'flex' : 'hidden'} lg:flex lg:w-2/5 flex-col `}>
          {/* Mobile Back Button */}
          <div className="p-3 bg-white border-b border-gray-200 lg:hidden">
            <button
              onClick={() => setShowMobileResults(false)}
              className="flex items-center space-x-2 text-blue-600"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Back to Code</span>
            </button>
          </div>
          
          <div className="border-b border-gray-200 h-1/2">
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