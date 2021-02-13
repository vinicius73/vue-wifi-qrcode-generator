<script lang="ts">
import { ref } from 'vue'
import { start, MESSAGES, EventHandler } from './lib/cast/receiver'
import { useWifi } from './state/wifi'
import { QRCodeData } from './lib/qr-code'
import QRCode, { QualityTypes } from './components/QRCode.vue'
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import WifiInfo from './components/WifiInfo.vue'

const parseEvent = async (raw: string): Promise<QRCodeData> => {
  return JSON.parse(atob(raw))
}

export default {
  name: 'CastApp',
  components: { PageHeader, PageFooter, WifiInfo, QRCode },
  setup () {
    const ready = ref(false)
    const { state, setState } = useWifi()

    const onChange: EventHandler<{ raw: string }> = async ({ data }) => {
      try {
        setState(
          await parseEvent(data.raw)
        )
        ready.value = true
      } catch (err) {
        console.warn(err);
      }
    }

    start({
      [MESSAGES.QR_CHANGE]: onChange
    })

    return {
      quality: QualityTypes.MEDIUM,
      ready,
      state
    }
  }
}
</script>

<template>
  <div id="app">
    <PageHeader />
    <main v-if="ready" id="page-main" class="container">
      <WifiInfo>
        <template #footer>
          github.com/vinicius73
        </template>
      </WifiInfo>
      <section class="box">
        <QRCode v-bind="{ quality }" />
      </section>
    </main>
    <main v-else>
      <p>
        Waiting...
      </p>
    </main>
  </div>
</template>