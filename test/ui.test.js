/* global describe, test, beforeAll, afterAll, expect */

import puppeteer from 'puppeteer'

const APP = 'http://localhost:8080/'

let browser
let page

beforeAll(async () => {
  const width = 1920
  const height = 1080
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 300
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

afterAll(() => {
  browser.close()
})

describe('Emoji buttons', () => {
  test('exist', async () => {
    await page.goto(APP)
    let buttonIds = ['entry-superhappy', 'entry-happy', 'entry-indifferent', 'entry-unhappy', 'entry-disappointed']
    const buttons = await page.evaluate(buttonIds => {
      return buttonIds.map(id => document.getElementById(id).id)
    }, buttonIds)
    expect(buttons.length).toBe(5)
    expect(buttons).toEqual(buttonIds)
  })
  test('on click, background turns blue and form appears', async () => {
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    let className = await page.evaluate(button => button.getAttribute('class'), happyButton)
    expect(className).toBe('button')
    await happyButton.click()
    className = await page.evaluate(button => button.getAttribute('class'), happyButton)
    expect(className).toBe('button active')
  })
})
