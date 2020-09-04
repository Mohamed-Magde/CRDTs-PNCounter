'use strict'

const { deepEqual } = require('./deepEqual')
const sum = (acc, val) => acc + val

class GCounter {
  constructor(id, counter) {
    this.id = id
    this._counters = counter ? counter : {}
    this._counters[this.id] = this._counters[this.id]
      ? this._counters[this.id]
      : 0
  }

  get value() {
    return Object.values(this._counters).reduce(sum, 0)
  }

  increment(val) {
    if (val && val < 1) {
      return null
    }
    if (val === undefined || val === null) {
      val = 1
    }

    this._counters[this.id] = this._counters[this.id] + val
  }

  merge(other) {
    Object.entries(other._counters).forEach(([id, value]) => {
      this._counters[id] = Math.max(this._counters[id] || 0, value)
    })
  }

  toJSON() {
    return {
      id: this.id,
      counters: this._counters,
    }
  }

  isEqual(other) {
    return GCounter.isEqual(this, other)
  }

  static from(json) {
    return new GCounter(json.id, json.counters)
  }

  static isEqual(a, b) {
    if (a.id !== b.id) return false

    return deepEqual(a._counters, b._counters)
  }
}

module.exports = GCounter
