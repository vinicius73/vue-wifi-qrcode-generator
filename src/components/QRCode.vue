<script lang="ts">
import { computed, defineComponent } from 'vue'
import { buildQRCodeData } from '../lib/qr-code'
import { useWifi } from '../state/wifi'
import { useQRCode } from '../state/qr-code'

export default defineComponent({
  name: 'QRCode',
  setup () {
    const { state } = useWifi()

    const { src: imageSrc, raw } = useQRCode(() => buildQRCodeData(state))
    const hasImage = computed(() => imageSrc.value.length > 0)

    return {
      raw,
      imageSrc,
      hasImage
    }
  }
})
</script>

<template>
  <div>
    <img v-if="hasImage"
      :src="imageSrc"
      :alt="raw"
      title="QR Code Image">
    <div v-else>
      Loading...
    </div>
  </div>
</template>
