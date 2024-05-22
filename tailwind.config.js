/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'lightPink': '#E666BC',
        'darkPink': '#BE3FD0',
        'darkPurple': '#8742b0',
        'paleYellow': '#FFF6C6',
        'lightYellow': '#FFD700',
        'darkYellow': '#FFC300',
        'lightOrange': '#FFB21C',
        'darkOrange': '#FF9F1C',
        'guess1': '#FDFDFD',
        'guess2': '#FFDBF4',
        'guess3': '#F1C7E3',
        'guess4': '#EBA7D4',
        'guess5': '#ED89CC',
        'guess6': '#E666BC'
      },
      fontFamily: {
        'klemer':['Klemer', 'sans-serif'],
        'sand':['Quicksand', 'sans-serif'],
      }
    }
  },
  plugins: []
}