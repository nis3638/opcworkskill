// 将 theme.extend 合并到项目的 tailwind.config.js 中
export const cleanAdminThemeExtend = {
  colors: {
    ink: {
      DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
      2: 'rgb(var(--ink-2-rgb) / <alpha-value>)',
      3: 'rgb(var(--ink-3-rgb) / <alpha-value>)',
      4: 'rgb(var(--ink-4-rgb) / <alpha-value>)',
    },
    paper: {
      DEFAULT: 'rgb(var(--paper-rgb) / <alpha-value>)',
      subtle: 'rgb(var(--paper-subtle-rgb) / <alpha-value>)',
    },
    surface: {
      DEFAULT: 'rgb(var(--surface-rgb) / <alpha-value>)',
      subtle: 'rgb(var(--surface-subtle-rgb) / <alpha-value>)',
    },
    elevated: 'rgb(var(--elevated-rgb) / <alpha-value>)',
    selected: 'rgb(var(--selected-rgb) / <alpha-value>)',
    'on-accent': 'rgb(var(--on-accent-rgb) / <alpha-value>)',
    'action-primary': {
      DEFAULT: 'rgb(var(--action-primary-rgb) / <alpha-value>)',
      hover: 'rgb(var(--action-primary-hover-rgb) / <alpha-value>)',
    },
    jade: {
      DEFAULT: 'rgb(var(--jade-rgb) / <alpha-value>)',
      light: 'rgb(var(--jade-light-rgb) / <alpha-value>)',
      hover: 'rgb(var(--jade-hover-rgb) / <alpha-value>)',
      dark: 'rgb(var(--jade-dark-rgb) / <alpha-value>)',
      border: 'rgb(var(--jade-border-rgb) / <alpha-value>)',
    },
    indigo: {
      DEFAULT: 'rgb(var(--indigo-rgb) / <alpha-value>)',
      light: 'rgb(var(--indigo-light-rgb) / <alpha-value>)',
      hover: 'rgb(var(--indigo-hover-rgb) / <alpha-value>)',
      dark: 'rgb(var(--indigo-dark-rgb) / <alpha-value>)',
      border: 'rgb(var(--indigo-border-rgb) / <alpha-value>)',
    },
    amber: {
      DEFAULT: 'rgb(var(--amber-rgb) / <alpha-value>)',
      light: 'rgb(var(--amber-light-rgb) / <alpha-value>)',
      hover: 'rgb(var(--amber-hover-rgb) / <alpha-value>)',
      dark: 'rgb(var(--amber-dark-rgb) / <alpha-value>)',
      border: 'rgb(var(--amber-border-rgb) / <alpha-value>)',
    },
    cinnabar: {
      DEFAULT: 'rgb(var(--cinnabar-rgb) / <alpha-value>)',
      light: 'rgb(var(--cinnabar-light-rgb) / <alpha-value>)',
      hover: 'rgb(var(--cinnabar-hover-rgb) / <alpha-value>)',
      dark: 'rgb(var(--cinnabar-dark-rgb) / <alpha-value>)',
      border: 'rgb(var(--cinnabar-border-rgb) / <alpha-value>)',
    },
    navy: {
      DEFAULT: 'rgb(var(--navy-rgb) / <alpha-value>)',
      light: 'rgb(var(--navy-light-rgb) / <alpha-value>)',
      border: 'rgb(var(--navy-border-rgb) / <alpha-value>)',
    },
    border: {
      DEFAULT: 'rgb(var(--border-rgb) / <alpha-value>)',
      light: 'rgb(var(--border-light-rgb) / <alpha-value>)',
      dark: 'rgb(var(--border-dark-rgb) / <alpha-value>)',
    },
  },
  fontFamily: {
    sans: ['var(--font-sans)'],
    mono: ['var(--font-mono)'],
  },
  fontSize: {
    '2xs': ['11px', '16px'],
    xs: ['12px', '16px'],
    sm: ['13px', '20px'],
    base: ['14px', '20px'],
    lg: ['16px', '24px'],
    xl: ['20px', '28px'],
    '2xl': ['24px', '32px'],
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  boxShadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    btn: 'var(--shadow-btn)',
    'btn-primary': 'var(--shadow-btn-primary)',
    card: 'var(--shadow-card)',
  },
  maxWidth: {
    content: '1600px',
    form: '960px',
  },
  minHeight: { touch: '44px' },
  minWidth: { touch: '44px' },
};
