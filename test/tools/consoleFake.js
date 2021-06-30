class ConsoleFake {
  constructor({options} = {}) {
    this.orginalConsole = console
    this.buffor = []
    this.options = options || {}
  }

  start(cb) {
    console = this
    try {
      cb()
    } catch(e) {
      console = this.orginalConsole
      throw e
    }
    console = this.orginalConsole
  }

  clear() {}

  log(text) {
    this.buffor.push(text)

    if (this.options.showOnConsole) {
      this.orginalConsole.log(text)
    }
  }

  writeToConsole(text) {
    process.stdin.emit('data', text)
  }
}

module.exports = { ConsoleFake }