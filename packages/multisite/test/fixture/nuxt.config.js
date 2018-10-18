const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false,
  },
  modules: ['@@'],
  multisite: {
    sites: [
      {
        id: 'my-site',
        title: 'My awesome site',
        isDefault: true,
        hostPatterns: 'localhost',
        cssVars: {
          '--primary-color': '#41B883',
          '--secondary-color': '#3B8070',
        },
        head: {
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/my-site/favicon.ico' },
          ],
        },
      },
      {
        id: 'my-other-site',
        title: 'Another cool site',
        hostPatterns: '127.0.0.1',
        cssVars: {
          '--primary-color': '#fff',
          '--secondary-color': '#000',
        },
        head: {
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/my-other-site/favicon.ico' },
          ],
        },
      },
    ],
  },
};
