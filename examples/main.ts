import { createApp } from 'vue'
import App from './App.vue'
import VueOssImage from '../lib'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)

app.use(VueOssImage, {
  host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com',
  ratio: 1
})
app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
app.mount('#app')
