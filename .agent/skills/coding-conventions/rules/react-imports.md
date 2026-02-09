# React Imports

ALWAYS import React hooks and utilities directly instead of using the `React.` namespace.

## Rules

- Use `import { useState, useEffect, ... } from "react"` instead of `import * as React from "react"`
- **NEVER** use `React.useState`, `React.useEffect`, etc.
- Exception: `React.ComponentProps`, `React.ReactNode`, etc. type utilities are acceptable as they are commonly used with namespace

## Examples

### Correct - Direct imports

```tsx
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ReactNode, ComponentProps } from "react";

const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ...
  }, []);

  const handleClick = useCallback(() => {
    // ...
  }, []);

  return <div ref={ref}>Hello</div>;
};
```

### Incorrect - Using React namespace

```tsx
// ❌ Avoid this!
import * as React from "react";

const MyComponent = () => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // ...
  }, []);

  return <div>Hello</div>;
};
```

## Notes

- This convention improves tree-shaking and code clarity
- Bundlers can better optimize direct imports
- It's clearer to see which hooks a component uses at a glance
