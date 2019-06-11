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

const submitSelectedEmojis = ({ emojis, responses, endpoints, text, caliper }) => {
  const date = new Date()
  const timestamp = date.toISOString()
  const emojicons = emojis.map(({ emojicon }) => emojicon)
  const emotion = emojis.map(({ emotion }) => emotion)
  const selectedEmojis = responses.selectedEmojis

  const question = {
    id: caliper.questionId,
    type: 'RatingScaleQuestion',
    questionPosed: text.introText,
    scale: {
      id: caliper.scaleId,
      type: 'MultiselectScale',
      scalePoints: emojicons.length,
      itemLabels: emojicons,
      itemValues: emotion,
      isOrderedSelection: false,
      minSelections: 1,
      maxSelections: emojicons.length
    }
  }

  return fetch(endpoints.emoji, {
    ...fetchOptions,
    body: JSON.stringify({
      eventTime: timestamp,
      object: caliper.object,
      question: question,
      selections: selectedEmojis.map(({ emotion }) => emotion)
    })
  })
}

const submitFeedback = ({ endpoints, responses, text, caliper }) => {
  const date = new Date()
  const timestamp = date.toISOString()
  return fetch(endpoints.feedback, {
    ...fetchOptions,
    body: JSON.stringify({
      eventTime: timestamp,
      object: caliper.object,
      feedback: responses.writtenFeedback,
      questionText: text.feedbackTextPrompt
    })
  })
}

export {
  getVotes,
  submitSelectedEmojis,
  submitFeedback
}
