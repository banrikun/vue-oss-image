import createOssImage, { OssImageGlobal } from './class'
import { createHooks, createVaporHook } from './directive'
import compose from './composer'
import { copyKeys, setImageUrl } from './utils'

import type { App } from 'vue'
import type { TGlobalOptions, TOssImage, TOssImageOptions } from './class'

type TInstallOptions = TOssImage | TGlobalOptions
const install = (app: App, options?: TInstallOptions) => {
  const ossImage = (options as TOssImage)?.prototype instanceof OssImageGlobal
    ? options
    : createOssImage(options as TGlobalOptions)

  const vdomHooks = createHooks(ossImage as TOssImage)
  app.directive('img', vdomHooks)

  const vaporHook = createVaporHook(ossImage as TOssImage)
  // @ts-expect-error Support Vapor Mode
  app.directive('img-vapor', vaporHook)
}

export type { TInstallOptions, TGlobalOptions, TOssImageOptions, TOssImage }
export default {
  install,
  create: createOssImage,
  createHooks,
  createVaporHook,
  compose,
  utils: {
    copyKeys,
    setImageUrl
  }
}
