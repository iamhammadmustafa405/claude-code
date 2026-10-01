import math

def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def is_perfect_square(n):
    if n < 0:
        return False
    sqrt = int(math.sqrt(n))
    return sqrt * sqrt == n

def is_fibonacci(n):
    if n < 0:
        return False

    def is_perfect_square_check(x):
        sqrt = int(math.sqrt(x))
        return sqrt * sqrt == x

    return is_perfect_square_check(5 * n * n + 4) or is_perfect_square_check(5 * n * n - 4)

try:
    user_input = input("Enter a number: ").strip()

    if not user_input:
        print("\n[ERROR] No input provided!")
        print("Please enter a valid number to check its properties.")
    else:
        try:
            num = int(user_input)

            if num < 0:
                print("\n[ERROR] Please enter a non-negative number!")
            else:
                prime = is_prime(num)
                perfect_sq = is_perfect_square(num)
                fibonacci = is_fibonacci(num)

                print("\n" + "="*50)
                print(f"           NUMBER FACTS FOR {num}")
                print("="*50)
                print(f"[*] Prime Number:        {prime}")
                print(f"[*] Perfect Square:      {perfect_sq}")
                print(f"[*] Fibonacci Number:    {fibonacci}")
                print("="*50 + "\n")
        except ValueError:
            print("\n[ERROR] Invalid input!")
            print("Please enter a valid integer number.")

except EOFError:
    print("\n[ERROR] No input provided!")
    print("Please run the script and enter a valid number.")
