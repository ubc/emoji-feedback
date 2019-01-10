import css from './index.css'
import controller from './app'

const app = controller()

const emojis = [
  { emojicon: '😀', emotion: 'happy' },
  { emojicon: '😞', emotion: 'sad' },
  { emojicon: '😕', emotion: 'confused' },
  { emojicon: '👍', emotion: 'like' },
  { emojicon: '👎', emotion: 'dislike' }
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
