const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const configurationPostcss = () => ({
  plugins: [autoprefixer(), cssnano({ preset: 'default' })],
});

module.exports = configurationPostcss;
