import { isFunction } from 'lodash-es'
/**
 * @type Function
 * @param {Function}
 * @returns {void}
 */
const subscribe: <R = any>(cb: () => R) => R = ((w) => {
  // @ts-ignore
  if (isFunction(w.requestIdleCallback)) {
    // @ts-ignore
    return w.requestIdleCallback.bind(w)
  }

  if (isFunction(w.requestAnimationFrame)) {
    return w.requestAnimationFrame.bind(w)
  }

  return function _setTimeout (fn: <R>() => R) {
    return setTimeout(fn, 1)
  }
})(window)

/**
 * @param {Function} fn
 * @returns {Promise<any>}
 */
const onIdle = <R = void>(fn: () => R | Promise<R>): Promise<R> => {
  return new Promise(resolve => {
    subscribe(() => resolve(fn && fn()))
  })
}

export { onIdle }
