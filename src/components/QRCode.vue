<script>
import { computed } from 'vue'
import { buildQRCodeData } from '../lib/qr-code'
import { useWifi } from '../state/wifi'
import { useQRCode } from '../state/qr-code'

export default {
  name: 'QRCode',
  setup () {
    const { state } = useWifi()

    const imageSrc = useQRCode(() => buildQRCodeData(state))
    const hasImage = computed(() => imageSrc.value.length > 0)

    return {
      imageSrc,
      hasImage
    }
  }
}
</script>

<template>
  <div class="box">
    <img v-if="hasImage" :src="imageSrc">
    <div v-else>
      Loading...
    </div>
  </div>
</template>
