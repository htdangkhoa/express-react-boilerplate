const autoprefixer = require('autoprefixer');

const configurationPostcss = () => ({
  plugins: [autoprefixer()],
});

module.exports = configurationPostcss;
