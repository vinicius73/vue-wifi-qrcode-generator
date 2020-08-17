<script>
import { watchEffect } from 'vue'
import { useWifi } from '../state/wifi'
import FormInput from './form/Input.vue'
import FormSelect from './form/Select.vue'

export default {
  name: 'WifiInfo',
  components: { FormInput, FormSelect },
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
      ...state,
      onChange
    }
  }
}
</script>

<template>
  <form @submit.prevent="" autocomplete="off" class="box">
    <FormInput
      @input="onChange"
      :value="ssid"
      class="mb-4"
      name="ssid"
      label="Network name"
      placeholder="SSID" />

    <FormInput
      v-if="type !== 'nopass'"
      @input="onChange"
      :value="password"
      class="mb-4"
      name="password"
      label="Password"
      placeholder="Password" />

    <FormSelect
      @change="onChange"
      name="type"
      :value="type"
      :options="['WEP', 'WPA', 'WPA2-EAP', 'nopass']" />
  </form>
</template>
