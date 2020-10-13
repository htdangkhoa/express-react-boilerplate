const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const configurationPostcss = () => ({
  plugins: [autoprefixer({ grid: true }), cssnano({ preset: 'advanced' })],
});

module.exports = configurationPostcss;
