import { computed, ComponentOptionsMixin, SetupContext } from 'vue'
import { random } from '../../lib/strings'
import { isEmpty } from 'lodash-es'

interface MixinProps {
  label: string,
  value: string,
  name: string,
  placeholder: string,
  id: string,
}

const mixin: ComponentOptionsMixin = {
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

const useInputProps = (props: MixinProps, { emit }: SetupContext) => {
  const label = computed(() => {
    const { label } = props

    return isEmpty(label) ? false : label
  })

  const name = computed(() => {
    return props.name || props.id
  })

  const on = (name: string) => (event: Event) => {
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

export {
  mixin,
  useInputProps,
  MixinProps
}
