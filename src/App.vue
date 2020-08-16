<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 gap-4">
      <WifiForm />
      <QRCode class="row-span-2" v-bind="state.wifi" />
      <pre>{{state}}</pre>
    </div>
  </div>
</template>

<script>
import WifiForm from './components/WifiForm.vue'
import QRCode from './components/QRCode.vue'
import { useWifi } from './state/wifi'

export default {
  name: 'App',
  components: { WifiForm, QRCode },
  setup () {
    const { state } = useWifi()

    return {
      state
    }
  }
}
</script>
