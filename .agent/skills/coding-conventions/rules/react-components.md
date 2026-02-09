# React Components

ALWAYS use arrow functions for components.

- Use `export const ComponentName = () => { ... }` for named exports.
- Use `const ComponentName = () => { ... }; export default ComponentName;` for default exports.
- **NEVER** use `function ComponentName() { ... }`.

## Examples

### Correct - Named Export Component

```tsx
export const MyComponent = () => {
  return <div>Hello</div>;
};
```

### Correct - Default Export Component

```tsx
const MyComponent = () => {
  return <div>Hello</div>;
};

export default MyComponent;
```

### Incorrect - Component

```tsx
export function MyComponent() {
  return <div>Hello</div>;
}
```
