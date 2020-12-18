<template>
  <button :class="`flex flex-row items-center justify-center leading-none h-10 w-10 rounded-${rounded} bg-${bg} hover:bg-${bgHover} font-semibold text-xs tracking-2`" @click.prevent="click">
    <slot></slot>
  </button>
</template>


<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class ButtonAction extends Vue {

    @Prop({ default: '5' }) rounded!: string
    @Prop({ default: 'transparent' }) bg!: string
    @Prop({ default: 'light-gray-200 '}) bgHover!: string

    click($event: any) {
      this.$emit('click', $event)
    }

  }

</script>