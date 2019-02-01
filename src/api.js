/* global fetch */

const fetchOptions = {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' }
}

const getVotes = url => fetch(url, {
  ...fetchOptions,
  method: 'GET'
}).then(res => res.json()
  .then(x => x.votes))
  .catch(e => e)

const submitSelectedEmojis = (url, emojis) => {
  const date = new Date()
  const timestamp = date.getTime()
  return fetch(url, {
    ...fetchOptions,
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
    ...fetchOptions,
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
