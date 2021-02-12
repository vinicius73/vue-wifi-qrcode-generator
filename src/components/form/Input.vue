<script lang="ts">
import { mixin, useInputProps, MixinProps } from './mixin'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormInput',
  mixins: [mixin],
  setup (props, context) {
    return useInputProps(props as unknown as MixinProps, context)
  }
})
</script>

<template>
  <div>
    <label v-if="label" :for="id">
      {{ label }}
    </label>
    <input
      v-bind="{ name, id, placeholder }"
      :value="value"
      @input="onInput"
      @change="onChange"
      type="text">
  </div>
</template>
