import React, { useState } from 'react';
import { BookOpen, Code, PlayCircle, ChevronRight, Lightbulb, Target } from 'lucide-react';

export const LearningCenter: React.FC = () => {
  const [activeSection, setActiveSection] = useState('concepts');
  const [activeExample, setActiveExample] = useState(0);

  const sections = [
    { id: 'concepts', label: 'Prolog Concepts', icon: BookOpen },
    { id: 'examples', label: 'Rule Examples', icon: Code },
    { id: 'debugging', label: 'Python Debugging', icon: Target },
  ];

  const prologConcepts = [
    {
      title: 'Horn Clauses',
      content: `Horn clauses are the foundation of Prolog logic programming. They consist of:
      
• **Head** - The conclusion (what we want to prove)
• **Body** - The conditions (what must be true)

Structure: Head :- Body₁, Body₂, ..., Bodyₙ.

Example:
\`error(missing_colon, Line, Message) :- matches_pattern(Code, Pattern, Line).\`

This reads as: "There is an error of type missing_colon at Line with Message IF there is a pattern match in the Code at that Line."`,
      example: `% Horn clause for detecting missing colons
error(missing_colon_if, Line, "Add ':' at end of if statement") :- 
    matches_pattern(Code, /\\bif\\s+.+[^:]\\s*$/m, Line).

% This fires when:
% 1. We're checking for missing_colon_if errors
% 2. The pattern matches an if statement without a colon
% 3. At a specific line number`
    },
    {
      title: 'Unification',
      content: `Unification is the process of matching terms and variables in Prolog. It's how we determine if a rule applies to a specific situation.

**Key aspects:**
• Variables (uppercase) can unify with any term
• Constants must match exactly  
• Complex terms unify if their functors and arguments unify

In our debugger, unification happens when we match code patterns against our rules.`,
      example: `% Unification example
syntax_error(missing_colon, "if", ":").  % Fact

% Rule that unifies with the fact
error(Type, Line, Message) :- 
    syntax_error(Type, Keyword, Symbol),
    matches_pattern(Code, Pattern, Line).

% When checking "if x > 5", unification occurs:
% Type = missing_colon
% Keyword = "if"  
% Symbol = ":"
% Line = actual line number`
    },
    {
      title: 'Forward Chaining',
      content: `Forward chaining is our inference strategy. We start with facts and rules, then apply them to derive new conclusions.

**Process:**
1. Start with known facts about Python code patterns
2. Apply rules that match current code
3. Derive new facts (error detections)
4. Continue until no more rules can fire

This is how our debugger systematically checks your code against all known error patterns.`,
      example: `% Forward chaining in action
% Start with facts:
syntax_error(missing_colon, "if", ":").
syntax_error(missing_colon, "for", ":").

% Apply rules:
error(missing_colon_if, Line, Msg) :- 
    matches_pattern(Code, /if.*[^:]$/, Line).
    
error(missing_colon_for, Line, Msg) :- 
    matches_pattern(Code, /for.*[^:]$/, Line).

% Result: All if/for statements without colons are detected`
    },
    {
      title: 'Backtracking',
      content: `Backtracking occurs when Prolog needs to explore different possibilities to satisfy a goal. If one path fails, it backtracks and tries another.

**In our debugger:**
• Try different rules for the same code pattern
• Explore multiple matches within the same rule
• Handle ambiguous code constructs

This ensures comprehensive analysis of your Python code.`,
      example: `% Backtracking example
% Multiple rules might match the same pattern
error(assignment_error, Line, "Use == not =") :-
    matches_pattern(Code, /if.*=(?!=)/, Line).
    
error(comparison_error, Line, "Check operator") :-
    matches_pattern(Code, /if.*[^=!<>]=/, Line).

% For "if x = 5:", both rules are tried
% Backtracking explores all possible matches`
    }
  ];

  const ruleExamples = [
    {
      title: 'Syntax Error Detection',
      description: 'How we detect missing colons in Python control structures',
      prologCode: `% Rule for missing colon after if statement
error(missing_colon_if, Line, "Add ':' at end of if statement") :- 
    matches_pattern(Code, /\\bif\\s+.+[^:]\\s*$/m, Line).`,
      pythonCode: `# This triggers the rule:
if x > 5  # Missing colon

# This doesn't:
if x > 5:  # Correct syntax`,
      explanation: `The rule works by:
1. **Pattern Matching**: Uses regex to find "if" statements
2. **Negative Lookahead**: [^:] ensures line doesn't end with colon
3. **Unification**: Binds the line number where error occurs
4. **Inference**: Fires rule and generates error message`
    },
    {
      title: 'Logic Error Detection',
      description: 'Detecting assignment in conditional expressions',
      prologCode: `% Rule for assignment in condition
error(assignment_in_condition, Line, "Use == for comparison") :- 
    matches_pattern(Code, /\\bif\\s+.*=(?!=)/, Line).`,
      pythonCode: `# This triggers the rule:
if x = 5:  # Assignment instead of comparison

# This doesn't:
if x == 5:  # Correct comparison`,
      explanation: `This rule demonstrates:
1. **Context Analysis**: Looks specifically within if statements
2. **Negative Lookahead**: (?!=) ensures it's not ==
3. **Common Bug Detection**: Catches frequent Python mistake
4. **Helpful Suggestion**: Provides specific fix`
    },
    {
      title: 'Style Warning Detection',
      description: 'Identifying non-Pythonic variable naming',
      prologCode: `% Rule for uppercase variables
warning(uppercase_variable, Line, "Use snake_case") :- 
    matches_pattern(Code, /\\b[A-Z][a-zA-Z]*\\s*=/, Line).`,
      pythonCode: `# This triggers the rule:
MyVariable = 42  # Uppercase variable

# This doesn't:
my_variable = 42  # Pythonic naming`,
      explanation: `Style rules help enforce:
1. **PEP 8 Compliance**: Python style guidelines
2. **Code Consistency**: Uniform naming conventions
3. **Best Practices**: Industry-standard approaches
4. **Maintainability**: Readable, professional code`
    }
  ];

  const debuggingGuide = [
    {
      category: 'Syntax Errors',
      priority: 'High',
      color: 'bg-red-100 text-red-800',
      patterns: [
        'Missing colons after control structures (if, for, while, def, class)',
        'Unclosed parentheses, brackets, or quotes',
        'Invalid indentation or mixed tabs/spaces',
        'Python 2 vs 3 syntax issues (print statements)'
      ],
      tips: [
        'Always end control structures with a colon (:)',
        'Use consistent indentation (4 spaces recommended)',
        'Match every opening bracket/parenthesis with a closing one',
        'Use parentheses for print() in Python 3'
      ]
    },
    {
      category: 'Logic Errors',
      priority: 'Medium',
      color: 'bg-orange-100 text-orange-800',
      patterns: [
        'Assignment (=) instead of comparison (==) in conditions',
        'Using "is" for value comparison instead of identity',
        'Modifying lists while iterating over them',
        'Mutable default arguments in function definitions'
      ],
      tips: [
        'Use == for value comparison, = for assignment',
        'Use "is" only for None, True, False, or identity checks',
        'Create a copy of the list before modifying during iteration',
        'Use None as default and check inside the function'
      ]
    },
    {
      category: 'Style Warnings',
      priority: 'Low',
      color: 'bg-blue-100 text-blue-800',
      patterns: [
        'Non-Pythonic naming (CamelCase instead of snake_case)',
        'Lines longer than 79 characters',
        'Wildcard imports (from module import *)',
        'Bare except clauses without specific exception types'
      ],
      tips: [
        'Use snake_case for variables and functions',
        'Break long lines for better readability',
        'Import specific names or use qualified imports',
        'Catch specific exceptions for better error handling'
      ]
    },
    {
      category: 'Performance Issues',
      priority: 'Medium',
      color: 'bg-green-100 text-green-800',
      patterns: [
        'Inefficient list iteration using range(len(list))',
        'String concatenation in loops',
        'Repeated function calls in loops',
        'Global variable access in tight loops'
      ],
      tips: [
        'Iterate directly: for item in items instead of indexing',
        'Use join() for multiple string concatenations',
        'Store function results in variables before loops',
        'Use local variables for better performance'
      ]
    }
  ];

  return (
    <div className="h bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Learning Center</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Master Prolog concepts and Python debugging techniques
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 lg:mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 lg:space-x-8 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 pb-3 lg:pb-4 px-1 border-b-2 font-medium text-xs lg:text-sm whitespace-nowrap ${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {activeSection === 'concepts' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {prologConcepts.map((concept, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 lg:p-6">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                      {concept.title}
                    </h2>
                    
                    <div className="prose max-w-none mb-4 lg:mb-6">
                      <div className="text-sm lg:text-base text-gray-700 whitespace-pre-line">
                        {concept.content}
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-3 lg:p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Code className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">Example</span>
                      </div>
                      <pre className="text-green-300 text-xs lg:text-sm overflow-x-auto">
                        <code>{concept.example}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'examples' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {ruleExamples.map((example, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 lg:p-6">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {example.title}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">{example.description}</p>
                    
                    <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
                      {/* Prolog Rule */}
                      <div>
                        <h3 className="text-xs lg:text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <Code className="h-4 w-4 text-blue-500 mr-2" />
                          Prolog Rule
                        </h3>
                        <div className="bg-gray-900 rounded-lg p-3 lg:p-4">
                          <pre className="text-blue-300 text-xs lg:text-sm overflow-x-auto">
                            <code>{example.prologCode}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Python Examples */}
                      <div>
                        <h3 className="text-xs lg:text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <PlayCircle className="h-4 w-4 text-green-500 mr-2" />
                          Python Code
                        </h3>
                        <div className="bg-gray-900 rounded-lg p-3 lg:p-4">
                          <pre className="text-green-300 text-xs lg:text-sm overflow-x-auto">
                            <code>{example.pythonCode}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 rounded-lg p-3 lg:p-4">
                      <h3 className="text-xs lg:text-sm font-medium text-blue-700 mb-2">How it works:</h3>
                      <p className="text-blue-700 text-xs lg:text-sm whitespace-pre-line">
                        {example.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'debugging' && (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {debuggingGuide.map((guide, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                        {guide.category}
                      </h2>
                      <span className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${guide.color}`}>
                        {guide.priority} Priority
                      </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                      {/* Common Patterns */}
                      <div>
                        <h3 className="text-xs lg:text-sm font-medium text-gray-700 mb-3">Common Patterns:</h3>
                        <ul className="space-y-2">
                          {guide.patterns.map((pattern, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs lg:text-sm text-gray-600">{pattern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Best Practices */}
                      <div>
                        <h3 className="text-xs lg:text-sm font-medium text-gray-700 mb-3">Best Practices:</h3>
                        <ul className="space-y-2">
                          {guide.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-xs lg:text-sm text-gray-600">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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