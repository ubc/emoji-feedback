import { convertOver1000 } from './util'

const createWrapper = entryId => {
  const wrapper = document.createElement('div')
  wrapper.className = 'wrapper'
  wrapper.id = `${entryId}-wrapper`
  wrapper.style.display = 'grid'
  wrapper.style.gridGap = '2px'
  wrapper.style.width = '60px'
  wrapper.style.gridTemplateColumns = '[col] 60px [col] 60px [col] 60px [col] 60px [col] 60px'
  wrapper.style.gridTemplateRows = '[row] auto [row] auto [row]'
  return wrapper
}

const createText = text => {
  const p = document.createElement('p')
  p.innerHTML = text
  p.style.gridColumn = 'col / span 6'
  p.style.gridRow = 'row'
  p.style.textAlign = 'center'
  p.style.fontWeight = 'bold'
  return p
}

const createButtonWithId = (entryId, id) => {
  const button = document.createElement('div')
  const sanitizedId = id.replace(/\s+/g, '-')
  button.id = `${entryId}-${sanitizedId}`
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
  textarea.style.border = '1px solid #c8d6e5'
  textarea.style.fontSize = '14px;'
  textarea.style.height = '80px'
  textarea.style.webkitBorderRadius = '5px'
  textarea.style.MozBorderRadius = '5px'
  textarea.style.borderRadius = '5px'
  return textarea
}

const createTextAreaCounter = entryId => {
  const charCounter = document.createElement('div')
  const span = document.createElement('span')
  charCounter.appendChild(span).innerHTML += '0/500'
  charCounter.id = `${entryId}-maxlength-enforcer`
  charCounter.style.color = '#576574'
  charCounter.style.fontSize = '14px'
  return charCounter
}

const createFeedbackForm = (entryId, text) => {
  const feedbackForm = document.createElement('div')
  feedbackForm.classList.add('feedback-form')
  feedbackForm.classList.add('hidden')

  feedbackForm.id = `${entryId}-feedback-form`
  const feedbackText = createText(text.feedbackThankYou)
  feedbackText.style.gridColumn = 'col / span 6'
  const feedbackTextOptional = createText(text.feedbackTextPrompt)
  feedbackTextOptional.style.color = '#576574'
  feedbackTextOptional.style.textAlign = 'center'
  feedbackTextOptional.style.fontSize = '14px'

  const form = document.createElement('form')
  const textarea = createTextArea(entryId)
  const charCounter = createTextAreaCounter(entryId)

  form.appendChild(textarea)
  form.appendChild(charCounter)

  const submitButton = createButtonWithId(entryId, 'feedback-button')
  submitButton.classList.add('feedback-button')
  submitButton.appendChild(createText('Submit'))

  feedbackForm.appendChild(feedbackText)
  feedbackForm.appendChild(feedbackTextOptional)
  feedbackForm.appendChild(form)
  feedbackForm.appendChild(submitButton)

  return feedbackForm
}

const attachEmojiFeedback = (entryId, emojis, text) => {
  const entry = document.getElementById(entryId)
  if (!entry) throw new Error('The specified element with id does not exist')
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

  emojiFeedbackWrapper.appendChild(createTotalVotes(entryId))
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
  thankYouWrapper.className = 'feedback-submitted-message'
  thankYouWrapper.classList.add('hidden')
  thankYouWrapper.id = `${entryId}-thank-you`

  const hiFive = createText('🙌')
  hiFive.style.fontSize = '30px'
  hiFive.style.gridRow = 'row'
  hiFive.style.gridColumn = 'col / span 6'

  const thankYou = createText('Your feedback has been recorded.')
  thankYou.id = `${entryId}-thank-you-message`
  thankYou.style.gridRow = 'row 2'
  thankYouWrapper.appendChild(hiFive)
  thankYouWrapper.appendChild(thankYou)

  return thankYouWrapper
}

const attachThankYouMessage = entryId => {
  const thankYouWrapper = createThankYouWrapper(entryId)
  const entry = document.getElementById(entryId)
  entry.appendChild(thankYouWrapper)
}

const createErrorMessageWrapper = entryId => {
  const errorMessageWrapper = document.createElement('div')
  errorMessageWrapper.className = 'feedback-submitted-message'
  errorMessageWrapper.classList.add('hidden')
  errorMessageWrapper.id = `${entryId}-error`

  const facePalm = createText('🤦')
  facePalm.style.fontSize = '30px'
  facePalm.style.gridRow = 'row'
  facePalm.style.gridColumn = 'col / span 6'
  const error = createText('Our servers are having some issues. Please vote again later.')
  error.id = `${entryId}-error-message`
  error.style.gridRow = 'row 2'
  errorMessageWrapper.appendChild(facePalm)
  errorMessageWrapper.appendChild(error)

  return errorMessageWrapper
}

const attachErrorMessage = entryId => {
  const errorMessageWrapper = createErrorMessageWrapper(entryId)
  const entry = document.getElementById(entryId)
  entry.appendChild(errorMessageWrapper)
}

const detachEmojiFeedback = entryId => {
  const entry = document.getElementById(entryId)
  const emojiFeedbackWrapper = document.getElementById(`${entryId}-wrapper`)
  entry.removeChild(emojiFeedbackWrapper)
}

const createTotalVotes = entryId => {
  const totalVotes = document.createElement('div')
  totalVotes.id = `${entryId}-total-votes`
  totalVotes.style.gridRow = 'row 3'
  totalVotes.style.gridColumn = 'col / span 6'
  totalVotes.style.color = '#576574'
  totalVotes.style.textAlign = 'right'
  return totalVotes
}

const displayVotes = (entryId, votes) => {
  const totalVotes = document.getElementById(`${entryId}-total-votes`)
  totalVotes.innerHTML = `total votes: ${votes > 999 ? convertOver1000(votes) : votes}`
}

export {
  attachEmojiFeedback,
  attachThankYouMessage,
  detachEmojiFeedback,
  attachErrorMessage,
  displayVotes
}
