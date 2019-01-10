const removeActive = emoji => {
  if (emoji.classList.contains('active')) {
    emoji.classList.remove('active')
  }
}

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

export {
  clearActive,
  showById,
  hideById,
  getEmojisFromDOM
}
