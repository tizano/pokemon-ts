import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        fhd: '1920px',
      },
      fontSize: {
        'fluid-3xl': 'clamp(3rem, 1.9rem + 2.5vw, 6rem)',
        'fluid-2xl': 'clamp(2.5rem, 1.8824rem + 2.3529vw, 4rem)',
        'fluid-xxl': 'clamp(2.25rem, 1.8382rem + 1.5686vw, 3.25rem)',
        'fluid-xl': 'clamp(2rem, 1.6912rem + 1.1765vw, 2.75rem)',
        'fluid-lg': 'clamp(1.75rem, 1.5441rem + 0.7843vw, 2.25rem)',
        'fluid-md': 'clamp(1rem, 0.9485rem + 0.1961vw, 1.125rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8235rem + 0.1961vw, 1rem)',
      },
      colors: {
        'pokemon-bg-100': 'var(--pokemon-bg-100)',
        'pokemon-bg-400': 'var(--pokemon-bg-400)',
        'pokemon-bg-600': 'var(--pokemon-bg-600)',
        'pokemon-bg-900': 'var(--pokemon-bg-900)',
        'pokemon-type-dark': 'var(--pokemon-type-dark)',
        'pokemon-type-bug': 'var(--pokemon-type-bug)',
        'pokemon-type-dragon': 'var(--pokemon-type-dragon)',
        'pokemon-type-electric': 'var(--pokemon-type-electric)',
        'pokemon-type-fairy': 'var(--pokemon-type-fairy)',
        'pokemon-type-fighting': 'var(--pokemon-type-fighting)',
        'pokemon-type-fire': 'var(--pokemon-type-fire)',
        'pokemon-type-flying': 'var(--pokemon-type-flying)',
        'pokemon-type-ghost': 'var(--pokemon-type-ghost)',
        'pokemon-type-grass': 'var(--pokemon-type-grass)',
        'pokemon-type-ground': 'var(--pokemon-type-ground)',
        'pokemon-type-ice': 'var(--pokemon-type-ice)',
        'pokemon-type-normal': 'var(--pokemon-type-normal)',
        'pokemon-type-poison': 'var(--pokemon-type-poison)',
        'pokemon-type-psychic': 'var(--pokemon-type-psychic)',
        'pokemon-type-rock': 'var(--pokemon-type-rock)',
        'pokemon-type-steel': 'var(--pokemon-type-steel)',
        'pokemon-type-water': 'var(--pokemon-type-water)',
        error: 'var(--error)',
        success: 'var(--success)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--pokemon-bg-900))',
          foreground: 'hsl(var(--pokemon-bg-900))',
          background: 'hsl(var(--pokemon-bg-900))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        floating: 'floating 3s ease-in-out infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate'), require('tailwindcss-motion')],
} satisfies Config;

export default config;
