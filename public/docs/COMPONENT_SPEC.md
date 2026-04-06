# 캐럿 2.0 컴포넌트 스펙

> 자동 생성: `npm run docs` · 최종 업데이트: 2026-04-01

미리보기: `npm run dev` → [localhost:3000/preview](/preview)

## 목차

### Icon
- [Icon](#icon)
- [IconGallery](#icongallery)

### Primitives
- [Button](#button)
- [Input](#input)
- [Card](#card)
- [Badge](#badge)
- [Chip](#chip)
- [Tag](#tag)
- [Divider](#divider)
- [Avatar](#avatar)
- [Spinner](#spinner)
- [StatusIndicator](#statusindicator)
- [Skeleton](#skeleton)

### Navigation
- [SegmentedControl](#segmentedcontrol)
- [TabBar](#tabbar)
- [SectionHeader](#sectionheader)

### Input (extended)
- [Textarea](#textarea)
- [SearchInput](#searchinput)
- [ChatInput](#chatinput)
- [ChipBar](#chipbar)
- [ModelSelector](#modelselector)

### Cards
- [PresetCard](#presetcard)
- [SkillCard](#skillcard)
- [SceneCard](#scenecard)
- [SceneCardList](#scenecardlist)
- [FileCard](#filecard)
- [HistoryItem](#historyitem)

### Agent Execution
- [MessageBubble](#messagebubble)
- [StepIndicator](#stepindicator)
- [CollapsibleLog](#collapsiblelog)
- [StreamingText](#streamingtext)

### Result Renderers
- [ActionBar](#actionbar)
- [MetaInfoBar](#metainfobar)
- [MarkdownRenderer](#markdownrenderer)
- [CodeBlock](#codeblock)
- [ImageRenderer](#imagerenderer)
- [VideoRenderer](#videorenderer)
- [AudioRenderer](#audiorenderer)
- [HtmlRenderer](#htmlrenderer)
- [CompositeResult](#compositeresult)
- [VersionToggle](#versiontoggle)

### Overlays
- [Dropdown](#dropdown)
- [Modal](#modal)
- [CommandPalette](#commandpalette)
- [Tooltip](#tooltip)
- [Toast](#toast)

### Feedback
- [InlineBanner](#inlinebanner)
- [ErrorCard](#errorcard)
- [EmptyState](#emptystate)

---

## Icon

### Icon

```tsx
import { Icon } from "@/components/ui";
```

- **IconWeight**: `"thin" | "light" | "regular" | "bold" | "fill" | "duotone"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `icon` | `ComponentType<{ size?: number \| string; weight?: "thin" \| "light" \| "regular" \| "bold" \| "fill" \| "duotone"; color?: string; className?: string }>` | — | ✅ |
| `size` | `number` | `"20"` |  |
| `weight` | `"thin" \| "light" \| "regular" \| "bold" \| "fill" \| "duotone"` | `"regular"` |  |
| `color` | `string` | — |  |
| `label` | `string` | — |  |

---

### IconGallery

```tsx
import { IconGallery } from "@/components/ui";
```

- **Weight**: `"thin" | "light" | "regular" | "bold" | "fill" | "duotone"`

---

## Primitives

### Button

```tsx
import { Button } from "@/components/ui";
```

- **Variant**: `"primary" | "secondary" | "outline" | "ghost" | "tinted" | "danger"`
- **Size**: `"sm" | "md" | "lg"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "tinted" \| "danger"` | `"primary"` |  |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `iconOnly` | `boolean` | `"false"` |  |
| `loading` | `boolean` | `"false"` |  |
| `fullWidth` | `boolean` | `"false"` |  |

---

### Input

```tsx
import { Input } from "@/components/ui";
```

- **InputSize**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `size` | `"sm" \| "md"` | `"md"` |  |
| `leftIcon` | `ReactNode` | — |  |
| `rightIcon` | `ReactNode` | — |  |
| `error` | `boolean` | `"false"` |  |

---

### Card

```tsx
import { Card } from "@/components/ui";
```

- **CardVariant**: `"default" | "outlined" | "elevated"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"default" \| "outlined" \| "elevated"` | `"default"` |  |

---

### Badge

```tsx
import { Badge } from "@/components/ui";
```

- **Variant**: `"default" | "success" | "warning" | "error" | "info" | "agent"`
- **Size**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"default" \| "success" \| "warning" \| "error" \| "info" \| "agent"` | `"default"` |  |
| `size` | `"sm" \| "md"` | `"sm"` |  |

---

### Chip

```tsx
import { Chip } from "@/components/ui";
```

- **Variant**: `"default" | "selected" | "outline"`
- **Size**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"default" \| "selected" \| "outline"` | `"default"` |  |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `icon` | `React.ReactNode` | — |  |

---

### Tag

```tsx
import { Tag } from "@/components/ui";
```

- **Variant**: `"default" | "agent" | "skill"`
- **Size**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"default" \| "agent" \| "skill"` | `"default"` |  |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `removable` | `boolean` | `"false"` |  |
| `onRemove` | `() => void` | — |  |

---

### Divider

```tsx
import { Divider } from "@/components/ui";
```

- **Variant**: `"default" | "section"`
- **DividerSpacing**: `"compact" | "default" | "wide"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"default" \| "section"` | `"default"` |  |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |  |
| `label` | `string` | — |  |
| `spacing` | `"compact" \| "default" \| "wide"` | `"default"` |  |

---

### Avatar

```tsx
import { Avatar } from "@/components/ui";
```

- **Size**: `"sm" | "md" | "lg"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `src` | `string` | — |  |
| `alt` | `string` | — |  |
| `initials` | `string` | — |  |
| `icon` | `React.ReactNode` | — |  |

---

### Spinner

```tsx
import { Spinner } from "@/components/ui";
```

- **Size**: `"sm" | "md" | "lg"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |

---

### StatusIndicator

```tsx
import { StatusIndicator } from "@/components/ui";
```

- **Status**: `"running" | "complete" | "stopped" | "error"`
- **Size**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `status` | `"running" \| "complete" \| "stopped" \| "error"` | — | ✅ |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `label` | `string` | — |  |

---

### Skeleton

```tsx
import { Skeleton } from "@/components/ui";
```

- **Variant**: `"text" | "card" | "sceneCard" | "image" | "circle"`
- **SkeletonSize**: `"sm" | "md" | "lg"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"text" \| "card" \| "sceneCard" \| "image" \| "circle"` | `"text"` |  |
| `width` | `string \| number` | — |  |
| `height` | `string \| number` | — |  |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |

---

## Navigation

### SegmentedControl

```tsx
import { SegmentedControl } from "@/components/ui";
```

- **Size**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `items` | `SegmentedControlItem[]` | — | ✅ |
| `value` | `string` | — | ✅ |
| `onChange` | `(value: string) => void` | — | ✅ |
| `size` | `"sm" \| "md"` | `"sm"` |  |

---

### TabBar

```tsx
import { TabBar } from "@/components/ui";
```

- **Variant**: `"underline" | "pill"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `items` | `TabBarItem[]` | — | ✅ |
| `value` | `string` | — | ✅ |
| `onChange` | `(value: string) => void` | — | ✅ |
| `variant` | `"underline" \| "pill"` | `"underline"` |  |

---

### SectionHeader

```tsx
import { SectionHeader } from "@/components/ui";
```

- **SectionHeaderSize**: `"sm" | "md" | "lg"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `title` | `string` | — | ✅ |
| `action` | `ReactNode` | — |  |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |

---

## Input (extended)

### Textarea

```tsx
import { Textarea } from "@/components/ui";
```

- **TextareaSize**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `autoResize` | `boolean` | `"false"` |  |
| `minRows` | `number` | `"2"` |  |
| `maxRows` | `number` | `"10"` |  |
| `error` | `boolean` | `"false"` |  |
| `size` | `"sm" \| "md"` | `"md"` |  |

---

### SearchInput

```tsx
import { SearchInput } from "@/components/ui";
```

- **SearchSize**: `"sm" | "md"`
- **SearchVariant**: `"default" | "filled"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `size` | `"sm" \| "md"` | `"md"` |  |
| `variant` | `"default" \| "filled"` | `"default"` |  |
| `onClear` | `() => void` | — |  |

---

### ChatInput

```tsx
import { ChatInput } from "@/components/ui";
```

- **Mode**: `"default" | "skill-selected" | "generating"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `mode` | `"default" \| "skill-selected" \| "generating"` | `"default"` |  |
| `value` | `string` | — |  |
| `onChange` | `(value: string) => void` | — |  |
| `onSend` | `() => void` | — |  |
| `onStop` | `() => void` | — |  |
| `placeholder` | `string` | `"만들고 싶은 걸 알려주세요"` |  |
| `skillTag` | `ReactNode` | — |  |
| `toolbar` | `ReactNode` | — |  |
| `chipBar` | `ReactNode` | — |  |
| `disabled` | `boolean` | `"false"` |  |

---

### ChipBar

```tsx
import { ChipBar } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `items` | `ChipBarItem[]` | — | ✅ |
| `selected` | `string` | — |  |
| `onChange` | `(value: string) => void` | — |  |
| `onMore` | `() => void` | — |  |

---

### ModelSelector

```tsx
import { ModelSelector } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `items` | `DropdownItem[]` | — | ✅ |
| `value` | `string` | — | ✅ |
| `onChange` | `(value: string) => void` | — | ✅ |

---

## Cards

### PresetCard

```tsx
import { PresetCard } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `icon` | `ReactNode` | — | ✅ |
| `title` | `string` | — | ✅ |
| `description` | `string` | — | ✅ |

---

### SkillCard

```tsx
import { SkillCard } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `icon` | `ReactNode` | — | ✅ |
| `title` | `string` | — | ✅ |
| `description` | `string` | — | ✅ |
| `category` | `string` | — |  |

---

### SceneCard

```tsx
import { SceneCard } from "@/components/ui";
```

- **SceneState**: `"default" | "streaming" | "editing" | "regenerating"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `sceneNumber` | `number` | — | ✅ |
| `timeCode` | `string` | — |  |
| `sections` | `SceneSection[]` | — | ✅ |
| `state` | `"default" \| "streaming" \| "editing" \| "regenerating"` | `"default"` |  |
| `onEdit` | `() => void` | — |  |
| `onRegenerate` | `() => void` | — |  |
| `onCopy` | `() => void` | — |  |

---

### SceneCardList

```tsx
import { SceneCardList } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `scenes` | `Omit<SceneCardProps, "className">[]` | — | ✅ |
| `metaItems` | `MetaItem[]` | — |  |
| `actions` | `Action[]` | — |  |
| `onAction` | `(action: Action) => void` | — |  |

---

### FileCard

```tsx
import { FileCard } from "@/components/ui";
```

- **FileSize**: `"sm" | "md"`
- **FileCardVariant**: `"default" | "download" | "upload"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `fileName` | `string` | — | ✅ |
| `fileType` | `string` | — |  |
| `fileSize` | `string` | — |  |
| `onDownload` | `() => void` | — |  |
| `size` | `"sm" \| "md"` | `"sm"` |  |
| `variant` | `"default" \| "download" \| "upload"` | `"default"` |  |

---

### HistoryItem

```tsx
import { HistoryItem } from "@/components/ui";
```

- **Mode**: `"1.0" | "2.0"`
- **Status**: `"complete" | "running" | "stopped" | "error"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `title` | `string` | — | ✅ |
| `mode` | `"1.0" \| "2.0"` | `"2.0"` |  |
| `status` | `"complete" \| "running" \| "stopped" \| "error"` | `"complete"` |  |
| `selected` | `boolean` | `"false"` |  |

---

## Agent Execution

### MessageBubble

```tsx
import { MessageBubble } from "@/components/ui";
```

- **Role**: `"user" | "agent"`
- **MessageBubbleVariant**: `"default" | "error" | "system"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `role` | `"user" \| "agent"` | — | ✅ |
| `variant` | `"default" \| "error" \| "system"` | `"default"` |  |
| `skillTag` | `ReactNode` | — |  |

---

### StepIndicator

```tsx
import { StepIndicator } from "@/components/ui";
```

- **StepState**: `"completed" | "active" | "pending" | "error"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `steps` | `Step[]` | — | ✅ |

---

### CollapsibleLog

```tsx
import { CollapsibleLog } from "@/components/ui";
```

- **LogStatus**: `"success" | "running" | "error"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `title` | `string` | `"실행 과정 보기"` |  |
| `defaultOpen` | `boolean` | `"false"` |  |
| `entries` | `LogEntry[]` | — | ✅ |

---

### StreamingText

```tsx
import { StreamingText } from "@/components/ui";
```

- **StreamingState**: `"streaming" | "complete" | "stopped"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `content` | `string` | — | ✅ |
| `state` | `"streaming" \| "complete" \| "stopped"` | `"streaming"` |  |

---

## Result Renderers

### ActionBar

```tsx
import { ActionBar } from "@/components/ui";
```

- **Action**: `"copy" | "download" | "regenerate" | "edit"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `actions` | `"copy" \| "download" \| "regenerate" \| "edit"[]` | — |  |
| `onAction` | `(action: "copy" \| "download" \| "regenerate" \| "edit") => void` | — |  |

---

### MetaInfoBar

```tsx
import { MetaInfoBar } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `items` | `MetaItem[]` | — | ✅ |

---

### MarkdownRenderer

```tsx
import { MarkdownRenderer } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `content` | `string` | — | ✅ |

---

### CodeBlock

```tsx
import { CodeBlock } from "@/components/ui";
```

- **CodeBlockSize**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `code` | `string` | — | ✅ |
| `language` | `string` | — |  |
| `showLineNumbers` | `boolean` | `"false"` |  |
| `maxHeight` | `number` | — |  |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `onCopy` | `() => void` | — |  |

---

### ImageRenderer

```tsx
import { ImageRenderer } from "@/components/ui";
```

- **AspectRatio**: `"16:9" | "9:16" | "1:1" | "4:3" | "auto"`
- **Frame**: `"none" | "youtube" | "shorts" | "instagram"`
- **ImageState**: `"loading" | "loaded" | "error"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `src` | `string` | — | ✅ |
| `alt` | `string` | — |  |
| `aspectRatio` | `"16:9" \| "9:16" \| "1:1" \| "4:3" \| "auto"` | `"auto"` |  |
| `frame` | `"none" \| "youtube" \| "shorts" \| "instagram"` | `"none"` |  |
| `meta` | `ImageMeta` | — |  |
| `onDownload` | `() => void` | — |  |

---

### VideoRenderer

```tsx
import { VideoRenderer } from "@/components/ui";
```

- **AspectRatio**: `"16:9" | "9:16" | "1:1"`
- **Controls**: `"minimal" | "full"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `src` | `string` | — | ✅ |
| `poster` | `string` | — |  |
| `aspectRatio` | `"16:9" \| "9:16" \| "1:1"` | `"16:9"` |  |
| `controls` | `"minimal" \| "full"` | `"full"` |  |
| `autoPlay` | `boolean` | `"false"` |  |

---

### AudioRenderer

```tsx
import { AudioRenderer } from "@/components/ui";
```

- **AudioVariant**: `"compact" | "waveform"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `src` | `string` | — | ✅ |
| `title` | `string` | — |  |
| `variant` | `"compact" \| "waveform"` | `"compact"` |  |

---

### HtmlRenderer

```tsx
import { HtmlRenderer } from "@/components/ui";
```

- **ViewMode**: `"preview" | "code" | "split"`
- **DeviceFrame**: `"desktop" | "mobile" | "tablet"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `html` | `string` | — | ✅ |
| `viewMode` | `"preview" \| "code" \| "split"` | — |  |
| `deviceFrame` | `"desktop" \| "mobile" \| "tablet"` | — |  |
| `defaultHeight` | `number` | `"480"` |  |

---

### CompositeResult

```tsx
import { CompositeResult } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `tabs` | `CompositeTab[]` | — | ✅ |
| `defaultTab` | `string` | — |  |

---

### VersionToggle

```tsx
import { VersionToggle } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `versions` | `Version[]` | — | ✅ |
| `current` | `string` | — | ✅ |
| `onChange` | `(id: string) => void` | — | ✅ |

---

## Overlays

### Dropdown

```tsx
import { Dropdown } from "@/components/ui";
```

- **DropdownSize**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `trigger` | `ReactNode` | — | ✅ |
| `items` | `DropdownItem[]` | — | ✅ |
| `value` | `string` | — |  |
| `onChange` | `(value: string) => void` | — |  |
| `align` | `"left" \| "right"` | `"left"` |  |
| `size` | `"sm" \| "md"` | `"md"` |  |

---

### Modal

```tsx
import { Modal } from "@/components/ui";
```

- **ModalSize**: `"sm" | "md" | "lg" | "fullscreen"`
- **ModalVariant**: `"default" | "alert" | "confirm" | "form" | "bottomSheet"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `open` | `boolean` | — | ✅ |
| `onClose` | `() => void` | — | ✅ |
| `variant` | `"default" \| "alert" \| "confirm" \| "form" \| "bottomSheet"` | `"default"` |  |
| `size` | `"sm" \| "md" \| "lg" \| "fullscreen"` | `"md"` |  |
| `title` | `string` | — |  |
| `description` | `string` | — |  |
| `icon` | `ReactNode` | — |  |
| `children` | `ReactNode` | — |  |
| `footer` | `ReactNode` | — |  |
| `persistent` | `boolean` | `"false"` |  |

---

### CommandPalette

```tsx
import { CommandPalette } from "@/components/ui";
```

- **CommandPaletteSize**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `open` | `boolean` | — | ✅ |
| `items` | `CommandItem[]` | — | ✅ |
| `filter` | `string` | — |  |
| `onSelect` | `(value: string) => void` | — | ✅ |
| `onClose` | `() => void` | — |  |
| `maxItems` | `number` | `"8"` |  |
| `size` | `"sm" \| "md"` | `"md"` |  |

---

### Tooltip

```tsx
import { Tooltip } from "@/components/ui";
```

- **Side**: `"top" | "bottom" | "left" | "right"`
- **TooltipVariant**: `"default" | "rich"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `content` | `ReactNode` | — | ✅ |
| `variant` | `"default" \| "rich"` | `"default"` |  |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` |  |
| `maxWidth` | `number` | — |  |
| `delay` | `number` | `"300"` |  |
| `children` | `ReactNode` | — | ✅ |

---

### Toast

```tsx
import { Toast } from "@/components/ui";
```

- **Variant**: `"success" | "error" | "info"`
- **ToastSize**: `"sm" | "md"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"success" \| "error" \| "info"` | `"info"` |  |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `message` | `string` | — | ✅ |
| `duration` | `number` | `"3000"` |  |
| `visible` | `boolean` | `"true"` |  |
| `onDismiss` | `() => void` | — |  |

---

## Feedback

### InlineBanner

```tsx
import { InlineBanner } from "@/components/ui";
```

- **Variant**: `"info" | "warning" | "error" | "success"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `variant` | `"info" \| "warning" \| "error" \| "success"` | `"info"` |  |
| `message` | `string` | — | ✅ |
| `dismissible` | `boolean` | `"true"` |  |
| `onDismiss` | `() => void` | — |  |

---

### ErrorCard

```tsx
import { ErrorCard } from "@/components/ui";
```

- **ErrorCardVariant**: `"default" | "compact"`

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `title` | `string` | `"결과를 생성하지 못했어요"` |  |
| `description` | `string` | — |  |
| `suggestion` | `string` | — |  |
| `variant` | `"default" \| "compact"` | `"default"` |  |
| `onRetry` | `() => void` | — |  |

---

### EmptyState

```tsx
import { EmptyState } from "@/components/ui";
```

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `icon` | `ReactNode` | — |  |
| `title` | `string` | — | ✅ |
| `description` | `string` | — |  |
| `action` | `EmptyStateAction` | — |  |

---

