import css from './index.css'
import controller from './app'

const app = controller();

(function feedback () {
  const emojis = app.emojis
  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      app.setSelection(emoji)
      console.log(app.getSelection())
      app.update()
    })
  })
}())
