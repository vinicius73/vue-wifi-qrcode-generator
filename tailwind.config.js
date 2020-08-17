// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js'
      // etc.
    ]
  },
  theme: {
    extend: {
      colors: {
        'vue-blue': 'var(--vue-blue)',
        'vue-green': 'var(--vue-green)'
      },
      fontFamily: {
        // sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
