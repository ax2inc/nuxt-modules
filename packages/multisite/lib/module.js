import {
  DEFAULT_OPTIONS,
  QUERY_SITE_ID_KEY,
  COOKIE_SITE_KEY,
  CSS_VARS_STYLE_ID,
} from './constants';

const { resolve } = require('path');

module.exports = async function module(moduleOptions) {
  const options = Object.assign(DEFAULT_OPTIONS, this.options.multisite, moduleOptions);

  const templatesOptions = {
    ...options,
    QUERY_SITE_ID_KEY,
    COOKIE_SITE_KEY,
    CSS_VARS_STYLE_ID,
  };

  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.js'),
    fileName: 'multisite-module/plugin.js',
    options: templatesOptions,
  });
};
module.exports.meta = require('../package.json');
