import { hideById } from 'util'

const formTextAreaSetup = entryId => {
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

const validateForm = form => {

}

const createSubmitButtonHandler = entryId => {
  const submitButton = document.getElementById(`${entryId}-feedback-button`)

  const submitForm = entryId => {
    const form = document.getElementById(`${entryId}-feedback-form`)

  }

  const handleSubmitButton = () => {
    hideById(`${entryId}-feedback-form`)
    submitForm(entryId)
  }

  return {
    attachSubmitButtonHandler: () => submitButton.addEventListener('click', handleSubmitButton),
    detachSubmitButtonHandler: () => submitButton.removeEventListener('click', handleSubmitButton),
    submitForm
  }
}

const createFormHandler = entryId => {
  const submitButtonHandler = createSubmitButtonHandler(entryId)
  submitButtonHandler.attachSubmitButtonHandler()
}

export {
  formTextAreaSetup,
  createFormHandler
}
