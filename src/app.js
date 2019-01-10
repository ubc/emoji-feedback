/* global fetch */
import attachMarkupToElementID from './setup'
import {
  clearActive,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength,
  addToClass,
  removeFromClass
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
      if (chars > 0) {
        addToClass(`${entryId}-feedback-button`, 'ready')
      } else {
        removeFromClass(`${entryId}-feedback-button`, 'ready')
      }
    }
  }

  const createFormHandler = entryId => {
    const submitButton = document.getElementById(`${entryId}-feedback-button`)
    const handleSubmitButton = async () => {
      if (state.feedbackText.length > 0) {
        addToClass(`${entryId}-feedback-form`, 'hidden')
        // show spinner
        await submitFeedback(state.feedbackText)
      } else {
        // removeFromClass(`${entryId}-feedback-form`, 'submitted')
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
      removeFromClass(`${state.entryId}-feedback-form`, 'hidden')
      submitSelectedEmojis(state.selectedEmojiIds)
      formTextAreaSetup(state.entryId)
    } else {
      addToClass(`${state.entryId}-feedback-form`, 'hidden')
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
