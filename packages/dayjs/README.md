# dayjs-module
[![npm (scoped with tag)](https://img.shields.io/npm/v/@ax2/dayjs-module/latest.svg?style=flat-square)](https://npmjs.com/package/@ax2/dayjs-module)
[![npm](https://img.shields.io/npm/dt/@ax2/dayjs-module.svg?style=flat-square)](https://npmjs.com/package/@ax2/dayjs-module)
[![Dependencies](https://david-dm.org/ax2inc/dayjs-module/status.svg?style=flat-square)](https://david-dm.org/ax2inc/dayjs-module)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

> Day.js integration for Nuxt

[📖 **Release Notes**](./CHANGELOG.md)

## Features

Integrate [Day.js](https://github.com/iamkun/dayjs) with your Nuxt project.

## Setup

- Install the module with your favorite package manager.

```sh
yarn add @ax2/dayjs-module
# Or npm i @ax2/dayjs-module
```

- Add `dayjs-module` to `modules` section of `nuxt.config.js`.

```js
// nuxt.config.js

{
  modules: [
    '@ax2/dayjs-module',
 ],
}
```

- Configure the module as needed by adding a `dayjs` key to `nuxt.config.js`.

```js
// nuxt.config.js

{
  dayjs: {
    // Module options
  }
}
```

## Usage

At the moment, all the module does is inject Day.js into Vue instances so you can call it from anywhere in your app:

```vue
<template>
  <div>
    {{ $dayjs('2018-09-18').format('dddd, MMMM DD, YYYY') }}
    <!-- Renders: Tuesday, September 18, 2018 -->
  </div>
</template>
```

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](../../LICENSE)

Copyright (c) Ax2 Inc.
