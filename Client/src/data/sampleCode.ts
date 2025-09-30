export const sampleCode = {
  beginner: `# Sample 1: Beginner Errors
def calculate_average(numbers)  # Missing colon
    total = 0
    if len(numbers) = 0:  # Assignment instead of comparison
        return 0
    
    for num in numbers  # Missing colon
        total += num
    
    Average = total / len(numbers)  # Uppercase variable
    print "Average:", Average  # Missing parentheses
    return Average`,

  intermediate: `# Sample 2: Intermediate Errors  
def process_data(items=[]):  # Mutable default argument
    Result = []  # Uppercase variable
    for i in range(len(items)):  # Inefficient iteration
        if items[i] is 0:  # Should use ==
            continue
        Result.append(items[i] * 2
    return Result  # Unclosed parenthesis above`,

  advanced: `# Sample 3: Advanced Errors
class DataProcessor:
    def __init__(self, data)  # Missing colon
        self.data = data
        
    def filter_data(self):
        filtered = []
        for item in self.data:
            if item > 0:
                self.data.remove(item)  # Modifying list during iteration
                filtered.append(item)
        return filtered
        print("This won't execute")  # Unreachable code`
};