import { MESSAGES } from './types'

interface CastMessage<T = any> {
  data: T
}

export type EventHandler<T = any> = (event: CastMessage<T>) => any
export type HooksMap = Record<MESSAGES, EventHandler>

const start = (hooks: HooksMap) => {
  // @ts-ignore
  const instance = cast.framework.CastReceiverContext.getInstance()

  Object.entries(hooks)
    .forEach(([ key, callback ]) => {
      instance
        .addCustomMessageListener(key, callback)
    })

  instance.start();

  return instance
}

export {
  MESSAGES,
  start
}