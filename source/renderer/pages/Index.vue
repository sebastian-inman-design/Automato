<template>
  <section class="w-full">

    <h4>Your Workflows</h4>
    <!-- <Row v-if="!$store.state.workflows.updatingFeed">
      <Column v-for="(workflow, id) of $store.state.workflows.feed" class="w-1/6" :key="`workflow-${id}`">
        <Workflow :id="id" :workflow="workflow" />
      </Column>
    </Row> -->

    <!-- <ImportWorkflowModal v-if="$store.state.modals.active === 'import-workflow'" />
    <RunTestModal v-if="$store.state.workflows.running && $store.state.modals.active === 'run-test'" /> -->
    
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