<template>
  <div class="container mx-auto max-w-4xl">
    <div class="grid grid-cols-2 gap-4">
      <WifiForm />
      <WifiInfo
        class="row-span-2">
        <QRCode />
      </WifiInfo>
    </div>
  </div>
</template>

<script>
import WifiForm from './components/WifiForm.vue'
import QRCode from './components/QRCode.vue'
import WifiInfo from './components/WifiInfo.vue'

export default {
  name: 'App',
  components: { WifiForm, QRCode, WifiInfo }
}
</script>
