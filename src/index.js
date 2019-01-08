import css from './index.css'

const removeActive = b => {
  if (b.classList.contains('active')) {
    b.classList.remove('active')
  }
}

const clearActive = btns => btns.forEach(b => removeActive(b))

const showFeedBackForm = () => {
  const feedBackForm = document.getElementsByClassName('feedback-form')[0]
  feedBackForm.style.display = 'block'
}

const hideFeedBackForm = () => {
  const feedBackForm = document.getElementsByClassName('feedback-form')[0]
  feedBackForm.style.display = 'none'
}

const createSelectionState = () => {
  let selection = []
  return {
    setSelection: btn => {
      selection = btn.id
    },
    getSelection: () => selection,
    update: () => {
      if (selection) {
        // make API call, the end.
        hideFeedBackForm()
      } else {
        // show form
        showFeedBackForm()
        textareaCharacterCounter()
      }
    }
  }
}

const getEmoji = () => {
  const emojiHappy = document.getElementById('emoji-happy')
  const emojiSad = document.getElementById('emoji-sad')
  const emojiConfused = document.getElementById('emoji-confused')
  const emojiThumbsup = document.getElementById('emoji-thumbsup')
  const emojiThumbsdown = document.getElementById('emoji-thumbsdown')
  return [emojiHappy, emojiSad, emojiConfused, emojiThumbsup, emojiThumbsdown]
}

const textareaCharacterCounter = () => {
  document.getElementById('feedback-textarea').onkeyup = function () {
    const chars = this.value.length
    document.getElementById('maxlength-enforcer').innerHTML = `<span>${chars}</span>/500`
  }
}

const selection = createSelectionState();

(function feedback () {
  const emojis = getEmoji()
  emojis.forEach(b => {
    b.addEventListener('click', () => {
      clearActive(emojis)
      b.classList.add('active')
      selection.setSelection(b)
      selection.update()
    })
  })
}())
