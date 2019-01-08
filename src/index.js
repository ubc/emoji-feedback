import css from './index.css'

const removeActive = b => {
  if (b.classList.contains('active')) {
    b.classList.remove('active')
  }
}

const clearActive = btns => {
  btns.forEach(b => removeActive(b))
}

const createSelectionState = () => {
  let selection
  return {
    setSelection: (btn) => {
      const id = btn.id
      if (id === 'yes-button') {
        selection = true
      } else selection = false
    },
    getSelection: () => selection
  }
}

const getButtons = () => {
  const yesButton = document.getElementById('yes-button')
  const noButton = document.getElementById('no-button')
  return [yesButton, noButton]
}

const selection = createSelectionState()

const feedback = () => {  
  const buttons = getButtons()
  buttons.forEach(b => {
    b.addEventListener('click', () => {
      clearActive(buttons)
      b.classList.add('active')
      selection.setSelection(b)
    })
  })
}

feedback()
