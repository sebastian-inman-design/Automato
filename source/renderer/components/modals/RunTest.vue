<template>
  <Modal width="1440px">

    <template slot="title">{{ workflow.title }}</template>

    <template slot="content">
      <h3>Test results will go here</h3>
    </template>

  </Modal>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component
  export default class RunTestModal extends Vue {

    get workflow() {

      return this.$store.state.workflows.running

    }

  }

</script>