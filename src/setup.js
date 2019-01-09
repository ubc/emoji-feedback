const createWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'wrapper'
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

const createFeedbackForm = entryId => {
  const feedbackForm = document.createElement('div')
  feedbackForm.className = 'feedback-form'
  feedbackForm.id = `${entryId}-feedback-form`
  const feedbackText = createText('Thank you for your feedback')
  const feedbackTextOptional = createText("You can give us written feedback below if you'd like")
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

const attachMarkupToElementID = (entryId, emojis) => {
  const entry = document.getElementById(entryId)
  const wrapper = createWrapper()
  const introText = createText('How do you feel about this graph?')

  wrapper.appendChild(introText)

  emojis.forEach(({ icon, response }, i) => {
    const emojiButton = createButtonWithId(entryId, response)
    emojiButton.style.gridRow = 'row 2'
    emojiButton.style.gridColumn = `col ${i + 1} / span 1`
    const emojiSpan = createEmojiSpan(icon, response)
    emojiButton.appendChild(emojiSpan)
    wrapper.appendChild(emojiButton)
  })

  wrapper.appendChild(createFeedbackForm(entryId))

  entry.appendChild(wrapper)
}

export default attachMarkupToElementID
