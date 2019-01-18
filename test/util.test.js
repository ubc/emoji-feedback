/* global describe, test, expect */
import { convertOver1000, addToClass, removeFromClass } from '../src/util'

describe('convertOver1000', () => {
  test('should convert any number of 1000 to 1.1k form', () => {
    expect(convertOver1000(1500)).toEqual('1.5k')
    expect(convertOver1000(1550)).toEqual('1.6k')
    expect(convertOver1000(1115500)).toEqual('1115.5k')
    expect(convertOver1000(1000)).toEqual('1.0k')
  })
})

describe('addToClass', () => {
  test('adds to specified class of an element', () => {
    document.body.innerHTML = `<div id='test-id'></div>`
    addToClass('test-id', 'test-class')
    const el = document.getElementById('test-id')
    expect(el.classList.contains('test-class')).toBe(true)
    addToClass('test-id', 'test-class-2')
    expect(el.classList.contains('test-class-2')).toBe(true)
  })
})

describe('removeFromClass', () => {
  test('adds to specified class of an element', () => {
    document.body.innerHTML = `<div id='test-id' class='test-class test-class-2'></div>`
    removeFromClass('test-id', 'test-class')
    const el = document.getElementById('test-id')
    expect(el.classList.contains('test-class-2')).toBe(true)
    expect(el.classList.contains('test-class')).toBe(false)
    removeFromClass('test-id', 'test-class-2')
    expect(el.classList.contains('test-class-2')).toBe(false)
    expect(el.classList.contains('test-class')).toBe(false)
  })
})
