<template>
  <Modal width="1440px">

    <template slot="title">Import Workflow</template>

    <template slot="content">
      <div class="w-full h-full relative p-4">
        <Textarea class="absolute h-full w-full" label="Paste Workflow JSON" :focused="true" v-model="json" />
      </div>
    </template>

    <template slot="footer">
      <Button width="auto" :disabled="!json || json === ''" @click="Import">Import Workflow</Button>
    </template>

  </Modal>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
import ActionItem from '../cards/ActionItem.vue'

  @Component
  export default class ImportWorkflow extends Vue {

    json: string = ""

    async Import() {

      let workflow: any = JSON.parse(this.json)

      if(workflow.thumbnail) {
        delete workflow.thumbnail
      }

      try {

        await this.$store.dispatch('workflows/create', { workflow })
        this.$store.dispatch('modals/close')

      } catch(error) {

        console.error(error)

      }

    }

  }

</script>