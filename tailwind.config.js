/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const { transform } = require('typescript')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans]
    },
    colors: {
       transparent: 'transparent',
      error: {
        "400": "#FC1313"
      },
      primary: {
        '400': "#0AA1DD",
      },

      neutral: {
        '100': '#FFFFFF',
        '700': "#8E9093",
        '800': "#404852",
        '900': '#000000'
      },
     
    },
    extend: {
      fontSize: {
        'xxs': '.65rem'
      },
      keyframes: {
        drop0: {
          '0%': {
            transform: "translate(0,0)", 
            opacity: "0"
          },
          '95%': {
            opacity: "0",
          },
          '100%': {
            transform: "translate(-9.5rem, -9rem)",
            opacity: "1" 
          }
        },
        drop1: {
          '0%': {
            transform: "translate(0,0)", 
            opacity: "0"
          },
          '95%': {
            opacity: "0",
          },
          '100%': {
            transform: "translate(-9.5rem, -7rem)",
            opacity: "1" 
          }
        },
        drop2: {
          '0%': {
            transform: "translate(0,0)", 
            opacity: "0"
          },
          '95%': {
            opacity: "0",
          },
          '100%': {
            transform: "translate(-9.5rem, -5rem)",
            opacity: "1" 
          }
        },
        slide: {
          '0%': {
            transform: 'translate(0) scaleX(-1)',
            opacity: '0'

          },
          '100%': {
            transform: 'translate(-11.5rem) scaleX(-1)',
            opacity: '1'
          },
        },
        pour: {
          '0%': {
            transform: 'translate(0, 0) scaleX(-1) rotate(0deg)',
          },
          '50%': {
            transform: 'translate(0, -5rem) scaleX(-1) rotate(0deg)'
          },
          '100%': {
            transform: 'translate(0, -5rem) scaleX(-1) rotate(30deg)',
       
          }
        }
      },
      animation: {
        drop0: 'drop0 2.5s ease-in-out 0s 1 normal forwards',
        drop1: 'drop1 3s ease-in-out 0s 1 normal forwards',
        drop2: 'drop2 3.5s ease-in-out 0s 1 normal forwards',
        pour: 'pour 2.5s ease-in-out 0s 1 normal forwards',
        slide: 'slide 2s ease-in-out 0s 1 normal forwards'
      }
    }
    // extend: {
    //   colors: {
    //     primary: {
    //       '400': "#08D9D6",
    //     },
    //     accent: {
    //       '400': "#FF2E63",
    //     },
    //     neutral: {
    //       "100": "#EAEAEA",
    //       '900':  "#252A34"
    //     }
    //   },
      
    // },
  },
  plugins: [],
}
