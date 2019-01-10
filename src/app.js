/* global fetch */
import attachMarkupToElementID from './setup'
import { formTextAreaSetup, createFormHandler } from './form'
import {
  clearActive,
  showById,
  hideById,
  getEmojisFromDOM
} from './util'

const controller = () => {
  const state = {
    selectedEmojiIds: [],
    endpoints: {
      emoji: '',
      form: '',
      votes: ''
    },
    entryId: ''
  }

  const update = emojis => {
    clearActive(emojis)
    state.selectedEmojiIds.forEach(emojiId =>
      emojis.find(e => e.id === emojiId).classList.add('active')
    )
    if (state.selectedEmojiIds.length > 0) {
      showById(`${state.entryId}-feedback-form`)
      submitSelectedEmojis(state.selectedEmojiIds)
      formTextAreaSetup(state.entryId)
    } else {
      hideById(`${state.entryId}-feedback-form`)
    }
  }

  const setSelection = emoji => {
    if (state.selectedEmojiIds.includes(emoji.id)) {
      state.selectedEmojiIds = state.selectedEmojiIds.filter(e => e !== emoji.id)
    } else {
      state.selectedEmojiIds.push(emoji.id)
    }
  }

  const setEndpoints = ({ emojiEndpoint, formEndpoint, votesEndpoint }) => {
    state.endpoints.emoji = emojiEndpoint
    state.endpoints.form = formEndpoint
    state.endpoints.votes = votesEndpoint
  }

  const submitSelectedEmojis = selectedEmojiIds => {
    return fetch(state.endpoints.emoji, {
      method: 'POST',
      body: JSON.stringify(selectedEmojiIds),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const setEntryId = entryId => (state.entryId = entryId)

  return {
    init: ({ entryId, emojis, endpoints }) => {
      attachMarkupToElementID(entryId, emojis)
      setEndpoints(endpoints)
      setEntryId(entryId)
      createFormHandler(entryId)

      const domEmojis = getEmojisFromDOM(entryId, emojis)
      domEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
          setSelection(emoji)
          update(domEmojis)
        })
      })
    }
  }
}

export default controller
