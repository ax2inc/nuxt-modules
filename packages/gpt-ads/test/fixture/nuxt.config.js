const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false,
  },
  modules: ['@@'],
  gptAds: {
    networkCode: 6355419,
    individualRefresh: true,
  },
};
