# lozad-module
[![npm (scoped with tag)](https://img.shields.io/npm/v/@ax2/lozad-module/latest.svg?style=flat-square)](https://npmjs.com/package/@ax2/lozad-module)
[![npm](https://img.shields.io/npm/dt/@ax2/lozad-module.svg?style=flat-square)](https://npmjs.com/package/@ax2/lozad-module)
[![Dependencies](https://david-dm.org/ax2inc/lozad-module/status.svg?style=flat-square)](https://david-dm.org/ax2inc/lozad-module)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

> Lozad.js integration for Nuxt

[📖 **Release Notes**](./CHANGELOG.md)

## Features

Integrate [Lozad.js](https://github.com/ApoorvSaxena/lozad.js) with your Nuxt project.

## Setup

- Install the module with your favorite package manager.

```sh
yarn add @ax2/lozad-module
# Or npm i @ax2/lozad-module
```

- Add `lozad-module` to `modules` section of `nuxt.config.js`.

```js
// nuxt.config.js

{
  modules: [
    '@ax2/lozad-module',
 ],
}
```

- Configure the module as needed by adding a `lozad` key to `nuxt.config.js`.

```js
// nuxt.config.js

{
  lozad: {
    // Module options
  }
}
```

## Options

### selector

- **Type**: `String`
- **Default**: `'.lozad'`

Selector which lozad uses to find elements to be lazy-loaded.

### observer

- **Type**: `Object`
- **Default**: `{}`

IntersectionObserver options, see [lozad options](https://apoorv.pro/lozad.js/#usage).

### polyfill

- **Type**: `Boolean`
- **Default**: `false`

Set to `true` to enable [IntersectionObserver](https://caniuse.com/#feat=intersectionobserver) polyfill.

## Usage

To enable lazy-loading, you must trigger lozad's `observe()` method in the `mounted()` hook of your pages/components that include lazy-loadable content.

```vue
<template>
<div>
  <img class="lozad" data-src="https://placekitten.com/200/300" />
</div>
</template>

<script>
export default {
  mounted () {
    this.$lozad.observe();
  },
};
</script>

```


## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](../../LICENSE)

Copyright (c) Ax2 Inc.
