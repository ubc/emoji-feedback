import css from './index.css'
import controller from './app'

const app = controller()

const emojis = [
  { emojicon: '😁', emotion: 'superhappy' },
  { emojicon: '😀', emotion: 'happy' },
  { emojicon: '😐', emotion: 'indifferent' },
  { emojicon: '😕', emotion: 'unhappy' },
  { emojicon: '😞', emotion: 'disappointed' }
]

app.init({
  entryId: 'entry',
  emojis: emojis,
  endpoints: {
    emojiEndpoint: 'http://localhost:8080/emoji',
    formEndpoint: 'http://localhost:8080/form',
    votesEndpoint: 'http://localhost:8080/votes'
  }
})
