import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import VueOssImage from '../lib/index'

import type { Component } from 'vue'
import type { TGlobalOptions, TOssImageOptions } from '../lib/class'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const imgComponent = {
  template: `<img v-img="options">`,
  props: ['options']
}
const divComponent = {
  template: `<div v-img="options"></div>`,
  props: ['options']
}
const createWrapper = (
  globalOptions: TGlobalOptions,
  directiveOptions: TOssImageOptions,
  component: Component
) => {
  const hooks = VueOssImage.createHooks(
    VueOssImage.create(globalOptions)
  )
  const wrapper = mount(component, {
    props: {
      options: directiveOptions
    },
    global: {
      directives: {
        img: hooks
      }
    }
  })
  return wrapper
}

describe('directives', () => {
  it('<img> path', async () => {
    const wrapper = createWrapper(
      {
        host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com'
      },
      {
        path: 'example.jpg'
      },
      imgComponent
    )
    await nextTick()
    expect(wrapper.html()).toContain('aliyuncs.com/example.jpg')
  })

  it('<img> loading', async () => {
    const wrapper = createWrapper(
      {
        host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com',
        loading: 'loading.gif'
      },
      {},
      imgComponent
    )
    await nextTick()
    expect(wrapper.html()).toContain('aliyuncs.com/loading.gif')
  })

  it('<img> loading + path', async () => {
    // @ts-expect-error: rewrite global Image for testing
    global.Image = class {
      constructor() {
        setTimeout(() => {
          // @ts-expect-error: mock image onload
          this.onload()
        }, 100)
      }
    }

    const wrapper = createWrapper(
      {
        host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com',
        loading: 'loading.gif'
      },
      {
        path: 'example.jpg'
      },
      imgComponent
    )
    await nextTick()
    expect(wrapper.html()).toContain('aliyuncs.com/loading.gif')

    await wait(200)
    await nextTick()
    expect(wrapper.html()).toContain('aliyuncs.com/example.jpg')
  })

  it('<img> loading + error', async () => {
    // @ts-expect-error: rewrite global Image for testing
    global.Image = class {
      constructor() {
        setTimeout(() => {
          // @ts-expect-error: mock image onload
          this.onerror()
        }, 100)
      }
    }

    const wrapper = createWrapper(
      {
        host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com',
        loading: 'loading.gif',
        error: 'error.gif'
      },
      {
        path: 'example.jpg'
      },
      imgComponent
    )
    await nextTick()
    expect(wrapper.html()).toContain('aliyuncs.com/loading.gif')

    await wait(200)
    await nextTick()
    expect(wrapper.html()).toContain('aliyuncs.com/error.gif')
  })

  it('<div> path', async () => {
    const wrapper = createWrapper(
      {
        host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com'
      },
      {
        path: 'example.jpg'
      },
      divComponent
    )
    await nextTick()
    expect(wrapper.html()).toContain('background-image')
  })

  it('<div> attr', async () => {
    const wrapper = createWrapper(
      {
        host: 'https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com'
      },
      {
        path: 'example.jpg',
        attr: 'data-src'
      },
      divComponent
    )
    await nextTick()
    expect(wrapper.html()).toContain('data-src="https://oss-console-img-demo-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/example.jpg"')
  })
})
