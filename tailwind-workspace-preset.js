// tailwind-workspace-preset.js
let plugin = require('tailwindcss/plugin')


module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-radix'),
  ],
};
