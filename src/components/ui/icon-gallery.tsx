"use client";

import { useState, useMemo } from "react";
import { ICON_REGISTRY, ICON_NAMES } from "@/lib/icon-registry";
import { cn } from "@/lib/cn";
import { IcClose } from "@/lib/icons";

type Weight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";

/* ── PascalCase helper (ic-kebab → PascalCase) ── */
function toPascal(icName: string) {
  return icName
    .replace(/^ic-/, "")
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

/* ── categorize icons by keyword (kebab match) ── */
const CATEGORIES: Record<string, string[]> = {
  "Arrow & Caret": ["arrow", "caret"],
  "File & Folder": ["file", "folder"],
  "User & People": ["user", "person", "baby", "student", "gender"],
  "Media & Player": ["play", "pause", "stop", "skip", "rewind", "fast-forward", "record", "repeat", "shuffle", "speaker", "microphone", "music", "video", "film", "camera", "monitor-play", "waveform", "headphones", "subtitles", "disc", "vinyl", "radio", "broadcast"],
  "Chat & Social": ["chat", "chats", "envelope", "paper-plane", "share", "heart", "thumbs", "star", "bookmark", "flag", "bell", "megaphone", "smiley"],
  "Brand & Logo": ["logo", "youtube", "instagram", "tiktok", "facebook", "twitter", "discord", "slack", "github", "gitlab", "figma", "google", "apple", "microsoft", "amazon", "spotify", "reddit", "dribbble", "behance", "linkedin", "pinterest", "snapchat", "telegram", "whatsapp", "twitch", "steam", "meta", "notion", "codepen", "codesandbox"],
  "Chart & Data": ["chart", "graph", "database", "table", "kanban", "funnel", "sort", "ranking"],
  "Device & Hardware": ["desktop", "device", "laptop", "keyboard", "mouse", "cpu", "memory", "hard-drive", "printer", "monitor", "battery", "bluetooth", "wifi", "usb", "plug"],
  "Editor & Text": ["text", "align", "list", "pencil", "pen", "highlighter", "eraser", "scissors", "crop", "selection", "cursor", "article", "note"],
  "Shape & Geometry": ["circle", "square", "triangle", "rectangle", "hexagon", "octagon", "diamond", "pentagon", "polygon", "cube", "cylinder", "sphere"],
  "Weather & Nature": ["sun", "moon", "cloud", "rain", "snow", "wind", "thermometer", "drop", "umbrella", "rainbow", "flower", "leaf", "tree", "fire", "flame", "snowflake"],
  "Navigation & Map": ["house", "compass", "map", "globe", "signpost", "navigation", "gps", "path"],
  "Commerce & Finance": ["money", "currency", "coin", "wallet", "credit-card", "receipt", "shopping", "cart", "bag", "storefront", "bank", "piggy"],
  "Security & Lock": ["lock", "key", "shield", "fingerprint", "password", "eye"],
  "Food & Drink": ["coffee", "wine", "beer", "cookie", "pizza", "bread", "egg", "carrot", "pepper", "avocado", "hamburger", "bowl", "fork", "cooking", "cake"],
  "Transport": ["car", "bus", "train", "airplane", "bicycle", "motorcycle", "boat", "truck", "taxi", "jeep", "rocket"],
  "Health & Medical": ["heart", "hospital", "first-aid", "pill", "syringe", "stethoscope", "thermometer"],
  "Building": ["building", "church", "factory", "mosque", "synagogue", "warehouse", "lighthouse"],
};

function categorize(icName: string): string {
  // strip "ic-" prefix for matching
  const name = icName.replace(/^ic-/, "");
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw) => name === kw || name.startsWith(kw + "-") || name.endsWith("-" + kw) || name.includes("-" + kw + "-") || name.includes("-" + kw))) return cat;
  }
  return "기타";
}

const ALL_CATEGORIES = ["전체", ...Object.keys(CATEGORIES), "기타"];

const WEIGHTS: Weight[] = ["thin", "light", "regular", "bold", "fill", "duotone"];
const ICON_SIZES = [16, 20, 24, 32, 40, 48] as const;

/* ── precompute categories ── */
const iconCategoryMap: Record<string, string> = {};
for (const name of ICON_NAMES) {
  iconCategoryMap[name] = categorize(name);
}

const catCounts: Record<string, number> = { "전체": ICON_NAMES.length };
for (const name of ICON_NAMES) {
  const cat = iconCategoryMap[name];
  catCounts[cat] = (catCounts[cat] || 0) + 1;
}

/* ══════════════════════════ COMPONENT ══════════════════════════ */
export function IconGallery() {
  const [search, setSearch] = useState("");
  const [weight, setWeight] = useState<Weight>("regular");
  const [selectedCat, setSelectedCat] = useState("전체");
  const [iconSize, setIconSize] = useState<number>(24);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ICON_NAMES.filter((name) => {
      const matchSearch = !q || name.includes(q) || toPascal(name).toLowerCase().includes(q);
      const matchCat = selectedCat === "전체" || iconCategoryMap[name] === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  return (
    <div className="space-y-5">
      {/* ── Search ── */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-label-tertiary pointer-events-none" viewBox="0 0 256 256" fill="currentColor">
          <path d="M229.66,218.34l-50.07-50.07a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`${ICON_NAMES.length}개 아이콘 검색... (예: ic-arrow, heart, file)`}
          className="w-full h-11 pl-10 pr-10 rounded-[var(--radius-md)] bg-fill-tertiary border border-transparent text-label text-[length:var(--text-body)] placeholder:text-placeholder focus:outline-2 focus:outline-primary focus:-outline-offset-2"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-fill-secondary flex items-center justify-center text-label-tertiary hover:text-label"
          >
            <IcClose size={10} />
          </button>
        )}
      </div>

      {/* ── Weight + Size controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[length:var(--text-caption1)] text-label-tertiary font-medium shrink-0">Weight:</span>
        <div className="flex gap-0.5">
          {WEIGHTS.map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={cn(
                "h-7 px-2.5 rounded-[var(--radius-xs)] text-[length:var(--text-caption1)] font-medium transition-all",
                weight === w
                  ? "bg-fill-tertiary dark:bg-bg-tertiary text-label"
                  : "text-label-tertiary hover:text-label-secondary"
              )}
            >
              {w}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-separator mx-1" />
        <span className="text-[length:var(--text-caption1)] text-label-tertiary font-medium shrink-0">Size:</span>
        <div className="flex gap-0.5">
          {ICON_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setIconSize(s)}
              className={cn(
                "h-7 w-9 rounded-[var(--radius-xs)] text-[length:var(--text-caption2)] font-medium transition-all",
                iconSize === s
                  ? "bg-fill-tertiary dark:bg-bg-tertiary text-label"
                  : "text-label-tertiary hover:text-label-secondary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={cn(
              "h-7 px-2.5 rounded-full text-[length:var(--text-caption1)] font-medium transition-colors",
              selectedCat === cat
                ? "bg-primary text-white"
                : "bg-fill-tertiary text-label-secondary hover:text-label"
            )}
          >
            {cat}
            <span className="ml-1 opacity-80">{catCounts[cat] || 0}</span>
          </button>
        ))}
      </div>

      {/* ── Result count ── */}
      <p className="text-[length:var(--text-footnote)] text-label-tertiary">
        {filtered.length}개 아이콘 {search && `("${search}" 검색 결과)`}
      </p>

      {/* ── Icon Grid ── */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-0.5">
        {filtered.map((name) => {
          const IconComp = ICON_REGISTRY[name];
          if (!IconComp) return null;
          const isSelected = selectedIcon === name;
          const shortName = name.replace(/^ic-/, "");
          return (
            <button
              key={name}
              onClick={() => setSelectedIcon(isSelected ? null : name)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] transition-all group cursor-pointer",
                isSelected
                  ? "bg-primary/10 ring-1 ring-primary"
                  : "hover:bg-fill-tertiary"
              )}
              title={name}
            >
              <IconComp
                size={iconSize}
                weight={weight}
                className={cn(
                  "transition-colors",
                  isSelected ? "text-primary" : "text-label group-hover:text-primary"
                )}
              />
              <span
                className={cn(
                  "text-[8px] leading-tight truncate max-w-full transition-colors",
                  isSelected ? "text-primary" : "text-label-tertiary group-hover:text-label-secondary"
                )}
              >
                {name.length > 14 ? name.slice(0, 13) + "…" : name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Selected Icon Detail ── */}
      {selectedIcon && (() => {
        const IconComp = ICON_REGISTRY[selectedIcon];
        if (!IconComp) return null;
        const pascal = toPascal(selectedIcon);
        return (
          <div className="sticky bottom-4 mx-auto max-w-2xl rounded-[var(--radius-lg)] bg-bg-secondary border border-separator-opaque shadow-[var(--shadow-lg)] p-5 animate-[slideUp_0.15s_ease-out]">
            <div className="flex items-start gap-5">
              {/* Large preview */}
              <div className="w-20 h-20 rounded-[var(--radius-md)] bg-fill-tertiary flex items-center justify-center shrink-0">
                <IconComp size={40} weight={weight} className="text-label" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <h3 className="text-[length:var(--text-subhead)] font-semibold text-label">{selectedIcon}</h3>
                  <p className="text-[length:var(--text-caption1)] text-label-tertiary font-mono">Phosphor: {pascal}</p>
                </div>

                {/* All 6 weights */}
                <div className="flex items-center gap-3">
                  {WEIGHTS.map((w) => (
                    <div key={w} className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => setWeight(w)}
                        className={cn(
                          "p-1.5 rounded-[var(--radius-xs)] transition-colors",
                          weight === w ? "bg-primary/10" : "hover:bg-fill-tertiary"
                        )}
                      >
                        <IconComp size={22} weight={w} className={cn(weight === w ? "text-primary" : "text-label")} />
                      </button>
                      <span className={cn("text-[8px]", weight === w ? "text-primary font-medium" : "text-label-tertiary")}>{w}</span>
                    </div>
                  ))}
                </div>

                {/* Import snippet */}
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-[length:var(--text-caption2)] font-mono bg-fill-tertiary px-2.5 py-1.5 rounded-[var(--radius-xs)] text-label-secondary truncate">
                    {`import { ${pascal} as Ic${pascal} } from "@phosphor-icons/react"`}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(`import { ${pascal} as Ic${pascal} } from "@phosphor-icons/react";`)}
                    className="shrink-0 h-7 px-2 rounded-[var(--radius-xs)] text-[length:var(--text-caption1)] text-label-secondary hover:bg-fill-tertiary transition-colors"
                  >
                    복사
                  </button>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setSelectedIcon(null)}
                className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-label-tertiary hover:bg-fill-tertiary hover:text-label transition-colors"
              >
                <IcClose size={14} />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
