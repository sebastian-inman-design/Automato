<template>
  <dialog class="new-workflow flex flex-col fixed z-top p-0 left-0 top-0 max-h-full h-full max-w-full w-full overflow-hidden bg-white text-body">

    <!-- New Workflow Header -->
    <header>
      <Container>
        <div class="flex flex-row items-center">
          <ButtonAction rounded="full" bg="light-gray-200" @click="$router.go(-1)">
            <Icon>chevron-left</Icon>
          </ButtonAction>
          <div class="flex flex-col ml-4">
            <h5>{{ workflow.title }}</h5>
            <p>{{ workflow.description }}</p>
          </div>
        </div>

        <div class="flex flex-row flex-1"></div>

        <div class="flex flex-row">
          <Button :disabled="hasErrors" @click="publishWorkflow">
            {{ mode === 'create' ? 'Publish Workflow' : 'Save Workflow' }}
          </Button>
        </div>
      </Container>
    </header>

    <!-- New Workflow Content -->
    <div class="flex flex-row flex-1 w-full h-full overflow-hidden relative">
      
      <!-- New Workflow Left Sidebar -->
      <aside class="left-sidebar">

        <div class="flex flex-row items-center relative">
          <h4 class="flex-1">Actions</h4>
        </div>

        <!-- Actions Search -->
        <Input placeholder="Search actions" />

        <!-- Actions Tabs -->
        <Tabs ref="actions" :tabs="Object.keys(actions)" :selected="Object.keys(actions)[0]">

          <template v-for="category in Object.keys(actions)" :slot="category">
            <Card v-for="(options, action) in actions[category]" class="cursor-pointer" mb="0"
              :disabled="!workflow.steps.length && action !== 'NewPage'"
              :hasShadow="false"
              :key="`${category}-${action}`" 
              @click="addStep({ category, action })">
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

        </Tabs>

      </aside>

      <!-- New Workflow Steps -->
      <div class="steps flex flex-col flex-1 items-center h-full px-6 py-10 overflow-x-hidden overflow-y-scroll">

        <Card v-if="!workflow.steps.length" class="steps-empty-notice">

          <template slot="headline">
            <div class="flex flex-row flex-1">
              <span class="flex flex-row items-center justify-center leading-none mr-3">
                <Icon family="far" size="xl" color="warning-500" icon="exclamation-triangle" />
              </span>
              <h5 class="mb-0">Your workflow is empty</h5>
            </div>
          </template>

          <p>Start by choosing the <strong>New Page</strong> action from the sidebar on the left or <a>importing a workflow</a>.</p>

        </Card>

        <div v-else class="flex flex-col">
          <ActionItem v-for="(step, key) in workflow.steps" :key="`step-${key}`"
            :index="key" :action="step" :selected="selected === key" 
            @click="selectStep(key)"
            @moveup="sortStep(key, 'up')"
            @movedown="sortStep(key, 'down')"
            @duplicate="duplicateStep(key)"
            @delete="deleteStep(key)" />
        </div>

        <div class="absolute top-0 right-0 p-6 flex flex-col items-end justify-start">
          <Notification v-if="errors.titleEmpty" type="danger">Your workflow must have a title</Notification>
          <Notification v-if="errors.doesNotStartWithNewPage" type="danger">Your workflow must begin by opening a new page</Notification>
        </div>

      </div>

      <!-- New Workflow Right sidebar -->
      <aside class="right-sidebar">

        <div class="flex flex-row items-center">
          <h4 class="flex-1">Properties</h4>
        </div>

        <!-- Properties Tabs -->
        <Tabs ref="properties" :tabs="{Workflow: {}, Action: { disabled: true }}" selected="Workflow">

          <!-- Workflow Properties -->
          <template slot="Workflow">
            
            <Input label="Workflow Name" type="text" :val="workflow.title" v-model="workflow.title" />
            <Textarea label="Workflow Description" :val="workflow.description" v-model="workflow.description" />
            <FileUpload label="Workflow Thumbnail" :image="workflow.thumbnail" @change="uploadWorkflowThumbnail" />
            <Input label="Workflow Category" type="text" v-model="workflow.category" />

          </template>

          <!-- Action Properties -->
          <template slot="Action">
            <div v-if="selectedHasFields" class="flex flex-col">
              <div v-for="(options, field) of workflow.steps[selected].fields" :key="`step-${selected}-${field}`">

              <Input v-if="options.field !== 'checkbox'"
                :type="options.field"
                :label="options.label || field" 
                :required="options.required"
                :placeholder="options.default"
                :focused="true"
                :val="workflow.steps[selected].fields[field].value"
                v-model="workflow.steps[selected].fields[field].value" />

              <Checkbox v-else
                :checked="options.default"
                :label="options.label || field"
                :val="workflow.steps[selected].fields[field].value"
                v-model="workflow.steps[selected].fields[field].value" />

              </div>
            </div>
          </template>

        </Tabs>

      </aside>

    </div>

  </dialog>
</template>


<script lang="ts">

  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

  const components: any = {
    ActionItem: () => import('../components/cards/ActionItem.vue')
  }
  
  @Component({ components })
  export default class WorkflowEditor extends Vue {

    loading: boolean = false

    id: null|string = this.$route.params.id || null
    mode: 'create'|'update' = this.$route.params.id ? 'update' : 'create'
    selected: null|number = null

    workflow = this.$route.meta.workflow || {
      title: <string> 'New Workflow',
      description: <string> 'My amazing new workflow',
      thumbnail: <string|null> null,
      category: <string> '',
      steps: <Array<any>> []
    }

    get refs(): any {

      return this.$refs

    }

    get actions(): any {

      return this.$store.state.actions

    }


    get selectedHasFields(): boolean {

      return this.selected !== null && this.workflow.steps[this.selected] && 'fields' in this.workflow.steps[this.selected]

    }


    get errors() {

      return {
        titleEmpty: !this.workflow.title || this.workflow.title === '',
        noActions: !this.workflow.steps.length || this.workflow.steps.length <= 0,
        doesNotStartWithNewPage: this.workflow.steps[0] &&  this.workflow.steps[0].action !== 'NewPage'
      }

    }

    get hasErrors() {

      return Object.keys(Object.values(this.errors).filter(status => {
        return status == true
      })).length > 0

    }


    /**
     * Toggle the properties active tab
     * based on whether or not an action
     * is selected.
     */

    @Watch('selected')
    changePropertiesTab(selected: any) {

      if(this.selected !== null) {

        this.refs.properties.enableTab("Action")
        this.refs.properties.setActiveTab("Action")

      }else{

        this.refs.properties.disableTab("Action")
        this.refs.properties.setActiveTab("Workflow")

      }

    }


    uploadWorkflowThumbnail(preview: string) {

      this.workflow.thumbnail = preview

    }


    /**
     * Adds the specified action to the 
     * list of steps in the workflow.
     */

    addStep({ category, action }: any) {

      let id: string = String(Date.now())
      let step: any = Object.assign({ category, action }, this.actions[category][action])
      this.workflow.steps.push(JSON.parse(JSON.stringify(step)))

      this.selectStep(this.workflow.steps.length - 1)

    }


    /**
     * Selects the specified step
     * and marks it as being edited.
     */

    selectStep(step: null|number) {

      this.selected = step

    }


    sortStep(id: number, dir: 'up'|'down') {

      let newID = dir === 'down' ? id + 1 : id - 1

      if(newID < 0) newID = 0
      if(newID > this.workflow.steps.length - 1) newID = this.workflow.steps.length - 1

      let f = this.workflow.steps.splice(id, 1)[0]
      this.workflow.steps.splice(newID, 0, f)

      this.selectStep(newID)

    }


    /**
     * Creates an exact copy of the
     * specified step.
     */

    duplicateStep(id: number) {

      let step: any = Object.assign({}, this.workflow.steps[id])
      this.workflow.steps.push(JSON.parse(JSON.stringify(step)))

      setTimeout(() => this.selectStep(this.workflow.steps.length - 1), 1)

    }


    /**
     * Removes the specified step from
     * the array of steps in the workflow.
     */

    deleteStep(id: number) {

      this.workflow.steps.splice(id, 1)
      setTimeout(() => this.selectStep(null), 1)

    }

    async publishWorkflow() {

      try {

        await this.$store.dispatch(`workflows/${this.mode}`, {
          id: this.id,
          workflow: this.workflow
        })

      } catch(error) {

        console.error(error)

      }

    }

  }

</script>


<style lang="scss">
  .new-workflow {
    --right-sidebar-width: 360px;
    --left-sidebar-width: 360px;
    --action-item-width: 360px;

    aside {
      @apply overflow-y-scroll;
      @apply max-h-full;
      @apply bg-white;
      @apply flex-col;
      @apply h-full;
      @apply flex;
      @apply py-4;
      @apply px-6;
      transition: all 200ms ease-in-out;
      transform: translate3d(0, 0, 0);

      &.left-sidebar {
        width: var(--left-sidebar-width);

        &[aria-hidden] {
          transform: translate3d(-100%, 0, 0);
        }

      }

      &.right-sidebar {
        width: var(--right-sidebar-width);

        &[aria-hidden] {
          transform: translate3d(100%, 0, 0);
        }

      }

    }

    .steps {
      @apply bg-light-gray-100;
      @apply relative;
      background-image: radial-gradient(rgba(black, 0.125) 1px, transparent 0);
      background-size: 24px 24px;

      &-empty-notice {
        width: var(--action-item-width);
      }

      .action-item {
        width: var(--action-item-width);
      }

    }

  }
</style>