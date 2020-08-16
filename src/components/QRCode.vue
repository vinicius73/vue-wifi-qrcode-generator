<script>
import QRCode from 'qrcode'
import { ref, computed, watchEffect, onMounted } from 'vue'
import { debounce } from 'lodash-es'
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

    const updateQrCode = debounce(async text => {
      imageSrc.value = await QRCode.toDataURL(
        text,
        {
          errorCorrectionLevel: 'H',
          margin: 2,
          scale: 50,
        }
      )
    }, 500)

    onMounted(() => {
      watchEffect(() => {
        updateQrCode(raw.value)
      })
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
