import { expect, test } from 'vitest'
import compose, { resolveUrl, getSizeQueryString, getQualityQueryString } from '../lib/composer'

test('resolveUrl', () => {
  expect(
    resolveUrl('https://www.example.com', 'path/to/image.jpg')
  ).toBe('https://www.example.com/path/to/image.jpg')

  expect(
    resolveUrl('https://www.example.com', '/path/to/image.jpg')
  ).toBe('https://www.example.com/path/to/image.jpg')

  expect(
    resolveUrl('https://www.example.com/', './path/to/image.jpg')
  ).toBe('https://www.example.com/path/to/image.jpg')

  expect(
    resolveUrl('https://www.example.com/', 'https://www.test.com/path/to/image.jpg')
  ).toBe('https://www.test.com/path/to/image.jpg')
})

test('getSizeQueryString', () => {
  expect(
    getSizeQueryString({
      resizeMode: 'lfit',
      ratio: 1
    })
  ).toBe('')

  expect(
    getSizeQueryString({
      resizeMode: 'mfit',
      width: 100,
      ratio: 1
    })
  ).toBe('resize,m_mfit,w_100')

  expect(
    getSizeQueryString({
      resizeMode: 'mfit',
      width: 100,
      height: 100,
      ratio: 1
    })
  ).toBe('resize,m_mfit,w_100,h_100')

  expect(
    getSizeQueryString({
      resizeMode: 'fill',
      width: 100,
      height: 50,
      ratio: 1.5
    })
  ).toBe('resize,m_fill,w_150,h_75')

  expect(
    getSizeQueryString({
      resizeMode: 'fill',
      long: 100,
      short: 50,
      ratio: 2
    })
  ).toBe('resize,m_fill,l_200,s_100')

  expect(
    getSizeQueryString({
      resizeMode: 'fill',
      width: 100,
      short: 50,
      ratio: 2
    })
  ).toBe('resize,m_fill,w_200')

  expect(
    getSizeQueryString({
      resizeMode: 'fill',
      long: 100,
      height: 50,
      ratio: 2
    })
  ).toBe('resize,m_fill,h_100')
})

test('getQualityQueryString', () => {
  expect(
    getQualityQueryString(0)
  ).toBe('')

  expect(
    getQualityQueryString(1)
  ).toBe('quality,q_1')

  expect(
    getQualityQueryString(100)
  ).toBe('')

  expect(
    getQualityQueryString(101)
  ).toBe('')
})

test('compose', () => {
  expect(
    compose({
      host: 'https://www.example.com',
      quality: 80,
      format: 'webp',
      width: 100,
      height: 100
    })
  ).toBe('')

  expect(
    compose({
      host: 'https://www.example.com',
      path: 'path/to/image.jpg'
    })
  ).toBe('https://www.example.com/path/to/image.jpg')

  expect(
    compose({
      host: 'https://www.example.com',
      path: 'path/to/image.jpg',
      resizeMode: 'fill',
      format: 'webp',
      width: 100,
      height: 50,
      ratio: 2
    })
  ).toBe('https://www.example.com/path/to/image.jpg?x-oss-process=image/resize,m_fill,w_200,h_100/format,webp')

  expect(
    compose({
      host: 'https://www.example.com',
      path: 'path/to/image.jpg',
      resizeMode: 'fill',
      quality: 80,
      format: 'webp',
      width: 100,
      height: 50,
      ratio: 2
    })
  ).toBe('https://www.example.com/path/to/image.jpg?x-oss-process=image/resize,m_fill,w_200,h_100/quality,q_80/format,webp')

  expect(
    compose({
      host: 'https://www.example.com',
      path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
      resizeMode: 'fill',
      quality: 80,
      format: 'webp',
      width: 100,
      height: 50,
      ratio: 2
    })
  ).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=')
})
