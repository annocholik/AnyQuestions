const assert = require('assert')

const { AnyQuestions } = require('../lib/index')
const { ConsoleFake } = require('./tools/consoleFake')

describe('AnyQuestions', () => {
  function getStates() {
    return {
      firstState: {
        type: 'ownAnwserQuestion',
        question: 'firstState Question',
        nextState: 'secondState',
      },
      secondState: {
        type: 'ownAnwserQuestion',
        question: 'secondState Question',
      }
    }
  }

  describe('AnyQuestions constructor', () => {
    it("Should throw error if 'startState' parameter is missing in constructor", () => {
      let error = undefined
      try {
        new AnyQuestions({states: getStates()})
      }
      catch(e) {
        error = e
      }
      assert.ok(error)
      assert.strictEqual(error.message, "[AnyQuestions] 'startState' parameter should be provided and be included as key in 'states'!")
    })
  
    it("Should throw error if 'startState' parameter included as key in 'states'", () => {
      let error = undefined
      try {
        new AnyQuestions({states: getStates(), startState: 'missing_state'})
      }
      catch(e) {
        error = e
      }
      assert.ok(error)
      assert.strictEqual(error.message, "[AnyQuestions] 'startState' parameter should be provided and be included as key in 'states'!")
    })
  
    it("Should throw error if 'startState' parameter isn't a string", () => {
      let error = undefined
      try {
        new AnyQuestions({states: getStates(), startState: 1})
      }
      catch(e) {
        error = e
      }
      assert.ok(error)
      assert.strictEqual(error.message, "[AnyQuestions] 'startState' parameter should be provided and be included as key in 'states'!")
    })
  
    it("Should throw error if 'states' parameter is missing", () => {
      let error = undefined
      try {
        new AnyQuestions({})
      }
      catch(e) {
        error = e
      }
      assert.ok(error)
      assert.strictEqual(error.message, "[AnyQuestions] 'states' parameter should be provided and should contain states as keys!")
    })
  
    it("Should throw error if 'states' parameter hasn't any keys", () => {
      let error = undefined
      try {
        new AnyQuestions({states: {}})
      }
      catch(e) {
        error = e
      }
      assert.ok(error)
      assert.strictEqual(error.message, "[AnyQuestions] 'states' parameter should be provided and should contain states as keys!")
    })
  
    it("Should throw error if 'states' parameter isn't a object", () => {
      let error = undefined
      try {
        new AnyQuestions({states: 'string'})
      }
      catch(e) {
        error = e
      }
      assert.ok(error)
      assert.strictEqual(error.message, "[AnyQuestions] 'states' parameter should be provided and should contain states as keys!")
    })
  
    it("Should start if flag 'options.startOnCreate' is set to true", () => {
      const consoleFake = new ConsoleFake()
      let error = undefined
      try {
        consoleFake.start(() => {
          new AnyQuestions({states: getStates(), startState: 'firstState', options: {startOnCreate: true}})
          consoleFake.writeToConsole('\u0003')
        })
      }
      catch(e) {
        error = e
      }
      assert.ifError(error)
      assert.strictEqual(consoleFake.buffor.length, 1)
      assert.strictEqual(consoleFake.buffor[0], 'firstState Question')
    })
  })

  describe('AnyQuestions flow', () => {
    it("Should move from 'firstStage' question to 'secondState' question after answer", () => {
      const consoleFake = new ConsoleFake()
      let error = undefined
      try {
        consoleFake.start(() => {
          new AnyQuestions({states: getStates(), startState: 'firstState', options: {startOnCreate: true}})
          consoleFake.writeToConsole('answer')
          consoleFake.writeToConsole('\u0003')
        })
      }
      catch(e) {
        error = e
      }
      assert.ifError(error)
      assert.strictEqual(consoleFake.buffor.length, 2)
      assert.strictEqual(consoleFake.buffor[0], 'firstState Question')
      assert.strictEqual(consoleFake.buffor[1], 'secondState Question')
    })
    
    it("Should stop when 'nextState' isn't set", () => {
      const consoleFake = new ConsoleFake()
      let error = undefined
      try {
        consoleFake.start(() => {
          new AnyQuestions({states: getStates(), startState: 'firstState', options: {startOnCreate: true}})
          consoleFake.writeToConsole('answer')
          consoleFake.writeToConsole('answer')
        })
      }
      catch(e) {
        error = e
      }
      assert.ifError(error)
      assert.strictEqual(consoleFake.buffor.length, 2)
      assert.strictEqual(consoleFake.buffor[0], 'firstState Question')
      assert.strictEqual(consoleFake.buffor[1], 'secondState Question')
    })

    
    
    it("Should run 'endState' function if is set", () => {
      let isEndStateFunctionInvoked = false
      function endStateFunction() {
        isEndStateFunctionInvoked = true
      }

      const states = getStates()
      const consoleFake = new ConsoleFake()
      let error = undefined
      try {
        consoleFake.start(() => {
          states.firstState.endState = endStateFunction

          new AnyQuestions({states, startState: 'firstState', options: {startOnCreate: true}})
          consoleFake.writeToConsole('answer')
          consoleFake.writeToConsole('answer')
        })
      }
      catch(e) {
        error = e
      }
      assert.ifError(error)
      assert.strictEqual(consoleFake.buffor.length, 2)
      assert.strictEqual(consoleFake.buffor[0], 'firstState Question')
      assert.strictEqual(consoleFake.buffor[1], 'secondState Question')
      assert.ok(isEndStateFunctionInvoked)
    })
  })
})