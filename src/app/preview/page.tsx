"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/theme";
import {
  Button,
  Icon,
  IconGallery,
  Input,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge,
  Chip,
  Tag,
  Divider,
  Avatar,
  Spinner,
  StatusIndicator,
  Skeleton,
  Tooltip,
  Toast,
  SegmentedControl,
  TabBar,
  SectionHeader,
  Textarea,
  SearchInput,
  ChatInput,
  ChipBar,
  ModelSelector,
  PresetCard,
  SkillCard,
  HistoryItem,
  MessageBubble,
  StepIndicator,
  CollapsibleLog,
  StreamingText,
  ActionBar,
  MetaInfoBar,
  CodeBlock,
  SceneCard,
  SceneCardList,
  ImageRenderer,
  VideoRenderer,
  AudioRenderer,
  HTMLRenderer,
  FileCard,
  CompositeResult,
  VersionToggle,
  Dropdown,
  Modal,
  CommandPalette,
  InlineBanner,
  ErrorCard,
  EmptyState,
  MarkdownRenderer,
} from "@/components/ui";

import {
  IcSearch, IcPlus, IcCheck, IcCheckCircle,
  IcChatDots, IcVideo, IcFilmSlate,
  IcDownloadSimple, IcCopy, IcExport, IcLink, IcTrash,
  IcLightning, IcSparkle,
  IcHeart, IcYoutube,
  IcArticle, IcTranslate, IcAnalytics, IcTarget,
  IcSun, IcMoon,
} from "@/lib/icons";

const TOP_GROUPS = ["A2UI", "Carat 2.0", "Icons"] as const;

const CARAT_SECTIONS = ["Primitives", "Navigation", "Input", "Cards", "Agent", "Renderers", "Overlays", "Feedback"] as const;

const A2UI_SECTIONS = ["Layout", "Display", "Interactive", "Container"] as const;

export default function PreviewPage() {
  const { resolved, setTheme } = useTheme();
  const [topGroup, setTopGroup] = useState<string>("A2UI");
  const [caratSection, setCaratSection] = useState<string>("Primitives");
  const [a2uiSection, setA2uiSection] = useState<string>("Layout");
  const [segValue, setSegValue] = useState("2.0");
  const [tabValue, setTabValue] = useState("script");
  const [chatValue, setChatValue] = useState("");
  const [chatMode, setChatMode] = useState<"default" | "skill-selected" | "generating">("default");
  const [searchValue, setSearchValue] = useState("");
  const [modelValue, setModelValue] = useState("agent-2.0");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [versionValue, setVersionValue] = useState("v2");

  // alias for backward compat with existing section renders
  const activeSection = topGroup === "Carat 2.0" ? caratSection : topGroup === "Icons" ? "Icons" : "";

  return (
    <div className="min-h-screen bg-background">
      {showBanner && (
        <InlineBanner
          variant="info"
          message="A2UI 컴포넌트 미리보기 — 45개 컴포넌트 + Phosphor Icons 149개 토큰"
          onDismiss={() => setShowBanner(false)}
        />
      )}

      <div className="max-w-[960px] mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-[length:var(--text-large-title)] font-bold text-label">
              캐럿 2.0 컴포넌트 미리보기
            </h1>
            <p className="text-[length:var(--text-body)] text-label-secondary mt-2">
              Apple HIG 기준 · 45개 컴포넌트 · Phosphor Icons · Light/Dark 대응
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 mt-1">
            <button
              onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
              className={cn(
                "h-9 w-9 rounded-[var(--radius-sm)] flex items-center justify-center transition-colors",
                "text-label-secondary hover:bg-fill-tertiary hover:text-label"
              )}
              aria-label={resolved === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            >
              {resolved === "dark"
                ? <IcSun size={20} weight="bold" />
                : <IcMoon size={20} weight="bold" />
              }
            </button>
          </div>
        </div>

        {/* Top group nav */}
        <div className="sticky top-0 bg-background py-3 z-10 border-b border-separator mb-6 space-y-3">
          {/* Level 1: Group tabs — segmented style */}
          <div className="inline-flex bg-fill-tertiary rounded-[var(--radius-md)] p-1 gap-0.5">
            {TOP_GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => setTopGroup(g)}
                className={cn(
                  "h-9 px-5 rounded-[var(--radius-sm)] text-[length:var(--text-subhead)] font-semibold transition-all",
                  topGroup === g
                    ? "bg-white dark:bg-bg-tertiary text-label shadow-[var(--shadow-sm)]"
                    : "text-label-secondary hover:text-label"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Level 2: Sub-section tabs */}
          {topGroup === "Carat 2.0" && (
            <div className="flex flex-wrap gap-1.5">
              {CARAT_SECTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setCaratSection(s)}
                  className={cn(
                    "h-7 px-2.5 rounded-full text-[length:var(--text-caption1)] font-medium transition-colors",
                    caratSection === s
                      ? "bg-primary text-white"
                      : "bg-fill-tertiary text-label-secondary hover:text-label"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {topGroup === "A2UI" && (
            <div className="flex flex-wrap gap-1.5">
              {A2UI_SECTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setA2uiSection(s)}
                  className={cn(
                    "h-7 px-2.5 rounded-full text-[length:var(--text-caption1)] font-medium transition-colors",
                    a2uiSection === s
                      ? "bg-primary text-white"
                      : "bg-fill-tertiary text-label-secondary hover:text-label"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ──────────── ICONS ──────────── */}
        {activeSection === "Icons" && (
          <div className="space-y-6">
            <IconGallery />
          </div>
        )}

        {/* ──────────── PRIMITIVES ──────────── */}
        {activeSection === "Primitives" && (
          <div className="space-y-10">
            <Section title="Button" a2ui>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tinted">Tinted</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button iconOnly size="md"><IcLightning size={18} weight="fill" /></Button>
              </div>
            </Section>

            <Section title="Badge" a2ui>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="agent">Agent</Badge>
                <Badge variant="error" size="md">NEW</Badge>
              </div>
            </Section>

            <Section title="Chip" a2ui>
              <div className="flex flex-wrap gap-2">
                <Chip>Default</Chip>
                <Chip variant="selected">Selected</Chip>
                <Chip variant="outline">Outline</Chip>
                <Chip icon={<IcFilmSlate size={14} />}>영상대본</Chip>
                <Chip size="sm">Small</Chip>
                <Chip disabled>Disabled</Chip>
              </div>
            </Section>

            <Section title="Tag" a2ui>
              <div className="flex flex-wrap gap-2">
                <Tag>Default</Tag>
                <Tag variant="agent">Agent</Tag>
                <Tag variant="skill">Skill</Tag>
                <Tag variant="skill" removable onRemove={() => {}}><IcFilmSlate size={12} /> 영상대본</Tag>
                <Tag size="sm">Small</Tag>
              </div>
            </Section>

            <Section title="Avatar" a2ui>
              <div className="flex items-center gap-3">
                <Avatar size="sm" initials="S" />
                <Avatar size="md" initials="MD" />
                <Avatar size="lg" initials="LG" />
                <Avatar size="md" />
              </div>
            </Section>

            <Section title="Divider" a2ui>
              <Divider spacing="compact" />
              <Divider />
              <Divider spacing="wide" />
              <Divider variant="section" />
              <Divider label="OR" />
            </Section>

            <Section title="Spinner">
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </Section>

            <Section title="StatusIndicator">
              <div className="flex items-center gap-6">
                <StatusIndicator status="running" label="생성 중" />
                <StatusIndicator status="complete" label="완료" />
                <StatusIndicator status="stopped" label="중단됨" />
                <StatusIndicator status="error" label="에러" />
              </div>
            </Section>

            <Section title="Skeleton">
              <p className="text-[length:var(--text-caption1)] text-label-tertiary mb-1">size: sm / md / lg</p>
              <div className="space-y-2">
                <Skeleton variant="text" size="sm" width="60%" />
                <Skeleton variant="text" size="md" width="80%" />
                <Skeleton variant="text" size="lg" width="40%" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <Skeleton variant="card" size="sm" />
                <Skeleton variant="card" size="md" />
                <Skeleton variant="card" size="lg" />
              </div>
              <div className="flex gap-3 mt-3">
                <Skeleton variant="circle" size="sm" />
                <Skeleton variant="circle" size="md" />
                <Skeleton variant="circle" size="lg" />
              </div>
            </Section>

            <Section title="Tooltip" a2ui>
              <div className="flex gap-4">
                <Tooltip content="위쪽 툴팁" side="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
                <Tooltip content="아래쪽 툴팁" side="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
                <Tooltip content="왼쪽 툴팁" side="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
                <Tooltip content="오른쪽 툴팁" side="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
              </div>
              <div className="flex gap-4">
                <Tooltip variant="rich" content="리치 툴팁: 긴 설명이나 부가 정보를 표시합니다. 밝은 배경에 그림자가 적용됩니다."><Button variant="outline" size="sm">Rich Tooltip</Button></Tooltip>
              </div>
            </Section>
          </div>
        )}

        {/* ──────────── NAVIGATION ──────────── */}
        {activeSection === "Navigation" && (
          <div className="space-y-10">
            <Section title="SegmentedControl" a2ui>
              <SegmentedControl
                items={[
                  { label: "1.0", value: "1.0" },
                  { label: "2.0", value: "2.0", badge: "N" },
                ]}
                value={segValue}
                onChange={setSegValue}
                size="md"
              />
            </Section>

            <Section title="TabBar — Underline" a2ui>
              <TabBar
                items={[
                  { label: "대본", value: "script" },
                  { label: "제목·설명", value: "meta" },
                  { label: "태그", value: "tags" },
                ]}
                value={tabValue}
                onChange={setTabValue}
              />
            </Section>

            <Section title="TabBar — Pill" a2ui>
              <TabBar
                items={[
                  { label: "전체", value: "all" },
                  { label: "영상", value: "video" },
                  { label: "글쓰기", value: "writing" },
                  { label: "마케팅", value: "marketing" },
                ]}
                value={tabValue}
                onChange={setTabValue}
                variant="pill"
              />
            </Section>

            <Section title="SectionHeader" a2ui>
              <SectionHeader size="lg" title="페이지 헤더 (lg)" action={<Button variant="ghost" size="sm">모두 보기</Button>} />
              <SectionHeader title="섹션 헤더 (md)" action={<Button variant="ghost" size="sm">더보기</Button>} />
              <SectionHeader size="sm" title="서브섹션 헤더 (sm)" action={<Button variant="ghost" size="sm">편집</Button>} />
            </Section>
          </div>
        )}

        {/* ──────────── INPUT ──────────── */}
        {activeSection === "Input" && (
          <div className="space-y-10">
            <Section title="Input" a2ui>
              <div className="space-y-3 max-w-md">
                <Input placeholder="기본 입력" />
                <Input size="sm" placeholder="Small" />
                <Input error placeholder="에러 상태" />
                <Input
                  leftIcon={<IcSearch size={16} className="text-label-tertiary" />}
                  placeholder="아이콘 포함"
                />
                <Input disabled placeholder="Disabled" />
              </div>
            </Section>

            <Section title="Textarea" a2ui>
              <div className="space-y-3 max-w-md">
                <Textarea size="sm" placeholder="Small 텍스트 영역" minRows={2} />
                <Textarea placeholder="Medium (기본) 텍스트 영역" autoResize minRows={2} maxRows={6} />
              </div>
            </Section>

            <Section title="SearchInput" a2ui>
              <div className="max-w-sm space-y-3">
                <SearchInput
                  placeholder="스킬 검색... (default)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue("")}
                />
                <SearchInput variant="filled" placeholder="검색... (filled)" />
              </div>
            </Section>

            <Section title="ChipBar" a2ui>
              <ChipBar
                items={[
                  { icon: <IcFilmSlate size={14} />, label: "영상대본", value: "script" },
                  { icon: <IcLightning size={14} />, label: "숏폼", value: "shorts" },
                  { icon: <IcArticle size={14} />, label: "블로그", value: "blog" },
                  { icon: <IcTarget size={14} />, label: "마케팅", value: "marketing" },
                ]}
                selected="script"
                onChange={() => {}}
                onMore={() => {}}
              />
            </Section>

            <Section title="ModelSelector" a2ui>
              <ModelSelector
                items={[
                  { label: "캐럿 2.0 Agent", value: "agent-2.0", icon: <IcLightning size={14} weight="fill" />, group: "2.0" },
                  { label: "캐럿 1.0 Soul", value: "soul-1.0", group: "1.0" },
                  { label: "캐럿 1.0 Flash", value: "flash-1.0", group: "1.0" },
                ]}
                value={modelValue}
                onChange={setModelValue}
              />
            </Section>

            <Section title="ChatInput" a2ui>
              <div className="space-y-4">
                <ChatInput
                  mode={chatMode}
                  value={chatValue}
                  onChange={setChatValue}
                  onSend={() => setChatMode("generating")}
                  onStop={() => setChatMode("default")}
                  skillTag={
                    chatMode === "skill-selected" ? (
                      <Tag variant="skill" removable onRemove={() => setChatMode("default")}>
                        <IcFilmSlate size={12} /> 영상대본
                      </Tag>
                    ) : undefined
                  }
                  toolbar={
                    <>
                      <Button variant="ghost" size="sm" iconOnly><IcPlus size={16} /></Button>
                      <Button variant="ghost" size="sm" iconOnly><IcSparkle size={16} /></Button>
                    </>
                  }
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setChatMode("default")}>Default</Button>
                  <Button size="sm" variant="outline" onClick={() => setChatMode("skill-selected")}>Skill Selected</Button>
                  <Button size="sm" variant="outline" onClick={() => setChatMode("generating")}>Generating</Button>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ──────────── CARDS ──────────── */}
        {activeSection === "Cards" && (
          <div className="space-y-10">
            <Section title="Card" a2ui>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader><CardTitle>Default</CardTitle><CardDescription>border + background</CardDescription></CardHeader>
                  <CardContent><p className="text-[length:var(--text-footnote)] text-label-secondary">기본 카드</p></CardContent>
                </Card>
                <Card variant="outlined">
                  <CardHeader><CardTitle>Outlined</CardTitle><CardDescription>border only</CardDescription></CardHeader>
                  <CardContent><p className="text-[length:var(--text-footnote)] text-label-secondary">외곽선 카드</p></CardContent>
                </Card>
                <Card variant="elevated">
                  <CardHeader><CardTitle>Elevated</CardTitle><CardDescription>shadow + bg</CardDescription></CardHeader>
                  <CardContent><p className="text-[length:var(--text-footnote)] text-label-secondary">그림자 카드</p></CardContent>
                </Card>
              </div>
            </Section>

            <Section title="PresetCard" a2ui>
              <div className="grid grid-cols-3 gap-3">
                <PresetCard icon={<IcYoutube size={24} />} title="유튜브 롱폼" description="유튜브/숏폼 영상 스크립트 생성" />
                <PresetCard icon={<IcLightning size={24} weight="fill" />} title="숏폼 스크립트" description="60초 이내 핵심 압축 스크립트" />
                <PresetCard icon={<IcArticle size={24} />} title="블로그 아티클" description="SEO 최적화 장문 콘텐츠" />
              </div>
            </Section>

            <Section title="SkillCard" a2ui>
              <div className="grid grid-cols-3 gap-3">
                <SkillCard icon={<IcFilmSlate size={20} />} title="영상대본" description="유튜브/숏폼 영상 스크립트 생성" category="영상" />
                <SkillCard icon={<IcVideo size={20} />} title="영상기획" description="콘셉트, 구성안, 촬영 가이드" category="영상" />
                <SkillCard icon={<IcAnalytics size={20} />} title="영상구조분석" description="레퍼런스 영상 구조 분석" category="영상" />
              </div>
            </Section>

            <Section title="HistoryItem" a2ui>
              <div className="max-w-[260px] space-y-1 bg-bg-secondary rounded-[var(--radius-md)] p-2">
                <HistoryItem title="AI 트렌드 영상 대본" mode="2.0" status="complete" selected />
                <HistoryItem title="제품 소개 숏폼" mode="2.0" status="running" />
                <HistoryItem title="뉴스레터 초안" mode="2.0" status="stopped" />
                <HistoryItem title="일반 대화" mode="1.0" status="complete" />
                <HistoryItem title="에러 발생" mode="2.0" status="error" />
              </div>
            </Section>

            <Section title="SceneCard" a2ui>
              <SceneCard
                sceneNumber={1}
                timeCode="0:00~0:15"
                sections={[
                  { label: "화면", content: "타이틀 모션 + 배경음악" },
                  { label: "내레이션", content: "\"2026년, AI는 더 이상 도구가 아닙니다.\"" },
                  { label: "자막", content: "2026년 AI는 더 이상 도구가 아니다" },
                ]}
                onEdit={() => {}}
                onRegenerate={() => {}}
                onCopy={() => {}}
              />
            </Section>

            <Section title="SceneCardList" a2ui>
              <SceneCardList
                scenes={[
                  {
                    sceneNumber: 1,
                    timeCode: "0:00~0:15",
                    sections: [
                      { label: "화면", content: "타이틀 모션 + 배경음악" },
                      { label: "내레이션", content: "안녕하세요, 오늘은 AI 트렌드를 알아보겠습니다." },
                    ],
                  },
                  {
                    sceneNumber: 2,
                    timeCode: "0:15~0:45",
                    sections: [
                      { label: "화면", content: "인포그래픽 + B-Roll" },
                      { label: "내레이션", content: "첫 번째 트렌드는 멀티모달 AI입니다." },
                    ],
                  },
                  {
                    sceneNumber: 3,
                    timeCode: "0:45~1:30",
                    sections: [
                      { label: "화면", content: "데모 영상 + 자막" },
                      { label: "내레이션", content: "두 번째 트렌드는 에이전트 기반 서비스입니다." },
                    ],
                  },
                ]}
              />
            </Section>

            <Section title="FileCard" a2ui>
              <div className="max-w-sm space-y-2">
                <FileCard fileName="영상_대본_v2.srt" fileSize="1.2 KB" onDownload={() => {}} />
                <FileCard fileName="썸네일.png" fileType="png" fileSize="340 KB" variant="download" onDownload={() => {}} />
                <FileCard fileName="프로젝트.zip" fileSize="8.2 MB" variant="upload" />
              </div>
            </Section>
          </div>
        )}

        {/* ──────────── AGENT ──────────── */}
        {activeSection === "Agent" && (
          <div className="space-y-10">
            <Section title="MessageBubble — User">
              <MessageBubble role="user" skillTag={<Tag variant="skill" size="sm"><IcFilmSlate size={11} /> 영상대본</Tag>}>
                AI 트렌드 10분짜리 유튜브 영상 대본 만들어줘. 톤은 캐주얼하게.
              </MessageBubble>
            </Section>

            <Section title="MessageBubble — Agent">
              <MessageBubble role="agent">
                네, AI 트렌드 유튜브 영상 대본을 작성해드리겠습니다. 10분 분량으로 캐주얼한 톤에 맞춰 구성할게요.
              </MessageBubble>
            </Section>

            <Section title="MessageBubble — Error">
              <MessageBubble role="agent" variant="error">
                요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
              </MessageBubble>
            </Section>

            <Section title="MessageBubble — System">
              <MessageBubble role="agent" variant="system">
                스킬이 '영상대본'으로 변경되었습니다.
              </MessageBubble>
            </Section>

            <Section title="StepIndicator" a2ui>
              <StepIndicator
                steps={[
                  { label: "구조 설계", state: "completed" },
                  { label: "대본 작성", state: "active" },
                  { label: "제목·태그", state: "pending" },
                  { label: "완료", state: "pending" },
                ]}
              />
            </Section>

            <Section title="CollapsibleLog" a2ui>
              <CollapsibleLog
                defaultOpen
                entries={[
                  { status: "success", message: "스킬 '영상대본' 선택" },
                  { status: "success", message: "3개 구조안 생성 → 1안 채택" },
                  { status: "running", message: "씬 1~4 대본 작성 중..." },
                ]}
              />
            </Section>

            <Section title="StreamingText" a2ui>
              <div className="space-y-4">
                <div>
                  <p className="text-[length:var(--text-caption1)] text-label-tertiary mb-1">streaming</p>
                  <StreamingText content="2026년, AI는 더 이상 단순한 도구가 아닙니다. 오늘 여러분에게 보여드릴 5가지 트렌드를 통해" state="streaming" />
                </div>
                <div>
                  <p className="text-[length:var(--text-caption1)] text-label-tertiary mb-1">stopped</p>
                  <StreamingText content="2026년, AI는 더 이상 단순한 도구가 아닙니다." state="stopped" />
                </div>
              </div>
            </Section>

            <Section title="VersionToggle">
              <VersionToggle
                versions={[
                  { label: "v1", id: "v1" },
                  { label: "v2", id: "v2" },
                  { label: "v3", id: "v3" },
                ]}
                current={versionValue}
                onChange={setVersionValue}
              />
            </Section>

            <Section title="ActionBar" a2ui>
              <ActionBar actions={["copy", "download", "regenerate", "edit"]} onAction={() => {}} />
            </Section>

            <Section title="MetaInfoBar" a2ui>
              <MetaInfoBar
                items={[
                  { label: "", value: "2,340자" },
                  { label: "씬", value: "12개" },
                  { label: "예상", value: "8:42" },
                ]}
              />
            </Section>
          </div>
        )}

        {/* ──────────── RENDERERS ──────────── */}
        {activeSection === "Renderers" && (
          <div className="space-y-10">
            <Section title="MarkdownRenderer" a2ui>
              <MarkdownRenderer content={`# 제목 1\n## 제목 2\n### 제목 3\n\n본문 텍스트입니다. **굵게** *기울임* \`인라인 코드\`\n\n- 목록 항목 1\n- 목록 항목 2\n\n> 인용문입니다.\n\n[링크 텍스트](https://example.com)`} />
            </Section>

            <Section title="CodeBlock">
              <p className="text-[length:var(--text-caption1)] text-label-tertiary mb-1">size: sm</p>
              <CodeBlock
                size="sm"
                language="typescript"
                code={`import { Button } from "@/components/ui";`}
              />
              <p className="text-[length:var(--text-caption1)] text-label-tertiary mb-1 mt-3">size: md (default)</p>
              <CodeBlock
                language="typescript"
                showLineNumbers
                code={`import { Button } from "@/components/ui";

export function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`}
              />
            </Section>

            <Section title="ImageRenderer — YouTube Frame" a2ui>
              <ImageRenderer
                src="https://picsum.photos/800/450"
                aspectRatio="16:9"
                frame="youtube"
                meta={{ width: 1920, height: 1080, format: "PNG", size: "2.4MB" }}
                onDownload={() => {}}
              />
            </Section>

            <Section title="VideoRenderer">
              <VideoRenderer
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                aspectRatio="16:9"
                controls="full"
              />
            </Section>

            <Section title="AudioRenderer">
              <AudioRenderer
                src="https://www.w3schools.com/html/horse.mp3"
                title="Sample Audio"
                variant="compact"
              />
            </Section>

            <Section title="HTMLRenderer">
              <HTMLRenderer
                html={`<!DOCTYPE html><html><head><style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f0f4ff;} .card{background:white;padding:24px 32px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:center;} h1{color:#007AFF;font-size:24px;margin:0 0 8px;} p{color:#666;font-size:14px;margin:0;}</style></head><body><div class="card"><h1>Hello A2UI</h1><p>HTML 프리뷰 컴포넌트</p></div></body></html>`}
                defaultHeight={300}
              />
            </Section>

            <Section title="FileCard" a2ui>
              <div className="space-y-2 max-w-sm">
                <FileCard fileName="script_final.srt" fileSize="1.2 KB" onDownload={() => {}} />
                <FileCard fileName="thumbnail.png" fileType="png" fileSize="340 KB" size="md" onDownload={() => {}} />
              </div>
            </Section>

            <Section title="CompositeResult" a2ui>
              <CompositeResult
                tabs={[
                  {
                    label: "대본",
                    value: "script",
                    content: <MarkdownRenderer content="**씬 1** — 인트로\n\n안녕하세요, 오늘은 AI 트렌드에 대해 이야기해보겠습니다." />,
                  },
                  {
                    label: "제목·설명",
                    value: "meta",
                    content: <MarkdownRenderer content="**제목:** 2026년 AI 트렌드 TOP 5\n\n**설명:** 올해 가장 주목할 AI 트렌드를 정리했습니다." />,
                  },
                  {
                    label: "태그",
                    value: "tags",
                    content: (
                      <div className="flex flex-wrap gap-2">
                        {["AI", "트렌드", "2026", "인공지능", "테크"].map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </Section>
          </div>
        )}

        {/* ──────────── OVERLAYS ──────────── */}
        {activeSection === "Overlays" && (
          <div className="space-y-10">
            <Section title="Dropdown" a2ui>
              <div className="flex gap-3">
                <Dropdown
                  size="sm"
                  trigger={<Button variant="outline" size="sm">Small</Button>}
                  items={[
                    { label: "편집", value: "edit" },
                    { label: "복제", value: "dup" },
                    { label: "삭제", value: "del" },
                  ]}
                />
                <Dropdown
                  trigger={<Button variant="outline">Medium (기본)</Button>}
                  items={[
                    { label: "캐럿 2.0 Agent", value: "agent", icon: <IcLightning size={16} weight="fill" />, group: "2.0" },
                    { label: "캐럿 1.0 Soul", value: "soul", group: "1.0" },
                    { label: "캐럿 1.0 Flash", value: "flash", group: "1.0" },
                  ]}
                  value="agent"
                  onChange={() => {}}
                />
              </div>
            </Section>

            <Section title="Modal (5 variants)" a2ui>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowModal(true)}>Default</Button>
                <Button variant="outline" size="sm" onClick={() => setShowAlert(true)}>Alert</Button>
                <Button variant="outline" size="sm" onClick={() => setShowConfirm(true)}>Confirm</Button>
                <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>Form</Button>
                <Button variant="outline" size="sm" onClick={() => setShowSheet(true)}>BottomSheet</Button>
              </div>
              {/* Default */}
              <Modal open={showModal} onClose={() => setShowModal(false)} title="스킬 브라우저" description="에이전트에 사용할 스킬을 선택하세요">
                <SearchInput placeholder="스킬 검색..." className="mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  <SkillCard icon={<IcFilmSlate size={20} />} title="영상대본" description="유튜브/숏폼 영상 스크립트" />
                  <SkillCard icon={<IcLightning size={20} weight="fill" />} title="숏폼" description="60초 이내 핵심 압축" />
                  <SkillCard icon={<IcArticle size={20} />} title="블로그" description="SEO 최적화 장문 콘텐츠" />
                  <SkillCard icon={<IcTarget size={20} />} title="마케팅 카피" description="광고/CTA 카피라이팅" />
                </div>
              </Modal>
              {/* Alert */}
              <Modal
                open={showAlert}
                onClose={() => setShowAlert(false)}
                variant="alert"
                size="sm"
                title="생성 완료"
                description="유튜브 대본이 성공적으로 생성되었습니다."
                icon={<IcCheckCircle size={28} weight="fill" className="text-success" />}
                footer={<Button variant="primary" className="w-full" onClick={() => setShowAlert(false)}>확인</Button>}
              />
              {/* Confirm */}
              <Modal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                variant="confirm"
                size="sm"
                persistent
                title="대화를 삭제할까요?"
                description="이 대화와 관련된 모든 기록이 영구적으로 삭제됩니다."
                icon={<IcTrash size={28} weight="fill" className="text-error" />}
                footer={
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>취소</Button>
                    <Button variant="danger" className="flex-1" onClick={() => setShowConfirm(false)}>삭제</Button>
                  </div>
                }
              />
              {/* Form */}
              <Modal
                open={showForm}
                onClose={() => setShowForm(false)}
                variant="form"
                title="새 프로젝트"
                footer={
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowForm(false)}>취소</Button>
                    <Button variant="primary" onClick={() => setShowForm(false)}>생성</Button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-[length:var(--text-footnote)] font-medium text-label mb-1.5">이름</label>
                    <Input placeholder="프로젝트 이름" />
                  </div>
                  <div>
                    <label className="block text-[length:var(--text-footnote)] font-medium text-label mb-1.5">설명</label>
                    <Textarea placeholder="간단한 설명..." minRows={3} />
                  </div>
                </div>
              </Modal>
              {/* BottomSheet */}
              <Modal open={showSheet} onClose={() => setShowSheet(false)} variant="bottomSheet" title="공유하기">
                <div className="space-y-1">
                  {[
                    { icon: <IcLink size={20} />, label: "링크 복사" },
                    { icon: <IcExport size={20} />, label: "내보내기" },
                    { icon: <IcCopy size={20} />, label: "대본 복사" },
                    { icon: <IcDownloadSimple size={20} />, label: "파일로 다운로드" },
                  ].map(({ icon, label }) => (
                    <button key={label} onClick={() => setShowSheet(false)} className="w-full flex items-center gap-3 h-12 px-3 rounded-[var(--radius-md)] text-[length:var(--text-body)] text-label hover:bg-fill-tertiary transition-colors">
                      <span className="text-label-secondary">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </Modal>
            </Section>

            <Section title="CommandPalette" a2ui>
              <div className="relative max-w-lg">
                <Button onClick={() => setShowCommand(!showCommand)} variant="outline">
                  {showCommand ? "닫기" : "커맨드 팔레트 열기"}
                </Button>
                <div className="relative mt-4">
                  <CommandPalette
                    open={showCommand}
                    items={[
                      { icon: <IcFilmSlate size={18} />, label: "영상대본", description: "유튜브/숏폼 영상 스크립트 생성", value: "script" },
                      { icon: <IcLightning size={18} weight="fill" />, label: "숏폼 스크립트", description: "60초 이내 핵심 압축", value: "shorts" },
                      { icon: <IcArticle size={18} />, label: "블로그 아티클", description: "SEO 최적화 장문 콘텐츠", value: "blog" },
                    ]}
                    onSelect={() => setShowCommand(false)}
                    onClose={() => setShowCommand(false)}
                  />
                  <div className="h-1" />
                </div>
              </div>
            </Section>

            <Section title="Toast" a2ui>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowToast(true)}>토스트 표시 (md)</Button>
              </div>
              <Toast variant="success" message="클립보드에 복사되었습니다" visible={showToast} onDismiss={() => setShowToast(false)} />
              <p className="text-[length:var(--text-caption1)] text-label-tertiary mt-2">size: sm — 모바일에 적합한 작은 토스트</p>
            </Section>
          </div>
        )}

        {/* ──────────── FEEDBACK ──────────── */}
        {activeSection === "Feedback" && (
          <div className="space-y-10">
            <Section title="InlineBanner">
              <div className="space-y-2">
                <InlineBanner variant="info" message="정보 배너입니다." />
                <InlineBanner variant="warning" message="경고 배너입니다." />
                <InlineBanner variant="error" message="에러 배너입니다." />
                <InlineBanner variant="success" message="성공 배너입니다." />
              </div>
            </Section>

            <Section title="ErrorCard" a2ui>
              <ErrorCard
                description="요청을 더 구체적으로 해보세요."
                suggestion="10분짜리 AI 트렌드 유튜브 대본"
                onRetry={() => {}}
              />
              <p className="text-[length:var(--text-caption1)] text-label-tertiary mt-3 mb-1">variant: compact</p>
              <ErrorCard
                variant="compact"
                description="네트워크 오류가 발생했습니다."
                onRetry={() => {}}
              />
            </Section>

            <Section title="EmptyState">
              <EmptyState
                icon={<IcChatDots size={48} />}
                title="아직 대화가 없어요"
                description="새 에이전트 채팅을 시작해보세요"
                action={{ label: "+ 시작하기", onClick: () => {} }}
              />
            </Section>
          </div>
        )}

        {/* ──────────── A2UI ──────────── */}
        {topGroup === "A2UI" && a2uiSection === "Layout" && (
          <div className="space-y-10">
            {/* Row */}
            <A2UIGroup a2ui="Row" desc="수평 레이아웃. children을 좌→우로 배치">
              <Section title="ActionBar">
                <ActionBar actions={["copy", "download", "edit"]} onAction={() => {}} />
              </Section>
              <Section title="MetaInfoBar">
                <MetaInfoBar items={[
                  { label: "모델", value: "GPT-4o" },
                  { label: "토큰", value: "1,234" },
                  { label: "시간", value: "2.3초" },
                ]} />
              </Section>
              <Section title="ChipBar">
                <ChipBar
                  items={[
                    { label: "전체", value: "all" }, { label: "텍스트", value: "text" },
                    { label: "이미지", value: "image" }, { label: "코드", value: "code" },
                  ]}
                  selected={tabValue}
                  onChange={setTabValue}
                />
              </Section>
            </A2UIGroup>

            {/* Column */}
            <A2UIGroup a2ui="Column" desc="수직 레이아웃. children을 위→아래로 배치">
              <Section title="Card">
                <Card>
                  <CardHeader><CardTitle>Card 컴포넌트</CardTitle><CardDescription>A2UI Column에 대응하는 수직 컨테이너</CardDescription></CardHeader>
                  <CardContent><p className="text-[length:var(--text-body)] text-label-secondary">콘텐츠가 위→아래로 배치됩니다.</p></CardContent>
                </Card>
              </Section>
              <Section title="SceneCard">
                <SceneCard
                  sceneNumber={1}
                  timeCode="0:00~0:15"
                  sections={[
                    { label: "화면", content: "타이틀 모션 + 배경음악" },
                    { label: "내레이션", content: "\"2026년, AI는 더 이상 도구가 아닙니다.\"" },
                  ]}
                  onEdit={() => {}}
                  onCopy={() => {}}
                />
              </Section>
            </A2UIGroup>

            {/* List */}
            <A2UIGroup a2ui="List" desc="스크롤 가능한 목록. 정적/동적 template 지원">
              <Section title="HistoryItem">
                <div className="space-y-2 max-w-[280px]">
                  <HistoryItem title="유튜브 대본 작성" mode="2.0" onClick={() => {}} />
                  <HistoryItem title="블로그 포스트 번역" mode="1.0" onClick={() => {}} />
                  <HistoryItem title="코드 리뷰 요청" mode="2.0" onClick={() => {}} />
                </div>
              </Section>
              <Section title="CollapsibleLog">
                <CollapsibleLog
                  defaultOpen
                  entries={[
                    { status: "success", message: "스킬 '영상대본' 선택" },
                    { status: "success", message: "3개 구조안 생성 → 1안 채택" },
                    { status: "running", message: "씬 1~4 대본 작성 중..." },
                  ]}
                />
              </Section>
              <Section title="StepIndicator">
                <StepIndicator
                  steps={[
                    { label: "구조 설계", state: "completed" },
                    { label: "대본 작성", state: "active" },
                    { label: "제목·태그", state: "pending" },
                  ]}
                />
              </Section>
              <Section title="SceneCardList">
                <SceneCardList
                  scenes={[
                    { sceneNumber: 1, timeCode: "0:00~0:15", sections: [{ label: "화면", content: "타이틀 모션" }, { label: "내레이션", content: "안녕하세요, 오늘은 AI 트렌드를 알아보겠습니다." }] },
                    { sceneNumber: 2, timeCode: "0:15~0:45", sections: [{ label: "화면", content: "인포그래픽 + B-Roll" }, { label: "내레이션", content: "첫 번째 트렌드는 멀티모달 AI입니다." }] },
                  ]}
                />
              </Section>
            </A2UIGroup>
          </div>
        )}

        {topGroup === "A2UI" && a2uiSection === "Display" && (
          <div className="space-y-10">
            <A2UIGroup a2ui="Text" desc="텍스트 콘텐츠 표시. variant로 시맨틱 스타일 지정">
              <Section title="SectionHeader">
                <SectionHeader size="lg" title="Large 헤더" action={<Button variant="ghost" size="sm">더보기</Button>} />
                <SectionHeader title="Medium 헤더 (기본)" action={<Button variant="ghost" size="sm">더보기</Button>} />
                <SectionHeader size="sm" title="Small 헤더" action={<Button variant="ghost" size="sm">편집</Button>} />
              </Section>
              <Section title="Badge">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">default</Badge>
                  <Badge variant="success">success</Badge>
                  <Badge variant="warning">warning</Badge>
                  <Badge variant="error">error</Badge>
                  <Badge variant="info">info</Badge>
                  <Badge variant="agent">agent</Badge>
                </div>
              </Section>
              <Section title="Tag">
                <div className="flex flex-wrap gap-2">
                  <Tag>Tag A</Tag><Tag>Tag B</Tag><Tag>Tag C</Tag>
                </div>
              </Section>
              <Section title="StreamingText">
                <StreamingText content="2026년, AI는 더 이상 단순한 도구가 아닙니다. 오늘 여러분에게 보여드릴 5가지 트렌드를 통해" state="streaming" />
              </Section>
              <Section title="MarkdownRenderer">
                <MarkdownRenderer content={`**제목:** AI 트렌드 TOP 5\n\n> 올해 가장 주목할 트렌드를 정리했습니다.\n\n- 멀티모달 AI\n- 에이전트 기반 서비스\n- \`코드\` 생성 자동화`} />
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="Image" desc="URL 기반 이미지 표시">
              <Section title="Avatar">
                <div className="flex items-end gap-4">
                  <Avatar size="lg" initials="AI" />
                  <Avatar size="md" initials="U" />
                  <Avatar size="sm" initials="K" />
                </div>
              </Section>
              <Section title="ImageRenderer">
                <ImageRenderer src="https://picsum.photos/800/450" aspectRatio="16:9" frame="youtube" meta={{ width: 1920, height: 1080, format: "PNG", size: "2.4MB" }} onDownload={() => {}} />
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="Icon" desc="카탈로그 아이콘 표시">
              <Section title="Icon">
                <div className="flex items-center gap-3">
                  <Icon icon={IcHeart} size={24} weight="thin" label="thin" />
                  <Icon icon={IcHeart} size={24} weight="light" label="light" />
                  <Icon icon={IcHeart} size={24} weight="regular" label="regular" />
                  <Icon icon={IcHeart} size={24} weight="bold" label="bold" />
                  <Icon icon={IcHeart} size={24} weight="fill" label="fill" />
                  <Icon icon={IcHeart} size={24} weight="duotone" label="duotone" />
                  <span className="text-[length:var(--text-caption1)] text-label-secondary ml-2">ic-heart · 6 weights</span>
                </div>
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="Divider" desc="시각적 구분선">
              <Section title="Divider">
                <p className="text-[length:var(--text-caption1)] text-label-tertiary mb-1">spacing: compact / default / wide</p>
                <Divider spacing="compact" />
                <Divider />
                <Divider spacing="wide" />
                <Divider variant="section" />
                <Divider label="또는" />
              </Section>
            </A2UIGroup>
          </div>
        )}

        {topGroup === "A2UI" && a2uiSection === "Interactive" && (
          <div className="space-y-10">
            <A2UIGroup a2ui="Button" desc="클릭하여 액션을 트리거하는 버튼">
              <Section title="Button">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="tinted">Tinted</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button iconOnly size="md"><IcLightning size={18} weight="fill" /></Button>
                </div>
              </Section>
              <Section title="Chip">
                <div className="flex flex-wrap gap-2">
                  <Chip variant="default">Default</Chip>
                  <Chip variant="selected">Selected</Chip>
                  <Chip variant="outline">Outline</Chip>
                </div>
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="TextField" desc="텍스트 입력 필드">
              <Section title="Input">
                <Input placeholder="기본 텍스트 입력" />
              </Section>
              <Section title="Textarea">
                <Textarea size="sm" placeholder="Small 텍스트 입력" minRows={2} />
                <Textarea placeholder="Medium 텍스트 입력 (기본)" minRows={2} />
              </Section>
              <Section title="SearchInput">
                <div className="max-w-sm space-y-3">
                  <SearchInput placeholder="검색... (default)" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onClear={() => setSearchValue("")} />
                  <SearchInput variant="filled" placeholder="검색... (filled)" />
                </div>
              </Section>
              <Section title="ChatInput">
                <ChatInput
                  mode="default"
                  value={chatValue}
                  onChange={setChatValue}
                  onSend={() => {}}
                  toolbar={
                    <>
                      <Button variant="ghost" size="sm" iconOnly><IcPlus size={16} /></Button>
                      <Button variant="ghost" size="sm" iconOnly><IcSparkle size={16} /></Button>
                    </>
                  }
                />
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="CheckBox" desc="불리언 토글">
              <Section title="Chip (as CheckBox)">
                <div className="flex gap-2">
                  <Chip variant="selected" icon={<IcCheck size={14} />}>동의함</Chip>
                  <Chip variant="default">미동의</Chip>
                </div>
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="Slider" desc="숫자 범위 입력">
              <div>
                <h2 className="text-[length:var(--text-title3)] font-semibold text-label mb-4">Native Range</h2>
                <input type="range" min={0} max={100} defaultValue={50} className="w-full custom-range" style={{ background: `linear-gradient(to right, var(--color-primary) 50%, var(--color-fill) 50%)` }} onInput={(e) => { const v = (e.target as HTMLInputElement).value; (e.target as HTMLInputElement).style.background = `linear-gradient(to right, var(--color-primary) ${v}%, var(--color-fill) ${v}%)`; }} />
              </div>
            </A2UIGroup>

            <A2UIGroup a2ui="DateTimeInput" desc="날짜/시간 선택">
              <Section title="Native Date / Time">
                <div className="flex gap-3">
                  <input type="date" className="h-9 px-3 rounded-[var(--radius-sm)] bg-fill-tertiary text-label text-[length:var(--text-body)]" />
                  <input type="time" className="h-9 px-3 rounded-[var(--radius-sm)] bg-fill-tertiary text-label text-[length:var(--text-body)]" />
                </div>
              </Section>
            </A2UIGroup>

            <A2UIGroup a2ui="ChoicePicker" desc="목록에서 선택 (단일/다중)">
              <Section title="SegmentedControl">
                <SegmentedControl
                  items={[{ label: "v1.0", value: "1.0" }, { label: "v2.0", value: "2.0" }, { label: "v3.0", value: "3.0" }]}
                  value={segValue} onChange={setSegValue}
                />
              </Section>
              <Section title="ModelSelector">
                <ModelSelector
                  items={[
                    { label: "Agent 2.0", value: "agent-2.0" },
                    { label: "Agent 1.0", value: "agent-1.0" },
                    { label: "Fast", value: "fast" },
                  ]}
                  value={modelValue}
                  onChange={setModelValue}
                />
              </Section>
            </A2UIGroup>
          </div>
        )}

        {topGroup === "A2UI" && a2uiSection === "Container" && (
          <div className="space-y-10">
            {/* Card */}
            <A2UIGroup a2ui="Card" desc="elevation/border 컨테이너">
              <Section title="Card">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader><CardTitle>Default</CardTitle><CardDescription>border + background</CardDescription></CardHeader>
                    <CardContent><p className="text-[length:var(--text-footnote)] text-label-secondary">기본 카드</p></CardContent>
                  </Card>
                  <Card variant="outlined">
                    <CardHeader><CardTitle>Outlined</CardTitle><CardDescription>border only</CardDescription></CardHeader>
                    <CardContent><p className="text-[length:var(--text-footnote)] text-label-secondary">외곽선 카드</p></CardContent>
                  </Card>
                  <Card variant="elevated">
                    <CardHeader><CardTitle>Elevated</CardTitle><CardDescription>shadow + bg</CardDescription></CardHeader>
                    <CardContent><p className="text-[length:var(--text-footnote)] text-label-secondary">그림자 카드</p></CardContent>
                  </Card>
                </div>
              </Section>
              <Section title="PresetCard · SkillCard">
                <div className="grid grid-cols-2 gap-3">
                  <PresetCard icon={<IcFilmSlate size={20} />} title="영상 대본" description="유튜브 쇼츠 대본 생성" onClick={() => {}} />
                  <SkillCard icon={<IcTranslate size={20} />} title="번역" description="다국어 번역 에이전트" category="언어" onClick={() => {}} />
                </div>
              </Section>
              <Section title="SceneCard">
                <SceneCard
                  sceneNumber={1}
                  timeCode="0:00~0:15"
                  sections={[
                    { label: "화면", content: "타이틀 모션 + 배경음악" },
                    { label: "내레이션", content: "\"AI는 더 이상 도구가 아닙니다.\"" },
                  ]}
                  onEdit={() => {}}
                  onCopy={() => {}}
                />
              </Section>
              <Section title="FileCard">
                <div className="max-w-sm space-y-2">
                  <FileCard fileName="report.pdf" fileType="pdf" fileSize="2.4 MB" onDownload={() => {}} />
                  <FileCard fileName="thumbnail.png" fileType="png" fileSize="340 KB" variant="download" onDownload={() => {}} />
                  <FileCard fileName="project.zip" fileSize="8.2 MB" variant="upload" />
                </div>
              </Section>
              <Section title="ErrorCard">
                <ErrorCard description="요청을 더 구체적으로 해보세요." suggestion="10분짜리 AI 트렌드 유튜브 대본" onRetry={() => {}} />
                <p className="text-[length:var(--text-caption1)] text-label-tertiary mt-3 mb-1">variant: compact</p>
                <ErrorCard variant="compact" description="네트워크 오류가 발생했습니다." onRetry={() => {}} />
              </Section>
            </A2UIGroup>

            {/* Modal */}
            <A2UIGroup a2ui="Modal" desc="오버레이 다이얼로그 · 5가지 variant">
              <Section title="Modal (5 variants)">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowModal(true)}>Default</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowAlert(true)}>Alert</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowConfirm(true)}>Confirm</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>Form</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowSheet(true)}>BottomSheet</Button>
                </div>
                {/* Default */}
                <Modal
                  open={showModal}
                  onClose={() => setShowModal(false)}
                  title="프로젝트 설정"
                  description="프로젝트의 기본 정보를 확인하고 수정할 수 있습니다."
                >
                  <div className="space-y-3">
                    <div className="p-4 rounded-[var(--radius-md)] bg-fill-tertiary">
                      <p className="text-[length:var(--text-footnote)] text-label-tertiary mb-1">프로젝트명</p>
                      <p className="text-[length:var(--text-body)] text-label font-medium">캐럿 2.0 에이전트</p>
                    </div>
                    <div className="p-4 rounded-[var(--radius-md)] bg-fill-tertiary">
                      <p className="text-[length:var(--text-footnote)] text-label-tertiary mb-1">모델</p>
                      <p className="text-[length:var(--text-body)] text-label font-medium">Agent 2.0 · GPT-4o</p>
                    </div>
                  </div>
                </Modal>
                {/* Alert */}
                <Modal
                  open={showAlert}
                  onClose={() => setShowAlert(false)}
                  variant="alert"
                  size="sm"
                  title="저장 완료"
                  description="대본이 성공적으로 저장되었습니다. 이제 미리보기에서 확인할 수 있습니다."
                  icon={<IcCheckCircle size={28} weight="fill" className="text-success" />}
                  footer={<Button variant="primary" className="w-full" onClick={() => setShowAlert(false)}>확인</Button>}
                />
                {/* Confirm */}
                <Modal
                  open={showConfirm}
                  onClose={() => setShowConfirm(false)}
                  variant="confirm"
                  size="sm"
                  persistent
                  title="대화를 삭제할까요?"
                  description="이 대화와 관련된 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
                  icon={<IcTrash size={28} weight="fill" className="text-error" />}
                  footer={
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>취소</Button>
                      <Button variant="danger" className="flex-1" onClick={() => setShowConfirm(false)}>삭제</Button>
                    </div>
                  }
                />
                {/* Form */}
                <Modal
                  open={showForm}
                  onClose={() => setShowForm(false)}
                  variant="form"
                  title="새 프로젝트"
                  footer={
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowForm(false)}>취소</Button>
                      <Button variant="primary" onClick={() => setShowForm(false)}>생성</Button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[length:var(--text-footnote)] font-medium text-label mb-1.5">프로젝트 이름</label>
                      <Input placeholder="프로젝트 이름을 입력하세요" />
                    </div>
                    <div>
                      <label className="block text-[length:var(--text-footnote)] font-medium text-label mb-1.5">설명</label>
                      <Textarea placeholder="프로젝트에 대한 간단한 설명..." minRows={3} />
                    </div>
                    <div>
                      <label className="block text-[length:var(--text-footnote)] font-medium text-label mb-1.5">모델 선택</label>
                      <ModelSelector
                        items={[
                          { label: "Agent 2.0", value: "agent-2.0" },
                          { label: "Agent 1.0", value: "agent-1.0" },
                          { label: "Fast", value: "fast" },
                        ]}
                        value={modelValue}
                        onChange={setModelValue}
                      />
                    </div>
                  </div>
                </Modal>
                {/* BottomSheet */}
                <Modal open={showSheet} onClose={() => setShowSheet(false)} variant="bottomSheet" title="공유하기">
                  <div className="space-y-1">
                    {[
                      { icon: <IcLink size={20} />, label: "링크 복사" },
                      { icon: <IcExport size={20} />, label: "내보내기" },
                      { icon: <IcCopy size={20} />, label: "대본 복사" },
                      { icon: <IcDownloadSimple size={20} />, label: "파일로 다운로드" },
                    ].map(({ icon, label }) => (
                      <button
                        key={label}
                        onClick={() => setShowSheet(false)}
                        className="w-full flex items-center gap-3 h-12 px-3 rounded-[var(--radius-md)] text-[length:var(--text-body)] text-label hover:bg-fill-tertiary transition-colors"
                      >
                        <span className="text-label-secondary">{icon}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </Modal>
              </Section>

              <Section title="CommandPalette · Dropdown · Tooltip · Toast">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowCommand((v) => !v)}>CommandPalette</Button>
                  <Dropdown
                    size="sm"
                    trigger={<Button variant="outline" size="sm">Dropdown (sm)</Button>}
                    items={[
                      { label: "편집", value: "edit" },
                      { label: "복제", value: "dup" },
                      { label: "삭제", value: "del" },
                    ]}
                  />
                  <Dropdown
                    trigger={<Button variant="outline" size="sm">Dropdown (md)</Button>}
                    items={[
                      { label: "편집", value: "edit" },
                      { label: "복제", value: "dup" },
                      { label: "삭제", value: "del" },
                    ]}
                  />
                  <Tooltip content="기본 툴팁"><Button variant="outline" size="sm">Tooltip</Button></Tooltip>
                  <Tooltip variant="rich" content="리치 툴팁: 밝은 배경에 그림자가 적용됩니다."><Button variant="outline" size="sm">Rich Tooltip</Button></Tooltip>
                  <Button variant="outline" size="sm" onClick={() => setShowToast(true)}>Toast</Button>
                </div>
                <div className="relative mt-2">
                  <CommandPalette
                    open={showCommand}
                    onClose={() => setShowCommand(false)}
                    size="sm"
                    items={[
                      { label: "새 대화 시작", value: "new" },
                      { label: "설정 열기", value: "settings" },
                      { label: "대본 생성", value: "script", description: "스킬" },
                    ]}
                    onSelect={() => setShowCommand(false)}
                    className="!static !mb-0"
                  />
                </div>
                <Toast variant="success" size="sm" message="저장 완료!" visible={showToast} onDismiss={() => setShowToast(false)} />
              </Section>
            </A2UIGroup>

            {/* Tabs */}
            <A2UIGroup a2ui="Tabs" desc="탭 인터페이스로 콘텐츠 전환">
              <Section title="TabBar">
                <TabBar
                  items={[
                    { label: "대본", value: "script" },
                    { label: "미리보기", value: "preview" },
                    { label: "설정", value: "settings" },
                  ]}
                  value={tabValue} onChange={setTabValue}
                />
                <div className="p-4 rounded-[var(--radius-md)] bg-fill-tertiary">
                  <p className="text-[length:var(--text-body)] text-label-secondary">
                    {tabValue === "script" && "대본 탭 콘텐츠"}
                    {tabValue === "preview" && "미리보기 탭 콘텐츠"}
                    {tabValue === "settings" && "설정 탭 콘텐츠"}
                  </p>
                </div>
              </Section>
              <Section title="SegmentedControl">
                <SegmentedControl
                  items={[{ label: "1.0", value: "1.0" }, { label: "2.0", value: "2.0" }]}
                  value={segValue} onChange={setSegValue}
                />
              </Section>
              <Section title="CompositeResult">
                <CompositeResult
                  tabs={[
                    {
                      label: "대본",
                      value: "script",
                      content: <MarkdownRenderer content="**씬 1** — 인트로\n\n안녕하세요, AI 트렌드에 대해 이야기하겠습니다." />,
                    },
                    {
                      label: "제목·설명",
                      value: "meta",
                      content: <MarkdownRenderer content="**제목:** 2026년 AI 트렌드 TOP 5" />,
                    },
                  ]}
                />
              </Section>
            </A2UIGroup>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Helper components ── */

function Section({ title, a2ui, children }: { title: string; a2ui?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[length:var(--text-title3)] font-semibold text-label">{title}</h2>
        {a2ui && (
          <span className="inline-flex items-center h-5 px-1.5 rounded-[var(--radius-xs)] bg-primary/10 text-[length:var(--text-caption2)] font-semibold text-primary">
            A2UI Component
          </span>
        )}
      </div>
      <div className="p-5 rounded-[var(--radius-lg)] border border-separator-opaque bg-bg-primary space-y-4">
        {children}
      </div>
    </div>
  );
}

/* ── A2UI group helper (title-only header + child Sections) ── */

function A2UIGroup({ a2ui, desc, children }: {
  a2ui: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-[length:var(--text-title3)] font-bold text-label">{a2ui}</h2>
        <p className="text-[length:var(--text-caption1)] text-label-secondary mt-0.5">{desc}</p>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
