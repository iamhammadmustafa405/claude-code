#include <cmath>
#include <iostream>
#include <limits>
#include <sstream>
#include <string>

int main() {
    std::string line;
    char again = 'y';

    std::cout << "Simple Calculator\n";
    std::cout << "Supported operators: + - * /\n";
    std::cout << "Square root: sqrt <number>\n";

    while (again == 'y' || again == 'Y') {
        std::cout << "\nEnter expression (e.g. 5 + 3 or sqrt 16): ";

        if (!std::getline(std::cin, line)) {
            break;
        }

        std::size_t start = line.find_first_not_of(" \t");
        bool isSqrt = start != std::string::npos && line.compare(start, 4, "sqrt") == 0;

        if (isSqrt) {
            std::istringstream in(line.substr(start + 4));
            double x;

            if (!(in >> x)) {
                std::cout << "Invalid input. Please try again.\n";
                continue;
            }

            if (x < 0) {
                std::cout << "Error: square root of a negative number.\n";
            } else {
                std::cout << "Result: " << std::sqrt(x) << '\n';
            }
        } else {
            std::istringstream in(line);
            double a, b;
            char op;

            if (!(in >> a >> op >> b)) {
                std::cout << "Invalid input. Please try again.\n";
                continue;
            }

            switch (op) {
                case '+':
                    std::cout << "Result: " << a + b << '\n';
                    break;
                case '-':
                    std::cout << "Result: " << a - b << '\n';
                    break;
                case '*':
                    std::cout << "Result: " << a * b << '\n';
                    break;
                case '/':
                    if (b == 0) {
                        std::cout << "Error: division by zero.\n";
                    } else {
                        std::cout << "Result: " << a / b << '\n';
                    }
                    break;
                default:
                    std::cout << "Unknown operator '" << op << "'.\n";
                    break;
            }
        }

        std::cout << "Calculate again? (y/n): ";
        if (!(std::cin >> again)) {
            break;
        }
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }

    std::cout << "Goodbye!\n";
    return 0;
}
