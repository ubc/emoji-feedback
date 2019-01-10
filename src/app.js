/* global fetch */
import attachMarkupToElementID from './setup'
import {
  clearActive,
  showById,
  hideById,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength
} from './util'

const controller = () => {
  const state = {
    selectedEmojiIds: [],
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
      setTextAreaMaxLength(entryId, chars)
      const feedbackButton = document.getElementById(`${entryId}-feedback-button`)
      if (chars > 0) {
        feedbackButton.classList.add('ready')
      } else {
        feedbackButton.classList.remove('ready')
      }
    }
  }

  const createFormHandler = entryId => {
    const submitButton = document.getElementById(`${entryId}-feedback-button`)
    const handleSubmitButton = () => {
      if (state.feedbackText.length > 0) {
        hideById(`${entryId}-feedback-form`)
        submitFeedback(state.feedbackText)
      } else {
        // show message that there should be some text before submission can occur
      }
    }
    submitButton.addEventListener('click', handleSubmitButton)
  }

  const update = emojis => {
    clearActive(emojis)
    state.selectedEmojiIds.forEach(emojiId =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (state.selectedEmojiIds.length > 0) {
      showById(`${state.entryId}-feedback-form`)
      submitSelectedEmojis(state.selectedEmojiIds)
      formTextAreaSetup(state.entryId)
    } else {
      hideById(`${state.entryId}-feedback-form`)
    }
  }

  const setSelection = emoji => {
    if (state.selectedEmojiIds.includes(emoji.id)) {
      state.selectedEmojiIds = state.selectedEmojiIds.filter(e => e !== emoji.id)
    } else {
      state.selectedEmojiIds.push(emoji.id)
    }
  }

  const setEndpoints = ({ emojiEndpoint, formEndpoint, votesEndpoint }) => {
    state.endpoints.emoji = emojiEndpoint
    state.endpoints.form = formEndpoint
    state.endpoints.votes = votesEndpoint
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
    init: ({ entryId, emojis, endpoints }) => {
      setEndpoints(endpoints)
      attachMarkupToElementID(entryId, emojis)
      setEntryId(entryId)
      createFormHandler(entryId)

      const domEmojis = getEmojisFromDOM(entryId, emojis)
      domEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
          setSelection(emoji)
          update(domEmojis)
        })
      })
    }
  }
}

export default controller
