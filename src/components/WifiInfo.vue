<script>
import { reactive } from 'vue'

export default {
  name: 'WifiInfo',
  props: {
    ssid: String,
    password: String,
  },
  emits: ['change'],
  setup (props, { emit }) {
    const onChange = ev => {
      const {name, value} = ev.target

      emit(`update:${name}`, value)
    }

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

    <div class="mb-4">
      <input
        :value="props.password"
        @input="onChange"
        name="password"
        id="input-password"
        type="text"
        placeholder="Password">
    </div>
  </form>
</template>
