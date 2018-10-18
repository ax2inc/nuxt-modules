# multisite-module
[![npm (scoped with tag)](https://img.shields.io/npm/v/@ax2/multisite-module/latest.svg?style=flat-square)](https://npmjs.com/package/@ax2/multisite-module)
[![npm](https://img.shields.io/npm/dt/@ax2/multisite-module.svg?style=flat-square)](https://npmjs.com/package/@ax2/multisite-module)
[![Dependencies](https://david-dm.org/ax2inc/multisite-module/status.svg?style=flat-square)](https://david-dm.org/ax2inc/multisite-module)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)


> Multisite features for your Nuxt project

[📖 **Release Notes**](./CHANGELOG.md)

## Features

This module helps you bring multisite features to your Nuxt project. Here are the main features:

- Current site detection based on host (or query string in development)
- Contextual CSS vars declaration for site-specific theming
- Contextual meta data

## Setup

- Install the module with your favorite package manager.

```sh
yarn add @ax2/multisite-module
# Or npm i @ax2/multisite-module
```

- Add `@ax2/multisite-module` to `modules` section of `nuxt.config.js`.

```js
// nuxt.config.js

{
  modules: [
    '@ax2/multisite-module',
 ],
}
```

- Configure the module as needed by adding a `multisite` key to `nuxt.config.js`.

```js
// nuxt.config.js

{
  multisite: {
  	// Module options
  }
}
```


## Options

### debug

- Type: `Boolean`
- **Default**: `false`

Set this to `true` to force the module to get the current site from the query string.

### sites

- Type: `Array`

List of sites.

```js
{
  multisite: {
    sites: [
      {
        id: 'my-site',
        title: 'My awesome site',
        isDefault: true,
        hostPatterns: 'myawesomesite\.com,myincrediblesite\.(com|org)',
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
    ],
  },
}
```

Each item in `sites` can have a few options of its own:

#### id

- Type: `Integer|String`

The site's unique identifier.

#### isDefault

- Type: `Boolean`

Wether this site should be considered as the default one. Any request that cannot be resolved to one of the sites will fallback to the default one.

#### hostPatterns

- Type: `String`

A list of comma-separated patterns to test against requests host in order to enable this site in production.

#### cssVars

- Type: `Object`

CSS vars that should be set when visiting this site.

#### head

- Type: `Object`

This is the same as Nuxt's [head property](https://nuxtjs.org/api/configuration-head#the-head-property), options defined here are merged with the main `head` property definition.

> NOTE: Functions are not supported here

## Usage

### Development

In development, switch from one site to another by adding a `site` query parameter to the URL. The value should be the site's ID as defined in the module's configuration. ie: [http://127.0.0.1:8080/?site=my-site](http://127.0.0.1:8080/?site=my-site)

Active site is stored in a cookie, so next time you visit [http://127.0.0.1:8080](http://127.0.0.1:8080), active site will be last used one.

### Production

In production, active site is detected by matching request host against the patterns you defined in `hostPatterns` options. ie if you visit [http://myawesomesite.com](http://myawesomesite.com), `my-site` will be set as active site.

A `$multisite` property is added to the app's context, it contains a few helpers that you can use in any component.

### Properties

#### site

- Type: `Object`

The `site` property contains current site's configuration. You could use it to display the current site's title:

```vue
<template>
  <h1 class="site-title">
    {{ $multisite.site.title }}
  </h1>
</template>
```

### Methods

#### asset

- Arguments
  - `{String} path`: required
  - `{Integer|String} site`: optional, defaults to current site ID
- Return: `String`

Get an asset's path for given site. If no site is specified, defaults to active site.

```vue
<template>
  <header>
    <img class="logo" :src="$multisite.asset('logo.png')">
    <!-- Renders to <img class="logo" src="/my-site/logo.png"> -->
  </header>
</template>
```

> NOTE: It's recommended that you place site-specific assets in a directory named after the site's ID as defined in the module's options. Sites assets directories should be in the static/ directory.

## License

[MIT License](../../LICENSE)

Copyright (c) Ax2 Inc.
