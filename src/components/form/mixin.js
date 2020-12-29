import { computed } from 'vue'
import { random } from '../../lib/strings'
import { isEmpty } from 'lodash-es'

const mixin = {
  props: {
    label: String,
    value: String,
    name: String,
    placeholder: String,
    id: {
      type: String,
      default: () => `input-${random()}`
    }
  },
  emits: ['input', 'change'],
  change: ['change']
}

const useInputProps = (props, { emit }) => {
  const label = computed(() => {
    const { label } = props

    return isEmpty(label) ? false : label
  })

  const name = computed(() => {
    return props.name || props.id
  })

  const on = name => event => {
    emit(name, event)
  }

  return {
    label,
    name,
    id: props.id,
    value: computed(() => props.value),
    placeholder: computed(() => props.placeholder),
    onInput: on('input'),
    onChange: on('change')
  }
}

export { mixin, useInputProps }
