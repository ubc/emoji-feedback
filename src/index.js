import css from './index.css'
import controller from './app'

const app = controller()
// const app1 = controller()

const emojis = [
  { emojicon: '😀', emotion: 'happy' },
  { emojicon: '😞', emotion: 'sad' },
  { emojicon: '😕', emotion: 'confused' },
  { emojicon: '👍', emotion: 'like' },
  { emojicon: '👎', emotion: 'dislike' }
]

const emojis1 = [
  { emojicon: '😁', emotion: 'superhappy' },
  { emojicon: '😀', emotion: 'happy' },
  { emojicon: '😐', emotion: 'indifferent' },
  { emojicon: '😕', emotion: 'unhappy' },
  { emojicon: '😞', emotion: 'disappointed' }
]

app.init({
  entryId: 'entry',
  emojis: emojis1,
  endpoints: {
    emojiEndpoint: 'http://localhost:8080/emoji',
    formEndpoint: 'http://localhost:8080/form',
    votesEndpoint: 'http://localhost:8080/votes'
  }
})

// app1.init({
//   entryId: 'entry1',
//   emojis,
//   endpoints: {
//     emojiEndpoint: 'http://localhost:8080/',
//     formEndpoint: 'http://localhost:8080/',
//     votesEndpoint: 'http://localhost:8080/'
//   }
// })
