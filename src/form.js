import { hideById } from './util'

const getTextArea = entryId => document.getElementById(`${entryId}-feedback-textarea`)

const formTextAreaSetup = entryId => {
  const textarea = getTextArea(entryId)
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

const createSubmitButtonHandler = entryId => {
  const submitButton = document.getElementById(`${entryId}-feedback-button`)
  const handleSubmitButton = () => {
    const form = document.getElementById(`${entryId}-feedback-form`)
    const textarea = getTextArea(entryId)
    const text = textarea.value
    if (text.length > 0) {
      hideById(`${entryId}-feedback-form`)
      // send to server here
    } else {
      // show message that there should be some text before submission can occur
    }
  }

  return {
    attachSubmitButtonHandler: () => submitButton.addEventListener('click', handleSubmitButton)
    // detachSubmitButtonHandler: () => submitButton.removeEventListener('click', handleSubmitButton)
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
