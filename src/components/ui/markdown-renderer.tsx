import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface MarkdownRendererProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

/**
 * Basic markdown renderer — converts common markdown patterns to HTML.
 * For production, replace with a library like react-markdown.
 */
function parseTable(block: string): string {
  const rows = block.trim().split("\n");
  if (rows.length < 2) return block;

  const parseRow = (row: string) => {
    // split on | but not on \| (escaped pipe)
    const cells: string[] = [];
    let current = "";
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "\\" && row[i + 1] === "|") {
        current += "|";
        i++;
      } else if (row[i] === "|") {
        cells.push(current.trim());
        current = "";
      } else {
        current += row[i];
      }
    }
    if (current.trim()) cells.push(current.trim());
    return cells.filter((c) => c !== "");
  };

  const headers = parseRow(rows[0]);
  // row[1] is the separator (|---|---|)
  const bodyRows = rows.slice(2);

  const thCls = "px-3 py-2 text-left text-[length:var(--text-caption1)] font-semibold text-label bg-fill-tertiary";
  const tdCls = "px-3 py-2 text-[length:var(--text-caption1)] text-label-secondary border-t border-separator";

  let html = '<div class="overflow-x-auto my-3 rounded-[var(--radius-md)] border border-separator">';
  html += '<table class="w-full border-collapse text-[length:var(--text-caption1)]">';
  html += "<thead><tr>";
  for (const h of headers) html += `<th class="${thCls}">${h}</th>`;
  html += "</tr></thead><tbody>";
  for (const row of bodyRows) {
    const cells = parseRow(row);
    html += "<tr>";
    for (const c of cells) html += `<td class="${tdCls}">${c}</td>`;
    html += "</tr>";
  }
  html += "</tbody></table></div>";
  return html;
}

function parseMarkdown(md: string): string {
  // Code blocks (``` ... ```)
  const codeBlocks: string[] = [];
  md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(
      `<pre class="my-3 p-4 rounded-[var(--radius-md)] bg-fill-tertiary overflow-x-auto"><code class="text-[length:var(--text-footnote)] font-mono text-label">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trimEnd()}</code></pre>`
    );
    return `__CODE_BLOCK_${idx}__`;
  });

  // Tables — detect consecutive lines with | characters
  md = md.replace(
    /(?:^\|.+\|[ \t]*\n){2,}(?:^\|.+\|[ \t]*\n?)*/gm,
    (match) => parseTable(match)
  );

  let html = md
    // Headers
    .replace(/^######\s+(.+)$/gm, '<h6 class="text-[length:var(--text-footnote)] font-semibold text-label mt-4 mb-1">$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5 class="text-[length:var(--text-subhead)] font-semibold text-label mt-4 mb-1">$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4 class="text-[length:var(--text-callout)] font-semibold text-label mt-5 mb-1.5">$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-[length:var(--text-body)] font-semibold text-label mt-5 mb-1.5">$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-[length:var(--text-title3)] font-semibold text-label mt-6 mb-2">$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1 class="text-[length:var(--text-title2)] font-bold text-label mt-6 mb-2">$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded-[var(--radius-xs)] bg-fill-tertiary text-[length:var(--text-footnote)] font-mono">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-link underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Unordered lists
    .replace(/^[-*]\s+(.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-5 list-decimal">$1</li>')
    // Blockquote
    .replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-[3px] border-separator-opaque pl-3 text-label-secondary italic my-2">$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-separator my-4" />')
    // Paragraphs (lines not already tagged)
    .replace(/^(?!<[hludbo\d]|<li|<hr|<code|<pre|<table|<div|__)(.+)$/gm, "<p>$1</p>");

  // Restore code blocks
  for (let i = 0; i < codeBlocks.length; i++) {
    html = html.replace(`__CODE_BLOCK_${i}__`, codeBlocks[i]);
  }

  return html;
}

const MarkdownRenderer = forwardRef<HTMLDivElement, MarkdownRendererProps>(
  ({ className, content, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-[length:var(--text-body)] text-label leading-[var(--leading-normal)] space-y-1.5 [&_strong]:font-semibold [&_p]:my-1",
        className
      )}
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      {...props}
    />
  )
);
MarkdownRenderer.displayName = "MarkdownRenderer";

export { MarkdownRenderer, type MarkdownRendererProps };
