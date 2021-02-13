import { random } from '../strings'

const SENDER_ADDRESS = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
const HOOK_KEY = '__onGCastApiAvailable'
const APPLICATION_ID = import.meta.env.VITE_CAST_APPLICATION_ID
const SCRIPT_ID = random()

const loadScript = (onAvailable: (x: any) => void, onLoad?: () => any) => {

  const script = document.createElement('script')

  script.setAttribute('src', SENDER_ADDRESS)
  script.setAttribute('id', SCRIPT_ID)
  // @ts-ignore
  script.setAttribute('async', true)
  // @ts-ignore
  script.setAttribute('defer', true)

  if (onLoad) {
    script.onload = () => onLoad
  }

  document.head.appendChild(script)

  // @ts-ignore
  window[HOOK_KEY] = function (isAvailable) {
    // @ts-ignore
    window[HOOK_KEY] = null

    if (isAvailable) {
      onAvailable(
        setup()
      );
    }
  };
}

const setup = () => {
  cast.framework.setLoggerLevel(cast.framework.LoggerLevel.DEBUG)

  const instance = cast.framework.CastContext.getInstance()

  instance.setOptions({
    receiverApplicationId: APPLICATION_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });

  return instance
}

export { loadScript, setup }