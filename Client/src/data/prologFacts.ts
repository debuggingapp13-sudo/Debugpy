import { PrologFact } from '../types/prolog';

export const prologFacts: PrologFact[] = [
  // Syntax Error Facts
  { id: 'f1', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'if', ':'], description: 'If statements require colon' },
  { id: 'f2', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'for', ':'], description: 'For loops require colon' },
  { id: 'f3', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'while', ':'], description: 'While loops require colon' },
  { id: 'f4', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'def', ':'], description: 'Function definitions require colon' },
  { id: 'f5', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'class', ':'], description: 'Class definitions require colon' },
  { id: 'f6', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'try', ':'], description: 'Try statements require colon' },
  { id: 'f7', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'except', ':'], description: 'Except statements require colon' },
  { id: 'f8', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'finally', ':'], description: 'Finally statements require colon' },
  { id: 'f9', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'with', ':'], description: 'With statements require colon' },
  { id: 'f10', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'elif', ':'], description: 'Elif statements require colon' },
  { id: 'f11', category: 'syntax_error', predicate: 'syntax_error', args: ['missing_colon', 'else', ':'], description: 'Else statements require colon' },

  { id: 'f12', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'print(', ')'], description: 'Print calls need closing parenthesis' },
  { id: 'f13', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'len(', ')'], description: 'Len calls need closing parenthesis' },
  { id: 'f14', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'range(', ')'], description: 'Range calls need closing parenthesis' },
  { id: 'f15', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'open(', ')'], description: 'Open calls need closing parenthesis' },
  { id: 'f16', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'int(', ')'], description: 'Int calls need closing parenthesis' },
  { id: 'f17', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'str(', ')'], description: 'Str calls need closing parenthesis' },
  { id: 'f18', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_paren', 'float(', ')'], description: 'Float calls need closing parenthesis' },

  { id: 'f19', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_bracket', '[', ']'], description: 'Lists need closing bracket' },
  { id: 'f20', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_bracket', '{', '}'], description: 'Dictionaries need closing brace' },
  { id: 'f21', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_quote', '"', '"'], description: 'Strings need closing double quote' },
  { id: 'f22', category: 'syntax_error', predicate: 'syntax_error', args: ['unclosed_quote', "'", "'"], description: 'Strings need closing single quote' },

  // Indentation Facts
  { id: 'f23', category: 'indentation_error', predicate: 'indentation_error', args: ['inconsistent_spaces', '4'], description: 'Use consistent 4-space indentation' },
  { id: 'f24', category: 'indentation_error', predicate: 'indentation_error', args: ['mixed_tabs_spaces', '0'], description: 'Never mix tabs and spaces' },
  { id: 'f25', category: 'indentation_error', predicate: 'indentation_error', args: ['missing_indent_after_colon', '4'], description: 'Indent 4 spaces after colon' },

  // Logic Error Facts
  { id: 'f26', category: 'logic_error', predicate: 'logic_error', args: ['assignment_in_condition', '=', '=='], description: 'Use == for comparison, = for assignment' },
  { id: 'f27', category: 'logic_error', predicate: 'logic_error', args: ['comparison_chain', 'a < b < c', 'valid'], description: 'Chained comparisons work as expected' },
  { id: 'f28', category: 'logic_error', predicate: 'logic_error', args: ['mutable_default_arg', 'def func(arg=[]):', 'def func(arg=None):'], description: 'Avoid mutable default arguments' },
  { id: 'f29', category: 'logic_error', predicate: 'logic_error', args: ['infinite_loop', 'while True:', 'add break condition'], description: 'Ensure loop termination' },
  { id: 'f30', category: 'logic_error', predicate: 'logic_error', args: ['division_by_zero', 'x / 0', 'check denominator'], description: 'Check for division by zero' },
  { id: 'f31', category: 'logic_error', predicate: 'logic_error', args: ['list_modification_during_iteration', 'modify in loop', 'use copy'], description: 'Don\'t modify list while iterating' },
  { id: 'f32', category: 'logic_error', predicate: 'logic_error', args: ['wrong_equality_check', 'is', '=='], description: 'Use is for identity, == for equality' },

  // Style Warning Facts
  { id: 'f33', category: 'style_warning', predicate: 'style_warning', args: ['uppercase_variable', '[A-Z]', 'snake_case'], description: 'Use snake_case for variables' },
  { id: 'f34', category: 'style_warning', predicate: 'style_warning', args: ['uppercase_function', 'def [A-Z]', 'snake_case'], description: 'Use snake_case for functions' },
  { id: 'f35', category: 'style_warning', predicate: 'style_warning', args: ['long_line', '> 79 chars', 'break line'], description: 'Keep lines under 79 characters' },
  { id: 'f36', category: 'style_warning', predicate: 'style_warning', args: ['multiple_imports', 'import a, b', 'separate lines'], description: 'Import modules on separate lines' },
  { id: 'f37', category: 'style_warning', predicate: 'style_warning', args: ['wildcard_import', 'from x import *', 'specific imports'], description: 'Avoid wildcard imports' },
  { id: 'f38', category: 'style_warning', predicate: 'style_warning', args: ['lambda_assignment', 'func = lambda', 'use def'], description: 'Use def instead of lambda assignment' },
  { id: 'f39', category: 'style_warning', predicate: 'style_warning', args: ['bare_except', 'except:', 'except Exception:'], description: 'Use specific exception types' },

  // Performance Facts
  { id: 'f40', category: 'performance_issue', predicate: 'performance_issue', args: ['inefficient_loop', 'for i in range(len(list))', 'for item in list'], description: 'Iterate directly over items' },
  { id: 'f41', category: 'performance_issue', predicate: 'performance_issue', args: ['string_concatenation', 's += str', 'use join()'], description: 'Use join for multiple concatenations' },
  { id: 'f42', category: 'performance_issue', predicate: 'performance_issue', args: ['repeated_function_call', 'func() in loop', 'store result'], description: 'Avoid repeated function calls in loops' },
  { id: 'f43', category: 'performance_issue', predicate: 'performance_issue', args: ['global_variable_access', 'global in loop', 'local copy'], description: 'Minimize global variable access in loops' },

  // Priority Facts
  { id: 'f44', category: 'priority', predicate: 'priority', args: ['syntax_error', 'high'], description: 'Syntax errors have high priority' },
  { id: 'f45', category: 'priority', predicate: 'priority', args: ['indentation_error', 'high'], description: 'Indentation errors have high priority' },
  { id: 'f46', category: 'priority', predicate: 'priority', args: ['logic_error', 'medium'], description: 'Logic errors have medium priority' },
  { id: 'f47', category: 'priority', predicate: 'priority', args: ['style_warning', 'low'], description: 'Style warnings have low priority' },
  { id: 'f48', category: 'priority', predicate: 'priority', args: ['performance_issue', 'medium'], description: 'Performance issues have medium priority' },
];