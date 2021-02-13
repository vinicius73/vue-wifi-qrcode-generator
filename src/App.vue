<template>
  <div id="app">
    <PageHeader />
    <main id="page-main" class="container">
      <div class="wifi-form">
        <WifiForm />
        <div class="version-text">
          <a href="https://github.com/vinicius73/vue-wifi-qrcode-generator" target="_blank">v1.1.2</a>
        </div>
      </div>
      <WifiInfo
        class="wifi-info">
        <QRCode />
        <template #main>
          <CastButton />
        </template>
        <template #footer>
          <WifiInfoActions />
        </template>
      </WifiInfo>
    </main>
    <PageFooter />
  </div>
</template>

<script lang="ts">
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import WifiForm from './components/WifiForm.vue'
import QRCode from './components/QRCode.vue'
import WifiInfo from './components/WifiInfo.vue'
import WifiInfoActions from './components/WifiInfoActions.vue'
import CastButton from './components/CastButton.vue'

export default {
  name: 'App',
  components: {
    WifiForm,
    QRCode,
    CastButton,
    WifiInfo,
    PageHeader,
    PageFooter,
    WifiInfoActions
  }
}
</script>
