/* global describe, test, beforeAll, afterAll, expect */

import puppeteer from 'puppeteer'

const APP = 'http://localhost:8080/'

let browser
let page

beforeAll(async () => {
  const width = 1920
  const height = 1080
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 300
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
  test('on click, active class added to emoji button and form appears', async () => {
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    const form = await page.$('#entry-feedback-form')
    let buttonClass = await page.evaluate(button => button.getAttribute('class'), happyButton)
    let formClass = await page.evaluate(form => form.getAttribute('class'), form)
    expect(buttonClass).toBe('button')
    expect(formClass).toBe('feedback-form hidden')

    await happyButton.click()
    buttonClass = await page.evaluate(button => button.getAttribute('class'), happyButton)
    formClass = await page.evaluate(form => form.getAttribute('class'), form)
    expect(buttonClass).toBe('button active')
    expect(formClass).toBe('feedback-form')

    await happyButton.click()
    buttonClass = await page.evaluate(button => button.getAttribute('class'), happyButton)
    formClass = await page.evaluate(form => form.getAttribute('class'), form)
    expect(buttonClass).toBe('button')
    expect(formClass).toBe('feedback-form hidden')
  })
  test('')
})
