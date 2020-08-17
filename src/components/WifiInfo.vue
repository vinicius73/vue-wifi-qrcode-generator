<script>
import { useWifi } from '../state/wifi'
import IconWifi from './icons/Wifi.vue'
import IconPrinter from './icons/Printer.vue'

export default {
  name: 'wifi-info',
  components: { IconWifi, IconPrinter },
  setup () {
    const { state } = useWifi()
    const print = () => {
      window.print()
    }

    return {
      print,
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
    <div class="hide-on-print text-center">
      <hr class="border-vue-green">
      <button @click="print">
        <IconPrinter />
        Print your QR Code
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
</style>
