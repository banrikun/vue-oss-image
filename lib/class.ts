import ossUrlComposer from './composer'
import { copyKeys, setImageUrl } from './utils'

import type { TComposerParams } from './composer'

export type TGlobalOptions = {
  attr?: string
  host?: TComposerParams['host']
  resizeMode?: TComposerParams['resizeMode']
  ratio?: TComposerParams['ratio']
  quality?: TComposerParams['quality']
  format?: TComposerParams['format']
  loading?: TComposerParams['path']
  error?: TComposerParams['path']
}
export class OssImageGlobal {
  attr?: string
  path?: TComposerParams['path']
  loading?: TComposerParams['path']
  error?: TComposerParams['path']

  constructor(options: TGlobalOptions = {}) {
    copyKeys({
      source: options,
      target: this,
      keys: [
        'attr',
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

  $compose(params: TComposerParams) {
    return ossUrlComposer(params)
  }

  $setUrl(el: HTMLElement, url: string) {
    if (!el) return
    if (this.attr && typeof this.attr === 'string') {
      el.setAttribute(this.attr, url)
    } else {
      setImageUrl(el, url)
    }
  }

  $getUrl(path: TComposerParams['path']) {
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
    return this.$compose(params)
  }

  get $url() {
    return this.$getUrl(this.path)
  }

  get $loadingUrl() {
    return this.$getUrl(this.loading)
  }

  get $errorUrl() {
    return this.$getUrl(this.error)
  }
}

export type TOssImageOptions = (TGlobalOptions & TComposerParams) | string
const createOssImage = (globalOptions: TGlobalOptions) => {
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
          'attr',
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

export default createOssImage
export type TOssImage = ReturnType<typeof createOssImage>
