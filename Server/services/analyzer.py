import re
import time

# Define some sample rules (you can expand this later)
import re

rules = [
    # Syntax Rules
    {"id": "r1", "category": "syntax", "pattern": r"\bif\s+.+[^:]\s*$", "message": "Add ':' at end of if statement", "priority": "high"},
    {"id": "r2", "category": "syntax", "pattern": r"\bfor\s+.+[^:]\s*$", "message": "Add ':' at end of for statement", "priority": "high"},
    {"id": "r3", "category": "syntax", "pattern": r"\bwhile\s+.+[^:]\s*$", "message": "Add ':' at end of while statement", "priority": "high"},
    {"id": "r4", "category": "syntax", "pattern": r"\bdef\s+\w+\([^)]*\)[^:]*$", "message": "Add ':' at end of function definition", "priority": "high"},
    {"id": "r5", "category": "syntax", "pattern": r"\bclass\s+\w+[^:]*$", "message": "Add ':' at end of class definition", "priority": "high"},
    {"id": "r6", "category": "syntax", "pattern": r"\btry\s*[^:]*$", "message": "Add ':' at end of try statement", "priority": "high"},
    {"id": "r7", "category": "syntax", "pattern": r"\bexcept[^:]*$", "message": "Add ':' at end of except statement", "priority": "high"},
    {"id": "r8", "category": "syntax", "pattern": r"\belse\s*[^:]*$", "message": "Add ':' at end of else statement", "priority": "high"},
    {"id": "r9", "category": "syntax", "pattern": r"\belif\s+.+[^:]\s*$", "message": "Add ':' at end of elif statement", "priority": "high"},
    {"id": "r10", "category": "syntax", "pattern": r"\w+\s*\([^)]*$", "message": "Close the parenthesis", "priority": "high"},
    {"id": "r11", "category": "syntax", "pattern": r"\[[^\]]*$", "message": "Close the square bracket", "priority": "high"},
    {"id": "r12", "category": "syntax", "pattern": r"\{[^}]*$", "message": "Close the curly brace", "priority": "high"},
    {"id": "r13", "category": "syntax", "pattern": r"\"[^\"]*$", "message": "Close the string quote", "priority": "high"},
    {"id": "r14", "category": "syntax", "pattern": r"'[^']*$", "message": "Close the string quote", "priority": "high"},
    {"id": "r15", "category": "syntax", "pattern": r"\bprint\s+(?!\()", "message": "print() requires parentheses in Python 3", "priority": "high"},

    # Indentation Rules
    {"id": "r16", "category": "indentation", "pattern": r":\s*\n\S", "message": "Add proper indentation after colon", "priority": "high"},
    {"id": "r17", "category": "indentation", "pattern": r"^[ ]{1,3}(?!\s)", "message": "Use consistent indentation (4 spaces recommended)", "priority": "high"},
    {"id": "r18", "category": "indentation", "pattern": r"^\t+ +", "message": "Don't mix tabs and spaces for indentation", "priority": "high"},
    {"id": "r19", "category": "indentation", "pattern": r"^[ \t]+(?!def|class|if|for|while|try|except|else|elif|with)", "message": "Unexpected indentation", "priority": "high"},
    {"id": "r20", "category": "indentation", "pattern": r"^[ ]{1,3}\w", "message": "Dedent does not match any outer indentation level", "priority": "high"},
    {"id": "r21", "category": "indentation", "pattern": r":\s*\n(?!\s)", "message": "Expected an indented block", "priority": "high"},
    {"id": "r22", "category": "indentation", "pattern": r"\\\s*\n\s*", "message": "Continuation line with same indent as next logical line", "priority": "medium"},
    {"id": "r23", "category": "indentation", "pattern": r"\(\s*\n\s{1,3}\w", "message": "Hanging indent should be 4 spaces", "priority": "medium"},

    # Logic Rules
    {"id": "r24", "category": "logic", "pattern": r"\bif\s+.*\b\w+\s*=(?!=)\s*\w+", "message": "Use == for comparison, = is assignment", "priority": "medium"},
    {"id": "r25", "category": "logic", "pattern": r"\bis\s+(?:\d+|[\"'].+[\"'])", "message": "Use == for value comparison, 'is' for identity", "priority": "medium"},
    {"id": "r26", "category": "logic", "pattern": r"def\s+\w+\([^)]*=\s*[\[{]", "message": "Don't use mutable objects as default arguments", "priority": "medium"},
    {"id": "r27", "category": "logic", "pattern": r"for\s+\w+\s+in\s+(\w+):.*\1\.(append|remove|pop|insert)", "message": "Don't modify list while iterating", "priority": "medium"},
    {"id": "r28", "category": "logic", "pattern": r"/\s*0(?!\.|[1-9])", "message": "Check for zero before division", "priority": "medium"},
    {"id": "r29", "category": "logic", "pattern": r"while\s+True\s*:", "message": "Ensure loop has termination condition", "priority": "medium"},
    {"id": "r30", "category": "logic", "pattern": r"return\s+.*\n\s+(?!#)\w", "message": "Code after return is unreachable", "priority": "medium"},
    {"id": "r31", "category": "logic", "pattern": r"==\s*None", "message": "Use 'is None' instead of '== None'", "priority": "medium"},
    {"id": "r32", "category": "logic", "pattern": r"==\s*(True|False)", "message": "Use 'if var:' instead of '== True'", "priority": "low"},
    {"id": "r33", "category": "logic", "pattern": r"\w+\s*==\s*\w+\s*==\s*\w+", "message": "Chained comparisons may not work as expected", "priority": "low"},

    # Style Rules
    {"id": "r34", "category": "style", "pattern": r"\b[A-Z][a-zA-Z]*\s*=", "message": "Variable names should be lowercase_with_underscores", "priority": "low"},
    {"id": "r35", "category": "style", "pattern": r"def\s+[A-Z]", "message": "Function names should be lowercase_with_underscores", "priority": "low"},
    {"id": "r36", "category": "style", "pattern": r"import\s+\w+\s*,\s*\w+", "message": "Import modules on separate lines", "priority": "low"},
    {"id": "r37", "category": "style", "pattern": r"from\s+\w+\s+import\s+\*", "message": "Avoid wildcard imports", "priority": "low"},
    {"id": "r38", "category": "style", "pattern": r"\w+\s*=\s*lambda", "message": "Use def instead of lambda assignment", "priority": "low"},
    {"id": "r39", "category": "style", "pattern": r"except\s*:", "message": "Use specific exception types", "priority": "low"},
    {"id": "r40", "category": "style", "pattern": r"def\s+\w+\([^)]*\):\s*\n\s*(?![\"'])", "message": "Function should have a docstring", "priority": "low"},
    {"id": "r41", "category": "style", "pattern": r"\s+$", "message": "Remove trailing whitespace", "priority": "low"},
    {"id": "r42", "category": "style", "pattern": r"\w[+\-*/]=?\w", "message": "Add spaces around operators", "priority": "low"},

    # Performance Rules
    {"id": "r43", "category": "performance", "pattern": r"for\s+\w+\s+in\s+range\(len\(", "message": "Use 'for item in list' instead of indexing", "priority": "medium"},
    {"id": "r44", "category": "performance", "pattern": r"for.*:\s*\n.*\w+\s*\+=.*str", "message": "Use join() for string concatenations", "priority": "medium"},
    {"id": "r45", "category": "performance", "pattern": r"(\w+\([^)]*\)).*\n.*\1", "message": "Store function result instead of repeated calls", "priority": "medium"},
]

# This is the main logic function that will analyze Python code
def analyze_code(code: str):
    start = time.time()   # just to calculate how fast it runs
    lines = code.split("\n")
    results = []
    trace = []
    step = 0

    # Loop through all defined rules and check the code line by line
    for rule in rules:
        regex = re.compile(rule["pattern"])
        for i, line in enumerate(lines, start=1):
            step += 1
            if regex.search(line):
                results.append({
                    "line": i,
                    "message": rule["message"],
                    "priority": rule["priority"],
                    "category": rule["category"],
                })
                trace.append({
                    "step": step,
                    "rule": rule["id"],
                    "action": "fired",
                    "result": f"Matched line {i}",
                })

    end = time.time()
    return results, trace, f"{(end - start) * 1000:.2f}ms", len(results)