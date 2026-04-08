import { defineConfig } from "tsup";
import path from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: {
    resolve: true,
  },
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime", "next"],
  // Resolve the `@/*` path alias used throughout src/.
  esbuildOptions(options) {
    options.alias = {
      ...(options.alias ?? {}),
      "@": path.resolve("src"),
    };
  },
  // After bundling:
  // 1. Prepend "use client" directive so the entire bundle is a React Client
  //    Component module. esbuild strips directives from banner: {} so we
  //    post-process instead. Consumers using Next.js App Router can import
  //    from @carat/a2ui in server components — imports automatically become
  //    client references.
  // 2. Ship the design tokens CSS alongside the JS build.
  onSuccess: `node -e "const fs=require('fs');const p='dist/index.js';fs.writeFileSync(p,'\\"use client\\";\\n'+fs.readFileSync(p,'utf8'))" && cp src/styles/tokens.css dist/tokens.css && npx @tailwindcss/cli -i ./src/app/globals.css -o ./dist/styles.css --minify`,
});
