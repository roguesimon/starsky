import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-navy': 'linear-gradient(135deg, hsl(222, 84%, 4.9%) 0%, hsl(217, 32%, 17.5%) 100%)',
        'gradient-blue-teal': 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(172, 66%, 50%) 100%)',
        'gradient-accent': 'linear-gradient(135deg, hsl(172, 66%, 50%) 0%, hsl(187, 85%, 53%) 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Custom navy and teal colors
        navy: {
          50: 'hsl(210, 40%, 98%)',
          100: 'hsl(210, 40%, 96%)',
          200: 'hsl(214, 32%, 91%)',
          300: 'hsl(213, 27%, 84%)',
          400: 'hsl(215, 20%, 65%)',
          500: 'hsl(215, 16%, 47%)',
          600: 'hsl(215, 19%, 35%)',
          700: 'hsl(215, 25%, 27%)',
          800: 'hsl(217, 33%, 17%)',
          900: 'hsl(222, 84%, 5%)',
          950: 'hsl(229, 84%, 5%)',
        },
        teal: {
          50: 'hsl(166, 76%, 97%)',
          100: 'hsl(167, 85%, 89%)',
          200: 'hsl(168, 84%, 78%)',
          300: 'hsl(171, 77%, 64%)',
          400: 'hsl(172, 66%, 50%)',
          500: 'hsl(173, 80%, 40%)',
          600: 'hsl(175, 84%, 32%)',
          700: 'hsl(175, 77%, 26%)',
          800: 'hsl(176, 69%, 22%)',
          900: 'hsl(176, 61%, 19%)',
          950: 'hsl(179, 84%, 10%)',
        },
        blue: {
          50: 'hsl(214, 100%, 97%)',
          100: 'hsl(214, 95%, 93%)',
          200: 'hsl(213, 97%, 87%)',
          300: 'hsl(212, 96%, 78%)',
          400: 'hsl(213, 94%, 68%)',
          500: 'hsl(199, 89%, 48%)',
          600: 'hsl(200, 98%, 39%)',
          700: 'hsl(201, 96%, 32%)',
          800: 'hsl(201, 90%, 27%)',
          900: 'hsl(202, 80%, 24%)',
          950: 'hsl(202, 80%, 16%)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px hsl(199, 89%, 48%)',
          },
          '100%': {
            boxShadow: '0 0 30px hsl(172, 66%, 50%), 0 0 40px hsl(172, 66%, 50%)',
          },
        },
        'pulse-blue': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-blue': 'pulse-blue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      boxShadow: {
        'glow-blue': '0 0 20px hsl(199, 89%, 48%)',
        'glow-teal': '0 0 20px hsl(172, 66%, 50%)',
        'glow-accent': '0 0 30px hsl(172, 66%, 50%), 0 0 40px hsl(172, 66%, 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;