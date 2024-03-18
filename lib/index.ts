import createOssImage, { OssImageGlobal } from './class'
import createHooks from './directive'
import compose from './composer'
import { copyKeys, setImageUrl } from './utils'

import type { App } from 'vue'
import type { TGlobalOptions, TOssImage } from './class'

type TInstallOptions = TOssImage | TGlobalOptions
const install = (app: App, options?: TInstallOptions) => {
  const ossImage = (options as TOssImage)?.prototype instanceof OssImageGlobal
    ? options
    : createOssImage(options as TGlobalOptions)

  const hooks = createHooks(ossImage as TOssImage)
  app.directive('img', hooks)
}

export default {
  install,
  create: createOssImage,
  createHooks,
  compose,
  copyKeys,
  setImageUrl
}
