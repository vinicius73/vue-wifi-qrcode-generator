<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useWifi } from '../state/wifi'
import { useQRCode, QualityTypes } from '../state/qr-code'
import { buildQRCodeData } from '../lib/qr-code'
import IconWifi from './icons/Wifi.vue'
import IconPrinter from './icons/Printer.vue'
import IconShare from './icons/Share.vue'

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
  components: { IconWifi, IconPrinter, IconShare },
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
  <section class="box">
    <header class="flex justify-center">
      <IconWifi />
    </header>
    <slot />
    <hr>
    <div class="box-main">
      <slot name="main" />
    </div>
    <dl>
      <dt>Network</dt>
      <dd>{{ state.ssid }}</dd>

      <dt>Type</dt>
      <dd>{{ state.type }}</dd>

      <dt>Password</dt>
      <dd>{{ state.password }}</dd>
    </dl>
    <slot name="footer" />
  </section>
</template>

<style scoped>
dl dt {
  font-weight: normal;
  font-style: italic;
}
dl dd {
  font-weight: bold;
  font-size: 1.5em;
  font-family: monospace;
  margin-bottom: 0.8em;
  padding-left: 0.9em;
}
.action-buttons button {
  margin-right: 0.5em;
}
.action-buttons button:last-child {
  margin-right: 0;
}
.box-main {
  float: right;
}
</style>
