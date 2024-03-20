import { expect, test } from 'vitest'
import createOssImage from '../lib/class'

test('ossImage Class', () => {
  const ossImage = createOssImage({
    host: 'https://www.example.com',
    quality: 80,
    format: 'webp',
    resizeMode: 'pad',
    ratio: 1
  })

  const ossImageInstance1 = new ossImage({
    path: ''
  })
  expect(ossImageInstance1.$url).toBe('')


  const ossImageInstance2 = new ossImage({
    path: 'path/to/image.jpg'
  })
  expect(ossImageInstance2.$url).toBe('https://www.example.com/path/to/image.jpg?x-oss-process=image/quality,q_80/format,webp')

  const ossImageInstance3 = new ossImage({
    path: 'path/to/image.jpg',
    resizeMode: 'fill',
    width: 100,
    height: 50,
    ratio: 2
  })
  expect(ossImageInstance3.$url).toBe('https://www.example.com/path/to/image.jpg?x-oss-process=image/resize,m_fill,w_200,h_100/quality,q_80/format,webp')

  const ossImageInstance4 = new ossImage({
    path: 'path/to/image.jpg',
    resizeMode: 'fill',
    width: 100,
    height: 50,
    ratio: 2,
    quality: 100,
    format: undefined
  })
  expect(ossImageInstance4.$url).toBe('https://www.example.com/path/to/image.jpg?x-oss-process=image/resize,m_fill,w_200,h_100')
})
