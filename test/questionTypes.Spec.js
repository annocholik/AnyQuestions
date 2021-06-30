const assert = require('assert')

const { AnyQuestions } = require('../lib/index')

describe('Question Type', () => {
  it ('Should load all question types', () => {
    assert.ok(AnyQuestions.types)
    assert.strictEqual(Object.keys(AnyQuestions.types).length, 2)
  })

  describe ("Each type should contain at least 'handler' and 'setup' function", () => {
    Object.entries(AnyQuestions.types).forEach(([key, value]) => {
      it (`Question type: ${key}`, () => {
        assert.ok(value.handler)
        assert.strictEqual(typeof value.handler, 'function')
        assert.ok(value.setup)
        assert.strictEqual(typeof value.setup, 'function')
      })
    })
  })
})