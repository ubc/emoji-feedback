/* global fetch */
import attachMarkupToElementID from './setup'

const textareaSetup = entryId => {
  const textarea = document.getElementById(`${entryId}-feedback-textarea`)
  textarea.focus()
  textarea.onkeyup = function () {
    const chars = this.value.length
    document.getElementById(`${entryId}-maxlength-enforcer`).innerHTML = `<span>${chars}</span>/500`
    const feedbackButton = document.getElementById(`${entryId}-feedback-button`)
    if (chars > 0) {
      feedbackButton.classList.add('ready')
    } else {
      feedbackButton.classList.remove('ready')
    }
  }
}

const removeActive = emoji => {
  if (emoji.classList.contains('active')) {
    emoji.classList.remove('active')
  }
}

const clearActive = emojis => emojis.forEach(emoji => removeActive(emoji))

const showById = id => {
  const feedBackForm = document.getElementById(id)
  feedBackForm.style.display = 'block'
}

const hideById = id => {
  const feedBackForm = document.getElementById(id)
  feedBackForm.style.display = 'none'
}

const getEmojisFromDOM = (entryId, emojis) =>
  emojis.map(({ response }) => document.getElementById(`${entryId}-${response}`))

const submitForm = entryId => {
  document.getElementById(`${entryId}-feedback-form`)
}

const attachSubmitButtonHandler = entryId => {
  const submitButton = document.getElementById(`${entryId}-feedback-button`)
  submitButton.addEventListener('click', () => submitForm())
}

const controller = () => {
  const state = {
    selectedEmojiIds: [],
    endpoints: {
      emoji: '',
      form: '',
      votes: ''
    },
    entryId: ''
  }

  const update = emojis => {
    clearActive(emojis)
    state.selectedEmojiIds.forEach(emojiId =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (state.selectedEmojiIds.length > 0) {
      showById(`${state.entryId}-feedback-form`)
      submitSelectedEmojis(state.selectedEmojiIds)
      textareaSetup(state.entryId)
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

  const submitSelectedEmojis = () => {
    return fetch(state.endpoints.emoji, {
      method: 'POST',
      body: JSON.stringify(state.selectedEmojiIds),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return {
    init: ({ entryId, emojis, endpoints }) => {
      attachMarkupToElementID(entryId, emojis)
      const domEmojis = getEmojisFromDOM(entryId, emojis)
      state.entryId = entryId
      domEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
          setSelection(emoji)
          update(domEmojis)
        })
      })
      attachSubmitButtonHandler(entryId)
      setEndpoints(endpoints)
    },
    submitForm: () => {

    }
  }
}

export default controller
