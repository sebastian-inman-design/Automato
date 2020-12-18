<template>
  <div :class="`notification bg-${type}-100 border-${type}-300 text-${type}-500`">
    <div class="flex w-10 h-10 items-center justify-center">
      <Icon :color="`${type}-500`" size="lg">{{ icon }}</Icon>
    </div>
    <span class="text-sm font-medium m-0">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class Notification extends Vue {

    @Prop({ default: 'notice' }) type!: 'notice'|'warning'|'danger'|'success'

    get icon() {

      switch(this.type) {

        case 'notice':
          return 'info-circle'
          break

        case 'warning':
        case 'danger':
          return 'exclamation-triangle'
          break

        case 'success':
          return 'check-circle'
          break

      }

    }

  }

</script>

<style lang="scss">
  .notification {
    @apply items-center;
    @apply rounded-5;
    @apply flex-row;
    @apply border-1;
    @apply mt-4;
    @apply flex;
    @apply pt-2;
    @apply pr-5;
    @apply pb-2;
    @apply pl-2;
  }
</style>