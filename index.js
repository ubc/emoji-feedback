import css from './index.css'
import controller from './src/app'

const app = controller()

// const emojis = [
//   { emojicon: '😁', emotion: 'superhappy' },
//   { emojicon: '😀', emotion: 'happy' },
//   { emojicon: '😐', emotion: 'indifferent' },
//   { emojicon: '😕', emotion: 'unhappy' },
//   { emojicon: '😞', emotion: 'disappointed' }
// ]

const endpoints = {
  emoji: 'http://localhost:8080/emoji',
  form: 'http://localhost:8080/form',
  votes: 'http://localhost:8080/votes'
}

app.init('entry', endpoints, {
  // introText: 'I can customize this!',
  // feedbackTextPrompt: 'Please write down below',
  // feedbackThankYou: 'Thanks again!'
})
