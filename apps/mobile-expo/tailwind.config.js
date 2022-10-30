// apps/site/tailwind.config.js
const { join } = require('path');

module.exports = {
  mode: 'jit',
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
