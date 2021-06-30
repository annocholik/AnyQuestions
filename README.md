<h1 align="center">AnyQuestions❓</h1>

It's simple package to create custom menu, by using predefined modules.

## Installation

```
$ npm install any-questions
```

## Usage

```js
const { AnyQuestions } = require('any-questions')

const states = {
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

new AnyQuestions({states, startState: 'firstState'}).start()
```