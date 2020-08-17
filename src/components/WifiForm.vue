<script>
import { watchEffect } from 'vue'
import { useWifi } from '../state/wifi'

export default {
  name: 'WifiInfo',
  setup () {
    const { state, setState } = useWifi()
    const onChange = ev => {
      const { name, value } = ev.target

      setState({
        [name]: value
      })
    }

    watchEffect(() => {
      if (state.type === 'nopass') {
        setState({
          password: ''
        })
      }
    })

    return {
      state,
      onChange
    }
  }
}
</script>

<template>
  <form @submit.prevent="" autocomplete="off" class="box">
    <div class="mb-4">
      <label for="input-ssid">
        Network name
      </label>
      <input
        :value="state.ssid"
        @input="onChange"
        name="ssid"
        id="input-ssid"
        type="text"
        placeholder="SSID">
    </div>

    <div v-if="state.type !== 'nopass'" class="mb-4">
      <label for="input-password">
        Password
      </label>
      <input
        :value="state.password"
        @input="onChange"
        name="password"
        id="input-password"
        type="text"
        placeholder="Password">
    </div>

    <div class="mb-4">
      <label for="select-type">
        Security Type
      </label>
      <div class="relative">
        <select
          name="type"
          id="select-type"
          @change="onChange"
          :value="state.type">
          <option value="WEP">WEP</option>
          <option value="WPA">WPA</option>
          <option value="WPA2-EAP">WPA2-EAP</option>
          <option value="nopass">nopass</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </form>
</template>
