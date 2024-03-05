import { TOssImage, TOssImageOptions } from './class'

type THookBinding = {
  value: TOssImageOptions
  [key: string]: any
}
type TVueImg = InstanceType<TOssImage>

const createHooks = (ossImage: TOssImage) => {
  const preload = (el: HTMLElement, vImg: TVueImg) => {
    if (!vImg.url) return

    const virtualImg = new Image()
    virtualImg.onload = () => {
      vImg.setUrl(el, vImg.url)
    }
    if (vImg.errorUrl) {
      virtualImg.onerror = () => {
        vImg.setUrl(el, vImg.errorUrl)
      }
    }
    virtualImg.src = vImg.url
  }

  return {
    mounted(el: HTMLElement, binding: THookBinding) {
      const vImg = new ossImage(binding.value)
      if (vImg.loadingUrl) {
        vImg.setUrl(el, vImg.loadingUrl)
        preload(el, vImg)
      } else if (vImg.url) {
        vImg.setUrl(el, vImg.url)
      }
    },
    updated(el: HTMLElement, binding: THookBinding) {
      const vImg = new ossImage(binding.value)
      preload(el, vImg)
    }
  }
}

export default createHooks
