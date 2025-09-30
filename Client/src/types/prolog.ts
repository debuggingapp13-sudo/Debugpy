export interface PrologFact {
  id: string;
  category: 'syntax_error' | 'indentation_error' | 'logic_error' | 'style_warning' | 'performance_issue' | 'priority';
  predicate: string;
  args: string[];
  description: string;
}

export interface PrologRule {
  id: string;
  category: 'syntax' | 'indentation' | 'logic' | 'style' | 'performance';
  head: string;
  body: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
  pattern?: RegExp;
}

export interface AnalysisResult {
  type: 'error' | 'warning';
  category: string;
  line: number;
  message: string;
  rule: string;
  priority: 'high' | 'medium' | 'low';
  suggestion?: string;
}

export interface InferenceTrace {
  step: number;
  rule: string;
  action: string;
  result: string;
  unification?: string;
  timestamp: number;
}

export interface AnalysisSession {
  id: string;
  timestamp: number;
  code: string;
  results: AnalysisResult[];
  rulesApplied: number;
  executionTime: number;
}