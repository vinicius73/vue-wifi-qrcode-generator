<script>
import { readonly, watchEffect } from 'vue'
import { useWifi } from '../state/wifi'
import { useHash, getCurrent } from '../state/hash'
import FormInput from './form/Input.vue'
import FormSelect from './form/Select.vue'

const HASH_PREFIX = 'wifi::'

export default {
  name: 'WifiInfo',
  components: { FormInput, FormSelect },
  setup () {
    const { state, setState } = useWifi(
      getCurrent(HASH_PREFIX)
    )

    useHash(HASH_PREFIX, () => ({ ...state }))

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
      state: readonly(state),
      onChange
    }
  }
}
</script>

<template>
  <form @submit.prevent="" autocomplete="off" class="box">
    <FormInput
      @input="onChange"
      :value="state.ssid"
      class="mb-4"
      name="ssid"
      label="Network name"
      placeholder="SSID" />

    <FormInput
      v-if="state.type !== 'nopass'"
      @input="onChange"
      :value="state.password"
      class="mb-4"
      name="password"
      label="Password"
      placeholder="Password" />

    <FormSelect
      @change="onChange"
      name="type"
      :value="state.type"
      :options="['WEP', 'WPA', 'WPA2-EAP', 'nopass']" />
  </form>
</template>
