import { computed, readonly, ref, watchEffect } from 'vue'
import { debounce, isEmpty } from 'lodash-es'
import { onIdle } from '../lib/on-idle'

const getHash = () => {
  const val = String(window.location.hash)

  return val.startsWith('#')
    ? val.substring(1)
    : val
}

const getCurrent = (prefix: string) => {
  const val = getHash()

  if (isEmpty(val)) {
    return {}
  }

  if (val.startsWith(prefix)) {
    try {
      const json = atob(val.replace(prefix, ''))

      return JSON.parse(json)
    } catch (err) {
      console.warn(err)
      return {}
    }
  }

  return {}
}

const useHash = (prefix: string, getter: () => Record<string, string>) => {
  const raw = computed(getter)

  const hash = ref('')

  const updateHash = debounce(val => {
    onIdle(() => {
      hash.value = btoa(JSON.stringify(val))

      watchEffect(() => {
        window.location.hash = `${prefix}${hash.value}`
      })
    })
  }, 1000)

  watchEffect(() => {
    updateHash({ ...raw.value })
  })

  return {
    hash: readonly(hash)
  }
}

export { useHash, getCurrent }
