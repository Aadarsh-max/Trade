export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: 'var(--bg-page)',
        surface: 'var(--bg-surface)',
        surfaceStrong: 'var(--bg-surface-strong)',
        glass: 'var(--bg-glass)',
        borderSubtle: 'var(--border-subtle)',
        borderStrong: 'var(--border-strong)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textMuted: 'var(--text-muted)',
        accent: 'var(--accent-purple)',
        accentStrong: 'var(--accent-purple-strong)',
        success: 'var(--success)',
        successSoft: 'var(--success-soft)',
        danger: 'var(--danger)',
        dangerSoft: 'var(--danger-soft)',
        warning: 'var(--warning)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
      },
    },
  },
  plugins: [],
};