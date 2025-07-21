import type { TOssImage } from './class'

import { watchEffect } from 'vue'
import type { DirectiveBinding, VaporDirective } from 'vue'

type TVueImg = InstanceType<TOssImage>

const preload = (el: HTMLElement, vImg: TVueImg) => {
  if (!vImg.$url) return

  const image = new Image()
  image.onload = () => {
    vImg.$setUrl(el, vImg.$url)
  }
  if (vImg.$errorUrl) {
    image.onerror = () => {
      vImg.$setUrl(el, vImg.$errorUrl)
    }
  }
  image.src = vImg.$url
}

export const createHooks = (ossImage: TOssImage) => {
  return {
    created(el: HTMLElement, binding: DirectiveBinding) {
      const vImg = new ossImage(binding.value)
      if (vImg.$loadingUrl || vImg.$errorUrl) {
        vImg.$loadingUrl && vImg.$setUrl(el, vImg.$loadingUrl)
        preload(el, vImg)
      } else if (vImg.$url) {
        vImg.$setUrl(el, vImg.$url)
      }
    },

    beforeUpdate(el: HTMLElement, binding: DirectiveBinding) {
      const vImg = new ossImage(binding.value)
      preload(el, vImg)
    }
  }
}

export const createVaporHook = (ossImage: TOssImage): VaporDirective => {
  return (el, source) => {
    const vImg = new ossImage(source?.())
    if (vImg.$loadingUrl || vImg.$errorUrl) {
      vImg.$loadingUrl && vImg.$setUrl(el as HTMLElement, vImg.$loadingUrl)
      preload(el as HTMLElement, vImg)
    } else if (vImg.$url) {
      vImg.$setUrl(el as HTMLElement, vImg.$url)
    }

    watchEffect(() => {
      const vImg = new ossImage(source?.())
      preload(el as HTMLElement, vImg)
    }, {
      flush: 'post'
    })
  }
}
