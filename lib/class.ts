import ossUrlComposer, { IComposerParams } from './composer'
import { copyKeys, deviceRatio } from './utils'

interface IGlobalOptions {
  host?: IComposerParams['host']
  resizeMode?: IComposerParams['resizeMode']
  ratio?: IComposerParams['ratio']
  quality?: IComposerParams['quality']
  format?: IComposerParams['format']

  loading?: IComposerParams['path']
  error?: IComposerParams['path']
  lazy?: boolean
}
export class OssImage {
  constructor(options: IGlobalOptions) {
    this.host = options.host
  }

  getSrc() {

  }
}

interface IDirectiveParams extends IGlobalOptions, IComposerParams {}
const createClass = (globalOptions: IGlobalOptions) => {
  class VueDirective extends OssImage {
    directiveParams: IDirectiveParams

    constructor(directiveParams: IDirectiveParams) {
      super(globalOptions)
      this.directiveParams = directiveParams
    }

    get src() {

    }

    get loadingSrc() {

    }

    get errorSrc() {

    }
  }

  return VueDirective
}
