hypercore-ready
===============

> Wait for 1 more or more hypercores to be ready.

## Installation

```sh
$ npm install hypercore-ready --save
```

## Usage

```js
const ready = require('hypercore-ready')

ready(...hypercores, (err) => {
  // called when all hypercores are ready
})

## API

### `ready(...hypercores[, callback])`
### `ready(hypercores[, callback])`
### `await ready(hypercores)`

Waits for all given `hypercores` to be ready calling `callback(err,
pending, total)` when all are ready or when an error occurs.

```js
const cores = [ ...hypercores ]

ready(...cores, callback)
// or
ready(cores)
// or
await ready(cores)
```

## License

MIT
