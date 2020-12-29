<script>
import { useWifi } from '../state/wifi'
import { useQRCode } from '../state/qr-code'
import { buildQRCodeData } from '../lib/qr-code'
import IconWifi from './icons/Wifi.vue'
import IconPrinter from './icons/Printer.vue'
import IconShare from './icons/Share.vue'
import { ref } from 'vue'

const getFile = async (src) => {
  const blob = await fetch(src).then((r) => r.blob())

  return new File([blob], 'wifi.png', {
    type: 'image/png'
  })
}

const sharePage = async (src) => {
  const file = await getFile(src)

  const description = document
    .querySelector('meta[name="description"]').content

  return navigator.share({
    title: document.title,
    text: description,
    url: window.location.href,
    files: [file]
  })
}

export default {
  name: 'wifi-info',
  components: { IconWifi, IconPrinter, IconShare },
  setup () {
    const { state } = useWifi()

    const shareError = ref(null)

    const { src: imageSrc } = useQRCode(() => buildQRCodeData(state))

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
      share: navigator.share ? share : false,
      state
    }
  }
}
</script>

<template>
  <section class="box">
    <header class="flex justify-center">
      <IconWifi />
    </header>
    <slot />
    <hr>
    <dl>
      <dt>Network</dt>
      <dd>{{ state.ssid }}</dd>

      <dt>Type</dt>
      <dd>{{ state.type }}</dd>

      <dt>Password</dt>
      <dd>{{ state.password }}</dd>
    </dl>
    <div class="hide-on-print action-buttons text-center">
      <hr class="border-vue-green">
      <button @click="print">
        <IconPrinter />
        Print your QR Code
      </button>

      <button
        :class="{ error: !!shareError }"
        v-if="share"
        @click="share">
        <IconShare />
        {{ shareError ? shareError : 'Share' }}
      </button>
    </div>
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
</style>
