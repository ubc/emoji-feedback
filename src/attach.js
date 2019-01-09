const createWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'wrapper'
  return wrapper
}

const createText = text => {
  const p = document.createElement('p')
  p.innerHTML = text
  return p
}

const createButtonWithId = id => {
  const button = document.createElement('div')
  button.id = id
  button.className = 'button'
  return button
}

const attachFeedback = id => {
  const entry = document.getElementById(id)

  const wrapper = createWrapper()
  const introText = createText('How do you feel about this graph?')
  wrapper
    .appendChild(introText)
}

export default attachFeedback
