<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-2 gap-4">
      <WifiInfo
        v-model:ssid="state.wifi.ssid"
        v-model:password="state.wifi.password"
        v-model:type="state.wifi.type"
       />
      <QRCode class="row-span-2" v-bind="state.wifi" />
      <pre>{{state}}</pre>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import WifiInfo from './components/WifiInfo.vue'
import QRCode from './components/QRCode.vue'

export default {
  name: 'App',
  components: {WifiInfo, QRCode},
  setup () {
    const state = reactive({
      wifi: {
        ssid: 'my ssid',
        password: 'my password',
        type: 'WPA',
      }
    })

    return {
      state
    }
  }
}
</script>
