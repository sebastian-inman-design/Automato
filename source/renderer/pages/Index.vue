<template>
  <section class="w-full">

    <h4>Your Workflows</h4>
    <Row v-if="Object.keys($store.state.workflows.feed).length">
      <Column v-for="(workflow, id) of $store.state.workflows.feed" class="w-1/6" :key="`workflow-${id}`">
        <Workflow :id="id" :workflow="workflow" />
      </Column>
    </Row>
    <div v-else class="bg-light-gray-200 rounded-5 text-center py-8 px-6 font-medium">
      You don't have any workflows yet. Would you like to create one?
    </div>
    
  </section>
</template>

<script lang="ts">

  import { ipcRenderer } from 'electron'
  import { Vue, Component } from 'vue-property-decorator'

  const components: any = {
    Workflow: () => import('../components/cards/Workflow.vue'),
    ImportWorkflowModal: () => import('../components/modals/ImportWorkflow.vue'),
    RunTestModal: () => import("../components/modals/RunTest.vue")
  }
  
  @Component({ components }) 
  export default class Tests extends Vue {}

</script>