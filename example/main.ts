import { createApp } from 'vue'
import App from './App.vue'
import VueOssImage from '../lib'

const app = createApp(App)

app.use(VueOssImage, {
  host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com',
  ratio: 2
})
app.mount('#app')
