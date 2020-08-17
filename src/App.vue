<template>
  <div id="app">
    <PageHeader />
    <main id="page-main" class="container">
      <WifiForm class="wifi-form" />
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
