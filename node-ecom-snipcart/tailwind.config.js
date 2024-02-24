/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('@tailwindcss/forms')],
  content: ['./views/**/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'news-letter':
          "url('https://themewagon.github.io/eshopper/img/carousel-1.jpg')",
      },
    },
  },
  plugins: [],
};
