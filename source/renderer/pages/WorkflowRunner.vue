<template>
  <dialog class="new-workflow flex flex-col fixed z-top p-0 left-0 top-0 max-h-full h-full max-w-full w-full overflow-hidden bg-white text-body">

    <header>
      <Container>
        <div class="flex flex-row items-center">
          <ButtonAction rounded="full" bg="light-gray-200" @click="$router.push('/')">
            <Icon>chevron-left</Icon>
          </ButtonAction>
          <div class="flex flex-col ml-4">
            <h5>{{ workflow.title }}</h5>
            <p>{{ workflow.description }}</p>
          </div>
        </div>

        <div class="flex flex-row flex-1"></div>

        <div class="flex flex-row">
          
        </div>
      </Container>
    </header>

    <div class="flex flex-row flex-1 w-full h-full overflow-hidden relative">

      <WebView :url="workflow.steps[0].fields.url.value" />

    </div>

  </dialog>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component 
  export default class WorkflowRunner extends Vue {

    id: string = this.$route.params.id
    workflow: Workflow = this.$route.meta.workflow

    mounted() {

      console.log(this.workflow)

    }

  }

</script>