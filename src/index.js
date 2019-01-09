import css from './index.css'
import controller from './app'

const app = controller()

const emojis = [
  { icon: '😀', response: 'emoji-happy' },
  { icon: '😞', response: 'emoji-sad' },
  { icon: '😕', response: 'emoji-confused' },
  { icon: '👍', response: 'emoji-thumbsup' },
  { icon: '👎', response: 'emoji-thumbsdown' }
]

app.init({
  entryId: 'entry',
  emojis,
  endpoints: {
    emojiEndpoint: 'http://localhost:8080/',
    formEndpoint: 'http://localhost:8080/',
    votesEndpoint: 'http://localhost:8080/'
  }
})
