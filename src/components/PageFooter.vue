<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'page-footer',
  props: {
    castMode: {
      type: Boolean,
      default: () => false
    }
  }
})
</script>

<template>
  <footer class="page-footer">
    <div v-if="!castMode" class="container">
      By <a href="https://vinicius73.dev" target="_blank">Vinicius73</a>  <br>
      Made with <a href="https://v3.vuejs.org/" target="__blank">Vue.js 3</a>,
      <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> and
      <a href="https://github.com/vitejs/vite" target="_blank">Vite</a>.
    </div>
    <div v-else class="container">
      <p>
        By <a href="https://vinicius73.dev" target="_blank">vinicius73.dev</a>
      </p>
    </div>
  </footer>
</template>
