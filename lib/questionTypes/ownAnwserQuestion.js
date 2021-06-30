function handler({value, state}) {
  const answer = value && value.trim()
  if ((answer !== '') || (answer === '' && state.allowEmptyAnwser)) {
    state.answer = {text: answer}
    return true
  }
  return false
}

function setup({state}) {
  process.stdin.setRawMode(false)
  console.log(state.question)
}


module.exports = {
  handler,
  setup,
}