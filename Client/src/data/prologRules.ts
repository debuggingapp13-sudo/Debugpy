import { PrologRule } from '../types/prolog';

export const prologRules: PrologRule[] = [
  // Syntax Rules
  {
    id: 'r1',
    category: 'syntax',
    head: 'error(missing_colon_if, Line, "Add \':\' at end of if statement")',
    body: ['matches_pattern(Code, /\\bif\\s+.+[^:]\\s*$/m, Line)'],
    description: 'Detects missing colon after if statement',
    priority: 'high',
    pattern: /\bif\s+.+[^:]\s*$/m
  },
  {
    id: 'r2',
    category: 'syntax',
    head: 'error(missing_colon_for, Line, "Add \':\' at end of for statement")',
    body: ['matches_pattern(Code, /\\bfor\\s+.+[^:]\\s*$/m, Line)'],
    description: 'Detects missing colon after for statement',
    priority: 'high',
    pattern: /\bfor\s+.+[^:]\s*$/m
  },
  {
    id: 'r3',
    category: 'syntax',
    head: 'error(missing_colon_while, Line, "Add \':\' at end of while statement")',
    body: ['matches_pattern(Code, /\\bwhile\\s+.+[^:]\\s*$/m, Line)'],
    description: 'Detects missing colon after while statement',
    priority: 'high',
    pattern: /\bwhile\s+.+[^:]\s*$/m
  },
  {
    id: 'r4',
    category: 'syntax',
    head: 'error(missing_colon_def, Line, "Add \':\' at end of function definition")',
    body: ['matches_pattern(Code, /\\bdef\\s+\\w+\\([^)]*\\)[^:]*$/m, Line)'],
    description: 'Detects missing colon after function definition',
    priority: 'high',
    pattern: /\bdef\s+\w+\([^)]*\)[^:]*$/m
  },
  {
    id: 'r5',
    category: 'syntax',
    head: 'error(missing_colon_class, Line, "Add \':\' at end of class definition")',
    body: ['matches_pattern(Code, /\\bclass\\s+\\w+[^:]*$/m, Line)'],
    description: 'Detects missing colon after class definition',
    priority: 'high',
    pattern: /\bclass\s+\w+[^:]*$/m
  },
  {
    id: 'r6',
    category: 'syntax',
    head: 'error(missing_colon_try, Line, "Add \':\' at end of try statement")',
    body: ['matches_pattern(Code, /\\btry\\s*[^:]*$/m, Line)'],
    description: 'Detects missing colon after try statement',
    priority: 'high',
    pattern: /\btry\s*[^:]*$/m
  },
  {
    id: 'r7',
    category: 'syntax',
    head: 'error(missing_colon_except, Line, "Add \':\' at end of except statement")',
    body: ['matches_pattern(Code, /\\bexcept[^:]*$/m, Line)'],
    description: 'Detects missing colon after except statement',
    priority: 'high',
    pattern: /\bexcept[^:]*$/m
  },
  {
    id: 'r8',
    category: 'syntax',
    head: 'error(missing_colon_else, Line, "Add \':\' at end of else statement")',
    body: ['matches_pattern(Code, /\\belse\\s*[^:]*$/m, Line)'],
    description: 'Detects missing colon after else statement',
    priority: 'high',
    pattern: /\belse\s*[^:]*$/m
  },
  {
    id: 'r9',
    category: 'syntax',
    head: 'error(missing_colon_elif, Line, "Add \':\' at end of elif statement")',
    body: ['matches_pattern(Code, /\\belif\\s+.+[^:]\\s*$/m, Line)'],
    description: 'Detects missing colon after elif statement',
    priority: 'high',
    pattern: /\belif\s+.+[^:]\s*$/m
  },
  {
    id: 'r10',
    category: 'syntax',
    head: 'error(unclosed_parenthesis, Line, "Close the parenthesis")',
    body: ['matches_pattern(Code, /\\w+\\s*\\([^)]*$/m, Line)'],
    description: 'Detects unclosed parentheses',
    priority: 'high',
    pattern: /\w+\s*\([^)]*$/m
  },
  {
    id: 'r11',
    category: 'syntax',
    head: 'error(unclosed_bracket, Line, "Close the square bracket")',
    body: ['matches_pattern(Code, /\\[[^\\]]*$/m, Line)'],
    description: 'Detects unclosed square brackets',
    priority: 'high',
    pattern: /\[[^\]]*$/m
  },
  {
    id: 'r12',
    category: 'syntax',
    head: 'error(unclosed_brace, Line, "Close the curly brace")',
    body: ['matches_pattern(Code, /\\{[^}]*$/m, Line)'],
    description: 'Detects unclosed curly braces',
    priority: 'high',
    pattern: /\{[^}]*$/m
  },
  {
    id: 'r13',
    category: 'syntax',
    head: 'error(unclosed_string, Line, "Close the string quote")',
    body: ['matches_pattern(Code, /"[^"]*$/m, Line)'],
    description: 'Detects unclosed double-quoted strings',
    priority: 'high',
    pattern: /"[^"]*$/m
  },
  {
    id: 'r14',
    category: 'syntax',
    head: 'error(unclosed_string_single, Line, "Close the string quote")',
    body: ['matches_pattern(Code, /\'[^\']*$/m, Line)'],
    description: 'Detects unclosed single-quoted strings',
    priority: 'high',
    pattern: /'[^']*$/m
  },
  {
    id: 'r15',
    category: 'syntax',
    head: 'error(invalid_syntax_print, Line, "print() requires parentheses in Python 3")',
    body: ['matches_pattern(Code, /\\bprint\\s+(?!\\()/m, Line)'],
    description: 'Detects Python 2 style print statements',
    priority: 'high',
    pattern: /\bprint\s+(?!\()/m
  },

  // Indentation Rules
  {
    id: 'r16',
    category: 'indentation',
    head: 'error(missing_indentation, Line, "Add proper indentation after colon")',
    body: ['matches_pattern(Code, /:\\s*\\n\\S/m, Line)'],
    description: 'Detects missing indentation after colon',
    priority: 'high',
    pattern: /:\s*\n\S/m
  },
  {
    id: 'r17',
    category: 'indentation',
    head: 'error(inconsistent_indentation, Line, "Use consistent indentation (4 spaces recommended)")',
    body: ['matches_pattern(Code, /^[ ]{1,3}(?!\\s)/m, Line)'],
    description: 'Detects inconsistent indentation',
    priority: 'high',
    pattern: /^[ ]{1,3}(?!\s)/m
  },
  {
    id: 'r18',
    category: 'indentation',
    head: 'error(mixed_tabs_spaces, Line, "Don\'t mix tabs and spaces for indentation")',
    body: ['matches_pattern(Code, /^\\t+ +/m, Line)'],
    description: 'Detects mixed tabs and spaces',
    priority: 'high',
    pattern: /^\t+ +/m
  },
  {
    id: 'r19',
    category: 'indentation',
    head: 'error(unexpected_indent, Line, "Unexpected indentation")',
    body: ['matches_pattern(Code, /^[ \\t]+(?!def|class|if|for|while|try|except|else|elif|with)/m, Line)'],
    description: 'Detects unexpected indentation',
    priority: 'high',
    pattern: /^[ \t]+(?!def|class|if|for|while|try|except|else|elif|with)/m
  },
  {
    id: 'r20',
    category: 'indentation',
    head: 'error(dedent_mismatch, Line, "Dedent does not match any outer indentation level")',
    body: ['matches_pattern(Code, /^[ ]{1,3}\\w/m, Line)'],
    description: 'Detects dedent mismatch',
    priority: 'high',
    pattern: /^[ ]{1,3}\w/m
  },
  {
    id: 'r21',
    category: 'indentation',
    head: 'error(expected_indent, Line, "Expected an indented block")',
    body: ['matches_pattern(Code, /:\\s*\\n(?!\\s)/m, Line)'],
    description: 'Detects missing indented block',
    priority: 'high',
    pattern: /:\s*\n(?!\s)/m
  },
  {
    id: 'r22',
    category: 'indentation',
    head: 'error(indent_after_backslash, Line, "Continuation line with same indent as next logical line")',
    body: ['matches_pattern(Code, /\\\\\\s*\\n\\s*/m, Line)'],
    description: 'Detects improper continuation line indentation',
    priority: 'medium',
    pattern: /\\\s*\n\s*/m
  },
  {
    id: 'r23',
    category: 'indentation',
    head: 'error(hanging_indent, Line, "Hanging indent should be 4 spaces")',
    body: ['matches_pattern(Code, /\\(\\s*\\n\\s{1,3}\\w/m, Line)'],
    description: 'Detects improper hanging indentation',
    priority: 'medium',
    pattern: /\(\s*\n\s{1,3}\w/m
  },

  // Logic Error Rules
  {
    id: 'r24',
    category: 'logic',
    head: 'error(assignment_in_condition, Line, "Use == for comparison, = is assignment")',
    body: ['matches_pattern(Code, /\\bif\\s+.*\\b\\w+\\s*=(?!=)\\s*\\w+/m, Line)'],
    description: 'Detects assignment in conditional',
    priority: 'medium',
    pattern: /\bif\s+.*\b\w+\s*=(?!=)\s*\w+/m
  },
  {
    id: 'r25',
    category: 'logic',
    head: 'error(is_vs_equals, Line, "Use == for value comparison, \'is\' for identity")',
    body: ['matches_pattern(Code, /\\bis\\s+(?:\\d+|["\'].+["\'])/m, Line)'],
    description: 'Detects incorrect use of is for value comparison',
    priority: 'medium',
    pattern: /\bis\s+(?:\d+|["'].+["'])/m
  },
  {
    id: 'r26',
    category: 'logic',
    head: 'error(mutable_default_argument, Line, "Don\'t use mutable objects as default arguments")',
    body: ['matches_pattern(Code, /def\\s+\\w+\\([^)]*=\\s*[\\[{]/m, Line)'],
    description: 'Detects mutable default arguments',
    priority: 'medium',
    pattern: /def\s+\w+\([^)]*=\s*[\[{]/m
  },
  {
    id: 'r27',
    category: 'logic',
    head: 'error(list_modification_during_iteration, Line, "Don\'t modify list while iterating over it")',
    body: ['matches_pattern(Code, /for\\s+\\w+\\s+in\\s+(\\w+):.*\\1\\.(append|remove|pop|insert)/ms, Line)'],
    description: 'Detects list modification during iteration',
    priority: 'medium',
    pattern: /for\s+\w+\s+in\s+(\w+):.*\1\.(append|remove|pop|insert)/ms
  },
  {
    id: 'r28',
    category: 'logic',
    head: 'error(division_by_zero_risk, Line, "Check for zero before division")',
    body: ['matches_pattern(Code, /\\/\\s*0(?!\\.|[1-9])/m, Line)'],
    description: 'Detects potential division by zero',
    priority: 'medium',
    pattern: /\/\s*0(?!\.|[1-9])/m
  },
  {
    id: 'r29',
    category: 'logic',
    head: 'error(infinite_loop_risk, Line, "Ensure loop has termination condition")',
    body: ['matches_pattern(Code, /while\\s+True\\s*:/m, Line)'],
    description: 'Detects potential infinite loops',
    priority: 'medium',
    pattern: /while\s+True\s*:/m
  },
  {
    id: 'r30',
    category: 'logic',
    head: 'error(unreachable_code, Line, "Code after return statement is unreachable")',
    body: ['matches_pattern(Code, /return\\s+.*\\n\\s+(?!#)\\w/m, Line)'],
    description: 'Detects unreachable code after return',
    priority: 'medium',
    pattern: /return\s+.*\n\s+(?!#)\w/m
  },
  {
    id: 'r31',
    category: 'logic',
    head: 'error(comparison_with_none, Line, "Use \'is None\' instead of \'== None\'")',
    body: ['matches_pattern(Code, /==\\s*None/m, Line)'],
    description: 'Detects incorrect None comparison',
    priority: 'medium',
    pattern: /==\s*None/m
  },
  {
    id: 'r32',
    category: 'logic',
    head: 'error(comparison_with_true_false, Line, "Use \'if var:\' instead of \'== True\'")',
    body: ['matches_pattern(Code, /==\\s*(True|False)/m, Line)'],
    description: 'Detects unnecessary boolean comparison',
    priority: 'low',
    pattern: /==\s*(True|False)/m
  },
  {
    id: 'r33',
    category: 'logic',
    head: 'error(chained_comparison_error, Line, "Chained comparisons may not work as expected")',
    body: ['matches_pattern(Code, /\\w+\\s*==\\s*\\w+\\s*==\\s*\\w+/m, Line)'],
    description: 'Detects potentially confusing chained comparisons',
    priority: 'low',
    pattern: /\w+\s*==\s*\w+\s*==\s*\w+/m
  },

  // Style Warning Rules
  {
    id: 'r34',
    category: 'style',
    head: 'warning(uppercase_variable_name, Line, "Variable names should be lowercase with underscores")',
    body: ['matches_pattern(Code, /\\b[A-Z][a-zA-Z]*\\s*=/m, Line)'],
    description: 'Detects uppercase variable names',
    priority: 'low',
    pattern: /\b[A-Z][a-zA-Z]*\s*=/m
  },
  {
    id: 'r35',
    category: 'style',
    head: 'warning(uppercase_function_name, Line, "Function names should be lowercase with underscores")',
    body: ['matches_pattern(Code, /def\\s+[A-Z]/m, Line)'],
    description: 'Detects uppercase function names',
    priority: 'low',
    pattern: /def\s+[A-Z]/m
  },
  {
    id: 'r36',
    category: 'style',
    head: 'warning(multiple_imports_single_line, Line, "Import modules on separate lines")',
    body: ['matches_pattern(Code, /import\\s+\\w+\\s*,\\s*\\w+/m, Line)'],
    description: 'Detects multiple imports on single line',
    priority: 'low',
    pattern: /import\s+\w+\s*,\s*\w+/m
  },
  {
    id: 'r37',
    category: 'style',
    head: 'warning(wildcard_import, Line, "Avoid wildcard imports")',
    body: ['matches_pattern(Code, /from\\s+\\w+\\s+import\\s+\\*/m, Line)'],
    description: 'Detects wildcard imports',
    priority: 'low',
    pattern: /from\s+\w+\s+import\s+\*/m
  },
  {
    id: 'r38',
    category: 'style',
    head: 'warning(lambda_assignment, Line, "Use def instead of lambda assignment")',
    body: ['matches_pattern(Code, /\\w+\\s*=\\s*lambda/m, Line)'],
    description: 'Detects lambda assignments',
    priority: 'low',
    pattern: /\w+\s*=\s*lambda/m
  },
  {
    id: 'r39',
    category: 'style',
    head: 'warning(bare_except, Line, "Use specific exception types")',
    body: ['matches_pattern(Code, /except\\s*:/m, Line)'],
    description: 'Detects bare except clauses',
    priority: 'low',
    pattern: /except\s*:/m
  },
  {
    id: 'r40',
    category: 'style',
    head: 'warning(missing_docstring, Line, "Function should have docstring")',
    body: ['matches_pattern(Code, /def\\s+\\w+\\([^)]*\\):\\s*\\n\\s*(?!["\'\\"])/m, Line)'],
    description: 'Detects missing docstrings',
    priority: 'low',
    pattern: /def\s+\w+\([^)]*\):\s*\n\s*(?!["'"])/m
  },
  {
    id: 'r41',
    category: 'style',
    head: 'warning(trailing_whitespace, Line, "Remove trailing whitespace")',
    body: ['matches_pattern(Code, /\\s+$/m, Line)'],
    description: 'Detects trailing whitespace',
    priority: 'low',
    pattern: /\s+$/m
  },
  {
    id: 'r42',
    category: 'style',
    head: 'warning(missing_space_operator, Line, "Add spaces around operators")',
    body: ['matches_pattern(Code, /\\w[+\\-*\\/]=?\\w/m, Line)'],
    description: 'Detects missing spaces around operators',
    priority: 'low',
    pattern: /\w[+\-*\/]=?\w/m
  },

  // Performance Issue Rules
  {
    id: 'r43',
    category: 'performance',
    head: 'warning(inefficient_list_iteration, Line, "Use \'for item in list\' instead of indexing")',
    body: ['matches_pattern(Code, /for\\s+\\w+\\s+in\\s+range\\(len\\(/m, Line)'],
    description: 'Detects inefficient list iteration',
    priority: 'medium',
    pattern: /for\s+\w+\s+in\s+range\(len\(/m
  },
  {
    id: 'r44',
    category: 'performance',
    head: 'warning(string_concatenation_in_loop, Line, "Use list and join() for multiple string concatenations")',
    body: ['matches_pattern(Code, /for.*:\\s*\\n.*\\w+\\s*\\+=.*str/ms, Line)'],
    description: 'Detects inefficient string concatenation in loops',
    priority: 'medium',
    pattern: /for.*:\s*\n.*\w+\s*\+=.*str/ms
  },
  {
    id: 'r45',
    category: 'performance',
    head: 'warning(repeated_function_call, Line, "Store function result instead of repeated calls")',
    body: ['matches_pattern(Code, /(\\w+\\([^)]*\\)).*\\n.*\\1/ms, Line)'],
    description: 'Detects repeated function calls',
    priority: 'medium',
    pattern: /(\w+\([^)]*\)).*\n.*\1/ms
  },
];