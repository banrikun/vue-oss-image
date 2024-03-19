# Vue OSS Image
![NPM Version](https://img.shields.io/npm/v/vue-oss-image)
![Support Vue3](https://img.shields.io/badge/vue-3.x-42b883)
![GitHub License](https://img.shields.io/github/license/banrikun/vue-oss-image)

A custom directive designed for Vue 3 to generate Alibaba Cloud OSS image URLs.

## Quick Start
```bash
npm install vue-oss-image --save
```
```js
import { createApp } from 'vue'
import VueOssImage from 'vue-oss-image'
import App from './App.vue'

const app = createApp(App)
app.use(VueOssImage, {
  // global options
  host: 'https://test.com',
  resizeMode: 'fill'
})
app.mount('#app')
```
```html
<img v-img="'example.jpg'">
<!-- => src="https://test.com/example.jpg" -->

<img v-img="{ host: 'https://demo.com', path: '/example.jpg', width: 100, height: 50, ratio: 2 }">
<!-- => src="https://demo.com/example.jpg?x-oss-process=image/resize,m_fill,w_200,h_100" -->

<div v-img="{ path: 'example.jpg' }"></div>
<!-- => style.backgroundImage = 'url(https://test.com/example.jpg)' -->
```

## Options
| Name | Global | Directive | `.compose` | Description |
|-|:-:|:-:|:-:|-|
| quality | ✅ | ✅ | ✅ | [Number] Quality, supports integers from `0` to `100` |
| format | ✅ | ✅ | ✅ | [String] Format conversion, supports `webp` `jpg` `png` `bmp` `gif` `tiff` |
| resizeMode | ✅ | ✅ | ✅ | [String] Resize mode, supports `fill` `lfit` `mfit` `pad` `fixed`, default is `fill` |
| ratio | ✅ | ✅ | ✅ | [Number] Resize ratio, default is `window.devicePixelRatio` |
| loading | ✅ | ✅ | 🚫 | [String] Displayed during loading, with other behaviors consistent with `path` |
| error | ✅ | ✅ | 🚫 | [String] Displayed in case of loading error, with other behaviors consistent with `path` |
| attr | ✅ | ✅ | 🚫 | [String] Specify the attribute for replacing the image URL, default is determined based on the element's `tagName` |
| host | ✅ | ✅ | ✅ | [String] The prefix for the image URL |
| path | 🚫 | ✅ | ✅ | [String] If it starts with `http(s)://`, `host` will be ignored. If it's a `base64` image, it will be returned as a complete URL |
| width | 🚫 | ✅ | ✅ | [Number] Cannot be used with `long` or `short` |
| height | 🚫 | ✅ | ✅ | [Number] Cannot be used with `long` or `short` |
| long | 🚫 | ✅ | ✅ | [Number] Cannot be used with `width` or `height` |
| short | 🚫 | ✅ | ✅ | [Number] Cannot be used with `width` or `height` |

[See more](https://www.alibabacloud.com/help/zh/oss/user-guide/img-parameters/)

## Advanced Usage

### Custom Properties and Methods
```js
const myOssImage = VueOssImage.create({
  // global options
})
myOssImage.prototype.compose = () => {}
// Using myOssImage instead of the global options object
app.use(VueOssImage, myOssImage)
```

### Custom Directive Name
```js
const myOssImage = VueOssImage.create({
  // global options
})
// In this case, there's no need to use `app.use`
app.directive('my-directive', VueOssImage.createHooks(myOssImage))
```

### Using with the `VueLazyload` Library
```js
// <script setup>
const loadingUrl = VueOssImage.compose({
  host: 'https://test.com',
  path: 'loading.png'
})
const errorUrl = VueOssImage.compose({
  host: 'https://test.com',
  path: 'error.png'
})
```
```html
<div v-lazy-container="{ selector: 'img', loading: loadingUrl, error: errorUrl }">
  <img v-img="{ path: 'example.jpg', attr: 'data-src' }">
</div>
```

[See more](https://github.com/hilongjw/vue-lazyload/tree/next)

## License
MIT
