const defaultEmojis = [
  { emojicon: '😁', emotion: 'beaming face with smiling eyes' },
  { emojicon: '😀', emotion: 'grinning face' },
  { emojicon: '😐', emotion: 'neutral face' },
  { emojicon: '😕', emotion: 'confused face' },
  { emojicon: '😞', emotion: 'disappointed face' }
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
  caliper: {
    object: '',
    questionId: '',
    scaleId: ''
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
