/**
 * @carat/a2ui — library entry
 *
 * Re-exports all primitive UI components and the `cn` utility so the package
 * can be consumed via `import { Button, cn } from "@carat/a2ui"`.
 *
 * Design tokens are shipped as a separate CSS file — import them in your
 * app's global stylesheet:
 *   @import "@carat/a2ui/tokens.css";
 */

export * from "./components/ui";
export { cn } from "./lib/cn";
