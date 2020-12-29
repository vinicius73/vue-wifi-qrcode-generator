<script>
export default {
  name: 'IconShare',
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M0 0h24v24H0z" stroke="none"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="18" cy="18" r="3"/>
    <path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4"/>
  </svg>
</template>
