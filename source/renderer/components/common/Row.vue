<template>
  <div :class="`row flex flex-row flex-wrap justify-${justify} items-${align}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class Row extends Vue {

    @Prop({ default: 3 }) spacing!: number
    @Prop({ default: 'flex-start' }) justify!: 'center'|'flex-start'|'flex-end'
    @Prop({ default: 'center' }) align!: 'center'|'flex-start'|'flex-end'

  }

</script>

<style lang="scss">

  .row {
    @apply -mx-3;
    width: calc(100% + 1.5rem);
  }
  
</style>
