/* global fetch */
import {
  attachEmojiFeedback,
  attachThankYouMessage,
  detachEmojiFeedback
} from './domSetup'
import {
  clearActive,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength,
  addToClass,
  removeFromClass
} from './util'
import * as c from './defaults'

const controller = () => {
  const state = {
    emojis: [],
    feedbackText: '',
    endpoints: {
      emoji: '',
      feedback: '',
      votes: ''
    },
    entryId: ''
  }

  const formTextAreaSetup = entryId => {
    const textarea = getTextArea(entryId)
    textarea.focus()
    textarea.onkeyup = function () {
      const chars = this.value.length
      state.feedbackText = textarea.value
      setTextAreaMaxLength(entryId, chars)
      if (chars > 0) {
        addToClass(`${entryId}-feedback-button`, 'ready')
      } else {
        removeFromClass(`${entryId}-feedback-button`, 'ready')
      }
    }
  }

  const createFormHandler = entryId => {
    const submitButton = document.getElementById(`${entryId}-feedback-button`)
    const handleSubmitButton = () => {
      if (state.feedbackText.length > 0) {
        addToClass(`${entryId}-feedback-form`, 'hidden')
        removeFromClass(`${entryId}-spinner`, 'hidden')
        submitFeedback(state.feedbackText)
          .then(res => {
            addToClass(`${entryId}-spinner`, 'hidden')
            if (res.status === 200) {
              detachEmojiFeedback(entryId)
              attachThankYouMessage(entryId)
            } else if (res.status === 404) {
              console.log('oops, 404')
              // attach error message, remove the two lines of code below
              detachEmojiFeedback(entryId)
              attachThankYouMessage(entryId)
            }
          })
          .catch(e => {
            // attach error message
            throw new Error(e)
          })
      } else {
        // removeFromClass(`${entryId}-feedback-form`, 'submitted')
        // show message that there should be some text before submission can occur
      }
    }
    submitButton.addEventListener('click', handleSubmitButton)
  }

  const update = emojis => {
    clearActive(emojis)
    state.emojis.forEach(({ emojiId }) =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (state.emojis.length > 0) {
      removeFromClass(`${state.entryId}-feedback-form`, 'hidden')
      submitSelectedEmojis(state.emojis)
      formTextAreaSetup(state.entryId)
    } else {
      addToClass(`${state.entryId}-feedback-form`, 'hidden')
    }
  }

  const setSelection = emoji => {
    if (state.emojis.map(e => e.emojiId).includes(emoji.id)) {
      state.emojis = state.emojis.filter(e => e.emojiId !== emoji.id)
    } else {
      const emojiElem = document.getElementById(emoji.id)
      const icon = emojiElem.childNodes[0].innerHTML
      state.emojis.push({
        emojiId: emoji.id,
        emojicon: icon
      })
    }
  }

  const setEndpoints = ({ emoji, feedback, votes }) => {
    state.endpoints.emoji = emoji
    state.endpoints.feedback = feedback
    state.endpoints.votes = votes
  }

  const submitSelectedEmojis = emojis =>
    fetch(state.endpoints.emoji, {
      ...c.fetchOptions,
      body: JSON.stringify({ emojis: emojis })
    })

  const submitFeedback = text =>
    fetch(state.endpoints.feedback, {
      ...c.fetchOptions,
      body: JSON.stringify({ feedback: text })
    })

  const getVotes = () =>
    fetch(state.endpoints.votes, {
      ...c.fetchOptions,
      method: 'GET'
    })

  const setEntryId = entryId => (state.entryId = entryId)

  return {
    init: (entryId, endpoints, {
      emojis = c.defaultEmojis,
      introText = c.introText,
      feedbackTextPrompt = c.feedbackTextPrompt,
      feedbackThankYou = c.feedbackThankYou
    } = {}) => {
      if (entryId == null) throw new Error('entryId must be specified')
      if (endpoints == null) throw new Error('endpoints must be specified')
      const text = { introText, feedbackTextPrompt, feedbackThankYou }
      setEndpoints(endpoints)
      attachEmojiFeedback(entryId, emojis, text)
      setEntryId(entryId)
      createFormHandler(entryId)

      const domEmojis = getEmojisFromDOM(entryId, emojis)
      domEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
          setSelection(emoji)
          update(domEmojis)
        })
      })
    },
    getState: () => state
  }
}

export default controller
