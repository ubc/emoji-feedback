import css from './index.css'
import controller from './app'

const app = controller();

(function feedback () {
  app.emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      app.setSelection(emoji)
      app.update()
    })
  })
}())
