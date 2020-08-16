<script>
import { reactive } from 'vue'

export default {
  name: 'QRCode',
  setup () {
    const state = reactive({})

    return {
      state
    }
  }
}
</script>

<template>
  <div class="box">
    code
  </div>
</template>
