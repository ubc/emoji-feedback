import controller from './src/app'

const app = controller()

const endpoints = {
  emoji: 'http://127.0.0.1:5000/emoji',
  feedback: 'http://127.0.0.1:5000/feedback',
  votes: 'http://127.0.0.1:5000/votes'
}

const caliper = {
  object: {
    'id': 'urn:uuid:42db09b6-98fc-4ea6-87f3-fd2f85b9b12a',
    'type': 'DigitalResource'
  },
  questionId: 'urn:uuid:450f0d09-4c87-414e-87d2-29df60ae3b39',
  scaleId: 'urn:uuid:450f0d09-4c87-414e-87d2-29df60ae3b39'
}

app.init('entry', endpoints, caliper, {
  // introText: 'I can customize this!',
  // feedbackTextPrompt: 'Please write down below',
  // feedbackThankYou: 'Thanks again!'
})
