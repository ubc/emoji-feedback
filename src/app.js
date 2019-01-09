/* global fetch */
import attachMarkupToElementID from './setup'

const textareaSetup = id => {
  const textarea = document.getElementById(`${id}-feedback-textarea`)
  textarea.focus()
  textarea.onkeyup = function () {
    const chars = this.value.length
    document.getElementById(`${id}-maxlength-enforcer`).innerHTML = `<span>${chars}</span>/500`
    const feedbackButton = document.getElementById(`${id}-feedback-button`)
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

const showByClassName = name => {
  const feedBackForm = document.getElementsByClassName(name)[0]
  feedBackForm.style.display = 'block'
}

const hideByClassName = name => {
  const feedBackForm = document.getElementsByClassName(name)[0]
  feedBackForm.style.display = 'none'
}

const getEmojisFromDOM = (entryId, emojis) => emojis.map(({ response }) => document.getElementById(`${entryId}-${response}`))

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
      showByClassName('feedback-form')
      submitSelectedEmojis(state.selectedEmojiIds)
      textareaSetup(state.entryId)
    } else {
      hideByClassName('feedback-form')
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
      domEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
          setSelection(emoji)
          update(domEmojis)
        })
      })
      setEndpoints(endpoints)
      state.entryId = entryId
    },
    getUserId: () => { },
    submitForm: () => {

    }
  }
}

export default controller
