# Functions

ALWAYS use arrow functions for all functions.

- Use `const functionName = () => { ... }`.
- **NEVER** use `function functionName() { ... }`.
- **Parameters**:
  - **2 or fewer arguments**: You may use positional arguments.
    - Example: `(name: string, age: number)`
  - **3 or more arguments**: You **MUST** use a single object argument (Named Parameters) and define a specific interface/type for it.
    - Example: `({ name, age, isActive }: UserProps)`

## Examples

### Correct: 2 Parameters (Positional)

```ts
const greet = (name: string, age: number) => {
  return `Hello ${name}, you are ${age}`;
};
```

### Correct: 3+ Parameters (Object Pattern)

```ts
interface CreateUserProps {
  name: string;
  email: string;
  role: "admin" | "user";
  isActive?: boolean;
}

// Function takes ONE argument (the object), which is destructured
const createUser = ({
  name,
  email,
  role,
  isActive = true,
}: CreateUserProps) => {
  // implementation
};
```

### Incorrect: 3+ Parameters (Positional)

```ts
// ❌ Avoid this! Too many positional arguments.
const createUser = (
  name: string,
  email: string,
  role: string,
  isActive: boolean,
) => {
  // implementation
};
```

### Incorrect: Function Declaration

```ts
// ❌ Always use const arrow functions
function calculate(a: number, b: number) {
  return a + b;
}
```
