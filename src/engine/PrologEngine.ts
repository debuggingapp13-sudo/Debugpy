import { PrologRule, PrologFact, AnalysisResult, InferenceTrace } from '../types/prolog';
import { prologRules } from '../data/prologRules';
import { prologFacts } from '../data/prologFacts';

export class PrologEngine {
  private rules: PrologRule[];
  private facts: PrologFact[];
  private trace: InferenceTrace[];

  constructor() {
    this.rules = [...prologRules];
    this.facts = [...prologFacts];
    this.trace = [];
  }

  analyzeCode(code: string): {
    results: AnalysisResult[];
    trace: InferenceTrace[];
    executionTime: number;
    rulesApplied: number;
  } {
    const startTime = performance.now();
    this.trace = [];
    const results: AnalysisResult[] = [];
    const lines = code.split('\n');
    let stepCounter = 0;
    let rulesApplied = 0;

    // Forward chaining inference
    for (const rule of this.rules) {
      stepCounter++;
      this.addTrace(stepCounter, rule.head, 'evaluating', 'checking pattern match');

      // Pattern matching (unification)
      if (rule.pattern) {
        const matches = this.findPatternMatches(code, lines, rule.pattern);
        
        if (matches.length > 0) {
          rulesApplied++;
          this.addTrace(stepCounter, rule.head, 'pattern_matched', `Found ${matches.length} matches`);
          
          for (const match of matches) {
            const result: AnalysisResult = {
              type: rule.category === 'style' || rule.category === 'performance' ? 'warning' : 'error',
              category: rule.category,
              line: match.line,
              message: this.extractMessage(rule.head),
              rule: rule.id,
              priority: rule.priority,
              suggestion: this.generateSuggestion(rule, match.text)
            };
            
            results.push(result);
            this.addTrace(stepCounter, rule.head, 'fired', `Applied to line ${match.line}`);
          }
        } else {
          this.addTrace(stepCounter, rule.head, 'no_match', 'Pattern not found');
        }
      }
    }

    // Sort results by priority and line number
    results.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.line - b.line;
    });

    const executionTime = performance.now() - startTime;

    return {
      results,
      trace: [...this.trace],
      executionTime,
      rulesApplied
    };
  }

  private findPatternMatches(code: string, lines: string[], pattern: RegExp): Array<{line: number, text: string}> {
    const matches: Array<{line: number, text: string}> = [];
    
    // Global pattern matching
    const globalMatches = Array.from(code.matchAll(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')));
    
    for (const match of globalMatches) {
      if (match.index !== undefined) {
        const lineNumber = code.substring(0, match.index).split('\n').length;
        matches.push({
          line: lineNumber,
          text: match[0]
        });
      }
    }

    // Line-by-line matching for better accuracy
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        const existingMatch = matches.find(m => m.line === index + 1);
        if (!existingMatch) {
          matches.push({
            line: index + 1,
            text: line.trim()
          });
        }
      }
    });

    return matches;
  }

  private extractMessage(head: string): string {
    const match = head.match(/"([^"]+)"/);
    return match ? match[1] : 'Code issue detected';
  }

  private generateSuggestion(rule: PrologRule, matchedText: string): string {
    const suggestions: Record<string, string> = {
      'missing_colon_if': 'Add a colon (:) at the end of the if statement',
      'missing_colon_for': 'Add a colon (:) at the end of the for statement',
      'missing_colon_while': 'Add a colon (:) at the end of the while statement',
      'missing_colon_def': 'Add a colon (:) at the end of the function definition',
      'missing_colon_class': 'Add a colon (:) at the end of the class definition',
      'assignment_in_condition': 'Change = to == for comparison',
      'uppercase_variable_name': 'Use snake_case naming: ' + matchedText.toLowerCase().replace(/([A-Z])/g, '_$1').substring(1),
      'inefficient_list_iteration': 'Use: for item in items: instead of indexing',
      'mutable_default_argument': 'Use None as default and check inside function',
      'unclosed_parenthesis': 'Add closing parenthesis )',
      'bare_except': 'Specify exception type: except ValueError:',
    };

    return suggestions[rule.head.split('(')[0]] || rule.description;
  }

  private addTrace(step: number, rule: string, action: string, result: string): void {
    this.trace.push({
      step,
      rule: rule.split('(')[0],
      action,
      result,
      timestamp: performance.now()
    });
  }

  getRules(): PrologRule[] {
    return [...this.rules];
  }

  getFacts(): PrologFact[] {
    return [...this.facts];
  }

  searchRules(query: string): PrologRule[] {
    const lowerQuery = query.toLowerCase();
    return this.rules.filter(rule => 
      rule.head.toLowerCase().includes(lowerQuery) ||
      rule.description.toLowerCase().includes(lowerQuery) ||
      rule.category.includes(lowerQuery)
    );
  }

  searchFacts(query: string): PrologFact[] {
    const lowerQuery = query.toLowerCase();
    return this.facts.filter(fact => 
      fact.predicate.toLowerCase().includes(lowerQuery) ||
      fact.description.toLowerCase().includes(lowerQuery) ||
      fact.args.some(arg => arg.toLowerCase().includes(lowerQuery))
    );
  }
}