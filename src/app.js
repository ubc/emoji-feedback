import {
  attachEmojiFeedback,
  attachThankYouMessage,
  detachEmojiFeedback,
  attachErrorMessage,
  displayVotes
} from './domSetup'
import {
  clearActive,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength,
  addToClass,
  removeFromClass
} from './util'
import {
  getVotes,
  submitSelectedEmojis,
  submitFeedback
} from './api'
import * as c from './defaults'
import '../index.css'

const controller = () => {
  const state = c.createDefaultState()

  const setState = (entryId,
    { emoji, feedback, votes },
    { emojis, introText, feedbackTextPrompt, feedbackThankYou }
  ) => {
    state.endpoints.emoji = emoji
    state.endpoints.feedback = feedback
    state.endpoints.votes = votes
    state.entryId = entryId
    state.text.introText = introText
    state.text.feedbackTextPrompt = feedbackTextPrompt
    state.text.feedbackThankYou = feedbackThankYou
    state.emojis = emojis
  }

  const setEmojiSelection = emoji => {
    let selectedEmojis = state.responses.selectedEmojis
    if (selectedEmojis.map(e => e.emojiId).includes(emoji.id)) {
      state.responses.selectedEmojis = selectedEmojis.filter(e => e.emojiId !== emoji.id)
    } else {
      const emojiElem = document.getElementById(emoji.id)
      const icon = emojiElem.childNodes[0].innerHTML
      selectedEmojis.push({
        emojiId: emoji.id,
        emojicon: icon
      })
    }
  }

  const setupFormTextArea = entryId => {
    const textarea = getTextArea(entryId)
    textarea.focus()
    textarea.onkeyup = function () {
      const chars = this.value.length
      state.responses.writtenFeedback = textarea.value
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
      if (state.responses.writtenFeedback.length > 0) {
        addToClass(`${entryId}-feedback-form`, 'hidden')
        removeFromClass(`${entryId}-spinner`, 'hidden')
        submitFeedback(state)
          .then(res => {
            addToClass(`${entryId}-spinner`, 'hidden')
            detachEmojiFeedback(entryId)
            if (res.status === 200) {
              attachThankYouMessage(entryId)
            } else if (res.status === 404) {
              attachErrorMessage(entryId)
            }
          })
          .catch(() => {
            detachEmojiFeedback(entryId)
            attachErrorMessage(entryId)
          })
      }
    }
    submitButton.addEventListener('click', handleSubmitButton)
  }

  const setupEmojiListeners = (entryId, emojis) => {
    const domEmojis = getEmojisFromDOM(entryId, emojis)
    domEmojis.forEach(emoji => {
      emoji.addEventListener('click', () => {
        setEmojiSelection(emoji)
        update(domEmojis)
      })
    })
  }

  const update = emojis => {
    let selectedEmojis = state.responses.selectedEmojis
    clearActive(emojis)
    selectedEmojis.forEach(({ emojiId }) =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (selectedEmojis.length > 0) {
      removeFromClass(`${state.entryId}-feedback-form`, 'hidden')
      submitSelectedEmojis(state)
      setupFormTextArea(state.entryId)
    } else {
      addToClass(`${state.entryId}-feedback-form`, 'hidden')
    }
  }

  const init = (entryId, endpoints, {
    emojis = c.defaultEmojis,
    introText = c.introText,
    feedbackTextPrompt = c.feedbackTextPrompt,
    feedbackThankYou = c.feedbackThankYou
  } = {}) => {
    if (entryId == null) throw new Error('entryId must be specified')
    if (endpoints == null) throw new Error('endpoints must be specified')
    setState(entryId, endpoints, { emojis, introText, feedbackTextPrompt, feedbackThankYou })
    attachEmojiFeedback(entryId, emojis, { introText, feedbackTextPrompt, feedbackThankYou })
    setupEmojiListeners(entryId, emojis)
    createFormHandler(entryId)
    getVotes(state.endpoints.votes)
      .then(totalVotes => displayVotes(entryId, totalVotes))
      .catch(e => console.log(`Failed to fetch votes: ${e}`))
  }

  const getState = () => state

  return Object.freeze({ init, getState })
}

export default controller
