<template>
  <div class="container flex mx-auto w-100 max-w-full max-h-full px-6">
    <slot></slot>
  </div>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component 
  export default class Container extends Vue {}

</script>
