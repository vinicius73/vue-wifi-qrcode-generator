<script lang="ts">
import { defineComponent } from 'vue'
import IconQRCode from './icons/QRCode.vue'

export default defineComponent({
  name: 'PageHeader',
  components: { IconQRCode },
  props: {
    castMode: {
      type: Boolean,
      default: () => false
    }
  }
})
</script>

<template>
  <header class="page-header">
    <div class="container">
      <div class="flex items-center justify-center">
        <IconQRCode color="#34495E" class="logo" />
        <h1>Wi-Fi QRCode <span v-if="!castMode">Generator</span></h1>
      </div>
    </div>
  </header>
</template>
