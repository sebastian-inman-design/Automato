<template>
  <button type="button" :disabled="disabled" :class="`dropdown-item flex flex-row flex-no-wrap whitespace-no-wrap items-center pr-4 h-10 w-full rounded-5 bg-transparent ${bgColor} ${textColor}`" 
    @click.prevent="click">
    <div class="flex w-10 h-10 items-center justify-center">
      <Icon v-if="icon" :family="iconFamily" :size="iconSize" :color="iconColor">{{ icon }}</Icon>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class Dropdown extends Vue {

    @Prop() icon!: 'ellipsis-h'|'ellipsis-v'|'sort-down'|'caret-down'|'chevron-down'|'angle-down'
    @Prop({ default: 'far' }) iconFamily!: 'fas'|'far'|'fal'|'fab'
    @Prop({ default: 'base' }) iconSize!: 'xs'|'sm'|'base'|'lg'|'xl'
    @Prop({ default: 'current' }) iconColor!: string

    @Prop({ default: false }) disabled!: boolean
    @Prop({ default: 'normal' }) type!: 'normal'|'warning'|'success'|'danger'

    get bgColor() {

      switch(this.type) {
        case 'normal':
          return 'hover:bg-light-gray-100'
          break
        case 'success':
          return 'hover:bg-success-100'
          break
        case 'warning': 
          return 'hover:bg-warning-100'
          break
        case 'danger':
          return 'hover:bg-danger-100'
          break
      }

    }

    get textColor() {

      switch(this.type) {
        case 'normal':
          return ''
          break
        case 'success':
          return 'text-success-500'
          break
        case 'warning': 
          return 'text-warning-500'
          break
        case 'danger':
          return 'text-danger-500'
          break
      }

    }

    get $dropdown(): any {

      return this.$parent

    }

    click() {

      this.$dropdown.close()
      this.$emit('click')

    }

  }

</script>
