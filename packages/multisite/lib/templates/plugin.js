import Cookies from 'js-cookie';
import cookie from 'cookie';
import merge from 'deepmerge';

export default (ctx, inject) => {
  const {
    req,
    res,
    query,
    isDev,
  } = ctx;

  // Module options
  const sites = <%= JSON.stringify(options.sites) %>;
  const debug = <%= options.debug %>;
  const QUERY_SITE_ID_KEY = '<%= options.QUERY_SITE_ID_KEY %>';
  const COOKIE_SITE_KEY = '<%= options.COOKIE_SITE_KEY %>';
  const CSS_VARS_STYLE_ID = '<%= options.CSS_VARS_STYLE_ID %>';
  const defaultSite = sites.find(site => site.isDefault);

  // Instance options
  const multisiteOptions = {
    site: null,
  };

  // Guess current site
  let currentSiteId = null;
  // In development, get current site from cookies or query string
  if (debug || isDev) {
    currentSiteId = query[QUERY_SITE_ID_KEY];

    // If no site ID found in query string, attempt to retrieve it from cookies
    if (!currentSiteId) {
      if (process.server) {
        const cookies = cookie.parse(req.headers.cookie || '');
        currentSiteId = cookies[COOKIE_SITE_KEY] || null;
      } else {
        currentSiteId = Cookies.get(COOKIE_SITE_KEY) || null;
      }
    }

    // Set cookie
    if (currentSiteId && process.server) {
      res.setHeader('Set-Cookie', cookie.serialize(COOKIE_SITE_KEY, String(currentSiteId), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      }));
    }
  } else {
    // Get current site from request or location
    const { host } = process.server ? req.headers : window.location;
    sites.some((site) => {
      let patterns = site.hostPatterns || null;
      if (patterns) {
        patterns = patterns.split(',');
        return patterns.some((pattern) => {
          const regexp = new RegExp(pattern);
          if (regexp.test(host)) {
            currentSiteId = site.id;
            return true;
          }
        });
      }
    });
  }

  const currentSite = currentSiteId ? sites.find(site => site.id === currentSiteId) : defaultSite;

  multisiteOptions.site = currentSite;

  // CSS vars
  const getComputedCssVars = (cssVars) => {
    const style = Object.keys(cssVars).map(key => `${key}:${cssVars[key]}`);
    return `:root{${style.join(';')}}`;
  };
  const headStyle = {
    id: CSS_VARS_STYLE_ID,
    type: 'text/css',
    innerHTML: getComputedCssVars(currentSite.cssVars),
  };
  const styleIndex = ctx.app.head.style.findIndex(style => style.id === CSS_VARS_STYLE_ID);
  if (styleIndex !== -1) {
    ctx.app.head.style[styleIndex] = headStyle;
  } else {
    ctx.app.head.style.push(headStyle);
  }

  // Meta
  if (typeof currentSite.head !== 'undefined') {
    ctx.app.head = merge(ctx.app.head, currentSite.head);
  }

  // Assets helper
  multisiteOptions.asset = (path, site = null) => {
    site = site || currentSite.id;
    return `/${site}/${path}`;
  };

  ctx.$multisite = multisiteOptions;
  inject('multisite', multisiteOptions);
};
