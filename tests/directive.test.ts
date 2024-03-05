import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import App from '../example/App.vue'
import VueOssImage from '../lib/index'


test('directives', async () => {
  const app = createApp(App)
  app.use(VueOssImage, {

  })

  const wrapper = mount(App)
  await wrapper.vm.$nextTick()
  expect(
    wrapper.text()
  ).toContain('hello world')
})
