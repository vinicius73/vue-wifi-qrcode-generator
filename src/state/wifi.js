import { reactive, readonly } from 'vue'

const state = reactive({
  ssid: 'my ssid',
  password: 'my password',
  type: 'WPA'
})

const setState = newState => {
  Object.assign(state, newState)
}

const useState = () => {
  return { state: readonly(state), setState }
}

export { useState }
