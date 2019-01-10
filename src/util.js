const removeActive = emoji => {
  if (emoji.classList.contains('active')) {
    emoji.classList.remove('active')
  }
}

const getTextArea = entryId => document.getElementById(`${entryId}-feedback-textarea`)

const clearActive = emojis => emojis.forEach(emoji => removeActive(emoji))

const showById = id => {
  const feedBackForm = document.getElementById(id)
  feedBackForm.style.display = 'block'
}

const hideById = id => {
  const feedBackForm = document.getElementById(id)
  feedBackForm.style.display = 'none'
}

const getEmojisFromDOM = (entryId, emojis) =>
  emojis.map(({ emotion }) => document.getElementById(`${entryId}-${emotion}`))

const setTextAreaMaxLength = (entryId, chars) => (document.getElementById(`${entryId}-maxlength-enforcer`).innerHTML = `<span>${chars}</span>/500`)

export {
  clearActive,
  showById,
  hideById,
  getEmojisFromDOM,
  getTextArea,
  setTextAreaMaxLength
}
