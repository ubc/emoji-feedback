const emojiHappy = document.getElementById('emoji-happy')
const emojiSad = document.getElementById('emoji-sad')
const emojiConfused = document.getElementById('emoji-confused')
const emojiThumbsup = document.getElementById('emoji-thumbsup')
const emojiThumbsdown = document.getElementById('emoji-thumbsdown')
const emojis = [emojiHappy, emojiSad, emojiConfused, emojiThumbsup, emojiThumbsdown]

const textareaCharacterCounter = () => {
  document.getElementById('feedback-textarea').onkeyup = function () {
    const chars = this.value.length
    document.getElementById('maxlength-enforcer').innerHTML = `<span>${chars}</span>/500`
  }
}

const removeActive = emoji => {
  if (emoji.classList.contains('active')) {
    emoji.classList.remove('active')
  }
}
const clearActive = emojis => emojis.forEach(emoji => removeActive(emoji))

const showFeedBackForm = () => {
  const feedBackForm = document.getElementsByClassName('feedback-form')[0]
  feedBackForm.style.display = 'block'
}

const hideFeedBackForm = () => {
  const feedBackForm = document.getElementsByClassName('feedback-form')[0]
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
      selectedEmojiIds.forEach(emojiId => {
        emojis.find(e => e.id === emojiId).classList.add('active')
      })
      if (selectedEmojiIds.length > 0) {
        showFeedBackForm()
        textareaCharacterCounter()
      } else {
        // show form
        hideFeedBackForm()
      }
    },
    emojis
  }
}

export default controller
