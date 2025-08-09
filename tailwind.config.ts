// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  /**  Paths Tailwind should scan for class names  */
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  /**  Design-tokens + any extra utilities you want  */
  theme: {
    extend: {
      /* -------------------------------------------------
         ⬇︎ KEEP the semantic tokens Shadcn/Tailwind expect
         ------------------------------------------------- */
      colors: {
        border:      'hsl(var(--border) / <alpha-value>)',
        input:       'hsl(var(--input) / <alpha-value>)',
        ring:        'hsl(var(--ring) / <alpha-value>)',
        background:  'hsl(var(--background) / <alpha-value>)',
        foreground:  'hsl(var(--foreground) / <alpha-value>)',

        /* ----------  Skyline brand palette  ---------- */
        'skyline-blue':   '#0543ba',
        'skyline-yellow': '#ffd700',
        'skyline-cream':  '#f9f1c1',
        'skyline-red':    '#c03a39',
        'skyline-dark':   '#040404',
        'skyline-white':  '#ffffff',
      },

      /* Optional: keep Shadcn’s radius helpers */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      /* Optional: accordion animation helpers (used by Shadcn) */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },

  /**  Extra Tailwind plugins you’re using (optional)  */
  plugins: [
    require('tailwindcss-animate'),   // remove if you’re not using it
  ],
}

export default config;