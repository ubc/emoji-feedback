/* global fetch */
import * as c from './defaults'

const getVotes = url => fetch(url, {
  ...c.fetchOptions,
  method: 'GET'
}).then(res => res.json().then(x => x.votes))

const submitSelectedEmojis = (url, emojis) => {
  const date = new Date()
  const timestamp = date.getTime()
  return fetch(url, {
    ...c.fetchOptions,
    body: JSON.stringify({
      timestamp,
      emojis: emojis,
      pageUrl: window.location.href
    })
  })
}

const submitFeedback = (url, text) => {
  const date = new Date()
  const timestamp = date.getTime()
  return fetch(url, {
    ...c.fetchOptions,
    body: JSON.stringify({
      timestamp,
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
