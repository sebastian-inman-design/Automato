<template>
  <Card :hasShadow="false" mb="0" class="action cursor-pointer mb-0" @click="click">
    <div class="flex flex-row w-full items-start justify-start">
      <span class="flex flex-row items-center justify-center leading-none h-10 w-10 rounded-5 bg-light-gray-200 mr-4">
        <Icon family="far" size="lg">{{ options.icon }}</Icon>
      </span>
      <div class="flex flex-col flex-1">
        <h5>{{ options.title }}</h5>
        <p>{{ options.description }}</p>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class Action extends Vue {

    @Prop({ required: true }) category!: any
    @Prop({ required: true }) action!: ActionOptions
    @Prop({ required: true }) options!: any

    click() {

      this.$emit('click', {
        category: this.category,
        action: this.action,
        options: this.options
      })
      
    }

  }

</script>

<style lang="scss">
  .action {

    h5 {
      transition: color 200ms ease-in-out;
    }

    &-icon {
      @apply bg-primary-500;
      @apply text-white;
    }

    &:hover,
    &:focus-within {

      h5 {
        @apply text-primary-500;
      }

    }

  }
</style>