<template>
  <span class="icon inline-flex items-center justify-center w-6 h-6">
    <i v-if="icon || slotIcon" :class="`${family} fa-${icon || slotIcon} text-${size} text-${color}`"></i>
  </span>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class Icon extends Vue {

    @Prop({ default: 'far' }) family!: 'fas'|'far'|'fal'|'fab'
    @Prop({ default: 'base' }) size!: 'xs'|'sm'|'base'|'lg'|'xl'
    @Prop({ default: 'current' }) color!: string
    @Prop() icon!: string

    get slotIcon() {
      let slots: any = this.$slots
      return slots ? slots['default'][0].text : null
    }

  }

</script>