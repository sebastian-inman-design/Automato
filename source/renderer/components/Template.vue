<template>
  <div class="flex flex-col h-full w-full">
    <Header />
    <main class="flex flex-col h-full w-full py-12">
      <Container>
        <router-view></router-view>
      </Container>
    </main>
  </div>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  const components = {
    Header: () => import('../components/layout/Header.vue')
  }
  
  @Component({ components })
  export default class Template extends Vue {}

</script>
