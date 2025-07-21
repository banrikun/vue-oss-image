import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import VueOssImage from '../lib'

createApp(App)
  .use(vaporInteropPlugin)
  .use(VueOssImage, {
    host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com',
    ratio: 1
  })
  .mount('#app')
