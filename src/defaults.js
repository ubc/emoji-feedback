const defaultEmojis = [
  { emojicon: '😁', emotion: 'superhappy' },
  { emojicon: '😀', emotion: 'happy' },
  { emojicon: '😐', emotion: 'indifferent' },
  { emojicon: '😕', emotion: 'unhappy' },
  { emojicon: '😞', emotion: 'disappointed' }
]

const introText = 'How do you feel about this graph?'

const feedbackTextPrompt = 'Let us know if you have ideas for new features or improvements below!'

const feedbackThankYou = 'Thank you for your feedback.'

const fetchOptions = {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' }
}

export {
  defaultEmojis,
  introText,
  feedbackTextPrompt,
  feedbackThankYou,
  fetchOptions
}
