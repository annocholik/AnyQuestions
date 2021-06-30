class AnyQuestions {
  constructor ({states, startState, options} = {}) {
    if((!states) || (typeof states !== 'object') || (Object.keys(states).length === 0)) {
      throw new Error("[AnyQuestions] 'states' parameter should be provided and should contain states as keys!")
    }
    if ((!startState) || (typeof startState !== 'string') || (!states[startState])) {
      throw new Error("[AnyQuestions] 'startState' parameter should be provided and be included as key in 'states'!")
    }

    this.states = states
    this.startState = startState
    this.options = options || {}

    if (this.options.startOnCreate) {
      this.start()
    }
  }

  start() {
    this.mainResponseHandler = (value) => {
      if (value === '\u0003') {
        return this.stop()
      }

      this.onResponse(value)
    }

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', this.mainResponseHandler);

    this.changeState(this.startState)
  }

  stop() {
    process.stdin.removeListener('data', this.mainResponseHandler)
    process.stdin.pause()
  }

  onResponse(value) {
    if (this.actualStateType.handler({value, state: this.actualState})) {
      this.actualState.endState ? this.actualState.endState({answer: this.actualState.answer, state: this.actualState}) : undefined
      this.actualState.nextState ? this.changeState(this.actualState.nextState) : this.stop()
    }
  }

  changeState(stateName) {
    this.actualState = this.states[stateName]
    this.actualStateType = AnyQuestions.types[this.actualState.type]

    if (!this.actualState.clearOnChangeState) {
      console.clear()
    }

    this.actualStateType.setup({state: this.actualState})
  }
}

module.exports = { AnyQuestions }