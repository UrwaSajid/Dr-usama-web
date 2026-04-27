import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50:  '#FAECE7',
          100: '#F5C4B3',
          200: '#F0997B',
          300: '#E87550',
          400: '#D85A30',
          500: '#C04828',
          600: '#993C1D',
          700: '#7A2E14',
          800: '#712B13',
          900: '#4A1B0C',
        },
        ink: {
          50:  '#F1EFE8',
          100: '#D3D1C7',
          200: '#B4B2A9',
          300: '#9C9A92',
          400: '#888780',
          500: '#6E6D67',
          600: '#5F5E5A',
          700: '#4A4946',
          800: '#444441',
          900: '#2C2C2A',
        },
      },
      fontFamily: {
        comic:  ['Bangers', 'cursive'],
        display: ['Permanent Marker', 'cursive'],
        body:   ['Lato', 'sans-serif'],
        mono:   ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'halftone': "url('/textures/halftone.svg')",
        'ink-paper': "url('/textures/paper.svg')",
      },
      boxShadow: {
        'ink':      '3px 3px 0 #2C2C2A',
        'ink-sm':   '2px 2px 0 #2C2C2A',
        'ink-lg':   '5px 5px 0 #2C2C2A',
        'ink-coral':'3px 3px 0 #D85A30',
        'ink-coral-lg':'6px 6px 0 #D85A30',
        'panel':    '4px 4px 0 #2C2C2A, inset 0 0 0 2px #2C2C2A',
        'glow-coral':'0 0 20px rgba(216,90,48,0.4), 0 0 60px rgba(216,90,48,0.15)',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'pulse-coral': 'pulseC 2s ease-in-out infinite',
        'typewriter':  'typewriter 3s steps(40) forwards',
        'ink-draw':    'inkDraw 1s ease forwards',
        'orbit':       'orbit 12s linear infinite',
        'orbit-slow':  'orbit 20s linear infinite',
        'orbit-rev':   'orbit 16s linear infinite reverse',
        'shimmer':     'shimmer 2s linear infinite',
        'page-flip':   'pageFlip 0.6s ease-in-out forwards',
        'bubble-pop':  'bubblePop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        'grain':       'grain 0.4s steps(1) infinite',
        'slide-in-left':  'slideInLeft 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'fade-up':     'fadeUp 0.6s ease forwards',
        'tilt-back':   'tiltBack 0.3s ease forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseC: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(216,90,48,0.4)' },
          '50%':     { boxShadow: '0 0 0 12px rgba(216,90,48,0)' },
        },
        inkDraw: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pageFlip: {
          '0%':   { transform: 'rotateY(0deg)', opacity: '1' },
          '50%':  { transform: 'rotateY(-90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
        bubblePop: {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '20%': { transform: 'translate(3%,2%)' },
          '30%': { transform: 'translate(-1%,4%)' },
          '40%': { transform: 'translate(4%,-1%)' },
          '50%': { transform: 'translate(-3%,3%)' },
          '60%': { transform: 'translate(2%,-4%)' },
          '70%': { transform: 'translate(-4%,1%)' },
          '80%': { transform: 'translate(1%,3%)' },
          '90%': { transform: 'translate(3%,-2%)' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        tiltBack: {
          '0%':   { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
