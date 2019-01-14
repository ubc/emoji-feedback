/* global describe, test, expect */
import controller from '../src/app'

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
  const endpoints = {
    emojiEndpoint: 'http://localhost:8080/emoji',
    formEndpoint: 'http://localhost:8080/form',
    votesEndpoint: 'http://localhost:8080/votes'
  }

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

  // test('entry state should set correctly', () => {
  //   const app = controller()
  //   app.init('myEntryId', endpoints, {})

  //   // const appState = app.getState()

  //   // const expectedState = {
  //   //   selectedEmojis: [],
  //   //   feedbackText: '',
  //   //   endpoints,
  //   //   entryId: 'myEntryId'
  //   // }

  //   // expect(appState).toEqual(expectedState)
  // })
})
