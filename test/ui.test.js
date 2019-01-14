/* global describe, test, beforeAll, afterAll */

import puppeteer from 'puppeteer'

const APP = 'http://localhost:8080/'

let browser
let page

beforeAll(async () => {
  const width = 1920
  const height = 1080
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

afterAll(() => {
  browser.close()
})

describe('Buttons', () => {
  test('exist', async () => {
    await page.goto(APP)
    await page.waitForSelector
  })
})
