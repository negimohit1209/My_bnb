// const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'register-image': "url('/landing-background-image.jpeg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      }),
      // colors: {
      //   gray: colors.coolGray,
      //   blue: colors.lightBlue,
      //   red: colors.rose,
      //   pink: colors.fuchsia,
      // },
      // fontFamily: {
      //   sans: ['Graphik', 'sans-serif'],
      //   serif: ['Merriweather', 'serif'],
      // },
      // spacing: {
      //   128: '32rem',
      //   144: '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
