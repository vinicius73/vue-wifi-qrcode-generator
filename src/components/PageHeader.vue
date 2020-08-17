<script>
import IconQRCode from './icons/QRCode.vue'

export default {
  name: 'PageHeader',
  components: { IconQRCode }
}
</script>

<template>
  <header class="page-header">
    <div class="container">
      <div class="flex items-center justify-center">
        <IconQRCode color="#34495E" class="logo" />
        <h1>Wi-Fi QR Code Generator</h1>
      </div>
    </div>
  </header>
</template>
