import { reactive, readonly } from 'vue'

const state = reactive({
  ssid: 'my ssid',
  password: 'my password',
  type: 'WPA'
})

const setState = newState => {
  Object.assign(state, newState)
}

const useWifi = (def) => {
  if (def) {
    setState(def)
  }

  return { state: readonly(state), setState }
}

export { useWifi }
