/* global describe, test, expect */
import controller from '../src/app'

const emojis = [
  { emojicon: '😁', emotion: 'superhappy' },
  { emojicon: '😀', emotion: 'happy' },
  { emojicon: '😐', emotion: 'indifferent' },
  { emojicon: '😕', emotion: 'unhappy' },
  { emojicon: '😞', emotion: 'disappointed' }
]

describe('app', () => {
  test('should have method: init', () => {
    const app = controller()
    expect(typeof app.init).toEqual('function')
  })

  test('should have method: getState', () => {
    const app = controller()
    expect(typeof app.getState).toEqual('function')
  })

  test('should throw error if entryId (first param) is not specified', () => {
    const app = controller()

    function expectedError () {
      app.init()
    }
    expect(expectedError).toThrowError('entryId must be specified')
  })

  test('should throw error if endpoints (second param) is not specified', () => {
    const app = controller()

    function expectedError () {
      app.init('entryId')
    }
    expect(expectedError).toThrowError('endpoints must be specified')
  })
})

describe('app state', () => {
  test('getState should return default state', () => {
    const app = controller()
    const state = app.getState()
    const defaultState = {
      selectedEmojis: [],
      feedbackText: '',
      endpoints: {
        emoji: '',
        form: '',
        votes: ''
      },
      entryId: ''
    }
    expect(state).toEqual(defaultState)
  })

  test('entry state should set correctly', () => {
    const entrypoint = 'myEntryId'
    const endpoints = {
      emoji: 'http://localhost:8080/emoji',
      form: 'http://localhost:8080/form',
      votes: 'http://localhost:8080/votes'
    }
    document.body.innerHTML = `<div id=${entrypoint}></div>`

    const app = controller()
    app.init(entrypoint, endpoints, {})

    const appState = app.getState()

    const expectedState = {
      selectedEmojis: [],
      feedbackText: '',
      endpoints,
      entryId: 'myEntryId'
    }

    expect(appState).toEqual(expectedState)
  })

  test('multiple instances of app should not impact each app state', () => {
    const entrypoint1 = 'myEntryId1'
    const entrypoint2 = 'myEntryId2'
    const endpoints1 = {
      emoji: 'http://localhost:8080/emoji',
      form: 'http://localhost:8080/form',
      votes: 'http://localhost:8080/votes'
    }
    const endpoints2 = {
      emoji: 'http://localhost:8080/emoji1',
      form: 'http://localhost:8080/form2',
      votes: 'http://localhost:8080/votes3'
    }
    document.body.innerHTML = `<div id=${entrypoint1}></div><div id=${entrypoint2}></div>`

    const app1 = controller()
    const app2 = controller()

    app1.init(entrypoint1, endpoints1)
    app2.init(entrypoint2, endpoints2)

    const app1ExpectedState = {
      selectedEmojis: [],
      feedbackText: '',
      endpoints: endpoints1,
      entryId: entrypoint1
    }

    const app2ExpectedState = {
      selectedEmojis: [],
      feedbackText: '',
      endpoints: endpoints2,
      entryId: entrypoint2
    }
    expect(app1ExpectedState).toEqual(app1.getState())
    expect(app2ExpectedState).toEqual(app2.getState())
  })
})

describe('emoji', () => {
  test('clicking an emoji updates the state correctly', () => {
    const app = controller()
    const entrypoint = 'entry'
    const endpoints = {
      emoji: 'http://localhost:8080/emoji',
      form: 'http://localhost:8080/form',
      votes: 'http://localhost:8080/votes'
    }
    document.body.innerHTML = `<div id=${entrypoint}></div>`
    app.init(entrypoint, endpoints, { emojis })

    const emojiButtonId = document.getElementById(`${entrypoint}-${emojis[0].emotion}`)
    emojiButtonId.click()

    const expectedState = {
      selectedEmojis: [{ emojiId: 'entry-superhappy', emojicon: '😁' }],
      feedbackText: '',
      endpoints: endpoints,
      entryId: entrypoint
    }
    expect(app.getState()).toEqual(expectedState)
  })
})
