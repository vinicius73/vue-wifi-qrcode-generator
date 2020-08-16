const specials = [';', ':', ',', '"', '\'', '\\']

const escape = (value) => {
  return (value || '')
    .split('')
    .map(char => {
      if (specials.includes(char)) {
        return `\\${char}`
      }

      return char
    })
    .join('')
}

const buildQRCodeData = ({ type, ssid, password }) => {
  return `WIFI:T:${type};S:${escape(ssid)};P:${escape(password)};;`
}

export { buildQRCodeData }
