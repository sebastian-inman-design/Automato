<template>

  <div v-if="type === 'array'" class="tabs">
    <nav :class="`tabs-nav ${ sticky ? 'sticky' : null }`">
      <button v-for="tab of pTabs" class="tabs-nav-button" :key="`${tab}-nav`"
        :aria-selected="pActive === tab" 
        @click="setActiveTab(tab)">
        {{ tab }}
      </button>
    </nav>
    <div class="tabs-content flex flex-col">
      <div v-for="tab of pTabs" :key="`${tab}-content`" class="tabs-content-tab" :aria-hidden="pActive !== tab">
        <slot :name="tab"></slot>
      </div>
    </div>
  </div>

  <div v-else class="tabs">
    <nav :class="`tabs-nav ${ sticky ? 'sticky' : null }`">
      <button v-for="(options, tab) of pTabs" class="tabs-nav-button" :key="`${tab}-nav`"
        :disabled="options.disabled"
        :aria-selected="pActive === tab" 
        @click="setActiveTab(tab)">
        {{ tab }}
      </button>
    </nav>
    <div class="tabs-content flex flex-col">
      <div v-for="(options, tab) of pTabs" :key="`${tab}-content`" class="tabs-content-tab" :aria-hidden="pActive !== tab">
        <slot :name="tab"></slot>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class Tabs extends Vue {

    @Prop({ required: true }) tabs!: any
    @Prop({ default: true }) sticky!: boolean
    @Prop({ required: true }) selected!: string

    private pActive: string = this.selected
    private pTabs: any = this.tabs

    get type() {

      return Array.isArray(this.tabs) ? 'array' : 'object' 

    }

    setActiveTab(tab: any) {

      this.pActive = tab

    }

    enableTab(tab: any) {

      this.pTabs[tab].disabled = false

    }

    disableTab(tab: any) {

      this.pTabs[tab].disabled = true

    }

  }

</script>

<style lang="scss">
  
  .tabs {
    @apply flex-col;
    @apply flex;
    @apply -mx-6;

    &-nav {
      @apply border-light-gray-300;
      @apply bg-white;
      @apply border-b-1;
      @apply flex-row;
      @apply flex;
      @apply px-6;
      @apply z-2;

      &.sticky {
        top: -1rem;
      }

      &-button {
        @apply text-light-gray-600;
        @apply font-medium;
        @apply leading-12;
        @apply capitalize;
        @apply relative;
        @apply text-sm;
        @apply flex-1;
        @apply h-12;

        &::after {
          content: '';
          @apply bg-transparent;
          @apply w-full;
          @apply block;
          transition: background-color 200ms ease-in-out;
          margin-top: -4px;
          height: 4px;
        }

        &:not([aria-selected]):hover,
        &:not([aria-selected]):focus-within {
          @apply text-light-gray-400;
        }

        &[aria-selected] {
          @apply text-secondary-900;

          &::after {
            @apply bg-primary-500;
          }

        }

        &[disabled] {
          opacity: 0.25;
        }

      }

    }

    &-content {
      @apply px-6;
      @apply pt-6;
      @apply z-1;

      &-tab {
        @apply flex-col;
        @apply flex;

        &[aria-hidden] {
          @apply hidden;
        }

      }

    }

  }

</style>