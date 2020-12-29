import QRCode from 'qrcode'
import { debounce } from 'lodash-es'
import { readonly, ref, computed, watchEffect, onMounted } from 'vue'

const useQRCode = (getter, options = {}) => {
  const raw = computed(getter)
  const src = ref('')

  const updateQrCode = debounce(async text => {
    src.value = await QRCode.toDataURL(
      text,
      {
        errorCorrectionLevel: 'H',
        margin: 0,
        scale: 50,
        ...options
      }
    )
  }, 500)

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
