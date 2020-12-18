<template>
  <div class="action-item relative flex flex-col items-center" :aria-selected="selected">

    <div class="action-item-sort absolute left-0 top-0 -ml-20 p-4 pr-6 cursor-default rounded-5">
      <div class="action-item-sort-inner flex flex-col">
        <ButtonAction bg="white" class="rounded-b-0" @click="$emit('moveup')">
          <Icon>angle-up</Icon>
        </ButtonAction>
        <ButtonAction bg="white" class="rounded-t-0" @click="$emit('movedown')">
          <Icon>angle-down</Icon>
        </ButtonAction>
      </div>
    </div>

    <Card class="cursor-pointer w-full" :aria-selected="selected" @click="$emit('click')">
      
      <template slot="headline">

        <div class="flex flex-row flex-1">
          <span class="flex flex-row items-center justify-center leading-none mr-3">
            <Icon family="far" size="xl" :color="`icon-${action.category.toLowerCase()}`" :icon="action.icon" />
          </span>
          <h5 class="mb-0">{{ action.title }}</h5>
        </div>

        <div class="flex">
          <Dropdown>
            <DropdownItem icon="copy" @click="$emit('duplicate')">Duplicate step</DropdownItem>
            <DropdownItem icon="trash-alt" type="danger" @click="$emit('delete')">Delete step</DropdownItem>
          </Dropdown>
        </div>

      </template>

      <div class="action-item-info flex flex-col w-full">
        <p v-if="action.helper" v-html="helper"></p>
        <p v-else-if="action.description">{{ action.description }}</p>
      </div>

    </Card>

  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  
  @Component 
  export default class ActionItem extends Vue {

    @Prop({ required: true }) index!: number
    @Prop({ default: false }) selected!: boolean
    @Prop({ required: true }) action!: any

    helper: string = this.action.helper

    @Watch('action', { immediate: true, deep: true })
    updateTooltip(action: any) {

      if(this.action.helper) {

        this.helper = this.action.helper

        let params: any = {};
        let matches: any = this.helper.match(/{{(.*?)}}/g)

        if(matches && Object.keys(matches).length) {
          Object.entries(matches).map(([key, match]: any) => {
            let param = match.replace('{{', '').replace('}}', '')
            let value = this.action.fields[param].value || this.action.fields[param].default || this.action.fields[param].label;
            this.helper = this.helper.replace(match, `<span>${value}</span>`)
          })
        }

      }

    }

  }

</script>

<style lang="scss">
  .action-item {

    &-sort {
      @apply opacity-0;
      transition: opacity 200ms ease-in-out;

      &-inner {
        box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
      }

    }

    &-info {

      span {
        @apply border-light-gray-300;
        @apply text-secondary-900;
        @apply border-solid;
        @apply inline-block;
        @apply font-medium;
        @apply border-b-1;
        line-height: 20px;
        margin: 0 1px;
      }

    }

    &:hover {

      .action-item-sort {
        @apply opacity-100;
      }

    }

  }
</style>