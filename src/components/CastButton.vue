<script lang="ts">
import { computed, defineComponent, watchEffect } from 'vue'
import { MESSAGES } from '../lib/cast/types'
import { useSender } from '../state/cast-sender'

export default defineComponent({
  name: 'CastButton',
  props: {
    state: Object
  },
  setup (props) {
    const data = computed(() => btoa(JSON.stringify(props.state)))

    const { isConnected, status, sendMessage } = useSender()

    watchEffect(() => {
      console.log({isConnected}, isConnected.value);

      if (!isConnected.value || status.value === null) {
        return
      }

      sendMessage(MESSAGES.QR_CHANGE, { raw: data.value })
    })
  }
})
</script>

<template>
  <google-cast-launcher></google-cast-launcher>
</template>