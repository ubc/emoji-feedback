import css from './index.css'
import controller from './src/app'

const app = controller()

const endpoints = {
  emoji: 'http://127.0.0.1:5000/emoji',
  feedback: 'http://localhost:8080/feedback',
  votes: 'http://localhost:8080/votes'
}

app.init('entry', endpoints, {
  // introText: 'I can customize this!',
  // feedbackTextPrompt: 'Please write down below',
  // feedbackThankYou: 'Thanks again!'
})
