const specials = [';', ':', ',', '"', `'`, '\\'];

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

export { escape }