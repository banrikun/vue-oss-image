const hasProp = (obj: object, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop)

type TCopyKeysParams = {
  source: object
  target: object
  keys: string[]
}
export const copyKeys = (params: TCopyKeysParams) => {
  params.keys.forEach(key => {
    if (hasProp(params.source, key)) {
      const prop = key as keyof typeof params.source
      params.target[prop] = params.source[prop]
    }
  })
}

export const deviceRatio = window && typeof window.devicePixelRatio === 'number'
  ? window.devicePixelRatio
  : 1

export const setImageUrl = (el: HTMLElement, url: string) => {
  if (!el) return
  const tagName = el.tagName.toLowerCase()
  if (tagName === 'img') {
    el.setAttribute('src', url)
  } else {
    el.style.backgroundImage = `url(${url})`
  }
}
