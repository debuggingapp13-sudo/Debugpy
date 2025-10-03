async def get_all_facts():
    return [
        {"id": "f1", "predicate": "missing_colon", "args": ["if"], "category": "syntax", "description": "If statements must end with ':'"},
        {"id": "f2", "predicate": "unclosed_string", "args": ["\""], "category": "syntax", "description": "String not closed properly"}
    ]

async def get_all_rules():
    return [
        {"id": "r1", "head": "error(missing_colon_if, Line, 'Add : at end of if')", "body": ["matches_pattern(...)"], "category": "syntax", "description": "Detects missing colon after if", "priority": "high", "pattern": "\\bif\\s+.+[^:]\\s*$"},
        {"id": "r2", "head": "error(unclosed_string, Line, 'Close the string')", "body": ["matches_pattern(...)"], "category": "syntax", "description": "Detects unclosed string", "priority": "high", "pattern": "\"[^\"$"}
    ]