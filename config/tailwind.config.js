const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      maxHeight: {
        '128': '32rem',
        '64': ''
      },
      minWidth: {
        '128': '32rem'
      },
      width: {
        '100': '32rem',
      },
      height: {
        '100': '32rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
  variants: {
    backgroundColor: ['hover', 'focus', 'active'],
    border: ['hover', 'focus', 'active']
  }
}
