<template>
  <div id="app">
    <PageHeader />
    <main id="page-main" class="container">
      <div class="wifi-form">
        <WifiForm />
        <div class="version-text">
          <a href="https://github.com/vinicius73/vue-wifi-qrcode-generator" target="_blank">v1.0.0</a>
        </div>
      </div>
      <WifiInfo
        class="wifi-info">
        <QRCode />
      </WifiInfo>
    </main>
    <PageFooter />
  </div>
</template>

<script>
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import WifiForm from './components/WifiForm.vue'
import QRCode from './components/QRCode.vue'
import WifiInfo from './components/WifiInfo.vue'

export default {
  name: 'App',
  components: { WifiForm, QRCode, WifiInfo, PageHeader, PageFooter }
}
</script>
