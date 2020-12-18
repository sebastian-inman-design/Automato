<template>
  <header class="sticky top-0">
    <Container>
      <div class="flex flex-row items-center w-full">

        <div class="flex flex-col">
          <h1>Automato</h1>
          <small>Automated front-end site testing</small>
        </div>

        <div class="flex flex-col flex-1">

        </div>

        <div class="flex flex-row">
          <Dropdown icon="angle-down" btn-bg="primary-500" btn-bg-hover="primary-400" btn-text="Create New" btn-text-color="white" icon-color="white">
            <DropdownItem icon="tasks" @click="$router.push('/workflows/create')">New Workflow</DropdownItem>
            <DropdownItem :disabled="true" icon="sitemap">New Pipeline</DropdownItem>
          </Dropdown>
        </div>

      </div>
    </Container>
  </header>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  
  @Component 
  export default class Header extends Vue {}

</script>

<style lang="scss">
  header {
    @apply border-light-gray-300;
    @apply items-center;
    @apply border-b-1;
    @apply bg-white;
    @apply flex-row;
    @apply min-h-24;
    @apply w-full;
    @apply h-24;
    @apply flex;
  }
</style>