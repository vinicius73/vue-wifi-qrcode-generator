<script lang="ts">
import { mixin, useInputProps, MixinProps } from './mixin'
import IconArrowUp from '../icons/ArrowUp.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormSelect',
  components: { IconArrowUp },
  mixins: [mixin],
  props: {
    options: {
      required: true,
      type: Array as PropType<string[]>,
    }
  },
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
    <div class="relative">
      <select
        name="type"
        v-bind="{ id, value }"
        @change="onChange">
        <option
          v-for="option in options"
          :key="option"
          :value="option">{{ option }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <IconArrowUp />
      </div>
    </div>
  </div>
</template>
