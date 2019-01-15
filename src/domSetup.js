const createWrapper = entryId => {
  const wrapper = document.createElement('div')
  wrapper.className = 'wrapper'
  wrapper.id = `${entryId}-wrapper`
  return wrapper
}

const createText = text => {
  const p = document.createElement('p')
  p.innerHTML = text
  p.className = 'feedback-text'
  return p
}

const createButtonWithId = (entryId, id) => {
  const button = document.createElement('div')
  button.id = `${entryId}-${id}`
  button.className = 'button'
  return button
}

const createEmojiSpan = (icon, alt) => {
  const span = document.createElement('span')
  span.alt = alt
  span.className = 'emoji'
  span.innerHTML = icon
  return span
}

const createTextArea = entryId => {
  const textarea = document.createElement('textarea')
  textarea.id = `${entryId}-feedback-textarea`
  textarea.cols = '30'
  textarea.rows = '10'
  textarea.maxLength = '500'
  textarea.style.width = '100%'
  return textarea
}

const createTextAreaCounter = entryId => {
  const charCounter = document.createElement('div')
  const span = document.createElement('span')
  charCounter.appendChild(span).innerHTML += '0/500'
  charCounter.id = `${entryId}-maxlength-enforcer`
  charCounter.style.color = '#757575'
  charCounter.style.fontSize = '14px'
  return charCounter
}

const createFeedbackForm = (entryId, text) => {
  const feedbackForm = document.createElement('div')
  feedbackForm.classList.add('feedback-form')
  feedbackForm.classList.add('hidden')

  feedbackForm.id = `${entryId}-feedback-form`
  const feedbackText = createText(text.feedbackThankYou)
  const feedbackTextOptional = createText(text.feedbackTextPrompt)
  feedbackTextOptional.style.color = '#757575'
  feedbackTextOptional.style.textAlign = 'center'
  feedbackTextOptional.style.fontSize = '14px'

  const form = document.createElement('form')
  const textarea = createTextArea(entryId)
  const charCounter = createTextAreaCounter(entryId)

  form.appendChild(textarea)
  form.appendChild(charCounter)

  const submitButton = createButtonWithId(entryId, 'feedback-button')
  submitButton.classList.add('feedback-button')
  submitButton.appendChild(createText('Submit feedback'))

  feedbackForm.appendChild(feedbackText)
  feedbackForm.appendChild(feedbackTextOptional)
  feedbackForm.appendChild(form)
  feedbackForm.appendChild(submitButton)

  return feedbackForm
}

const attachEmojiFeedback = (entryId, emojis, text) => {
  const entry = document.getElementById(entryId)
  const emojiFeedbackWrapper = createWrapper(entryId)
  const introText = createText(text.introText)

  emojiFeedbackWrapper.appendChild(introText)

  emojis.forEach(({ emojicon, emotion }, i) => {
    const emojiButton = createButtonWithId(entryId, emotion)
    emojiButton.style.gridRow = 'row 2'
    emojiButton.style.gridColumn = `col ${i + 1} / span 1`
    emojiButton.dataset.balloon = emotion
    emojiButton.dataset.balloonPos = 'down'
    const emojiSpan = createEmojiSpan(emojicon, emotion)
    emojiButton.appendChild(emojiSpan)
    emojiFeedbackWrapper.appendChild(emojiButton)
  })

  emojiFeedbackWrapper.appendChild(createFeedbackForm(entryId, text))
  emojiFeedbackWrapper.appendChild(createSpinner(entryId))

  entry.appendChild(emojiFeedbackWrapper)
}

const createSpinner = entryId => {
  const spinner = document.createElement('div')
  spinner.id = `${entryId}-spinner`
  spinner.className = 'sk-circle'
  spinner.classList.add('hidden')

  for (let i = 0; i < 12; ++i) {
    const circle = document.createElement('div')
    circle.classList.add('sk-child')
    circle.classList.add(`sk-circle${i}`)
    spinner.appendChild(circle)
  }
  return spinner
}

const createThankYouWrapper = entryId => {
  const thankYouWrapper = document.createElement('div')
  thankYouWrapper.className = 'feedback-thank-you'
  thankYouWrapper.classList.add('hidden')
  thankYouWrapper.id = `${entryId}-thank-you`

  const hiFive = createText('🙌 ')
  hiFive.className = 'hiFive'
  const thankYou = createText('Your feedback has been recorded')
  thankYou.className = 'thankYou'
  thankYouWrapper.appendChild(hiFive)
  thankYouWrapper.appendChild(thankYou)

  return thankYouWrapper
}

const attachThankYouMessage = entryId => {
  const thankYouWrapper = createThankYouWrapper(entryId)
  const entry = document.getElementById(entryId)
  entry.appendChild(thankYouWrapper)
}

const detachEmojiFeedback = entryId => {
  const entry = document.getElementById(entryId)
  const emojiFeedbackWrapper = document.getElementById(`${entryId}-wrapper`)
  entry.removeChild(emojiFeedbackWrapper)
}

export {
  attachEmojiFeedback,
  attachThankYouMessage,
  detachEmojiFeedback
}