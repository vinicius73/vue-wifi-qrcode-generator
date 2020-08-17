<script>
import { mixin, useInputProps } from './mixin'

export default {
  name: 'FormInput',
  mixins: [mixin],
  setup (props, context) {
    return useInputProps(props, context)
  }
}
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
