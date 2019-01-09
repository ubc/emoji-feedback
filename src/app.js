import attachMarkupToElementID from './setup'

const textareaSetup = () => {
  const textarea = document.getElementById('feedback-textarea')
  textarea.focus()
  textarea.onkeyup = function () {
    const chars = this.value.length
    document.getElementById('maxlength-enforcer').innerHTML = `<span>${chars}</span>/500`
    const feedbackButton = document.getElementById('feedback-button')
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

const getEmojisFromDOM = emojis => emojis.map(({ response }) => document.getElementById(response))

const controller = () => {
  let selectedEmojiIds = []
  const endpoints = {
    emoji: '',
    form: '',
    votes: ''
  }

  const update = emojis => {
    clearActive(emojis)
    selectedEmojiIds.forEach(emojiId =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (selectedEmojiIds.length > 0) {
      showByClassName('feedback-form')
      textareaSetup()
    } else {
      hideByClassName('feedback-form')
    }
  }

  const setSelection = emoji => {
    if (selectedEmojiIds.includes(emoji.id)) {
      selectedEmojiIds = selectedEmojiIds.filter(e => e !== emoji.id)
    } else {
      selectedEmojiIds.push(emoji.id)
    }
  }

  const setEndpoints = ({ emojiEndpoint, formEndpoint, votesEndpoint }) => {
    endpoints.emoji = emojiEndpoint
    endpoints.form = formEndpoint
    endpoints.votes = votesEndpoint
  }

  return {
    init: ({ entryID, emojis, endpoints }) => {
      attachMarkupToElementID(entryID, emojis)
      const domEmojis = getEmojisFromDOM(emojis)
      domEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
          setSelection(emoji)
          update(domEmojis)
        })
      })
      setEndpoints(endpoints)
    },
    getSelection: () => selectedEmojiIds,
    getUserId: () => { },
    submitSelectedEmojis: () => { /* make api request here */ },
    submitForm: () => { }
  }
}

export default controller
