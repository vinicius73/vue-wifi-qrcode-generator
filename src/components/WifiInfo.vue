<script>
import { useWifi } from '../state/wifi'
import IconWifi from './icons/Wifi.vue'

export default {
  components: { IconWifi },
  setup () {
    const { state } = useWifi()

    return {
      state
    }
  }
}
</script>

<template>
  <section class="box">
    <header class="flex justify-center">
      <IconWifi />
    </header>
    <slot />
    <hr>
    <dl>
      <dt>Network</dt>
      <dd>{{ state.ssid }}</dd>

      <dt>Type</dt>
      <dd>{{ state.type }}</dd>

      <dt>Password</dt>
      <dd>{{ state.password }}</dd>
    </dl>
  </section>
</template>

<style scoped>
dl dt {
  font-weight: normal;
  font-style: italic;
}
dl dd {
  font-weight: bold;
  font-size: 1.5em;
  font-family: monospace;
  margin-bottom: 0.8em;
  padding-left: 0.9em;
}
</style>
