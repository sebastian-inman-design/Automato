<template>
  <label class="checkbox-field flex flex-row items-center">
    <input type="checkbox" :name="name" :checked="checked" @change="change" v-model="value" />
    <span v-if="label" class="ml-2 text-sm text-secondary-900">{{ label }}</span>
  </label>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component export default class Checkbox extends Vue {

    @Prop({ default: false }) checked!: boolean
    @Prop() label!: string
    @Prop() name!: string
    @Prop() val!: string

    element: any = undefined
    value: string = ''

    mounted() {

      this.element = <HTMLInputElement> this.$el

      if(this.checked) this.element.checked = true
      if(this.val) this.value = this.val

    }

    change($event: any) {

      this.value = $event.target.checked
      this.$emit('change', $event)

      console.log(this.value)
      
    }

  }

</script>