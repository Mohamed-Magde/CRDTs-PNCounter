'use strict'

exports.deepEqual = (A, B) => {
  const propsA = Object.getOwnPropertyNames(a)
  const propsB = Object.getOwnPropertyNames(b)
  if (propsA.length != propsB.length) {
    return false
  }

  for (let i = 0; i < propsA.length; i++) {
    const elem = propsA[i]

    if (a[elem] != b[elem]) {
      return false
    }
  }
  return true
}
