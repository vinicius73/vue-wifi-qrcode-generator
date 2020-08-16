<script>
import { useWifi } from '../state/wifi'

export default {
  setup () {
    const { state } = useWifi()

    return {
      state
    }
  }
}
</script>

<template>
  <div class="box">
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
  </div>
</template>

<style scoped>
dl dt {
  font-weight: normal;
  font-style: italic;
}
dl dd {
  font-weight: bold;
  font-size: 1.2em;
  font-family: monospace;
  margin-bottom: 1em;
}
</style>
