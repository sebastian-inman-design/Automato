<template>
  <Card class="workflow-card cursor-pointer" thumbnail-placeholder="No preview available">
    <template slot="thumbnail">
      <figure class="card-thumbnail overflow-hidden pointer-events-none rounded-t-5 w-full bg-gray-700">
        <Icon v-if="!workflow.thumbnail" color="gray-500">image</Icon>
        <div class="card-thumbnail-actions">
          <Button width="auto" icon="play" icon-family="fas" @click="Execute">Launch Workflow</Button>
          <!-- <Button background="secondary" width="auto" icon="chart-bar" icon-family="fas" class="mt-3">View Reports</Button> -->
        </div>
        <div class="card-thumbnail-image absolute rounded-t-5" 
          :style="`--thumbnail: ${workflow.thumbnail ? `url(${workflow.thumbnail})` : 'none'}`"></div>
      </figure>
    </template>
    <Row>
      <Column scale="1-0-auto">
        <h5>{{ workflow.title }}</h5>
        <p>{{ workflow.description }}</p>
      </Column>
      <Column scale="0-1-auto" class="justify-center">
        <div class="flex flex-row">
          <Dropdown>
            <DropdownItem icon="edit" @click="$router.push(`/workflows/${id}/edit`)">Edit workflow</DropdownItem>
            <DropdownItem icon="copy" @click="Duplicate">Duplicate workflow</DropdownItem>
            <DropdownItem icon="file" @click="Export">Export workflow</DropdownItem>
            <DropdownItem icon="trash-alt" type="danger" @click="Delete">Delete workflow</DropdownItem>
          </Dropdown>
        </div>
      </Column>
    </Row>
  </Card>
</template>

<script lang="ts">

  import workflows from '@/public/store/workflows'
  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class Workflow extends Vue {

    @Prop({ required: true }) id!: string
    @Prop({ required: true }) workflow!: any

    async Execute() {

      await this.$store.dispatch('workflows/execute', {
        id: this.id,
        workflow: this.workflow
      })

    }

    async Export() {

      let file = new Blob([JSON.stringify(this.workflow)], { type: 'json' })

      let a = document.createElement('a')
      let url = URL.createObjectURL(file)

      a.href = url
      a.download = `${this.id}.json`

      document.body.appendChild(a)
      a.click()

      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      })

    }

    async Duplicate() {

      let workflow = this.workflow
      workflow.title += ' (COPY)'

      await this.$store.dispatch('workflows/create', { workflow })
      await this.$store.dispatch('workflows/fetch')

    }

    async Delete() {

      if(confirm(`Are you sure you want to delete this workflow?`)) {
        await this.$store.dispatch('workflows/delete', this.id) 
        await this.$store.dispatch('workflows/fetch')
      }

    }

  }

</script>

<style lang="scss">
  .workflow-card {
    .card-thumbnail {
      &-actions {
        @apply pointer-events-auto;
        @apply items-center;
        @apply opacity-0;
        @apply absolute;
        @apply flex-col;
        @apply flex;
        @apply z-1;
        transform: translate3d(-50%, -40%, 0);
        transition: all 200ms ease-in-out;
        left: 50%;
        top: 50%;
      }
    }
    &:hover,
    &:focus-within {
      .card-thumbnail {
        &-image {
          @apply opacity-25;
        }
        &-actions {
          @apply opacity-100;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }
  }
</style>