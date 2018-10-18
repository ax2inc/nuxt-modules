const { Nuxt, Builder } = require('nuxt');
const request = require('request-promise-native');

const PORT = 3000;
const config = require('./fixture/nuxt.config');


const url = path => `http://localhost:${PORT}${path}`;
const get = path => request(url(path));

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

  test('Formats date properly', async () => {
    const html = await get('/');
    expect(html).toContain('Tuesday, September 18, 2018');
  });
});
