function handler({value, state}) {
  if (state.answers[value]) {
    state.answer = {key: value, text: this.actualState.answers[key]}
    return true
  }
  return false
}

function setup({state}) {
  process.stdin.setRawMode(true)
  console.log(state.question)
  Object.entries(state.answers).forEach(([key, value]) => {
    if (key.length !== 1) {
      throw new Error(`Simple Question keys should be exact 1 letter long!`)
    }

    console.log(`${key} - ${value}`)
  })
}


module.exports = {
  handler,
  setup,
}