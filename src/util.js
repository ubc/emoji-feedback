
const getTextArea = entryId => document.getElementById(`${entryId}-feedback-textarea`)

const removeActive = emoji => {
  if (emoji.classList.contains('active')) {
    emoji.classList.remove('active')
  }
}
const clearActive = emojis => emojis.forEach(emoji => removeActive(emoji))

const getEmojisFromDOM = (entryId, emojis) =>
  emojis.map(({ emotion }) => document.getElementById(`${entryId}-${emotion}`))

const setTextAreaMaxLength = (entryId, chars) => (document.getElementById(`${entryId}-maxlength-enforcer`).innerHTML = `<span>${chars}</span>/500`)

const addToClass = (elemId, className) => {
  const element = document.getElementById(elemId)
  element.classList.add(className)
}

const removeFromClass = (elemId, className) => {
  const element = document.getElementById(elemId)
  element.classList.remove(className)
}

export {
  clearActive,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength,
  removeFromClass,
  addToClass
}
