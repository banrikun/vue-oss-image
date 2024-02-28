import { OssImageGlobal, createOssImage } from './class'
import { createHooks } from './directive'
import compose from './composer'

const install = (app: any, options: any) => {
  const ossImage = options.prototype && options.prototype instanceof OssImageGlobal
    ? options
    : createOssImage(options)

  const hooks = createHooks(ossImage)
  app.directive('img', hooks)
}

export default {
  install,
  create: createOssImage,
  createHooks,
  compose
}
