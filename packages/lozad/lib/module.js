import {
  DEFAULT_OPTIONS,
} from './constants';

const { resolve } = require('path');

module.exports = async function module(moduleOptions) {
  const options = Object.assign(DEFAULT_OPTIONS, this.options.lozad, moduleOptions);

  const templatesOptions = {
    ...options,
  };

  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.js'),
    ssr: false,
    fileName: 'lozad-module/plugin.js',
    options: templatesOptions,
  });
};
module.exports.meta = require('../package.json');
