<template>
  <div id="app">
    <PageHeader />
    <div class="container">
      <div class="grid grid-cols-2 gap-4">
        <WifiForm />
        <WifiInfo
          class="row-span-2">
          <QRCode />
        </WifiInfo>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import WifiForm from './components/WifiForm.vue'
import QRCode from './components/QRCode.vue'
import WifiInfo from './components/WifiInfo.vue'

export default {
  name: 'App',
  components: { WifiForm, QRCode, WifiInfo, PageHeader }
}
</script>
