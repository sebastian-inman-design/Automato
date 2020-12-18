<template>
  <div class="dropdown relative">

    <button :class="`
    dropdown-button flex flex-row items-center 
    justify-center leading-none h-10 rounded-5 
    font-semibold text-xs tracking-2
    ${btnText ? 'w-auto pl-4 pr-3' : 'w-10'}
    bg-${btnBg} hover:bg-${btnBgHover}`" 
    @click.prevent="toggle">
      <span v-if="btnText" :class="`mr-2 text-${btnTextColor} font-medium text-sm`">{{ btnText }}</span>
      <Icon :family="iconFamily" :size="iconSize" :color="iconColor">{{ icon }}</Icon>
    </button>

    <div v-if="isOpen" class="dropdown-actions absolute flex flex-col right-0 top-0 p-4 rounded-5 bg-white cursor-default">
      <slot></slot>
    </div>

    <div v-if="isOpen" class="dropdown-shadow fixed top-0 left-0 cursor-default" @click.prevent="close"></div>

  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class Dropdown extends Vue {

    @Prop({ default: 'transparent' }) btnBg!: string
    @Prop({ default: 'light-gray-100' }) btnBgHover!: string
    @Prop({ default: 'current' }) btnTextColor!: string
    @Prop({ default: null }) btnText!: null|string

    @Prop({ default: 'ellipsis-h' }) icon!: 'ellipsis-h'|'ellipsis-v'|'sort-down'|'caret-down'|'chevron-down'|'angle-down'
    @Prop({ default: 'far' }) iconFamily!: 'fas'|'far'|'fal'|'fab'
    @Prop({ default: 'base' }) iconSize!: 'xs'|'sm'|'base'|'lg'|'xl'
    @Prop({ default: 'current' }) iconColor!: string

    isOpen: boolean = false

    toggle() {

      this.isOpen = !this.isOpen

    }

    open() {

      this.isOpen =true

    }

    close() {

      this.isOpen = false

    }

  }

</script>

<style lang="scss">
  .dropdown {
    &-actions {
      box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
      z-index: 10;
    }
    &-shadow {
      height: 100vw;
      width: 100vw;
      z-index: 1;
    }
  }
</style>