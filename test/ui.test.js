/* global describe, test, beforeAll, afterAll, expect */

import puppeteer from 'puppeteer'

const APP = 'http://localhost:8080/'

let browser
let page
const API_BASE_URL = 'http://127.0.0.1:5000/'

const width = 1920
const height = 1080
beforeAll(async () => {
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

const getClass = elementHandle => page.evaluate(elem => elem.getAttribute('class'), elementHandle)

describe('Emoji buttons', () => {
  test('exist', async () => {
    await page.goto(APP)
    let buttonIds = ['entry-superhappy', 'entry-happy', 'entry-indifferent', 'entry-unhappy', 'entry-disappointed']
    const buttons = await page
      .evaluate(buttonIds => buttonIds.map(id => document.getElementById(id).id), buttonIds)
    expect(buttons.length).toBe(5)
    expect(buttons).toEqual(buttonIds)
  })

  test('on click, active class added to emoji button and form appears', async () => {
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    const form = await page.$('#entry-feedback-form')
    expect(await getClass(happyButton)).toBe('button')
    expect(await getClass(form)).toBe('feedback-form hidden')

    await happyButton.click()
    expect(await getClass(happyButton)).toBe('button active')
    expect(await getClass(form)).toBe('feedback-form')

    await happyButton.click()
    expect(await getClass(happyButton)).toBe('button')
    expect(await getClass(form)).toBe('feedback-form hidden')
  })
  test('clicking multiple emoji buttons work as expected', async () => {
    await page.goto(APP)
    let buttonIds = ['entry-superhappy', 'entry-happy', 'entry-indifferent', 'entry-unhappy', 'entry-disappointed']
    const buttons = await Promise.all(buttonIds.map(id => page.$(`#${id}`)))
    let buttonClasses = await Promise.all(buttons.map(button => getClass(button)))
    const unclickedButtonClasses = ['button', 'button', 'button', 'button', 'button']
    const form = await page.$('#entry-feedback-form')
    expect(buttonClasses).toEqual(unclickedButtonClasses)
    expect(await getClass(form)).toBe('feedback-form hidden')

    await Promise.all(buttons.map(btn => btn.click()))
    buttonClasses = await Promise.all(buttons.map(button => getClass(button)))
    const clickedButtonClasses = ['button active', 'button active', 'button active', 'button active', 'button active']
    expect(buttonClasses).toEqual(clickedButtonClasses)
    expect(await getClass(form)).toBe('feedback-form')

    await Promise.all(buttons.map(btn => btn.click()))
    buttonClasses = await Promise.all(buttons.map(button => getClass(button)))
    expect(buttonClasses).toEqual(unclickedButtonClasses)
    expect(await getClass(form)).toBe('feedback-form hidden')
  })
  test('clicking emoji creates API request', async () => {
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    await happyButton.click()
    page.on('request', req => {
      if (req.method() === 'OPTIONS') return
      expect(req.url()).toEqual(`${API_BASE_URL}emoji`)
      expect(req.postData()).toEqual(JSON.stringify({ emojis: [{ emojiId: 'entry-superhappy', emojicon: '😁' }] }))
      expect(req.method()).toEqual('POST')
    })
    await page.close()
  })
  test('clicking multiple emojis create correct API request', async () => {
    // have to create a new page because the page.on('request') can't be programmatically destroyed
    page = await browser.newPage()
    await page.setViewport({ width, height })
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    const disappointedButton = await page.$('#entry-disappointed')
    await happyButton.click()
    await disappointedButton.click()
    page.on('request', req => {
      if (req.method() === 'OPTIONS') return
      expect(req.url()).toEqual(`${API_BASE_URL}emoji`)
      expect(req.postData())
        .toEqual(JSON.stringify({ emojis: [{ emojiId: 'entry-superhappy', emojicon: '😁' }, { emojiId: 'entry-disappointed', emojicon: '😞' }] }))
      expect(req.method()).toEqual('POST')
    })
    await page.close()
  })
  test('clicking an emoji that was already clicked previously removes it from POST payload', async () => {
    page = await browser.newPage()
    await page.setViewport({ width, height })
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    const disappointedButton = await page.$('#entry-disappointed')
    await happyButton.click()
    await disappointedButton.click()
    await disappointedButton.click()
    page.on('request', req => {
      if (req.method() === 'OPTIONS') return
      expect(req.url()).toEqual(`${API_BASE_URL}emoji`)
      expect(req.postData()).toEqual(JSON.stringify({ emojis: [{ emojiId: 'entry-superhappy', emojicon: '😁' }] }))
      expect(req.method()).toEqual('POST')
    })
    await page.close()
  })
})

describe('form', () => {
  test('can be filled out', async () => {
    page = await browser.newPage()
    await page.setViewport({ width, height })
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    await happyButton.click()
    const form = await page.$('#entry-feedback-textarea')
    const submitButton = await page.$('#entry-feedback-button')
    expect(await getClass(submitButton)).toBe('button feedback-button')
    await form.type('hello')
    expect(await getClass(submitButton)).toBe('button feedback-button ready')
    const charCounter = await page.evaluate(() => document.querySelector('#entry-maxlength-enforcer > span').innerHTML)
    expect(charCounter).toEqual('5')
  })

  test('submits properly, making correct POST request', async () => {
    await page.goto(APP)
    const happyButton = await page.$('#entry-superhappy')
    await happyButton.click()
    const form = await page.$('#entry-feedback-textarea')
    const submitButton = await page.$('#entry-feedback-button')
    await form.type('hello')
    await submitButton.click()
    page.on('request', req => {
      if (req.method() === 'OPTIONS') return
      expect(req.url()).toEqual(`${API_BASE_URL}feedback`)
      expect(req.postData()).toEqual(JSON.stringify({ feedback: 'hello' }))
      expect(req.method()).toEqual('POST')
    })
    await page.waitFor('.thankYou')
    const thankYouMessage = await page.evaluate(() => document.getElementsByClassName('thankYou')[0].innerHTML)
    expect(thankYouMessage).toBe('Your feedback has been recorded')
    expect(await page.evaluate(() => document.getElementById('entry-wrapper'))).toBeNull()
    await page.close()
  })
})
