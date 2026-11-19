const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const Icon = {
  Logo: () => (
    <svg {...base} width={22} height={22}>
      <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Board: () => (
    <svg {...base}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 8v8M15 8v5" />
    </svg>
  ),
  Calendar: () => (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  Grid: () => (
    <svg {...base} width={15} height={15}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  List: () => (
    <svg {...base} width={15} height={15}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg {...base}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg {...base}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  Search: () => (
    <svg {...base} width={15} height={15}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  ),
  Plus: () => (
    <svg {...base} width={15} height={15} strokeWidth={2.2}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Edit: () => (
    <svg {...base} width={15} height={15}>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
    </svg>
  ),
  Trash: () => (
    <svg {...base} width={15} height={15}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  ),
  Clock: () => (
    <svg {...base} width={13} height={13}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Close: () => (
    <svg {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
};
