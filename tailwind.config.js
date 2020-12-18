module.exports = {
  
  purge: false,
  theme: {

    'flex': {
      '0': '0',
      '1': '1',
      'auto': 'auto',
      '0-1-auto': '0 1 auto',
      '1-0-auto': '1 0 auto'
    },

    'letterSpacing': {
      '1': '0.1px',
      '2': '0.25px',
      '3': '0.365px',
      '5': '0.5px'
    },

    'borderWidth': {
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '10': '10px',
      '12': '12px',
      '16': '16px'
    },

    'minHeight': {
      0:  '0',
      4:  '1rem',
      8:  '2rem',
      16: '4rem',
      24: '6rem',
      32: '8rem'
    },

    'zIndex': {
      '-5': '-5',
      '-4': '-4',
      '-3': '-3',
      '-2': '-2',
      '-1': '-1',
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      'top': '9999',
      'bottom': '-9999'
    },

    'borderRadius': {
      'full': '999px',
      'circle': '50%',
      '0': '0',
      '5': '5px',
      '10': '10px'
    },

    'transition': {
      200: 'all 200ms ease-in-out'
    },

    'lineHeight': {
      '12': '3rem'
    },

    'fontFamily': {
      body:     ['Roboto', 'sans-serif'],
      headline: ['Roboto', 'sans-serif']
    },

    extend: {

      colors: {

        current: "currentColor",

        headline: '#393C44',
        body: '#808292',

        white: '#FFFFFF',
        black: '#000000',

        'light-gray': {
          100: '#F6F8F9',
          200: '#EDF0F3',
          300: '#DAE0E7',
          400: '#BABABA',
          500: '#A2ACBD',
          600: '#758595',
          700: '#586673',
          800: '#47525C',
          900: '#556177'
        },

        'primary': {
          100: '#B5D3F7',
          200: '#90BDF3',
          300: '#6BA7EF',
          400: '#4691EC',
          500: '#217CE8',
          600: '#1567CB',
          700: '#1154A6',
          800: '#0E4281',
          900: '#0A2F5C'
        },

        'secondary': {
          100: '#C4CAD4',
          200: '#ACB5C3',
          300: '#959FB2',
          400: '#7D8AA1',
          500: '#67758E',
          600: '#566276',
          700: '#3E4756',
          800: '#333B47',
          900: '#2B313B',
        },

        'success': {
          100: '#E6F9DC',
          200: '#D9F6CB',
          300: '#C0F0A8',
          400: '#A7EA85',
          500: '#6BDC34',
          600: '#5DD123',
          700: '#4EAE1E',
          800: '#3E8C18',
          900: '#2F6912'
        },

        'warning': {
          100: '#FFF5EB',
          200: '#FFE2C2',
          300: '#FFCF99',
          400: '#FFBC70',
          500: '#FFA845',
          600: '#FF961F',
          700: '#F58300',
          800: '#CC6D00',
          900: '#A35700'
        },

        'danger': {
          100: '#FFEEEB',
          200: '#FFCDC2',
          300: '#FFAC99',
          400: '#FF8A70',
          500: '#FF6947',
          600: '#FF481F',
          700: '#F52D00',
          800: '#CC2500',
          900: '#A31E00'
        },

        'icon': {
          browser: '#217CE8',
          page: '#F1A208',
          system: '#06A77D',
          tools: 'orange',
          utility: 'purple'
        },

      }

    },

  },

  variants: {},
  plugins: [],

}