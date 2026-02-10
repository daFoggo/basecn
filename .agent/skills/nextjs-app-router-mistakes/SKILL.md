# Common mistakes with the Next.js App Router and how to fix them

**Source**: [Vercel Blog - Common mistakes with the Next.js App Router and how to fix them](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them)

## Using Route Handlers with Server Components

Consider the following code for a Server Component:

```tsx
export default async function Page() {
  let res = await fetch("http://localhost:3000/api/data");
  let data = await res.json();
  return <h1>{JSON.stringify(data)}</h1>;
}
```

Fetching JSON data from a Route Handler in a Server Component.
This async component makes a request to a Route Handler to retrieve some JSON data:

```tsx
export async function GET(request: Request) {
  return Response.json({ data: "Next.js" });
}
```

A Route Handler that returns static JSON data.
There's two main issues with this approach:

1.  Both [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) and [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) run securely on the server. You don't need the additional network hop. Instead, you can call whatever logic you intended to place inside the Route Handler directly in the Server Component. This might be an external API or any Promise.
2.  Since this code is running on the server with Node.js, we need to provide the absolute URL for the fetch versus a relative URL. In reality, we wouldn't hardcode localhost here, but instead need to have some conditional check based on the environment we're in. This is unnecessary since you can call the logic directly.

Instead, prefer to do the following:

```tsx
export default async function Page() {
  // call your async function directly
  let data = await getData(); // { data: 'Next.js' }
  // or call an external API directly
  let data = await fetch("https://api.vercel.app/blog");
  // ...
}
```

Server Components are able to fetch data directly.

## Static or dynamic Route Handlers

Route Handlers are cached by default when using the `GET` method. This can often be confusing for existing Next.js developers moving from the Pages Router and API Routes.

For example, the following code will be prerendered during next build:

```tsx
export async function GET(request: Request) {
  return Response.json({ data: "Next.js" });
}
```

A Route Handler that returns static JSON data.
This JSON data will not change until another build has completed. Why is that?
You can consider Route Handlers the building blocks of pages. For a given request to a route, you want to handle it. Next.js has further abstractions on top of Route Handlers like pages and layouts. This is why Route Handlers are [static by default](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching) (like pages) and share the same [route segment configuration](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) options.
This functionality unlocks some new features previously not possible with API Routes in the Pages Router. For example, you can have Route Handlers that produce JSON, or txt files, or really any file, which can be computed and prerendered during the build. The statically generated file is then automatically cached, and even [periodically updated](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#revalidating-cached-data) if desired.

```tsx
export async function GET(request: Request) {
  let res = await fetch("https://api.vercel.app/blog");
  let data = await res.json();
  return Response.json(data);
}
```

Return a list of blog posts as JSON data.
Further, this means the Route Handlers are compatible with [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) where you can deploy your Next.js application anywhere that supports static file hosting.

## Route Handlers and Client Components

You might think you need to use Route Handlers with Client Components, since they cannot be marked async and fetch or mutate data. Rather than needing to write a fetch and create a Route Handler, you can instead call [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) directly from Client Components.

```tsx
"use client";

import { save } from "./actions";

export function UserForm() {
  return (
    <form action={save}>
      <input type="text" name="username" />
      <button>Save</button>
    </form>
  );
}
```

A form and input to save a name.
This works with both forms as well as event handlers:

```tsx
"use client";

import { save } from "./actions";

export function UserForm({ username }) {
  async function onSave(event) {
    event.preventDefault();
    await save(username);
  }

  return <button onClick={onSave}>Save</button>;
}
```

Server Actions can be called from event handlers.

## Using Suspense with Server Components

Consider the following Server Component. Where should Suspense be placed to define what fallback UI will be shown while the data is being fetched?

```tsx
async function BlogPosts() {
  let data = await fetch("https://api.vercel.app/blog");
  let posts = await data.json();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <section>
      <h1>Blog Posts</h1>
      <BlogPosts />
    </section>
  );
}
```

If you guessed inside of the Page component, you were correct. The Suspense boundary needs to be placed higher than the async component doing the data fetching. It will not work if the boundary is inside of the async component.

```tsx
import { Suspense } from "react";

async function BlogPosts() {
  let data = await fetch("https://api.vercel.app/blog");
  let posts = await data.json();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <section>
      <h1>Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <BlogPosts />
      </Suspense>
    </section>
  );
}
```

Using Suspense with React Server Components.
In the future with Partial Prerendering, this pattern will start to become more common, including defining which components should be prerendered and which should run on-demand.

```tsx
import { unstable_noStore as noStore } from "next/cache";

async function BlogPosts() {
  noStore(); // This component should run dynamically
  let data = await fetch("https://api.vercel.app/blog");
  let posts = await data.json();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## Using the incoming request

Since the incoming request object [is not able to be accessed](https://nextjs.org/docs/app#how-can-i-access-the-request-object-in-a-layout) from a Server Component, it might not be obvious how to read parts of the incoming request. This could lead to using client hooks like useSearchParams unnecessarily.

There are specific functions and props to the Server Component which allow you to access the incoming request. For example:

- `cookies()`
- `headers()`
- `params`
- `searchParams`

```tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <h1>My Page</h1>;
}
```

Reading parts of the URL and the search parameters.

## Using Context providers with App Router

You might want to use [React Context](https://react.dev/reference/react/hooks#context-hooks) or are using an external dependency which relies on context. Two common mistakes I've seen are trying to use context with Server Components (unsupported) and the placement of the provider in the App Router.
To allow for your Server and Client Components to interleave, it's important to make your provider (or multiple providers) be a separate Client Component which takes children as a prop and renders them. For example:

```tsx
"use client";

import { createContext } from "react";

export const ThemeContext = createContext({});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}
```

Then, with your provider in a separate file as a Client Component, you can import and use this component inside of your layout:

```tsx
import ThemeProvider from "./theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

With the provider rendered at the root, all other Client Components throughout your app will be able to consume this context. And notably, this configuration still allows for other Server Components (including the page) lower in the tree.

## Using Server and Client Components together

For example, consider the following page:

```tsx
export default function Page() {
  return (
    <section>
      <h1>My Page</h1>
    </section>
  );
}
```

This is a Server Component. While that comes with new functionality like being able to [fetch data directly in the component](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating), it also means certain client-side React [functionalities aren't available](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns).
For example, consider creating a button that is a counter. This would need to be a new Client Component file marked with the `"use client"` directive at the top:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

You can then import and use this component in your page:

```tsx
import { Counter } from "./counter";

export default function Page() {
  return (
    <section>
      <h1>My Page</h1>
      <Counter />
    </section>
  );
}
```

The page is a Server Component and the `<Counter>` is a Client Component. Great! What about components lower in the tree than the counter? Can those be Server Components? Yes, through composition:

```tsx
import { Counter } from "./counter";

function Message() {
  return <p>This is a Server Component</p>;
}

export default function Page() {
  return (
    <section>
      <h1>My Page</h1>
      <Counter>
        <Message />
      </Counter>
    </section>
  );
}
```

Children of a Client Component can be a Server Component! Here's the updated counter:

```tsx
"use client";

import { useState } from "react";

export function Counter({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {children}
    </div>
  );
}
```

## Adding “use client” unnecessarily

Building off the previous example, does that mean that we need to add the `"use client"` directive everywhere?
When the `"use client"` directive is added, you pass into the "client boundary" giving you the ability to run client-side JavaScript (i.e. using React hooks or state). Client Components are still [prerendered on the server](https://github.com/reactwg/server-components/discussions/4), similar to components in the Next.js Pages Router.
Since you're already in the client boundary, siblings of the `<Counter>` would become Client Components. You don't need to add `"use client"` to every file. This might be an approach taken for [incremental adoption of the App Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration), where a component high up the tree becomes a Client Component and it becomes weave child Server Components further down.

## Not revalidating data after mutations

The Next.js App Router includes a complete model for [fetching, caching, and revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations). As developers are still learning this new model, and we're continuing to make improvements based on their feedback, one common mistake I've seen is forgetting to revalidate data after a mutation.
For example, consider the following Server Component. It displays a form, which uses a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) to handle the submission and create a new entry in a Postgres database.

```tsx
export default function Page() {
  async function create(formData: FormData) {
    "use server";

    let name = formData.get("name");
    await sql`INSERT INTO users (name) VALUES (${name})`;
  }

  return (
    <form action={create}>
      <input name="name" type="text" />
      <button type="submit">Create</button>
    </form>
  );
}
```

After the form is submitted and the insertion happens successfully, would the data displaying the list of names automatically update? No, not unless we tell Next.js to. For example:

```tsx
import { revalidatePath } from "next/cache";

export default async function Page() {
  let names = await sql`SELECT * FROM users`;

  async function create(formData: FormData) {
    "use server";

    let name = formData.get("name");
    await sql`INSERT INTO users (name) VALUES (${name})`;

    revalidatePath("/");
  }

  return (
    <section>
      <form action={create}>
        <input name="name" type="text" />
        <button type="submit">Create</button>
      </form>
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </section>
  );
}
```

## Redirects inside of try/catch blocks

When running server-side code, like a Server Component or a Server Action, you might want to [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect) if a resource is not available or after a successful mutation.
The `redirect()` function does not require you to use `return redirect()` as it uses the TypeScript [never](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)type. Further, internally this function throws a Next.js specific error. This means you should handle redirecting outside of try/catch blocks.

For example, if you are trying to redirect inside of a Server Component, it might look like this:

```tsx
import { redirect } from "next/navigation";

async function fetchTeam(id) {
  const res = await fetch("https://...");
  if (!res.ok) return undefined;
  return res.json();
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id);
  if (!team) {
    redirect("/login");
  }

  // ...
}
```

Alternatively, if you're trying to redirect from a Client Component, this should happen inside of a Server Action and not in an event handler:

```tsx
"use client";

import { navigate } from "./actions";

export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>Submit</button>
    </form>
  );
}
```

```tsx
"use server";

import { redirect } from "next/navigation";

export async function navigate(data: FormData) {
  redirect("/posts");
}
```
