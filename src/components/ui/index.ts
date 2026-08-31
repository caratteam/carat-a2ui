/* ─── Icon ─── */
export { Icon, type IconProps, type IconWeight } from "./icon";
// IconGallery 는 «이 레포의 /preview 문서 페이지 전용» 개발자 도구다. 라이브러리 엔트리에서
// 내보내면 icon-gallery.tsx → lib/icon-registry.ts 가 @phosphor-icons/react 루트 배럴에서
// 아이콘 1,512개를 한 문장으로 named import 하고, tsup 이 dependencies 를 external 로 두므로
// 그 import 문이 dist/index.js:5 에 그대로 남는다. 소비자 번들러가 이걸 해석하면서
// 아이콘 모듈 1,512개(각각 모듈 스코프에서 forwardRef 호출 = 부수효과라 트리셰이킹 불가)가
// 전부 끌려온다 — carat.im 홈에서 gzip 978KB / 원본 4.76MB 단일 청크로 실측됐다(2026-08-27).
// 필요한 곳(preview/page.tsx)에서 파일 경로로 직접 import 한다.
// export { IconGallery } from "./icon-gallery";

/* ─── Primitives ─── */
export { Button, type ButtonProps } from "./button";
export { Input, type InputProps } from "./input";
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
export { Badge, type BadgeProps } from "./badge";
export { Chip, type ChipProps } from "./chip";
export { Tag, type TagProps } from "./tag";
export { Divider, type DividerProps } from "./divider";
export { Avatar, type AvatarProps } from "./avatar";
export { Spinner, type SpinnerProps } from "./spinner";
export { StatusIndicator, type StatusIndicatorProps } from "./status-indicator";
export { Skeleton, type SkeletonProps } from "./skeleton";

/* ─── Navigation ─── */
export { SegmentedControl, type SegmentedControlProps, type SegmentedControlItem } from "./segmented-control";
export { TabBar, type TabBarProps, type TabBarItem } from "./tab-bar";
export { SectionHeader, type SectionHeaderProps } from "./section-header";

/* ─── Input (extended) ─── */
export { Textarea, type TextareaProps } from "./textarea";
export { SearchInput, type SearchInputProps } from "./search-input";
export { ChatInput, type ChatInputProps } from "./chat-input";
export { ChipBar, type ChipBarProps, type ChipBarItem } from "./chip-bar";
export { ModelSelector, type ModelSelectorProps } from "./model-selector";

/* ─── Cards ─── */
export { PresetCard, type PresetCardProps } from "./preset-card";
export { SkillCard, type SkillCardProps } from "./skill-card";
export { SceneCard, type SceneCardProps, type SceneSection } from "./scene-card";
export { SceneCardList, type SceneCardListProps } from "./scene-card-list";
export { FileCard, type FileCardProps } from "./file-card";
export { ImagePicker, type ImagePickerItem } from "./image-picker";
export { HistoryItem, type HistoryItemProps } from "./history-item";

/* ─── Agent Execution ─── */
export { MessageBubble, type MessageBubbleProps } from "./message-bubble";
export { StepIndicator, type StepIndicatorProps, type Step } from "./step-indicator";
export { CollapsibleLog, type CollapsibleLogProps, type LogEntry } from "./collapsible-log";
export { StreamingText, type StreamingTextProps } from "./streaming-text";

/* ─── Result Renderers ─── */
export { ActionBar, type ActionBarProps, type Action } from "./action-bar";
export { MetaInfoBar, type MetaInfoBarProps, type MetaItem } from "./meta-info-bar";
export { MarkdownRenderer, type MarkdownRendererProps } from "./markdown-renderer";
export { CodeBlock, type CodeBlockProps } from "./code-block";
export { ImageRenderer, type ImageRendererProps } from "./image-renderer";
export { VideoRenderer, type VideoRendererProps } from "./video-renderer";
export { AudioRenderer, type AudioRendererProps } from "./audio-renderer";
export { HTMLRenderer, type HTMLRendererProps } from "./html-renderer";
export { CompositeResult, type CompositeResultProps, type CompositeTab } from "./composite-result";
export { VersionToggle, type VersionToggleProps } from "./version-toggle";

/* ─── Overlays ─── */
export { Dropdown, type DropdownProps, type DropdownItem } from "./dropdown";
export { Modal, type ModalProps } from "./modal";
export { CommandPalette, type CommandPaletteProps, type CommandItem } from "./command-palette";
export { Tooltip, type TooltipProps } from "./tooltip";
export { Toast, type ToastProps } from "./toast";

/* ─── Feedback ─── */
export { InlineBanner, type InlineBannerProps } from "./inline-banner";
export { ErrorCard, type ErrorCardProps } from "./error-card";
export { EmptyState, type EmptyStateProps } from "./empty-state";
