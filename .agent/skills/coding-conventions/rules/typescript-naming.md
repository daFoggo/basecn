# TypeScript Naming Conventions

Use prefixes for TypeScript type definitions to improve code readability and distinguish between different type constructs.

## Prefixes

| Construct | Prefix | Example                    |
| --------- | ------ | -------------------------- |
| Interface | `I`    | `IUser`, `IApiResponse`    |
| Type      | `T`    | `TButtonVariant`, `TTheme` |
| Enum      | `E`    | `EStatus`, `EUserRole`     |

## Examples

### Correct - Interface with I prefix

```ts
interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ICommandMenuItemProps extends React.ComponentProps<
  typeof CommandItem
> {
  onHighlight?: () => void;
}
```

### Correct - Type with T prefix

```ts
type TSelectedType = "page" | "theme" | null;

type TButtonVariant = "default" | "destructive" | "outline";

type TThemeOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};
```

### Correct - Enum with E prefix

```ts
enum EUserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

enum EStatus {
  Pending = "pending",
  Active = "active",
  Inactive = "inactive",
}
```

### Incorrect - Without prefixes

```ts
// ❌ Avoid: Interface without I prefix
interface User {
  id: string;
}

// ❌ Avoid: Type without T prefix
type ButtonVariant = "default" | "outline";

// ❌ Avoid: Enum without E prefix
enum Status {
  Active = "active",
}
```

## Notes

- This convention is for **code clarity only**, not enforced by linting
- Props interfaces for components should also use `I` prefix (e.g., `IButtonProps`)
- Generic type parameters do NOT need prefixes (e.g., `T` in `Array<T>` is fine)
