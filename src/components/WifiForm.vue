<script lang="ts">
import { readonly, watchEffect, defineComponent, computed } from 'vue'
import { ConnectionType } from '../lib/qr-code'
import { useWifi } from '../state/wifi'
import { useHash, getCurrent } from '../state/hash'
import FormInput from './form/Input.vue'
import FormSelect from './form/Select.vue'

const HASH_PREFIX = 'wifi::'

export default defineComponent({
  name: 'WifiInfo',
  components: { FormInput, FormSelect },
  setup () {
    const options = Object.values(ConnectionType)
    const { state, setState } = useWifi(
      getCurrent(HASH_PREFIX)
    )

    const isNopass = computed(() => state.type === ConnectionType.nopass)

    useHash(HASH_PREFIX, () => ({ ...state }))

    const onChange = (ev: UIEvent) => {
      const { name, value } = ev.target as HTMLInputElement

      setState({
        [name]: value
      })
    }

    watchEffect(() => {
      if (isNopass.value) {
        setState({
          password: ''
        })
      }
    })

    return {
      state: readonly(state),
      isNopass,
      options,
      onChange
    }
  }
})
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
      v-if="!isNopass"
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
      :options="options" />
  </form>
</template>
