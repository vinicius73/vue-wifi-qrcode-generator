<script>
export default {
  name: 'icon-qr-code',
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  }
}
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="48" height="48"
    viewBox="0 0 172 172"
    style=" fill:#000000;">
    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
      <path d="M0,172v-172h172v172z" fill="none"></path>
      <g :fill="color">
        <path d="M0,0v64.5h64.5v-64.5zM78.83333,0v14.33333h14.33333v-14.33333zM107.5,0v64.5h64.5v-64.5zM14.33333,14.33333h35.83333v35.83333h-35.83333zM121.83333,14.33333h35.83333v35.83333h-35.83333zM21.5,21.5v21.5h21.5v-21.5zM129,21.5v21.5h21.5v-21.5zM78.83333,28.66667v28.66667h14.33333v-28.66667zM0,71.66667v14.33333h14.33333v-14.33333zM14.33333,86v14.33333h28.66667v-14.33333h14.33333v14.33333h57.33333v-14.33333h14.33333v-14.33333h-35.83333v14.33333h-7.16667v-14.33333h-57.33333v14.33333zM129,86v14.33333h43v-14.33333h-14.33333v-14.33333h-14.33333v14.33333zM0,107.5v64.5h64.5v-64.5zM93.16667,114.66667v14.33333h-14.33333v28.66667h14.33333v-14.33333h14.33333v-14.33333h14.33333v-14.33333zM121.83333,129v14.33333h-14.33333v28.66667h14.33333v-14.33333h14.33333v-14.33333h7.16667v14.33333h-7.16667v14.33333h14.33333v-14.33333h7.16667v-14.33333h14.33333v-28.66667h-35.83333v14.33333zM157.66667,157.66667v14.33333h14.33333v-14.33333zM14.33333,121.83333h35.83333v35.83333h-35.83333zM21.5,129v21.5h21.5v-21.5z"></path>
      </g>
    </g>
  </svg>
</template>
