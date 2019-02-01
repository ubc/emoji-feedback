/* global fetch */

const fetchOptions = {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' }
}

const getVotes = url => fetch(url, {
  ...fetchOptions,
  method: 'GET'
}).then(res => res.json().then(x => x.votes))

const submitSelectedEmojis = ({ emojis, responses, endpoints, text }) => {
  const date = new Date()
  const timestamp = date.getTime()
  const emojicons = emojis.map(({ emojicon }) => emojicon)
  const emotion = emojis.map(({ emotion }) => emotion)
  const selectedEmojis = responses.selectedEmojis

  return fetch(endpoints.emoji, {
    ...fetchOptions,
    body: JSON.stringify({
      timestamp,
      scale: {
        id: `${window.location.href}`,
        type: 'MultiselectionScale',
        question: text.introText,
        points: 5,
        itemLabel: emojicons,
        itemValues: emotion
      },
      selection: selectedEmojis.map(({ emotion }) => emotion),
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
