/* global describe, test, expect */
import { convertOver1000 } from '../src/util'

describe('convertOver1000', () => {
  test('should convert any number of 1000 to 1.1k form', () => {
    expect(convertOver1000(1500)).toEqual('1.5k')
    expect(convertOver1000(1550)).toEqual('1.6k')
    expect(convertOver1000(1115500)).toEqual('1115.5k')
    expect(convertOver1000(1000)).toEqual('1.0k')
  })
})
