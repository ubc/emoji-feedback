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

const createDefaultState = () => ({
  responses: {
    selectedEmojis: [],
    writtenFeedback: ''
  },
  text: {
    introText: '',
    feedbackTextPrompt: '',
    feedbackThankYou: ''
  },
  endpoints: {
    emoji: '',
    feedback: '',
    votes: ''
  },
  emojis: [],
  entryId: ''
})

export {
  defaultEmojis,
  introText,
  feedbackTextPrompt,
  feedbackThankYou,
  createDefaultState
}
