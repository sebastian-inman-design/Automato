<template>
  <button :type="type" :class="`button flex flex-row items-center rounded-5 bg-${background}-500 hover:bg-${background}-400 text-${color} px-4 h-10 font-${weight} w-${width} text-sm whitespace-no-wrap`" 
    :disabled="disabled" @click="click">
    <Icon v-if="icon" :family="iconFamily" class="-ml-1 mr-1">{{ icon }}</Icon>
    <slot></slot>
  </button>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Button extends Vue {

    @Prop({ default: 'primary' }) background!: 'primary'|'secondary'
    @Prop({ default: false }) disabled!: boolean
    @Prop({ default: 'white' }) color!: string
    @Prop({ default: 'medium' }) weight!: 'normal'|'semibold'|'medium'|'bold'
    @Prop({ default: 'button' }) type!: 'button'|'submit'
    @Prop({ default: 'full' }) width!: 'full'|'auto'
    @Prop({ default: 3 }) px!: number

    
    @Prop({ default: false }) icon!: string|false
    @Prop({ default: 'far' }) iconFamily!: string

    click($event: any) {
      this.$emit('click', $event)
    }

  }

</script>

<style lang="scss">
  .button {
    transition: all 200ms ease-in-out;
    box-shadow: 0px 4px 30px rgba(black, 0);
    &:not([disabled]):hover,
    &:not([disabled]):focus-within {
      box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
    }
    &[disabled] {
      @apply pointer-events-none;
      @apply opacity-50;
    }
  }
</style>