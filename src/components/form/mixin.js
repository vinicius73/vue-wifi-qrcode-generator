import { random } from '../../lib/strings'

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
  emits: ['input'],
  change: ['change']
}

const useInputProps = (props, { emit }) => {
  const { name, id } = props
  const label = (props.label || name) || ''

  const on = name => event => {
    emit(name, event)
  }

  return {
    ...props,
    onInput: on('input'),
    onChange: on('change'),
    label: label.length > 0 ? label : false,
    name: name || id
  }
}

export { mixin, useInputProps }
