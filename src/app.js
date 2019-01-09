const emojiHappy = document.getElementById('emoji-happy')
const emojiSad = document.getElementById('emoji-sad')
const emojiConfused = document.getElementById('emoji-confused')
const emojiThumbsup = document.getElementById('emoji-thumbsup')
const emojiThumbsdown = document.getElementById('emoji-thumbsdown')
const emojis = [emojiHappy, emojiSad, emojiConfused, emojiThumbsup, emojiThumbsdown]

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

const controller = () => {
  let selectedEmojiIds = []
  return {
    setSelection: emoji => {
      if (selectedEmojiIds.includes(emoji.id)) {
        selectedEmojiIds = selectedEmojiIds.filter(e => e !== emoji.id)
      } else {
        selectedEmojiIds.push(emoji.id)
      }
    },
    getSelection: () => selectedEmojiIds,
    update: () => {
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
    },
    getUserId: () => {},
    sendSelectedEmojis: () => { /* make api request here */ },
    emojis
  }
}

export default controller
