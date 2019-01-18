/* global fetch */
import * as c from '../defaults'

const getVotes = url => {
  return Promise.resolve({
    votes: 5
  })
}

const submitSelectedEmojis = (url, emojis) => {
  return fetch(url, {
    ...c.fetchOptions,
    body: JSON.stringify({
      timestamp: 12345678910,
      emojis: emojis,
      pageUrl: 'http://localhost:8080/'
    })
  })
}

const submitFeedback = (url, text) => {
  return fetch(url, {
    ...c.fetchOptions,
    body: JSON.stringify({
      timestamp: 12345678910,
      pageUrl: window.location.href,
      feedback: text
    })
  })
}

export {
  getVotes,
  submitSelectedEmojis,
  submitFeedback
}
