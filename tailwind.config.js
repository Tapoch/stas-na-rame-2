module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        crimson: '#e81f41'
      }
    },
    fontFamily: {
      sans: ['Play', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
