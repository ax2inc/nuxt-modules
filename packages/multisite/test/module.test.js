const { Nuxt, Builder } = require('nuxt');
const jsdom = require('jsdom');
const request = require('request-promise-native');

const PORT = 3003;
const config = require('./fixture/nuxt.config');

const { JSDOM } = jsdom;
const getDom = html => (new JSDOM(html)).window.document;

const url = path => `http://localhost:${PORT}${path}`;
const get = path => request(url(path));
const getComputedCssVars = (cssVars) => {
  const style = Object.keys(cssVars).map(key => `${key}:${cssVars[key]}`);
  return `:root{${style.join(';')}}`;
};

describe('basic', () => {
  let nuxt;

  beforeAll(async () => {
    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();
    await nuxt.listen(PORT);
  }, 60000);

  afterAll(async () => {
    await nuxt.close();
  });

  test('Render', async () => {
    const html = await get('/');
    expect(html).toContain('Works!');
  });

  /**
   * localhost
   */
  describe(`localhost - ${config.multisite.sites[0].id}`, () => {
    const siteUrl = path => `http://localhost:${PORT}${path}`;
    const siteGet = path => request(siteUrl(path));

    test('Enables proper site', async () => {
      const html = await siteGet('/');
      expect(html).toContain('My awesome site');
    });

    test('Sets proper css vars', async () => {
      const html = await siteGet('/');
      const dom = getDom(html);
      const node = dom.querySelector('#multisite-css-vars');
      expect(node.textContent).toBe(getComputedCssVars(config.multisite.sites[0].cssVars));
    });

    test('Uses proper favicon', async () => {
      const html = await request(`http://localhost:${PORT}/`);
      const dom = getDom(html);
      const node = dom.querySelector('link[rel="icon"]');
      expect(node.href).toBe(config.multisite.sites[0].head.link[0].href);
    });
  });

  /**
   * 127.0.0.1
   */
  describe(`127.0.0.1 - ${config.multisite.sites[1].id}`, () => {
    const siteUrl = path => `http://127.0.0.1:${PORT}${path}`;
    const siteGet = path => request(siteUrl(path));

    test('Enables proper site', async () => {
      const html = await siteGet('/');
      expect(html).toContain('Another cool site');
    });

    test('Sets proper css vars', async () => {
      const html = await siteGet('/');
      const dom = getDom(html);
      const node = dom.querySelector('#multisite-css-vars');
      expect(node.textContent).toBe(getComputedCssVars(config.multisite.sites[1].cssVars));
    });

    test('Uses proper favicon', async () => {
      const html = await siteGet('/');
      const dom = getDom(html);
      const node = dom.querySelector('link[rel="icon"]');
      expect(node.href).toBe(config.multisite.sites[1].head.link[0].href);
    });
  });
});
