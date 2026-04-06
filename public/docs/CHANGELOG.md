# 캐럿 2.0 컴포넌트 변경 로그

> 수정 세션마다 업데이트됩니다. 개발자는 최신 항목만 확인하면 됩니다.

---

## 2026-04-01

### 신규 variant / size 추가 (14개 컴포넌트)

| 컴포넌트 | 추가된 Props | 값 |
|----------|-------------|-----|
| Card | `variant` | `"outlined"` `"elevated"` |
| SectionHeader | `size` | `"sm"` `"lg"` |
| Divider | `spacing` | `"compact"` `"wide"` |
| Textarea | `size` | `"sm"` |
| SearchInput | `variant` | `"filled"` |
| Skeleton | `size` | `"sm"` `"lg"` |
| Tooltip | `variant` | `"rich"` |
| Dropdown | `size` | `"sm"` |
| CodeBlock | `size` | `"sm"` |
| MessageBubble | `variant` | `"error"` `"system"` |
| ErrorCard | `variant` | `"compact"` |
| FileCard | `variant` | `"download"` `"upload"` |
| Toast | `size` | `"sm"` |
| CommandPalette | `size` | `"sm"` |

### 아이콘 변경

- 다운로드 아이콘: `IcDownload` → `IcDownloadSimple` (ActionBar, ImageRenderer, FileCard)

### 스타일 수정

- **Input / Textarea / SearchInput / IconGallery**: focus 스타일을 `outline` 기반 inset으로 변경 (`focus:outline-2 focus:outline-primary focus:-outline-offset-2`). 포커스 시 레이아웃 시프트 없음
- **MessageBubble (error)**: 좌측 장식 보더 (`border-l-2 border-error`) 제거
- **Toast**: 좌측 컬러 라인 (`border-l-[3px]`) 제거
- **Tooltip (default)**: `whitespace-normal` → `whitespace-nowrap` (짧은 텍스트 가로 한 줄 표시)

### A2UI 프리뷰 동기화

A2UI 섹션에 Carat 2.0 variant 쇼케이스를 동기화:
- Display: SectionHeader (sm/md/lg), Divider (spacing)
- Interactive: Button (size/loading/disabled/iconOnly), Textarea (sm), SearchInput (filled)
- Container: Card (3 variants), FileCard (3 variants), ErrorCard (compact), Dropdown (sm), Tooltip (rich), Toast (sm), CommandPalette (sm)

### 코드 정리

- 미리보기 페이지: 사용하지 않는 아이콘 import 129개 제거, 죽은 코드 170줄 제거
- CommandPalette: 외부 클릭 시 닫힘 (`useRef` + `mousedown` 이벤트) 추가
