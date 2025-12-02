/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crisal-primary': '#443c92',
        'crisal-primary-dark': '#1d1d6d',
        'crisal-secondary': '#ff9d9d',
        'crisal-light': '#f9f6fd',
        'crisal-accent-1': '#ffb501',
        'crisal-accent-2': '#f64a14',
        // Mantener nombres antiguos para compatibilidad durante transición
        'crisal-turquesa': '#443c92',
        'crisal-azul': '#443c92',
        'crisal-gris': '#f9f6fd',
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
        'gradient-crisal': 'linear-gradient(135deg, #443c92 0%, #1d1d6d 100%)',
        'gradient-crisal-reverse': 'linear-gradient(135deg, #1d1d6d 0%, #443c92 100%)',
        'gradient-crisal-soft': 'linear-gradient(135deg, rgba(68, 60, 146, 0.1) 0%, rgba(29, 29, 109, 0.1) 100%)',
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

