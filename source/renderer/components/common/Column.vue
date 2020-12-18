<template>
  <div :class="`column flex flex-col px-3 flex-${scale}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class Column extends Vue {

    @Prop({ default: '0-1-auto' }) scale!: string
    @Prop({ default: 3 }) spacing!: number

  }

</script>
