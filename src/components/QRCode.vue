<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { buildQRCodeData } from '../lib/qr-code'
import { useWifi } from '../state/wifi'
import { useQRCode, QualityTypes } from '../state/qr-code'

export { QualityTypes }

export default defineComponent({
  name: 'QRCode',
  props: {
    quality: {
      type: String as PropType<QualityTypes>,
      default: () => QualityTypes.HIGH
    }
  },
  setup (props) {
    const { state } = useWifi()

    const { src: imageSrc, raw } = useQRCode(() => buildQRCodeData(state), props.quality)
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
