import {
  DEFAULT_OPTIONS,
} from './constants';

const { resolve } = require('path');

module.exports = async function module(moduleOptions) {
  const options = Object.assign(DEFAULT_OPTIONS, this.options.dayjs, moduleOptions);

  const templatesOptions = {
    ...options,
  };

  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.js'),
    ssr: true,
    fileName: 'dayjs-module/plugin.js',
    options: templatesOptions,
  });
};
module.exports.meta = require('../package.json');
