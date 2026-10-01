import math

def factorial(n):
    if n < 0:
        return None
    return math.factorial(n)

def get_fibonacci(n):
    if n <= 0:
        return None
    fib = [1, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib[n-1]

def is_even(num):
    return num % 2 == 0

def derivative_20x2_at_1():
    # f(x) = 20x^2
    # f'(x) = 40x
    # f'(1) = 40 * 1 = 40
    return 40

def process_even_factorial(factorial_val):
    fib_17 = get_fibonacci(17)
    derivative = derivative_20x2_at_1()
    result = (factorial_val * fib_17) / derivative
    return result, fib_17, derivative

def create_orthogonal_matrix():
    # Create a rotation matrix (orthogonal matrix)
    angle = math.pi / 4
    cos_theta = math.cos(angle)
    sin_theta = math.sin(angle)
    matrix = [[cos_theta, -sin_theta],
              [sin_theta, cos_theta]]
    return matrix

def create_test_matrix():
    # Create a simple test matrix
    return [[1.0, 2.0], [3.0, 4.0]]

def multiply_matrices(matrix1, matrix2):
    # Multiply two 2x2 matrices
    result = [[0.0, 0.0], [0.0, 0.0]]
    for i in range(2):
        for j in range(2):
            for k in range(2):
                result[i][j] += matrix1[i][k] * matrix2[k][j]
    return result

def display_results(num, fact, result_data):
    print("\n" + "="*70)
    print(f"                    FACTORIAL ANALYSIS FOR {num}")
    print("="*70)
    print(f"\nInput Number: {num}")
    print(f"Factorial ({num}!): {fact}")
    print(f"Status: {'EVEN' if is_even(fact) else 'ODD'}")

    if is_even(fact):
        result, fib_17, deriv = result_data
        print(f"\n[EVEN FACTORIAL PATH]")
        print(f"  17th Fibonacci Number: {fib_17}")
        print(f"  Derivative of 20x^2 at x=1: {deriv}")
        print(f"\n  Calculation: ({fact} * {fib_17}) / {deriv}")
        print(f"  Final Result: {result:.4f}")
    else:
        orth_matrix, test_matrix, result = result_data
        print(f"\n[ODD FACTORIAL PATH]")
        print(f"  Orthogonal Matrix (Rotation by 45°):")
        for row in orth_matrix:
            print(f"    [{row[0]:8.4f}  {row[1]:8.4f}]")
        print(f"\n  Test Matrix:")
        for row in test_matrix:
            print(f"    [{row[0]:8.4f}  {row[1]:8.4f}]")
        print(f"\n  Result (Orthogonal × Test Matrix):")
        for row in result:
            print(f"    [{row[0]:8.4f}  {row[1]:8.4f}]")

    print("\n" + "="*70 + "\n")

try:
    user_input = input("Enter a number to calculate factorial: ").strip()

    if not user_input:
        print("\n[ERROR] No input provided!")
        print("Please enter a valid non-negative integer.")
    else:
        try:
            num = int(user_input)

            if num < 0:
                print("\n[ERROR] Please enter a non-negative number!")
            else:
                fact = factorial(num)

                if is_even(fact):
                    result, fib_17, deriv = process_even_factorial(fact)
                    display_results(num, fact, (result, fib_17, deriv))
                else:
                    orth_matrix = create_orthogonal_matrix()
                    test_matrix = create_test_matrix()
                    result = multiply_matrices(orth_matrix, test_matrix)
                    display_results(num, fact, (orth_matrix, test_matrix, result))

        except ValueError:
            print("\n[ERROR] Invalid input!")
            print("Please enter a valid integer number.")

except EOFError:
    print("\n[ERROR] No input provided!")
    print("Please run the script and enter a valid number.")
