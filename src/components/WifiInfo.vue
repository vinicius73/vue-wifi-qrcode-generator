<script>
import { reactive, watchEffect } from 'vue'

export default {
  name: 'WifiInfo',
  props: {
    ssid: String,
    password: String,
    type: String,
  },
  emits: ['change'],
  setup (props, { emit }) {
    const onChange = ev => {
      const {name, value} = ev.target

      emit(`update:${name}`, value)
    }

    watchEffect(() => {
      if (props.type === 'nopass') {
        emit(`update:password`, '')
      }
    })

    return {
      props,
      onChange
    }
  }
}
</script>

<template>
  <form @submit.prevent="" autocomplete="off" class="box">
    <div class="mb-4">
      <input
        :value="props.ssid"
        @input="onChange"
        name="ssid"
        id="input-ssid"
        type="text"
        placeholder="Network name">
    </div>

    <div v-if="props.type !== 'nopass'" class="mb-4">
      <input
        :value="props.password"
        @input="onChange"
        name="password"
        id="input-password"
        type="text"
        placeholder="Password">
    </div>

    <div class="mb-4 relative">
      <select
        name="type"
        id="select-type"
        @change="onChange"
        :value="props.type">
        <option value="WEP">WEP</option>
        <option value="WPA">WPA</option>
        <option value="WPA2-EAP">WPA2-EAP</option>
        <option value="nopass">nopass</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </form>
</template>
