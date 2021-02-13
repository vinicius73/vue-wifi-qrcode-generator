<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useWifi } from '../state/wifi'
import { useQRCode, QualityTypes } from '../state/qr-code'
import { buildQRCodeData } from '../lib/qr-code'
import IconWifi from './icons/Wifi.vue'
import IconPrinter from './icons/Printer.vue'
import IconShare from './icons/Share.vue'
import CastButton from './CastButton.vue'

const getFile = async (src: string) => {
  const blob = await fetch(src).then((r) => r.blob())

  return new File([blob], 'wifi.png', {
    type: 'image/png'
  })
}

const sharePage = async (src: string) => {
  const file = await getFile(src)

  const description: string = document
    .querySelector<HTMLMetaElement>('meta[name="description"]')?.content || 'Vue Wi-Fi QR Code Generator'

  return navigator.share({
    title: document.title,
    text: description,
    url: window.location.href,
    // @ts-ignore
    files: [file]
  })
}

export default defineComponent({
  name: 'wifi-info',
  components: { IconWifi, IconPrinter, IconShare, CastButton },
  setup () {
    const { state } = useWifi()

    const shareError = ref(null)

    const { src: imageSrc } = useQRCode(() => buildQRCodeData(state), QualityTypes.HIGH)

    const print = () => {
      window.print()
    }

    const share = () => {
      shareError.value = null

      sharePage(imageSrc.value)
        .then(() => {
          console.log('Shared')
        })
        .catch(err => {
          shareError.value = err.message
          console.warn(err)
        })
    }

    return {
      print,
      shareError,
      supportShare: !!navigator.share,
      share: share,
      state
    }
  }
})
</script>

<template>
  <div class="hide-on-print action-buttons text-center">
    <hr class="border-vue-green">

    <!-- <CastButton /> -->

    <button @click="print">
      <IconPrinter />
      Print your QR Code
    </button>

    <button
      :class="{ error: !!shareError }"
      v-if="supportShare"
      @click="share">
      <IconShare />
      {{ shareError ? shareError : 'Share' }}
    </button>
  </div>
</template>

<style scoped>
.action-buttons button {
  margin-right: 0.5em;
}
.action-buttons button:last-child {
  margin-right: 0;
}
</style>
