/* global fetch */
import * as c from '../defaults'

const getVotes = url => {
  return Promise.resolve({
    votes: 5
  })
}

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
    ...c.fetchOptions,
    body: JSON.stringify({
      eventTime: timestamp,
      object: caliper.object,
      question: question,
      selections: selectedEmojis.map(({ emotion }) => emotion)
    })
  })
}

const submitFeedback = (url, text) => {
  return Promise.resolve({
    status: 200
  })
}

export {
  getVotes,
  submitSelectedEmojis,
  submitFeedback
}
