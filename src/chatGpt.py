def parse_expression(tokens):
    def expr(index):
        left, index = term(index)
        while index < len(tokens) and tokens[index] in "+-":
            op = tokens[index]
            index += 1
            right, index = term(index)
            left = f"({left} {op} {right})"
        return left, index

    def term(index):
        left, index = factor(index)
        while index < len(tokens) and tokens[index] in "*/":
            op = tokens[index]
            index += 1
            right, index = factor(index)
            left = f"({left} {op} {right})"
        return left, index

    def factor(index):
        if tokens[index] == '(':
            index += 1  # Skip '('
            result, index = expr(index)  # Recursive call
            index += 1  # Skip ')'
            return result, index
        else:
            num = tokens[index]  # Assume it's a number
            index += 1
            return num, index

    # Start parsing from the first token
    result, _ = expr(0)
    return result

# Tokenize the input
def tokenize(expression):
    return expression.replace(" ", "").replace("(", " ( ").replace(")", " ) ").split()

# Example usage
input_expression = "2 * (3 + 4)"
tokens = tokenize(input_expression)
parsed_result = parse_expression(tokens)
print(parsed_result)  # Output: "(2 * (3 + 4))"
