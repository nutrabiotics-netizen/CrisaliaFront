/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crisal-turquesa': '#60EFDB',
        'crisal-azul': '#29536D',
        'crisal-gris': '#E6E6E6',
      },
      fontFamily: {
        'ibrand': ['Ibrand Regular', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        'poppins-light': '300',
        'poppins-regular': '400',
        'poppins-medium': '500',
        'poppins-semibold': '600',
        'poppins-bold': '700',
        'poppins-extrabold': '800',
      },
      backgroundImage: {
        'gradient-crisal': 'linear-gradient(135deg, #60EFDB 0%, #29536D 100%)',
        'gradient-crisal-reverse': 'linear-gradient(135deg, #29536D 0%, #60EFDB 100%)',
        'gradient-crisal-soft': 'linear-gradient(135deg, rgba(96, 239, 219, 0.1) 0%, rgba(41, 83, 109, 0.1) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

