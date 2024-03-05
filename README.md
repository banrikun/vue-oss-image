# Vue OSS Image
一款 Vue 3 指令插件，用于生成阿里云 OSS 图片处理参数。

## 基础用法
```bash
npm install vue-oss-image
```
```js
import { createApp } from 'vue'
import VueOssImage from 'vue-oss-image'
import App from './App.vue'

const app = createApp(App)
app.use(VueOssImage, {
  // global options
})
app.mount('#app')
```
```html
<!-- 只使用 path -->
<img v-img="'example.jpg'">

<!-- 更多参数，可覆盖全局设置 -->
<img v-img="{ path: 'example.jpg', width: 100, height: 100 }">

<!-- 非 img 标签将设置为背景 -->
<div v-img="{ path: 'example.jpg', long: 100, short: 100 }"></div>
```

## 参数列表
| 参数名 | 全局 | 指令 | 描述 |
|-|:-:|:-:|-|
| quality | ✅ | ✅ | [Number] 压缩质量，默认不压缩 |
| format | ✅ | ✅ | [String] 格式转换，支持 webp/jpg/png/bmp/gif/tiff |
| resizeMode | ✅ | ✅ | [String] 缩放模式，支持 fill（默认）/lfit/mfit/pad/fixed |
| ratio | ✅ | ✅ | [Number] 默认 devicePixelRatio |
| loading | ✅ | ✅ | [String] 加载中显示的图片，其他与 path 一致 |
| error | ✅ | ✅ | [String] 加载失败显示的图片，其他与 path 一致 |
| attr | ✅ | ✅ | [String] 指定设置的属性名，默认根据 tagName 判断 |
| host | ✅ | ✅ | [String] 地址前缀 |
| path | 🚫 | ✅ | [String] 图片路径，以 http(s):// 开头则无视 host |
| width | 🚫 | ✅ | [Number] 宽度，不可与 long 或 short 共用 |
| height | 🚫 | ✅ | [Number] 高度，不可与 long 或 short 共用 |
| long | 🚫 | ✅ | [Number] 长边，不可与 width 或 height 共用 |
| short | 🚫 | ✅ | [Number] 短边，不可与 width 或 height 共用 |

## 高阶用法
### 自定义属性、方法、指令名
```js
const myOssImage = VueOssImage.create({
  // global options
})
// 添加属性或方法
myOssImage.prototype.compose = () => {}
// 使用 myOssImage 代替 global options 对象
app.use(VueOssImage, myOssImage)

// 也可以自定义指令名，此时无需再用 Vue.use 或 app.use
app.directive('my-directive', VueOssImage.createHooks(myOssImage))
```
