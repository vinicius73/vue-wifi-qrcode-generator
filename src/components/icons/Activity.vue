<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'icon-activity',
  props: {
    size: {
      type: Number,
      default: () => 400
    },
    color: {
      type: String,
      default: '#34495E'
    }
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-activity"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 12h4l3 8l4 -16l3 8h4" />
</svg>
</template>