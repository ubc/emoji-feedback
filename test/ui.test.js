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
    const buttons = await page
      .evaluate(buttonIds =>
        buttonIds.map(id => document.getElementById(id).id),
      buttonIds)
    expect(buttons.length).toBe(5)
    expect(buttons).toEqual(buttonIds)
  })

  const getClass = elementHandle => page.evaluate(elem => elem.getAttribute('class'), elementHandle)
  test('on click, active class added to emoji button and form appears', async () => {
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    const form = await page.$('#entry-feedback-form')
    let buttonClass = await getClass(happyButton)
    let formClass = await getClass(form)
    expect(buttonClass).toBe('button')
    expect(formClass).toBe('feedback-form hidden')

    await happyButton.click()
    buttonClass = await getClass(happyButton)
    formClass = await getClass(form)
    expect(buttonClass).toBe('button active')
    expect(formClass).toBe('feedback-form')

    await happyButton.click()
    buttonClass = await getClass(happyButton)
    formClass = await getClass(form)
    expect(buttonClass).toBe('button')
    expect(formClass).toBe('feedback-form hidden')
  })
  test('clicking multiple emoji buttons work as expected', async () => {
    await page.goto(APP)
    let buttonIds = ['entry-superhappy', 'entry-happy', 'entry-indifferent', 'entry-unhappy', 'entry-disappointed']
    const buttons = await Promise.all(buttonIds.map(id => page.$(`#${id}`)))
    let buttonClasses = await Promise.all(buttons.map(button => getClass(button)))
    const unclickedButtonClasses = ['button', 'button', 'button', 'button', 'button']
    const form = await page.$('#entry-feedback-form')
    let formClass = await getClass(form)
    expect(buttonClasses).toEqual(unclickedButtonClasses)
    expect(formClass).toBe('feedback-form hidden')

    await Promise.all(buttons.map(btn => btn.click()))
    buttonClasses = await Promise.all(buttons.map(button => getClass(button)))
    const clickedButtonClasses = ['button active', 'button active', 'button active', 'button active', 'button active']
    formClass = await getClass(form)
    expect(buttonClasses).toEqual(clickedButtonClasses)
    expect(formClass).toBe('feedback-form')

    await Promise.all(buttons.map(btn => btn.click()))
    buttonClasses = await Promise.all(buttons.map(button => getClass(button)))
    formClass = await getClass(form)
    expect(buttonClasses).toEqual(unclickedButtonClasses)
    expect(formClass).toBe('feedback-form hidden')
  })
  test('clicking emoji creates API request', async () => {
    await page.goto(APP)
    await page.setRequestInterception(true)
    const happyButton = await page.$('#entry-superhappy')
    page.on('request', req => {
      expect(req.url()).toEqual('http://localhost:8080/emoji')
      expect(req.postData()).toEqual(JSON.stringify([{ emojiId: 'entry-superhappy', emojicon: '😁' }]))
    })
    await happyButton.click()
  })
})
