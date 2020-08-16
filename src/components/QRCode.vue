<script>
import QRCode from 'qrcode'
import { ref, computed, watchEffect } from 'vue'
import { escape } from '../lib/escape'
import { useState as useWifi } from '../state/wifi'

export default {
  name: 'QRCode',
  setup () {
    const {state} = useWifi()
    const imageSrc = ref('')

    const hasImage = computed(() => imageSrc.value.length > 0)
    const raw = computed(() => {
      return `WIFI:T:${state.type};S:${escape(state.ssid)};P:${escape(state.password)};;`
    })

    watchEffect(async () => {
      imageSrc.value = await QRCode.toDataURL(
          raw.value,
          {
            errorCorrectionLevel: 'H',
            margin: 2,
            scale: 50,
          }
        )
    })

    return {
      raw,
      imageSrc,
      hasImage
    }
  }
}
</script>

<template>
  <div class="box">
    <pre>{{raw}}</pre>

    <img v-if="hasImage" :src="imageSrc">
  </div>
</template>
