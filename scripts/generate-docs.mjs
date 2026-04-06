#!/usr/bin/env node
/**
 * 컴포넌트 스펙 문서 자동 생성 스크립트
 * 실행: npm run docs
 *
 * src/components/ui/*.tsx 파일에서 TypeScript interface를 파싱하여
 * docs/COMPONENT_SPEC.md 를 생성합니다.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "fs";
import { join, basename } from "path";

const UI_DIR = join(process.cwd(), "src/components/ui");
const INDEX_FILE = join(UI_DIR, "index.ts");
const OUT_DIR = join(process.cwd(), "public/docs");
const OUT_FILE = join(OUT_DIR, "COMPONENT_SPEC.md");

// ── index.ts 파싱: 카테고리 + 컴포넌트 매핑 ──
function parseIndex() {
  const src = readFileSync(INDEX_FILE, "utf-8");
  const categories = [];
  let currentCategory = null;

  for (const line of src.split("\n")) {
    const catMatch = line.match(/\/\*\s*─+\s*(.+?)\s*─+\s*\*\//);
    if (catMatch) {
      currentCategory = { name: catMatch[1], components: [] };
      categories.push(currentCategory);
      continue;
    }

    const exportMatch = line.match(
      /export\s*\{[^}]*\}\s*from\s*"\.\/([^"]+)"/
    );
    if (exportMatch && currentCategory) {
      currentCategory.components.push(exportMatch[1]);
    }
  }
  return categories;
}

// ── 컴포넌트 파일에서 interface / type 추출 ──
function parseComponent(fileName) {
  const filePath = join(UI_DIR, `${fileName}.tsx`);
  if (!existsSync(filePath)) return null;

  const src = readFileSync(filePath, "utf-8");
  const result = {
    fileName,
    displayName: toDisplayName(fileName),
    interfaces: [],
    types: [],
    defaultValues: {},
  };

  // type 리터럴 유니온 추출 (type Variant = "a" | "b")
  const typeRegex = /type\s+(\w+)\s*=\s*([^;]+);/g;
  let tm;
  while ((tm = typeRegex.exec(src))) {
    const name = tm[1];
    const value = tm[2].trim();
    // 유니온 리터럴만
    if (value.includes('"') || value.includes("'")) {
      result.types.push({ name, value });
    }
  }

  // interface 추출
  const ifaceRegex =
    /interface\s+(\w+Props)\s*(?:extends\s+[^{]+)?\{([\s\S]*?)\n\}/g;
  let im;
  while ((im = ifaceRegex.exec(src))) {
    const ifaceName = im[1];
    const body = im[2];
    const props = [];

    // extends 부분 추출
    const extendsMatch = src
      .slice(im.index)
      .match(/interface\s+\w+\s+extends\s+([^{]+)\{/);
    const extendsFrom = extendsMatch
      ? extendsMatch[1]
          .trim()
          .replace(/Omit<[^>]+>/g, (m) => m)
          .replace(/\s+/g, " ")
      : null;

    for (const line of body.split("\n")) {
      const propMatch = line.match(
        /^\s*(\w+)(\??):\s*(.+?);\s*(?:\/\/\s*(.+))?$/
      );
      if (propMatch) {
        props.push({
          name: propMatch[1],
          optional: propMatch[2] === "?",
          type: propMatch[3].trim(),
          comment: propMatch[4] || "",
        });
      }
    }

    result.interfaces.push({ name: ifaceName, extends: extendsFrom, props });
  }

  // default 값 추출: ({ prop = "value", ... })
  const defaultRegex = /(\w+)\s*=\s*"([^"]+)"/g;
  let dm;
  // forwardRef 안의 destructure에서 추출
  const destructureMatch = src.match(
    /\(\s*\{([^}]+)\}[^)]*\)\s*(?:=>|,\s*ref\s*\))/
  );
  if (destructureMatch) {
    const block = destructureMatch[1];
    while ((dm = defaultRegex.exec(block))) {
      result.defaultValues[dm[1]] = dm[2];
    }
    // 숫자 기본값
    const numDefRegex = /(\w+)\s*=\s*(\d+)/g;
    let nm;
    while ((nm = numDefRegex.exec(block))) {
      result.defaultValues[nm[1]] = nm[2];
    }
    // boolean
    const boolDefRegex = /(\w+)\s*=\s*(true|false)/g;
    let bm;
    while ((bm = boolDefRegex.exec(block))) {
      result.defaultValues[bm[1]] = bm[2];
    }
  }

  return result;
}

function toDisplayName(fileName) {
  return fileName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function kebabToTitle(fileName) {
  return fileName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── 타입을 읽기 좋게 변환 ──
function resolveType(rawType, types) {
  // 로컬 type alias를 인라인으로 치환
  for (const t of types) {
    if (rawType.includes(t.name)) {
      rawType = rawType.replace(t.name, t.value);
    }
  }
  return rawType.replace(/\s+/g, " ").trim();
}

// ── 마크다운 테이블 셀 안의 | 를 이스케이프 ──
function escapeCell(str) {
  return str.replace(/\|/g, "\\|");
}

// ── Markdown 생성 ──
function generateMarkdown(categories) {
  const now = new Date().toISOString().split("T")[0];
  let md = `# 캐럿 2.0 컴포넌트 스펙\n\n`;
  md += `> 자동 생성: \`npm run docs\` · 최종 업데이트: ${now}\n\n`;
  md += `미리보기: \`npm run dev\` → [localhost:3000/preview](/preview)\n\n`;

  // TOC
  md += `## 목차\n\n`;
  for (const cat of categories) {
    md += `### ${cat.name}\n`;
    for (const comp of cat.parsed) {
      md += `- [${comp.displayName}](#${comp.displayName.toLowerCase()})\n`;
    }
    md += `\n`;
  }
  md += `---\n\n`;

  // 각 컴포넌트
  for (const cat of categories) {
    md += `## ${cat.name}\n\n`;

    for (const comp of cat.parsed) {
      md += `### ${comp.displayName}\n\n`;
      md += `\`\`\`tsx\nimport { ${comp.displayName} } from "@/components/ui";\n\`\`\`\n\n`;

      // 로컬 타입 표시
      if (comp.types.length > 0) {
        for (const t of comp.types) {
          md += `- **${t.name}**: \`${t.value}\`\n`;
        }
        md += `\n`;
      }

      // Props 테이블
      for (const iface of comp.interfaces) {
        if (iface.props.length === 0) continue;

        md += `| Prop | Type | Default | Required |\n`;
        md += `|------|------|---------|----------|\n`;

        for (const p of iface.props) {
          const resolved = resolveType(p.type, comp.types);
          const def = comp.defaultValues[p.name]
            ? `\`"${comp.defaultValues[p.name]}"\``
            : "—";
          const req = p.optional ? "" : "✅";
          const typeStr = `\`${escapeCell(resolved)}\``;
          md += `| \`${p.name}\` | ${typeStr} | ${def} | ${req} |\n`;
        }
        md += `\n`;
      }

      md += `---\n\n`;
    }
  }

  return md;
}

// ── Main ──
function main() {
  const categories = parseIndex();

  // 각 컴포넌트 파싱
  for (const cat of categories) {
    cat.parsed = [];
    for (const compName of cat.components) {
      const parsed = parseComponent(compName);
      if (parsed) cat.parsed.push(parsed);
    }
  }

  const md = generateMarkdown(categories);

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, md, "utf-8");

  // 통계
  const total = categories.reduce((s, c) => s + c.parsed.length, 0);
  console.log(`✅ ${total}개 컴포넌트 스펙 생성 → ${OUT_FILE}`);
}

main();
