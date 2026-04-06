/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║           A2UI ↔ 캐럿 2.0 컴포넌트 매핑 가이드                      ║
 * ║                                                                      ║
 * ║  A2UI (Agent-to-UI): Google의 에이전트 → UI 선언형 프로토콜           ║
 * ║  캐럿 2.0: Apple HIG 기반 에이전트 서비스 UI 시스템                   ║
 * ║                                                                      ║
 * ║  A2UI Spec: https://a2ui.org/reference/components/                   ║
 * ║  Protocol Version: v0.9 (draft) 기준, v0.8 (stable) 호환            ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────
// 1. 타입 정의
// ─────────────────────────────────────────────────────────────

/** A2UI 컴포넌트 카테고리 */
type A2UICategory = "Layout" | "Display" | "Interactive" | "Container";

/** 매핑 상태 */
type MappingStatus =
  | "direct"      // 1:1 직접 매핑 — 동일한 역할
  | "composite"   // 캐럿 컴포넌트 여러 개 조합으로 표현
  | "extended"    // 캐럿이 A2UI보다 확장된 기능 제공
  | "no-match";   // 캐럿에 대응하는 A2UI 컴포넌트 없음 (캐럿 전용)

interface A2UIComponent {
  name: string;
  category: A2UICategory;
  description: string;
  /** v0.9 기준 주요 props */
  props: Record<string, string>;
}

interface CaretComponent {
  name: string;
  importPath: string;
  /** 주요 props 요약 */
  props: Record<string, string>;
}

interface ComponentMapping {
  a2ui: A2UIComponent;
  status: MappingStatus;
  caret: CaretComponent[];
  /** 개발자를 위한 매핑 설명 */
  notes: string;
  /** 변환 시 주의사항 */
  caveats?: string;
}

// ─────────────────────────────────────────────────────────────
// 2. A2UI → 캐럿 2.0 매핑 테이블
// ─────────────────────────────────────────────────────────────

export const A2UI_COMPONENT_MAP: ComponentMapping[] = [
  // ═══════════════════════════════════════════════════════
  // LAYOUT COMPONENTS
  // ═══════════════════════════════════════════════════════
  {
    a2ui: {
      name: "Row",
      category: "Layout",
      description: "수평 레이아웃. children을 좌→우로 배치",
      props: {
        children: "string[] | { componentId, path }",
        justify: "'spaceBetween' | 'start' | 'end' | 'center'",
        align: "'center' | 'start' | 'end' | 'stretch'",
      },
    },
    status: "composite",
    caret: [
      {
        name: "ActionBar",
        importPath: "@/components/ui/action-bar",
        props: { actions: "Action[]" },
      },
      {
        name: "MetaInfoBar",
        importPath: "@/components/ui/meta-info-bar",
        props: { items: "MetaItem[]" },
      },
      {
        name: "ChipBar",
        importPath: "@/components/ui/chip-bar",
        props: { items: "ChipBarItem[]", value: "string", onChange: "(v: string) => void" },
      },
    ],
    notes:
      "A2UI Row는 범용 flex-row 레이아웃. 캐럿에서는 Tailwind `flex` + `gap`으로 직접 구현하거나, " +
      "용도별 전용 컴포넌트(ActionBar, MetaInfoBar, ChipBar)를 사용. " +
      "수평 버튼 그룹 → ActionBar, 메타 정보 나열 → MetaInfoBar, 필터 칩 → ChipBar",
    caveats: "A2UI의 justify/align은 CSS flexbox와 동일. Tailwind: justify-between, items-center 등으로 대응",
  },

  {
    a2ui: {
      name: "Column",
      category: "Layout",
      description: "수직 레이아웃. children을 위→아래로 배치",
      props: {
        children: "string[] | { componentId, path }",
        justify: "'start' | 'end' | 'center' | 'spaceBetween'",
        align: "'stretch' | 'start' | 'end' | 'center'",
      },
    },
    status: "composite",
    caret: [
      {
        name: "Card",
        importPath: "@/components/ui/card",
        props: { children: "ReactNode" },
      },
      {
        name: "SceneCard",
        importPath: "@/components/ui/scene-card",
        props: { title: "string", sections: "SceneSection[]" },
      },
    ],
    notes:
      "A2UI Column은 범용 flex-column 레이아웃. 캐럿에서는 Tailwind `flex flex-col` + `gap`으로 직접 구현하거나, " +
      "콘텐츠 그룹핑 시 Card/SceneCard 사용. " +
      "대부분의 페이지 레이아웃은 Tailwind `space-y-*`로 충분",
    caveats: "Column 내 weight(flex-grow) 속성은 Tailwind `flex-1`, `grow` 등으로 대응",
  },

  {
    a2ui: {
      name: "List",
      category: "Layout",
      description: "스크롤 가능한 아이템 목록. 정적 children + 동적 template 지원",
      props: {
        children: "string[] | { componentId, path }",
        direction: "'vertical' | 'horizontal'",
        align: "string",
      },
    },
    status: "composite",
    caret: [
      {
        name: "SceneCardList",
        importPath: "@/components/ui/scene-card-list",
        props: { children: "ReactNode" },
      },
      {
        name: "HistoryItem",
        importPath: "@/components/ui/history-item",
        props: { title: "string", subtitle: "string", timestamp: "string" },
      },
      {
        name: "CollapsibleLog",
        importPath: "@/components/ui/collapsible-log",
        props: { entries: "LogEntry[]" },
      },
      {
        name: "StepIndicator",
        importPath: "@/components/ui/step-indicator",
        props: { steps: "Step[]", current: "number" },
      },
    ],
    notes:
      "A2UI List의 template 패턴(dataBinding으로 배열 반복)은 React의 `.map()` 렌더링에 대응. " +
      "캐럿에서는 용도별 리스트 컴포넌트 활용: " +
      "시나리오 목록 → SceneCardList, 대화 기록 → HistoryItem[], 로그 → CollapsibleLog, 단계 → StepIndicator",
    caveats:
      "A2UI의 dataBinding path('/messages')는 캐럿에서 React state/props로 대응. " +
      "horizontal List는 ChipBar 또는 Tailwind `flex overflow-x-auto`로 구현",
  },

  // ═══════════════════════════════════════════════════════
  // DISPLAY COMPONENTS
  // ═══════════════════════════════════════════════════════
  {
    a2ui: {
      name: "Text",
      category: "Display",
      description: "텍스트 콘텐츠 표시. variant로 시맨틱 스타일 지정",
      props: {
        text: "string | DataBinding",
        variant: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body'",
      },
    },
    status: "composite",
    caret: [
      {
        name: "SectionHeader",
        importPath: "@/components/ui/section-header",
        props: { title: "string", action: "ReactNode" },
      },
      {
        name: "Badge",
        importPath: "@/components/ui/badge",
        props: { variant: "'default' | 'success' | 'warning' | 'error' | 'info' | 'agent'", children: "ReactNode" },
      },
      {
        name: "Tag",
        importPath: "@/components/ui/tag",
        props: { children: "ReactNode" },
      },
      {
        name: "StreamingText",
        importPath: "@/components/ui/streaming-text",
        props: { text: "string" },
      },
      {
        name: "MarkdownRenderer",
        importPath: "@/components/ui/markdown-renderer",
        props: { content: "string" },
      },
    ],
    notes:
      "A2UI Text는 범용 텍스트. 캐럿에서는 Tailwind 타이포그래피 토큰으로 직접 스타일링하거나 용도별 컴포넌트 사용:\n" +
      "  • h1~h5 → `text-[length:var(--text-title1)]` ~ `text-[length:var(--text-caption1)]`\n" +
      "  • 섹션 제목 → SectionHeader\n" +
      "  • 상태 라벨 → Badge / Tag\n" +
      "  • 에이전트 응답 스트리밍 → StreamingText\n" +
      "  • 마크다운 → MarkdownRenderer",
    caveats:
      "A2UI variant 매핑:\n" +
      "  h1 → --text-large-title,  h2 → --text-title1,  h3 → --text-title2\n" +
      "  h4 → --text-title3,  h5 → --text-headline\n" +
      "  body → --text-body,  caption → --text-caption1",
  },

  {
    a2ui: {
      name: "Image",
      category: "Display",
      description: "URL 기반 이미지 표시",
      props: {
        url: "string | DataBinding",
        fit: "'cover' | 'contain' | 'fill'",
        variant: "'hero' | 'thumbnail' | 'avatar'",
      },
    },
    status: "extended",
    caret: [
      {
        name: "ImageRenderer",
        importPath: "@/components/ui/image-renderer",
        props: {
          src: "string",
          alt: "string",
          aspectRatio: "'16:9' | '9:16' | '1:1' | '4:3' | 'auto'",
          frame: "'none' | 'youtube' | 'shorts' | 'instagram'",
          meta: "ImageMeta",
        },
      },
      {
        name: "Avatar",
        importPath: "@/components/ui/avatar",
        props: { src: "string", alt: "string", size: "'sm' | 'md' | 'lg'", initials: "string" },
      },
    ],
    notes:
      "A2UI Image의 variant='avatar' → 캐럿 Avatar 컴포넌트.\n" +
      "A2UI Image의 variant='hero' → 캐럿 ImageRenderer (frame='none', aspectRatio='16:9').\n" +
      "캐럿 ImageRenderer는 플랫폼별 프레임(youtube/shorts/instagram) + 메타정보 + 다운로드를 추가 지원",
    caveats: "A2UI url → 캐럿 src,  A2UI fit → Tailwind object-cover/contain",
  },

  {
    a2ui: {
      name: "Icon",
      category: "Display",
      description: "카탈로그에 정의된 아이콘 표시",
      props: {
        name: "string | DataBinding",
      },
    },
    status: "extended",
    caret: [
      {
        name: "Icon",
        importPath: "@/components/ui/icon",
        props: {
          icon: "ComponentType (Phosphor Icon)",
          size: "number",
          weight: "'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'",
          color: "string",
          label: "string (접근성)",
        },
      },
    ],
    notes:
      "A2UI Icon은 카탈로그 name 문자열로 아이콘 참조.\n" +
      "캐럿 Icon은 Phosphor Icons 1,512개를 직접 import하는 컴포넌트 방식.\n" +
      "  • A2UI: { name: 'check' }\n" +
      "  • 캐럿: <Icon icon={IcCheck} weight='regular' size={20} />\n" +
      "A2UI name → 캐럿 ic-{name} 토큰으로 변환. 토큰 목록: src/lib/icons.ts\n" +
      "전체 아이콘 갤러리: src/lib/icon-registry.ts (1,512개)",
    caveats:
      "A2UI 카탈로그에 정의되지 않은 아이콘은 렌더링 불가. " +
      "캐럿은 Phosphor 전체 라이브러리 사용 가능 + 6가지 weight 지원",
  },

  {
    a2ui: {
      name: "Divider",
      category: "Display",
      description: "시각적 구분선",
      props: {
        axis: "'horizontal' | 'vertical'",
      },
    },
    status: "direct",
    caret: [
      {
        name: "Divider",
        importPath: "@/components/ui/divider",
        props: {
          orientation: "'horizontal' | 'vertical'",
          variant: "'default' | 'section'",
          label: "string (라벨 구분선)",
        },
      },
    ],
    notes:
      "1:1 직접 매핑. A2UI axis → 캐럿 orientation.\n" +
      "캐럿 Divider는 추가로 section 변형(굵은 선) + label(텍스트 포함 구분선) 지원",
    caveats: "A2UI axis='horizontal' → 캐럿 orientation='horizontal' (기본값이므로 생략 가능)",
  },

  // ═══════════════════════════════════════════════════════
  // INTERACTIVE COMPONENTS
  // ═══════════════════════════════════════════════════════
  {
    a2ui: {
      name: "Button",
      category: "Interactive",
      description: "클릭하여 액션을 트리거하는 버튼",
      props: {
        child: "string (component ID)",
        variant: "'primary' | 'secondary'",
        action: "{ event: { name: string } }",
      },
    },
    status: "extended",
    caret: [
      {
        name: "Button",
        importPath: "@/components/ui/button",
        props: {
          variant: "'primary' | 'secondary' | 'outline' | 'ghost' | 'tinted' | 'danger'",
          size: "'sm' | 'md' | 'lg'",
          iconOnly: "boolean",
          loading: "boolean",
          fullWidth: "boolean",
        },
      },
      {
        name: "Chip",
        importPath: "@/components/ui/chip",
        props: {
          variant: "'default' | 'selected' | 'outline'",
          size: "'sm' | 'md'",
          icon: "ReactNode",
        },
      },
    ],
    notes:
      "A2UI Button은 2개 variant. 캐럿 Button은 6개 variant + 3개 size + loading/iconOnly.\n" +
      "A2UI의 action event → 캐럿은 onClick 핸들러로 처리.\n" +
      "토글/필터 용도의 작은 버튼은 캐럿 Chip 활용.\n" +
      "  • A2UI variant='primary' → 캐럿 variant='primary'\n" +
      "  • A2UI variant 미지정 → 캐럿 variant='secondary' 또는 'outline'",
    caveats:
      "A2UI Button의 child는 ID 참조(보통 Text 컴포넌트). " +
      "캐럿은 children ReactNode로 직접 전달: <Button>텍스트</Button>",
  },

  {
    a2ui: {
      name: "TextField",
      category: "Interactive",
      description: "텍스트 입력 필드 (검증 지원)",
      props: {
        label: "string",
        value: "string | DataBinding",
        textFieldType: "'shortText' | 'longText' | 'number' | 'obscured' | 'date'",
        validationRegexp: "string",
      },
    },
    status: "extended",
    caret: [
      {
        name: "Input",
        importPath: "@/components/ui/input",
        props: {
          size: "'sm' | 'md'",
          leftIcon: "ReactNode",
          rightIcon: "ReactNode",
          error: "boolean",
        },
      },
      {
        name: "Textarea",
        importPath: "@/components/ui/textarea",
        props: {
          autoResize: "boolean",
          minRows: "number",
          maxRows: "number",
          error: "boolean",
        },
      },
      {
        name: "SearchInput",
        importPath: "@/components/ui/search-input",
        props: { size: "'sm' | 'md'", onClear: "() => void" },
      },
      {
        name: "ChatInput",
        importPath: "@/components/ui/chat-input",
        props: {
          mode: "'default' | 'skill-selected' | 'generating'",
          onSend: "() => void",
          onStop: "() => void",
          skillTag: "ReactNode",
          toolbar: "ReactNode",
          chipBar: "ReactNode",
        },
      },
    ],
    notes:
      "A2UI TextField 하나가 캐럿에서는 4개 전용 컴포넌트로 분화:\n" +
      "  • textFieldType='shortText'  → Input (단일 행)\n" +
      "  • textFieldType='longText'   → Textarea (여러 행, autoResize)\n" +
      "  • textFieldType='obscured'   → Input (type='password')\n" +
      "  • textFieldType='number'     → Input (type='number')\n" +
      "  • 검색 전용 → SearchInput (검색 아이콘 + 초기화 버튼)\n" +
      "  • 에이전트 채팅 → ChatInput (전송/중지 + 스킬 태그 + 툴바)",
    caveats:
      "A2UI validationRegexp → 캐럿은 HTML5 pattern 속성 또는 외부 폼 라이브러리로 처리.\n" +
      "A2UI DataBinding → 캐럿은 React controlled component (value + onChange)",
  },

  {
    a2ui: {
      name: "CheckBox",
      category: "Interactive",
      description: "불리언 토글",
      props: {
        label: "string",
        value: "DataBinding (boolean)",
      },
    },
    status: "composite",
    caret: [
      {
        name: "Chip",
        importPath: "@/components/ui/chip",
        props: { variant: "'default' | 'selected'", icon: "ReactNode" },
      },
    ],
    notes:
      "캐럿에 전용 CheckBox 컴포넌트는 없음. 대안:\n" +
      "  1. Chip variant='selected' — 토글 칩으로 활용\n" +
      "  2. HTML <input type='checkbox'> + Tailwind 스타일링\n" +
      "  3. 필요 시 CheckBox 컴포넌트 신규 개발 권장",
    caveats: "A2UI CheckBox 기능이 빈번하게 필요하다면 캐럿에 전용 컴포넌트 추가 고려",
  },

  {
    a2ui: {
      name: "Slider",
      category: "Interactive",
      description: "숫자 범위 입력 슬라이더",
      props: {
        value: "DataBinding",
        minValue: "number",
        maxValue: "number",
      },
    },
    status: "composite",
    caret: [],
    notes:
      "캐럿에 Slider 컴포넌트 없음. 대안:\n" +
      "  1. HTML <input type='range'> + Tailwind 스타일링\n" +
      "  2. 에이전트 서비스에서 슬라이더가 필요한 경우 컴포넌트 신규 개발\n" +
      "  3. ModelSelector의 내부 로직 참고 가능",
    caveats: "에이전트 UI에서 슬라이더 사용 빈도가 낮아 미구현. 필요 시 추가",
  },

  {
    a2ui: {
      name: "DateTimeInput",
      category: "Interactive",
      description: "날짜/시간 선택기",
      props: {
        value: "DataBinding",
        enableDate: "boolean",
        enableTime: "boolean",
      },
    },
    status: "composite",
    caret: [],
    notes:
      "캐럿에 DateTimeInput 없음. 대안:\n" +
      "  1. Input type='date' / type='time' + Tailwind\n" +
      "  2. 네이티브 날짜 선택기 활용\n" +
      "  3. 에이전트 서비스 특성상 날짜 입력은 자연어로 처리 가능",
    caveats: "에이전트 대화에서 날짜는 자연어('내일 3시')로 처리되는 경우가 많아 미구현",
  },

  {
    a2ui: {
      name: "ChoicePicker",
      category: "Interactive",
      description: "목록에서 하나 또는 여러 개 선택 (v0.8: MultipleChoice)",
      props: {
        options: "{ label, value }[]",
        selections: "DataBinding",
        maxAllowedSelections: "number",
      },
    },
    status: "extended",
    caret: [
      {
        name: "ChipBar",
        importPath: "@/components/ui/chip-bar",
        props: { items: "ChipBarItem[]", value: "string", onChange: "(v: string) => void" },
      },
      {
        name: "Dropdown",
        importPath: "@/components/ui/dropdown",
        props: { items: "DropdownItem[]", value: "string", onChange: "(v: string) => void" },
      },
      {
        name: "SegmentedControl",
        importPath: "@/components/ui/segmented-control",
        props: { items: "SegmentedControlItem[]", value: "string", onChange: "(v: string) => void" },
      },
      {
        name: "ModelSelector",
        importPath: "@/components/ui/model-selector",
        props: {},
      },
    ],
    notes:
      "A2UI ChoicePicker 하나가 캐럿에서는 UI 패턴별로 분화:\n" +
      "  • 수평 칩 선택 → ChipBar (maxSelections=1 일반 필터)\n" +
      "  • 드롭다운 목록 → Dropdown (옵션 5개 이상)\n" +
      "  • 세그먼트 전환 → SegmentedControl (2~4개 옵션)\n" +
      "  • AI 모델 선택 → ModelSelector (특화 UI)\n" +
      "maxAllowedSelections=1 → 단일 선택, >1 → 다중 선택 칩",
    caveats:
      "A2UI는 단일/다중 선택을 하나의 컴포넌트로 처리. " +
      "캐럿은 옵션 수와 맥락에 따라 적절한 컴포넌트 선택 필요",
  },

  // ═══════════════════════════════════════════════════════
  // CONTAINER COMPONENTS
  // ═══════════════════════════════════════════════════════
  {
    a2ui: {
      name: "Card",
      category: "Container",
      description: "elevation/border + padding을 가진 컨테이너",
      props: {
        child: "string (component ID)",
      },
    },
    status: "extended",
    caret: [
      {
        name: "Card / CardHeader / CardContent / CardFooter",
        importPath: "@/components/ui/card",
        props: { children: "ReactNode" },
      },
      {
        name: "PresetCard",
        importPath: "@/components/ui/preset-card",
        props: { icon: "ReactNode", title: "string", description: "string" },
      },
      {
        name: "SkillCard",
        importPath: "@/components/ui/skill-card",
        props: { icon: "ReactNode", title: "string", description: "string", category: "string" },
      },
      {
        name: "SceneCard",
        importPath: "@/components/ui/scene-card",
        props: { title: "string", sections: "SceneSection[]" },
      },
      {
        name: "FileCard",
        importPath: "@/components/ui/file-card",
        props: { name: "string", type: "string", size: "string" },
      },
      {
        name: "ErrorCard",
        importPath: "@/components/ui/error-card",
        props: { title: "string", message: "string" },
      },
    ],
    notes:
      "A2UI Card는 범용 컨테이너. 캐럿에서는 용도별 6종 카드로 세분화:\n" +
      "  • 범용 카드 → Card (Header/Content/Footer 서브 컴포넌트)\n" +
      "  • 프리셋 선택 → PresetCard (아이콘 + 제목 + 설명)\n" +
      "  • 스킬 선택 → SkillCard (아이콘 + 제목 + 설명 + 카테고리)\n" +
      "  • 시나리오 표시 → SceneCard (섹션별 콘텐츠)\n" +
      "  • 파일 표시 → FileCard (파일 아이콘 + 이름 + 크기)\n" +
      "  • 에러 표시 → ErrorCard (경고 아이콘 + 메시지)",
  },

  {
    a2ui: {
      name: "Modal",
      category: "Container",
      description: "오버레이 다이얼로그. entryPoint 컴포넌트에 의해 트리거",
      props: {
        entryPointChild: "string (component ID)",
        contentChild: "string (component ID)",
      },
    },
    status: "extended",
    caret: [
      {
        name: "Modal",
        importPath: "@/components/ui/modal",
        props: {
          open: "boolean",
          onClose: "() => void",
          size: "'sm' | 'md' | 'lg' | 'fullscreen'",
          title: "string",
          children: "ReactNode",
        },
      },
      {
        name: "CommandPalette",
        importPath: "@/components/ui/command-palette",
        props: { items: "CommandItem[]" },
      },
      {
        name: "Dropdown",
        importPath: "@/components/ui/dropdown",
        props: { trigger: "ReactNode", items: "DropdownItem[]" },
      },
      {
        name: "Tooltip",
        importPath: "@/components/ui/tooltip",
        props: { content: "string", children: "ReactNode" },
      },
      {
        name: "Toast",
        importPath: "@/components/ui/toast",
        props: { message: "string" },
      },
    ],
    notes:
      "A2UI Modal은 entryPoint(트리거) + content(본문) 구조.\n" +
      "캐럿에서는 오버레이 유형별 5개 컴포넌트:\n" +
      "  • 전체 다이얼로그 → Modal (4단계 size)\n" +
      "  • 명령 팔레트 → CommandPalette (검색 + 목록)\n" +
      "  • 컨텍스트 메뉴 → Dropdown\n" +
      "  • 도움말 팝오버 → Tooltip\n" +
      "  • 알림 토스트 → Toast",
    caveats:
      "A2UI의 entryPointChild(트리거 연결)는 캐럿에서 React state(open/onClose)로 제어. " +
      "Dropdown은 trigger prop으로 entryPoint 패턴과 유사하게 동작",
  },

  {
    a2ui: {
      name: "Tabs",
      category: "Container",
      description: "탭 인터페이스. 콘텐츠를 전환 가능한 패널로 구성",
      props: {
        tabItems: "{ title: string, child: string }[]",
      },
    },
    status: "extended",
    caret: [
      {
        name: "TabBar",
        importPath: "@/components/ui/tab-bar",
        props: {
          items: "TabBarItem[]",
          value: "string",
          onChange: "(v: string) => void",
          variant: "'underline' | 'pill'",
        },
      },
      {
        name: "SegmentedControl",
        importPath: "@/components/ui/segmented-control",
        props: {
          items: "SegmentedControlItem[]",
          value: "string",
          onChange: "(v: string) => void",
          size: "'sm' | 'md'",
        },
      },
      {
        name: "CompositeResult",
        importPath: "@/components/ui/composite-result",
        props: {
          tabs: "CompositeTab[]",
          defaultTab: "string",
        },
      },
    ],
    notes:
      "A2UI Tabs는 탭 + 콘텐츠 일체형. 캐럿에서는 분리하여 더 유연하게 사용:\n" +
      "  • 탭 내비게이션만 → TabBar (underline/pill 스타일)\n" +
      "  • 소수 옵션 전환 → SegmentedControl\n" +
      "  • 탭 + 콘텐츠 일체 → CompositeResult (코드/미리보기/HTML 등)\n" +
      "TabBar + 조건부 렌더링으로 A2UI Tabs와 동일한 UX 구현 가능",
    caveats:
      "A2UI tabItems.child는 component ID 참조. " +
      "캐럿은 TabBar value 변경 → 조건부 렌더링, 또는 CompositeResult tabs[].content로 직접 전달",
  },
];

// ─────────────────────────────────────────────────────────────
// 3. 캐럿 2.0 전용 컴포넌트 (A2UI에 대응 없음)
// ─────────────────────────────────────────────────────────────

export const CARET_ONLY_COMPONENTS = [
  {
    name: "MessageBubble",
    category: "Agent Execution",
    description: "에이전트/사용자 대화 메시지 버블",
    a2uiNote: "A2UI는 에이전트 대화 UI를 직접 다루지 않음. 캐럿의 핵심 컴포넌트",
  },
  {
    name: "StreamingText",
    category: "Agent Execution",
    description: "에이전트 응답 스트리밍 텍스트 (타이핑 애니메이션)",
    a2uiNote: "A2UI는 스트리밍 렌더링 미지원. 캐럿 에이전트 서비스 전용",
  },
  {
    name: "StepIndicator",
    category: "Agent Execution",
    description: "에이전트 실행 단계 표시기",
    a2uiNote: "에이전트 워크플로우 시각화. A2UI에 해당 개념 없음",
  },
  {
    name: "CollapsibleLog",
    category: "Agent Execution",
    description: "접을 수 있는 실행 로그",
    a2uiNote: "에이전트 디버깅/투명성 UI. A2UI에 해당 개념 없음",
  },
  {
    name: "CodeBlock",
    category: "Result Renderer",
    description: "구문 강조 코드 블록 (복사 버튼)",
    a2uiNote: "A2UI Text로 코드 표현 불가. 캐럿 전용 리치 렌더러",
  },
  {
    name: "VideoRenderer",
    category: "Result Renderer",
    description: "비디오 플레이어 (YouTube/Shorts/Instagram 프레임)",
    a2uiNote: "A2UI Image는 정적 이미지만. 동영상 렌더링 미지원",
  },
  {
    name: "AudioRenderer",
    category: "Result Renderer",
    description: "오디오 플레이어 (파형 시각화)",
    a2uiNote: "A2UI에 오디오 컴포넌트 없음",
  },
  {
    name: "HTMLRenderer",
    category: "Result Renderer",
    description: "안전한 HTML 샌드박스 렌더러 (데스크탑/태블릿/모바일 프리뷰)",
    a2uiNote: "A2UI는 선언형 UI만. raw HTML 렌더링 개념 없음 (보안 경계)",
  },
  {
    name: "Spinner",
    category: "Feedback",
    description: "로딩 스피너",
    a2uiNote: "A2UI에 로딩 상태 컴포넌트 없음",
  },
  {
    name: "Skeleton",
    category: "Feedback",
    description: "콘텐츠 로딩 스켈레톤",
    a2uiNote: "A2UI에 로딩 상태 컴포넌트 없음",
  },
  {
    name: "StatusIndicator",
    category: "Feedback",
    description: "온라인/오프라인/에러 상태 점",
    a2uiNote: "A2UI에 상태 표시 컴포넌트 없음",
  },
  {
    name: "InlineBanner",
    category: "Feedback",
    description: "인라인 알림 배너 (info/warning/error/success)",
    a2uiNote: "A2UI에 피드백 컴포넌트 없음",
  },
  {
    name: "EmptyState",
    category: "Feedback",
    description: "빈 상태 안내 (아이콘 + 제목 + 설명 + CTA)",
    a2uiNote: "A2UI에 빈 상태 컴포넌트 없음",
  },
  {
    name: "IconGallery",
    category: "Developer Tool",
    description: "Phosphor Icons 1,512개 갤러리 (검색/필터/weight/size)",
    a2uiNote: "개발자 도구. A2UI 프로토콜과 무관",
  },
  {
    name: "VersionToggle",
    category: "Result Renderer",
    description: "버전 비교 토글",
    a2uiNote: "A2UI에 해당 개념 없음",
  },
];

// ─────────────────────────────────────────────────────────────
// 4. 빠른 참조: A2UI 컴포넌트명 → 캐럿 컴포넌트명
// ─────────────────────────────────────────────────────────────

/**
 * A2UI 컴포넌트명으로 캐럿 컴포넌트를 빠르게 찾기 위한 룩업 테이블.
 *
 * 사용법:
 *   const caretNames = QUICK_LOOKUP["TextField"];
 *   // → ["Input", "Textarea", "SearchInput", "ChatInput"]
 */
export const QUICK_LOOKUP: Record<string, string[]> = {
  // Layout
  Row:            ["ActionBar", "MetaInfoBar", "ChipBar", "(Tailwind flex)"],
  Column:         ["Card", "SceneCard", "(Tailwind flex-col)"],
  List:           ["SceneCardList", "HistoryItem", "CollapsibleLog", "StepIndicator", "(Array.map)"],

  // Display
  Text:           ["SectionHeader", "Badge", "Tag", "StreamingText", "MarkdownRenderer", "(Tailwind typography)"],
  Image:          ["ImageRenderer", "Avatar"],
  Icon:           ["Icon (Phosphor)"],
  Divider:        ["Divider"],

  // Interactive
  Button:         ["Button", "Chip"],
  TextField:      ["Input", "Textarea", "SearchInput", "ChatInput"],
  CheckBox:       ["Chip (selected)", "(native checkbox)"],
  Slider:         ["(native range)", "(미구현)"],
  DateTimeInput:  ["(native date/time)", "(미구현)"],
  ChoicePicker:   ["ChipBar", "Dropdown", "SegmentedControl", "ModelSelector"],
  MultipleChoice: ["ChipBar", "Dropdown", "SegmentedControl", "ModelSelector"],

  // Container
  Card:           ["Card", "PresetCard", "SkillCard", "SceneCard", "FileCard", "ErrorCard"],
  Modal:          ["Modal", "CommandPalette", "Dropdown", "Tooltip", "Toast"],
  Tabs:           ["TabBar", "SegmentedControl", "CompositeResult"],
};

// ─────────────────────────────────────────────────────────────
// 5. 매핑 통계
// ─────────────────────────────────────────────────────────────

/**
 *  ┌──────────────────────────────────────────────────────┐
 *  │              매핑 요약 통계                            │
 *  ├──────────────────────────────────────────────────────┤
 *  │  A2UI 공식 컴포넌트:           14개                   │
 *  │  캐럿 2.0 전체 컴포넌트:       48개                   │
 *  │                                                      │
 *  │  직접 매핑 (direct):            1개 (Divider)        │
 *  │  확장 매핑 (extended):          7개                   │
 *  │  조합 매핑 (composite):         4개                   │
 *  │  미대응 A2UI:                   2개 (Slider, DateTime)│
 *  │  캐럿 전용 (no A2UI 대응):     15개                   │
 *  │                                                      │
 *  │  A2UI 미지원 → 캐럿 추가 고려:                       │
 *  │    ☐ CheckBox (전용 컴포넌트)                        │
 *  │    ☐ Slider (범위 입력)                              │
 *  │    ☐ DateTimeInput (날짜/시간)                       │
 *  └──────────────────────────────────────────────────────┘
 */
