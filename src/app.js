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
    selectedEmojis: [],
    feedbackText: '',
    endpoints: {
      emoji: '',
      form: '',
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
      // console.log(state.feedbackText)
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
            detachEmojiFeedback(entryId)
            attachThankYouMessage(entryId)
          })
          .catch(e => {
            // this is temp, probably display error message to user
            detachEmojiFeedback(entryId)
            attachThankYouMessage(entryId)
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
    state.selectedEmojis.forEach(({ emojiId }) =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (state.selectedEmojis.length > 0) {
      removeFromClass(`${state.entryId}-feedback-form`, 'hidden')
      submitSelectedEmojis(state.selectedEmojis)
      formTextAreaSetup(state.entryId)
    } else {
      addToClass(`${state.entryId}-feedback-form`, 'hidden')
    }
  }

  const setSelection = emoji => {
    if (state.selectedEmojis.map(e => e.emojiId).includes(emoji.id)) {
      state.selectedEmojis = state.selectedEmojis.filter(e => e.emojiId !== emoji.id)
    } else {
      const emojiElem = document.getElementById(emoji.id)
      const icon = emojiElem.childNodes[0].innerHTML
      state.selectedEmojis.push({
        emojiId: emoji.id,
        emojicon: icon
      })
    }
  }

  const setEndpoints = ({ emoji, form, votes }) => {
    state.endpoints.emoji = emoji
    state.endpoints.form = form
    state.endpoints.votes = votes
  }

  const submitSelectedEmojis = selectedEmojiIds => {
    return fetch(state.endpoints.emoji, {
      method: 'POST',
      body: JSON.stringify(selectedEmojiIds),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const submitFeedback = text => {
    return fetch(state.endpoints.form, {
      method: 'POST',
      body: JSON.stringify(text),
      headers: { 'Content-Type': 'application/json' }
    })
  }

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
