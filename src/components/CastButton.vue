<script lang="ts">
import { computed, defineComponent, watchEffect, ref } from 'vue'
import { MESSAGES } from '../lib/cast/types'
import { useSender } from '../state/cast-sender'
import { useWifi } from '../state/wifi'

export default defineComponent({
  name: 'CastButton',
  setup (props) {
    const { state } = useWifi()
    const data = computed(() => btoa(JSON.stringify(state)))

    const trigger = ref(0)
    let interval: NodeJS.Timeout

    const {
      isConnected,
      sendMessage,
      sessionState,
      castState
    } = useSender()

    watchEffect(() => {
      {
        clearTimeout(interval)
      }

      // trigger
      if (!isConnected.value || sessionState.value === null || castState.value === null) {
        return
      }

      interval = setTimeout(() => {
        trigger.value = Date.now()
      }, 10_000)

      sendMessage(MESSAGES.QR_CHANGE, { raw: data.value, trigger: String(trigger.value) })
    })
  }
})
</script>

<template>
  <div title="Cast to Google Chrome" class="google-cast-launcher">
    <google-cast-launcher />
  </div>
</template>

<style>
.google-cast-launcher {
  width: 3em;
  cursor: pointer;
}
</style>