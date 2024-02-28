export type TUrl = string
export const checkUrl = (url?: TUrl) => {
  return /^https?:\/\//.test(url || '')
}

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

export const deviceRatio = typeof window.devicePixelRatio === 'number'
  ? window.devicePixelRatio
  : 1
