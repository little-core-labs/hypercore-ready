const hypercore = require('hypercore')
const ready = require('./')
const test = require('tape')
const ram = require('random-access-memory')

const array = (size) => Array(size).fill(undefined)

test('ready(...hypercores[, callback(err, pending, total])', (t) => {
  const count = 16
  const hypercores = array(count).map(() => hypercore(ram))
  ready(...hypercores, (err, pending, total) => {
    t.ok(null === err)
    t.ok(0 === pending)
    t.ok(count === total)
    t.end()
  })
})
