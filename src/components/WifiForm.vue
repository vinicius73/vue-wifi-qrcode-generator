<script>
import { watchEffect } from 'vue'
import { useWifi } from '../state/wifi'
import IconArrowUp from './icons/ArrowUp.vue'

export default {
  name: 'WifiInfo',
  components: { IconArrowUp },
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
          <IconArrowUp />
        </div>
      </div>
    </div>
  </form>
</template>
