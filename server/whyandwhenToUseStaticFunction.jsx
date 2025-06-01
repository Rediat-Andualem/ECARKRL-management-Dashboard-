//* In JavaScript, the `static` keyword is used when defining **methods or properties that belong to the class itself, not to instances of the class.

//*  Here's why and when you use `static`:

//*   - Instance Methods vs Static Methods:**
//*   - Instance methods are called on instances (objects created from the class).
//*   - Static methods are called directly on the class.

 Example:


class Calculator {
  // static method
  static add(a, b) {
    return a + b;
  }

  // instance method
  multiply(a, b) {
    return a * b;
  }
}

console.log(Calculator.add(2, 3)); // 5 (called on the class)
const calc = new Calculator();
console.log(calc.multiply(2, 3)); // 6 (called on the instance)

//*  Why use `static`?
//* - To create utility functions related to the class but **not dependent on any instance**.
//* - Keeps the function logically grouped with the class without polluting instance methods.

//* Common Uses:
//* - Utility functions (e.g. `Object.keys()`, `Array.isArray()` are static)
//* - Factory methods (creating instances in a specific way)
//* - Singleton patterns
