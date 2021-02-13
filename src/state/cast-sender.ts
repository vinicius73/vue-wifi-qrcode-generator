import { ref, watchEffect } from 'vue'
import { loadScript } from '../lib/cast/sender'
import { MESSAGES } from '../lib/cast/types'
import { onIdle } from '../lib/on-idle'
import { debounce } from 'lodash-es'

const useSender = () => {
  const castState        = ref<String | null>(null)
  const sessionState  = ref<String | null>(null)
  const isConnected   = ref(false)

  let instance: cast.framework.CastContext

  loadScript(ctx => {
    instance = ctx

    const { CAST_STATE_CHANGED, SESSION_STATE_CHANGED } = cast.framework.CastContextEventType

    instance.addEventListener(
      CAST_STATE_CHANGED,
      (ev: cast.framework.CastStateEventData) => {
        console.debug(`cast: state ${castState}`)
        castState.value = ev.castState
        isConnected.value = ev.castState === cast.framework.CastState.CONNECTED
      })

    instance.addEventListener(
      SESSION_STATE_CHANGED,
      (ev: cast.framework.SessionStateEventData) => {
        console.debug(`cast: sessionState ${ev.sessionState}`)
        sessionState.value = ev.sessionState
      })
  })

  const sendMessage = debounce((namespace: MESSAGES, data: Record<string, string>) => {
    const session = instance?.getCurrentSession()

    if (!session) {
      console.warn('cast: missin session');
      return
    }

    console.log('cast: sending', namespace)

    onIdle(() => session.sendMessage(namespace, data))
      .catch(console.warn)
  }, 1_000)

  return {
    castState,
    sessionState,
    sendMessage,
    isConnected
  }
}

export {
  useSender
}