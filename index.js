const Batch = require('batch')

const noop = () => void 0

ready.concurrency = Infinity

function ready(...hypercores) {
  const queue = new Set()
  const batch = new Batch().concurrency(ready.concurrency)

  let callback = null
  let pending = 0
  let total = 0

  if (Symbol.iterator in hypercores[0]) {
    if ('function' === typeof hypercores[1]) {
      callback = hypercores[1]
    }

    hypercores = Array.from(hypercores[0])
  }

  for (const hypercore of hypercores) {
    if (null !== hypercore && 'function' === typeof hypercore.ready) {
      queue.add(hypercore)
    }

    if (null === callback && 'function' === typeof hypercore) {
      callback = hypercore
      break
    }
  }

  for (const hypercore of queue) {
    batch.push((next) => {
      const onerror = (err) => next(err)
      ++pending && ++total
      hypercore.once('error', onerror)
      hypercore.ready((err) => {
        --pending
        hypercore.removeListener('error', onerror)
        next(err)
      })
    })
  }

  return new Promise((resolve, reject) => {
    batch.end((err) => {
      const onend = callback || noop

      if (err) {
        reject(err)
      } else {
        resolve({ pending, total })
      }

      return onend(err, pending, total)
    })
  })
}

module.exports = ready
