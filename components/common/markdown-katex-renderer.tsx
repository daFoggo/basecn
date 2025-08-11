"use client";

import { cn } from "@/lib/utils/tailwind";
import "katex/dist/katex.min.css";
import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface IMarkdownKatexRendererProps {
    content: string;
    className?: string;
}

export function MarkdownKatexRenderer({
    content,
    className,
}: IMarkdownKatexRendererProps) {
    const components: Components = {
        // Headings
        h1: ({ children }) => (
            <h1 className="mt-8 first:mt-0 mb-6 font-bold text-4xl tracking-tight">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="mt-8 first:mt-0 mb-4 font-semibold text-3xl tracking-tight">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-6 first:mt-0 mb-3 font-semibold text-2xl tracking-tight">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="mt-4 first:mt-0 mb-2 font-semibold text-xl tracking-tight">
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5 className="mt-4 first:mt-0 mb-2 font-semibold text-lg tracking-tight">
                {children}
            </h5>
        ),
        h6: ({ children }) => (
            <h6 className="mt-4 first:mt-0 mb-2 font-semibold text-base tracking-tight">
                {children}
            </h6>
        ),

        // Paragraphs
        p: ({ children }) => (
            <p className="first:mt-0 mb-4 leading-7">
                {children}
            </p>
        ),

        // Links
        a: ({ href, children }) => (
            <a
                href={href}
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
                {children}
            </a>
        ),

        // Lists
        ul: ({ children }) => (
            <ul className="space-y-2 mb-4 list-disc list-inside">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="space-y-2 mb-4 list-decimal list-inside">
                {children}
            </ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,

        // Code blocks
        code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            // Check if it's a code block (has language) vs inline code
            const isCodeBlock = Boolean(language && node?.position);

            if (isCodeBlock && language) {
                return (
                    <div className="my-6">
                        <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            PreTag="div"
                            className="border rounded-lg"
                            customStyle={{
                                margin: 0,
                                borderRadius: "0.5rem",
                            }}
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    </div>
                );
            }

            return (
                <code
                    className="relative bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm"
                    {...props}
                >
                    {children}
                </code>
            );
        },

        // Blockquotes
        blockquote: ({ children }) => (
            <blockquote className="my-6 pl-6 border-primary border-l-4 italic">
                {children}
            </blockquote>
        ),

        // Tables
        table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
                <table className="border border-border w-full border-collapse">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
            <tr className="border-b border-border">{children}</tr>
        ),
        th: ({ children }) => (
            <th className="px-4 py-2 border border-border font-semibold text-left">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="px-4 py-2 border border-border">
                {children}
            </td>
        ),

        // Horizontal rule
        hr: () => <hr className="my-8 border-border" />,

        // Images
        img: ({ src, alt }) => {
            const imageSrc = typeof src === 'string' ? src : "/placeholder.svg?height=400&width=600&text=Image";
            return (
                <div className="my-6">
                    <Image
                        src={imageSrc}
                        alt={alt || ""}
                        className="border rounded-lg max-w-full h-auto"
                        loading="lazy"
                    />
                </div>
            );
        },

        // Strong and emphasis
        strong: ({ children }) => (
            <strong className="font-semibold text-primary">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,

        // Strikethrough (from remark-gfm)
        del: ({ children }) => (
            <del className="line-through /70">{children}</del>
        ),

        // Task lists (from remark-gfm)
        input: ({ type, checked, ...props }) => {
            if (type === "checkbox") {
                return (
                    <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="mr-2 accent-primary"
                        {...props}
                    />
                );
            }
            return <input type={type} {...props} />;
        },
    };

    return (
        <div
            className={cn(
                "dark:prose-invert max-w-none prose prose-slate",
                className,
            )}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
