module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        silver: '#C0C0C0',
        aquamarine: '#7FFFD4',
        lightpink: '#FFB6C1',
        jetblack: '#343434'
        
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
