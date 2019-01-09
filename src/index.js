import css from './index.css'
import controller from './app'
import attachFeedback from './attach'

const app = controller()

const emojis = [
  { icon: '😀', response: 'emoji-happy' },
  { icon: '😞', response: 'emoji-sad' },
  { icon: '😕', response: 'emoji-confused' },
  { icon: '👍', response: 'emoji-thumbsup' },
  { icon: '👎', response: 'emoji-thumbsdown' }
];

(function feedback () {
  attachFeedback('entry', emojis)

  const domEmojis = app.getEmojisFromDom(emojis)

  domEmojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      app.setSelection(emoji)
      app.update(domEmojis)
    })
  })
}())
