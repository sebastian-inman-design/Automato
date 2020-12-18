<template>
  <div :class="`card flex flex-col select-none rounded-5 bg-white relative mb-${mb} ${hasShadow ? 'has-shadow': null}`">

    <div v-if="$slots.thumbnail" @click.prevent="$emit('click')">
      <slot name="thumbnail"></slot>
    </div>

    <div v-if="$slots.headline" @click.prevent="$emit('click')">
      <div class="p-4 border-b-1 border-solid border-light-gray-300 w-full">
        <div class="flex flex-row w-full">
          <slot name="headline"></slot>
        </div>
      </div>
    </div>

    <div class="card-content flex flex-col items-start p-4 relative" @click.prevent="$emit('click')">
      <slot />
    </div>

  </div>
</template>


<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Card extends Vue {

    @Prop() thumbnail!: string
    @Prop() thumbnailPlaceholder!: string
    @Prop({ default: true }) hasShadow!: boolean
    @Prop({ default: 6 }) mb!: number|string

  }

</script>

<style lang="scss">

  .card {
    @apply border-transparent;
    @apply border-solid;
    @apply border-2;
    box-shadow: 0px 4px 30px rgba(black, 0);
    transition: all 200ms ease-in-out;
    z-index: 1;

    &.has-shadow {
      box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
    }

    &[aria-selected] {
      @apply border-primary-500;
    }

    &-thumbnail {
      @apply pointer-events-none;
      @apply relative;
      padding-bottom: 56.25%;

      &-image {
        @apply bg-no-repeat;
        @apply bg-cover;
        @apply absolute;
        @apply h-full;
        @apply w-full;
        background-image: var(--thumbnail);
        transition: all 200ms ease-in-out;
        background-position: top center;
      }

      > .icon {
        @apply absolute;
        transform: translate3d(-50%, -50%, 0);
        left: 50%;
        top: 50%;

        > i {
          @apply text-5xl;
        }

      }

    }

    &:hover,
    &:focus-within {
      box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
      z-index: 2;
    }

  }

</style>
