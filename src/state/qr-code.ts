import QRCode from 'qrcode'
import { debounce } from 'lodash-es'
import { onIdle } from '../lib/on-idle'

import {
  readonly,
  ref,
  computed,
  watchEffect,
  onMounted
} from 'vue'

export enum QualityTypes {
  HIGH = 'H',
  MEDIUM = 'M',
  LOW = 'L'
}

const useQRCode = (getter: () => string, quality: QualityTypes) => {
  const raw = computed(getter)
  const src = ref('')

  const updateQrCode = debounce((text: string) => {
    onIdle(async () => {
      src.value = await QRCode.toDataURL(
        text,
        {
          errorCorrectionLevel: quality,
          margin: 2,
          scale: 50
        }
      )
    })
    .catch(console.warn)

  }, 600)

  onMounted(() => {
    watchEffect(() => {
      updateQrCode(raw.value)
    })
  })

  return {
    src: readonly(src),
    raw
  }
}

export { useQRCode }
