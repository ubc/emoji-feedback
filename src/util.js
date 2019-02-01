const getTextArea = entryId => document.getElementById(`${entryId}-feedback-textarea`)

const removeActive = emoji => {
  if (emoji.classList.contains('active')) {
    emoji.classList.remove('active')
    console.log(emoji.classList)
  }
}
const clearActive = emojis => {
  emojis.forEach(emoji => removeActive(emoji))
}

const getEmojisFromDOM = (entryId, emojis) =>
  emojis.map(({ emotion }) => document.getElementById(`${entryId}-${emotion}`))

const setTextAreaMaxLength = (entryId, chars) =>
  (document.getElementById(`${entryId}-maxlength-enforcer`).innerHTML = `<span>${chars}</span>/500`)

const addToClass = (elemId, className) => {
  const element = document.getElementById(elemId)
  element.classList.add(className)
}

const removeFromClass = (elemId, className) => {
  const element = document.getElementById(elemId)
  element.classList.remove(className)
}

const convertOver1000 = votes => {
  const multipleOfThousand = Math.floor(votes / 1000)
  const roundedToNearestHundred = Math.round((votes - multipleOfThousand * 1000) / 100)
  return `${multipleOfThousand}.${roundedToNearestHundred}k`
}

export {
  clearActive,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength,
  removeFromClass,
  addToClass,
  convertOver1000
}
