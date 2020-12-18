<template>
  <transition>
    <dialog v-if="$store.state.modals.active" :class="`modal flex flex-row justify-center items-start fixed z-top ${fullscreen ? 'p-0' : 'px-16 py-48'} left-0 top-0 h-full w-full bg-transparent`">
      
      <div :class="`modal-inner flex flex-col max-h-full h-full rounded-5 z-2 overflow-hidden ${fullscreen ? 'w-full h-full' : null}`" :style="`width: ${width}`">

        <div class="flex flex-row py-4 px-6 bg-white rounded-t-5">
          <div class="flex flex-row items-center justify-between w-full">
            <h3 class="text-secondary-600">
              <slot name="title"></slot>
            </h3>
            <ButtonAction class="text-light-gray-800" @click.prevent="CloseModal">
              <Icon family="fal" size="xl">times</Icon>
            </ButtonAction>
          </div>
        </div>

        <div v-if="$slots.content" class="flex flex-1 flex-col bg-light-gray-100 text-body border-1 border-light-gray-300 overflow-hidden relative">
          <slot name="content"></slot>
        </div>

        <div v-if="$slots.footer" class="flex flex-row items-start bg-white justify-end py-4 px-6 rounded-b-5">
          <slot name="footer"></slot>
        </div>

      </div>

      <div class="modal-shadow absolute left-0 top-0 h-full w-full bg-secondary-900 z-1 opacity-865" @click.prevent="CloseModal"></div>

    </dialog>
  </transition>
</template>


<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  
  @Component 
  export default class Modal extends Vue {

    @Prop({ default: false }) fullscreen!: boolean
    @Prop({ default: 800 }) width!: number

    mounted() {

      window.addEventListener('keyup', ($event: any) => {
        let key = $event.which || $event.keyCode
        if(key === 27) this.CloseModal($event)
      })

    }

    async CloseModal($event: any) {

      await this.$store.dispatch('modals/close')
      await this.$emit('close', $event)

    }

  }

</script>