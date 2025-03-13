import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js"], // Applies to JavaScript & TypeScript files
    languageOptions: {
      ecmaVersion: "latest", // Uses the latest ECMAScript features
      sourceType: "commonjs", // Enables ES Modules (import/export)
      globals: {
        window: "readonly", // Browser global
        document: "readonly", // Browser global
        process: "readonly", // Node.js global
        __dirname: "readonly", // Node.js global
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // ✅ Possible Problems (Code Bugs & Errors)
      // "no-undef": "error", // Disallows using undeclared variables
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }], // Warns about unused variables but allows unused function parameters
      // "no-console": "warn", // Warns about console logs (useful for debugging but shouldn't be in production)
      "no-debugger": "error", // Prevents accidental debugger statements in production
      "no-redeclare": "error", // Prevents redeclaring variables
      "no-dupe-keys": "error", // Prevents duplicate keys in objects
      "no-dupe-args": "error", // Prevents duplicate function parameters
      "no-irregular-whitespace": "error", // Prevents invisible spaces that cause issues
      "no-unreachable": "error", // Prevents unreachable code (after return/break)

      // 🔥 Best Practices (Code Quality & Readability)
      eqeqeq: ["error", "always"], // Requires strict equality (===) instead of loose equality (==)
      curly: ["error", "all"], // Enforces curly braces {} in if/else/for statements
      "default-case": "warn", // Warns if a switch statement doesn’t have a default case
      "consistent-return": "warn", // Ensures functions always return a value or nothing
      "no-implicit-globals": "error", // Prevents accidental global variables
      "no-var": "error", // Enforces let/const instead of var
      "prefer-const": "warn", // Suggests using const if a variable isn't reassigned
      "no-alert": "warn", // Warns against using alert(), confirm(), and prompt()
      "no-shadow": "error", // Prevents variable shadowing (declaring a variable with the same name as one in an outer scope)

      // 💡 Suggestions (Code Style & Improvements)
      "prefer-template": "warn", // Suggests using template literals (`string ${value}`) instead of concatenation
      "arrow-body-style": ["warn", "as-needed"], // Suggests removing curly braces in arrow functions when unnecessary
      "no-lonely-if": "warn", // Suggests avoiding unnecessary `if` statements inside `else`
      "object-shorthand": ["warn", "always"], // Suggests using `{ foo }` instead of `{ foo: foo }`
      "prefer-destructuring": ["warn", { object: true, array: false }], // Suggests using object destructuring
      "spaced-comment": ["warn", "always"], // Enforces space after comments (`// like this` instead of `//like this`)
      "no-multi-assign": "warn", // Discourages chaining variable assignments (`let a = b = c = 5`)

      // ✨ Prettier (Auto-formatting)
      ...eslintConfigPrettier.rules,
      "prettier/prettier": [
        "error",
        {
          singleQuote: true, // Enforce single quotes
          semi: false, // Remove semicolons
        },
      ], // Enforces Prettier formatting
    },
  },
];
