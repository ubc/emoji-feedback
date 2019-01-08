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
  let selection
  return {
    setSelection: btn => {
      const id = btn.id
      if (id === 'yes-button') {
        selection = true
      } else selection = false
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

const getButtons = () => {
  const yesButton = document.getElementById('yes-button')
  const noButton = document.getElementById('no-button')
  return [yesButton, noButton]
}

const textareaCharacterCounter = () => {
  document.getElementById('feedback-textarea').onkeyup = function () {
    const chars = this.value.length
    document.getElementById('maxlength-enforcer').innerHTML = `<span>${chars}</span>/500`
  }
}

const selection = createSelectionState();

(function feedback () {
  const buttons = getButtons()
  buttons.forEach(b => {
    b.addEventListener('click', () => {
      clearActive(buttons)
      b.classList.add('active')
      selection.setSelection(b)
      selection.update()
    })
  })
}())
