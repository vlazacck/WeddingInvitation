/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F6EFDD',
        parchmentDeep: '#EDE0C4',
        ink: '#3A2E22',
        gold: '#C9A227',
        goldLight: '#E4C660',
        burgundy: '#48151d',
        royal: '#40361a',
        sage: '#7C8B6F'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Parisienne"', 'cursive'],
        body: ['"EB Garamond"', 'serif'],
        ethiopic: ['"Benaiah"', '"Noto Sans Ethiopic"', 'sans-serif']
      },
      backgroundImage: {
        parchmentTexture: "url('/assets/parchment-texture.svg')",
        stainedGlass: "url('/assets/stained-glass.svg')"
      },
      keyframes: {
        floatPetal: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' }
        },
        sealPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        floatPetal: 'floatPetal 9s linear infinite',
        sealPulse: 'sealPulse 3s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease-out forwards'
      }
    }
  },
  plugins: []
};
