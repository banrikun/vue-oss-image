import { deviceRatio } from './utils'

export const resolveUrl = (host?: string, path?: string) => {
  const _host = (host || '').replace(/\/$/, '')
  const _path = (path || '').replace(/^\.*\//, '')
  return /^https?:\/\//.test(_path)
    ? _path
    : `${_host}/${_path}`
}

type TSizeParams = {
  resizeMode?: 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed' // default: fill
  ratio?: number
  width?: number
  height?: number
  long?: number
  short?: number
}
export const getSizeQueryString = (params: TSizeParams) => {
  const _mode = params.resizeMode || 'fill'
  const _ratio = typeof params.ratio === 'number' && params.ratio >= 1
    ? params.ratio
    : deviceRatio
  const _queryList = []

  if (params.width || params.height) {
    params.width ? _queryList.push(`w_${Math.floor(params.width * _ratio)}`) : null
    params.height ? _queryList.push(`h_${Math.floor(params.height * _ratio)}`) : null
  } else if (params.long || params.short) {
    params.long ? _queryList.push(`l_${Math.floor(params.long * _ratio)}`) : null
    params.short ? _queryList.push(`s_${Math.floor(params.short * _ratio)}`) : null
  }

  return _queryList.length
    ? ['resize', `m_${_mode}`].concat(_queryList).join(',')
    : ''
}

type TQuality = number
export const getQualityQueryString = (quality?: TQuality) => {
  return typeof quality === 'number' && quality >= 1 && quality < 100
    ? `quality,q_${Math.floor(quality)}`
    : ''
}

type TFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' // default: original
const getFormatQueryString = (format?: TFormat) => {
  return format && typeof format === 'string'
    ? `format,${format}`
    : ''
}

export type TComposerParams = TSizeParams & {
  host?: string
  path?: string
  quality?: TQuality
  format?: TFormat
}
const isDataImage = (path: string) => /^data:image/.test(path)
const compose = (params: TComposerParams) => {
  if (!params.path) return ''
  if (isDataImage(params.path)) return params.path

  const _baseUrl = resolveUrl(params.host, params.path)
  const _queryStringList = [
    getSizeQueryString(params),
    getQualityQueryString(params.quality),
    getFormatQueryString(params.format)
  ].filter(qs => !!qs)
  const _queryString = _queryStringList.length
    ? ['?x-oss-process=image'].concat(_queryStringList).join('/')
    : ''

  return _baseUrl + _queryString
}

export default compose
