<template>
  <div class="flex flex-col w-full">
    <button @click="openDevTools">DevTools</button>
    <button @click="click('#detected_value a')">Find</button>
    <div class="relative flex w-full h-0" style="padding-bottom: 56.25%">
      <webview id="webview" class="absolute h-full w-full top-0 left-0" :src="url" allowpopups useragent="Automato"></webview>
    </div>
  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class WebView extends Vue {

    @Prop({ required: true }) url!: string

    get webview(): any {

      return document.getElementById('webview')

    }

    mounted() {

      /**
       * Listen for when the DOM is ready.
       */

      this.webview.addEventListener('dom-ready', () => this.$emit('dom-ready'))

      this.webview.addEventListener('found-in-page', (event: any) => {
        this.webview.stopFindInPage('keepSelection')
        console.log(event)
      })

      /** 
       * Force all links to open in the main webview.
       * No opening links in new tabs/windows.
       */

      this.webview.addEventListener('new-window', (event: any) => {
        this.webview.src = event.url
      })

    }

    async loadURL(url: string) {

      await this.webview.loadURL(url)

    }

    findInPage(selector: string) {

      let found = this.webview.findInPage(selector)
      console.log({ found })

    }

    click(selector: string) {

      this.webview.executeJavaScript(`console.log(${selector})`)

    }

    openDevTools() {

      this.webview.openDevTools()

    }

    onReady() {

      console.log('page is ready')

    }

  }

</script>

<style lang="scss">
  .webview {
    padding-bottom: 56.25%;
  }
</style>
