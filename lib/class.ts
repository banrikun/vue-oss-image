import ossUrlComposer, { TComposerParams } from './composer'
import { copyKeys } from './utils'

export type TGlobalOptions = {
  host?: TComposerParams['host']
  resizeMode?: TComposerParams['resizeMode']
  ratio?: TComposerParams['ratio']
  quality?: TComposerParams['quality']
  format?: TComposerParams['format']
  loading?: TComposerParams['path']
  error?: TComposerParams['path']
}
export class OssImageGlobal {
  path?: TComposerParams['path']
  loading?: TComposerParams['path']
  error?: TComposerParams['path']

  constructor(options: TGlobalOptions = {}) {
    copyKeys({
      source: options,
      target: this,
      keys: [
        'host',
        'quality',
        'format',

        'resizeMode',
        'ratio',

        'loading',
        'error'
      ]
    })
  }

  compose(params: TComposerParams) {
    return ossUrlComposer(params)
  }

  getUrl(path: TComposerParams['path']) {
    if (!path) return ''
    const params: TComposerParams = {}
    copyKeys({
      source: this,
      target: params,
      keys: [
        'host',
        'quality',
        'format',

        'resizeMode',
        'ratio',
        'width',
        'height',
        'long',
        'short'
      ]
    })
    params.path = path
    return this.compose(params)
  }

  get url() {
    return this.getUrl(this.path)
  }

  get loadingUrl() {
    return this.getUrl(this.loading)
  }

  get errorUrl() {
    return this.getUrl(this.error)
  }

  setUrl(el: HTMLElement, url: string) {
    if (!el) return
    const tagName = el.tagName.toLowerCase()
    if (tagName === 'img') {
      el.setAttribute('src', url)
    } else {
      el.style.backgroundImage = `url(${url})`
    }
  }
}

export type TOssImageOptions = (TGlobalOptions & TComposerParams) | string
export const createOssImage = (globalOptions: TGlobalOptions) => {
  class OssImage extends OssImageGlobal {
    constructor(options: TOssImageOptions) {
      super(globalOptions)

      const _options = typeof options === 'string'
        ? { path: options }
        : (options || {})
      copyKeys({
        source: _options,
        target: this,
        keys: [
          'host',
          'path',
          'quality',
          'format',

          'resizeMode',
          'ratio',
          'width',
          'height',
          'long',
          'short',

          'loading',
          'error'
        ]
      })
    }
  }

  return OssImage
}

export type TOssImage = ReturnType<typeof createOssImage>
