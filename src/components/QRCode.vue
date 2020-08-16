<script>
import { reactive, computed, watch } from 'vue'
import QRCode from 'qrcode'
import { escape } from '../lib/escape'

export default {
  name: 'QRCode',
  props: {
    ssid: String,
    password: String,
  },
  setup (props) {
    const state = reactive({
      loading: true,
      imageSrc: '',
    })

    const hasImage = computed(() => state.imageSrc.length > 0)
    const raw = computed(() => {
      return `WIFI:T:WPA;S:${escape(props.ssid)};P:${escape(props.password)};;`
    })

    watch(
      () => raw.value,
      async (text) => {
        state.loading = true

        state.imageSrc = await QRCode.toDataURL(
          text,
          {
            scale: 20,
          }
        )

        state.loading = false
      },
      {
        immediate: true
      }
    )

    return {
      state,
      raw,
      hasImage
    }
  }
}
</script>

<template>
  <div class="box">
    <div v-if="state.loading">
      Carregando...
    </div>
    <pre>{{raw}}</pre>

    <img v-if="hasImage" :src="state.imageSrc">
  </div>
</template>
