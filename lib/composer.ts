import { TUrl, checkUrl } from './utils'

type TSizeParams = {
  resizeMode?: 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed' // 默认为 fill
  width?: number
  height?: number
  long?: number
  short?: number
  ratio?: number
}
const getSizeQueryString = (params: TSizeParams) => {
  const _mode = params.resizeMode || 'fill'
  const _ratio = typeof params.ratio === 'number' && params.ratio >= 1
    ? Math.floor(params.ratio)
    : 1
  const _queryList = []

  // 宽度高度可单独设置或共存，最长最短边只可单独设置
  if (params.width || params.height) {
    params.width ? _queryList.push(`w_${params.width * _ratio}`) : null
    params.height ? _queryList.push(`h_${params.height * _ratio}`) : null
  } else if (params.long) {
    _queryList.push(`l_${params.long * _ratio}`)
  } else if (params.short) {
    _queryList.push(`s_${params.short * _ratio}`)
  }

  return _queryList.length
    ? ['resize', `m_${_mode}`].concat(_queryList).join(',')
    : ''
}

type TQuality = number
const getQualityQueryString = (quality?: TQuality) => {
  return typeof quality === 'number' && quality >= 1 && quality < 100
    ? `quality,q_${Math.floor(quality)}`
    : ''
}

type TFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' // 默认保持原格式
const getFormatQueryString = (format?: TFormat) => {
  return typeof format === 'string'
    ? `format,${format}`
    : ''
}

export interface IComposerParams extends TSizeParams {
  host?: TUrl
  path: TUrl
  quality?: TQuality
  format?: TFormat
}
const ossUrlComposer = (params: IComposerParams) => {
  const _baseUrl = checkUrl(params.host) && !checkUrl(params.path)
    ? params.host + params.path
    : params.path

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

export default ossUrlComposer
