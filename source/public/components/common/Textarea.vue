<template>
  <label class="textarea-field flex flex-col w-full">
    <span v-if="label" class="text-sm text-secondary-900 font-medium my-2">{{ label }}</span>
    <textarea class="border-solid rounded-5 border-1 border-light-gray-300 px-4 py-3 mb-4 font-body text-sm"
      @input.prevent="input" v-model="value" :required="required" :placeholder="placeholder" />
  </label>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class Textarea extends Vue {

    @Prop({ default: false }) required!: boolean
    @Prop({ default: false }) focused!: boolean
    @Prop() placeholder!: string
    @Prop() label!: string
    @Prop() val!: string

    element: any = undefined
    value: string = ''

    mounted() {

      this.element = <HTMLTextAreaElement> this.$el

      if(this.focused) this.element.focus()
      if(this.val) this.value = this.val

    }

    input($event: any) {

      this.$emit('input', $event.target.value)

    }

  }

</script>

<style lang="scss">

  .textarea-field {
    z-index: 1;

    textarea {
      box-shadow: 0px 2px 8px rgba(34, 34, 87, 0.05);
      transition: border-color 200ms ease-in-out,
                  box-shadow 200ms ease-in-out;
      resize: vertical;
      outline: none;
      min-height: 6rem;
      max-height: 12rem;

      &::placeholder {
        @apply text-light-gray-400;
      }

    }

    &:focus-within {
      
      textarea {
        @apply border-primary-500;
        box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
      }

    }

    &[aria-errormessage] {
      
      textarea {
        @apply border-danger-500;
      }

    }

  }

</style>
