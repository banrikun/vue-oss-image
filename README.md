# Vue OSS Image
![NPM Version](https://img.shields.io/npm/v/vue-oss-image)
![Support Vue3](https://img.shields.io/badge/vue-3.x-42b883)
![GitHub License](https://img.shields.io/github/license/banrikun/vue-oss-image)

A powerful Vue 3 directive for generating and processing Alibaba Cloud OSS image URLs with advanced image transformation capabilities.

## 📦 Installation

```bash
yarn add vue-oss-image
```

## 🚀 Quick Start

### Basic Setup

```js
import { createApp } from 'vue'
import VueOssImage from 'vue-oss-image'
import App from './App.vue'

createApp(App)
  // Global configuration
  .use(VueOssImage, {
    host: 'https://your-oss-domain.com',
    resizeMode: 'fill',
    quality: 85,
    format: 'webp'
  })
  .mount('#app')
```

### Basic Usage

```html
<!-- Simple image path -->
<img v-img="'example.jpg'">
<!-- Output: src="https://your-oss-domain.com/example.jpg" -->

<!-- With image processing -->
<img v-img="{
  host: 'https://demo.com',
  path: '/example.jpg',
  width: 100,
  height: 50,
  ratio: 2
}">
<!-- Output: src="https://demo.com/example.jpg?x-oss-process=image/resize,m_fill,w_200,h_100" -->

<!-- Background image -->
<div v-img="{ path: 'example.jpg' }"></div>
<!-- Output: style.backgroundImage = 'url(https://your-oss-domain.com/example.jpg)' -->
```

## 📋 Configuration Options

| Option | Global | Directive | Compose | Type | Description |
|--------|:------:|:---------:|:-------:|------|-------------|
| `host` | ✅ | ✅ | ✅ | `String` | OSS domain prefix for image URLs |
| `path` | 🚫 | ✅ | ✅ | `String` | Image path (ignores host if starts with http(s):// or is base64) |
| `width` | 🚫 | ✅ | ✅ | `Number` | Image width (cannot be used with `long` or `short`) |
| `height` | 🚫 | ✅ | ✅ | `Number` | Image height (cannot be used with `width` or `height`) |
| `long` | 🚫 | ✅ | ✅ | `Number` | Longest side length (cannot be used with `width` or `height`) |
| `short` | 🚫 | ✅ | ✅ | `Number` | Shortest side length (cannot be used with `width` or `height`) |
| `quality` | ✅ | ✅ | ✅ | `Number` | Image quality (1-100) |
| `format` | ✅ | ✅ | ✅ | `String` | Output format: `webp`, `jpg`, `png`, `bmp`, `gif`, `tiff` |
| `resizeMode` | ✅ | ✅ | ✅ | `String` | Resize mode: `fill`, `lfit`, `mfit`, `pad`, `fixed` (default: `fill`) |
| `ratio` | ✅ | ✅ | ✅ | `Number` | Resize ratio (default: `window.devicePixelRatio`) |
| `loading` | ✅ | ✅ | 🚫 | `String` | Loading placeholder image |
| `error` | ✅ | ✅ | 🚫 | `String` | Error fallback image |
| `attr` | ✅ | ✅ | 🚫 | `String` | Target attribute name (auto-detected by tagName) |

## 🔧 Advanced Usage

### Vapor Mode (Vue 3.6+)

```js
const imageData = ref({
  host: 'https://demo.com',
  path: '/example.jpg',
  width: 100,
  height: 50,
  ratio: 2
})
```

```html
<!-- Use v-img-vapor directive for Vapor mode -->
<img v-img-vapor="imageData">
```

**Note:** The `v-img-vapor` directive is automatically registered when using `app.use(VueOssImage)`. You can also create custom Vapor hooks using `VueOssImage.createVaporHook()` for more flexibility.

### Custom Instance Configuration

```js
import VueOssImage from 'vue-oss-image'

// Create custom instance
const myOssImage = VueOssImage.create({
  host: 'https://custom-domain.com',
  quality: 90,
  format: 'webp'
})

// Add custom methods
myOssImage.prototype.$compose = () => {
  // Custom composition logic
}

// Use custom instance
app.use(VueOssImage, myOssImage)
```

### Custom Directive Name

```js
import VueOssImage from 'vue-oss-image'

const myOssImage = VueOssImage.create({
  host: 'https://custom-domain.com'
})

// Register with custom name (no need for app.use)
app.directive('my-image', VueOssImage.createHooks(myOssImage))
// You can also use VueOssImage.createVaporHook for Vapor mode directives
```

```html
<img v-my-image="{ path: 'example.jpg', width: 200 }">
```

### Integration with Vue Lazyload

```js
// In your component setup
const loadingUrl = VueOssImage.compose({
  host: 'https://your-domain.com',
  path: 'loading.png'
})

const errorUrl = VueOssImage.compose({
  host: 'https://your-domain.com',
  path: 'error.png'
})
```

```html
<div v-lazy-container="{ selector: 'img', loading: loadingUrl, error: errorUrl }">
  <img v-img="{ path: 'example.jpg', attr: 'data-src' }">
</div>
```

## 📝 Examples

### Basic Image Processing

```html
<!-- Resize image -->
<img v-img="{ path: 'photo.jpg', width: 300, height: 200 }">

<!-- Convert to WebP -->
<img v-img="{ path: 'photo.jpg', format: 'webp', quality: 85 }">

<!-- Responsive image with device pixel ratio -->
<img v-img="{ path: 'photo.jpg', width: 100, ratio: 2 }">
```

### Advanced Processing

```html
<!-- Multiple transformations -->
<img v-img="{
  path: 'photo.jpg',
  width: 400,
  height: 300,
  resizeMode: 'lfit',
  quality: 90,
  format: 'webp'
}">

<!-- Background image with loading state -->
<div v-img="{
  path: 'background.jpg',
  loading: 'loading.gif',
  error: 'error.jpg',
  width: 800,
  height: 600
}"></div>
```

### Dynamic Configuration

```js
// Reactive image configuration
const imageConfig = ref({
  path: 'dynamic-image.jpg',
  width: 200,
  quality: 85
})

// Update configuration
const updateImage = () => {
  imageConfig.value.width = 300
  imageConfig.value.quality = 95
}
```

```html
<img v-img="imageConfig" @click="updateImage">
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Related Links

- [Alibaba Cloud OSS Image Processing Documentation](https://www.alibabacloud.com/help/zh/oss/user-guide/img-parameters/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Lazyload](https://github.com/hilongjw/vue-lazyload/tree/next)
