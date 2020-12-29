import { isFunction } from 'lodash-es'
/**
 * @type Function
 * @param {Function}
 * @returns {void}
 */
const subscribe = ((w) => {
  if (isFunction(w.requestIdleCallback)) {
    return w.requestIdleCallback.bind(w)
  }

  if (isFunction(w.requestAnimationFrame)) {
    return w.requestAnimationFrame.bind(w)
  }

  return function _setTimeout (fn) {
    return setTimeout(fn, 1)
  }
})(window)

/**
 * @param {Function} fn
 * @returns {Promise<any>}
 */
const onIdle = (fn) => {
  return new Promise(resolve => {
    subscribe(() => {
      resolve(fn && fn())
    })
  })
}

export { onIdle }
