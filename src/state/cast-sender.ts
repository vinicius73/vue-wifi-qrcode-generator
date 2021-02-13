import { ref, watchEffect } from 'vue'
import { loadScript } from '../lib/cast/sender'
import { MESSAGES } from '../lib/cast/types'
import { onIdle } from '../lib/on-idle'
import { debounce } from 'lodash-es'

const useSender = () => {
  const status = ref<String | null>(null)
  const isConnected = ref(false)

  let instance: cast.framework.CastContext

  loadScript(ctx => {
    instance = ctx

    const { CAST_STATE_CHANGED } = cast.framework.CastContextEventType

    instance.addEventListener(
      CAST_STATE_CHANGED,
      ({ castState }: cast.framework.CastStateEventData) => {
        console.debug(`cast: state ${castState}`)
        status.value = castState
        isConnected.value = castState === cast.framework.CastState.CONNECTED
      })
  })

  const sendMessage = debounce((namespace: MESSAGES, data: Record<string, string>) => {
    const session = instance?.getCurrentSession()

    if (!session) {
      console.warn('cast: missin session', data);
      return
    }

    console.log('cast: sending', data)

    onIdle(() => session.sendMessage(namespace, data))
      .then(console.log)
      .catch(console.warn)
  }, 1_000)

  return {
    status,
    sendMessage,
    isConnected
  }
}

export {
  useSender
}