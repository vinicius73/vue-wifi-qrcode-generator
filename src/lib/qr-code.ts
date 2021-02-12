const specials = [';', ':', ',', '"', '\'', '\\']

enum ConnectionType {
  WEP = 'WEP',
  WPA = 'WPA',
  'WPA2-EAP' = 'WPA2-EAP',
  nopass = 'nopass'
}

type QRCodeData = {
  type: ConnectionType,
  ssid: string,
  password: string
}

const escape = (value: string) => {
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

const buildQRCodeData = ({ type, ssid, password }: QRCodeData) => {
  return `WIFI:T:${type};S:${escape(ssid)};P:${escape(password)};;`
}

export { buildQRCodeData, QRCodeData, ConnectionType }
