<template>
  <div class="draggable" @mousedown="dragStart">
    <slot></slot>
  </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Draggable extends Vue {

    @Prop({ required: true }) dropzone!: string
    @Prop({ default: true }) clone!: boolean

    // Position of element
    elementX: number = 0
    elementY: number = 0

    // Drag offset
    offsetX: number = 0
    offsetY: number = 0

    // Position of mouse
    mouseX: number = 0
    mouseY: number = 0

    elementBounds: any = undefined

    // Element being dragged
    $element: any = undefined
    $dropzone: any = undefined

    overDropzone: boolean = false

    dragStart($event: any) {

      $event = $event || window.event

      this.mouseX = $event.clientX
      this.mouseY = $event.clientY

      this.elementBounds = this.$el.getBoundingClientRect()

      this.$dropzone = document.getElementById(this.dropzone)
      this.$element = this.clone ? this.$el.firstChild?.cloneNode(true) : this.$el.firstChild

      this.$element.style.width = `${this.elementBounds.width}px`
      this.$element.style.height = `${this.elementBounds.height}px`
      this.$element.style.zIndex = '9999'
      this.$element.style.position = 'fixed'
      this.$element.style.left = `${this.elementBounds.left}px`
      this.$element.style.top = `${this.elementBounds.top}px`

      if(this.clone) {

        document.body.appendChild(this.$element)

      }

      document.onmouseup = this.dragEnd
      document.onmousemove = this.dragHandler

      this.$emit('dragstart', this)

    }

    dragHandler($event: any) {

      $event = $event || window.event

      $event.preventDefault()

      this.offsetX = this.mouseX - $event.clientX
      this.offsetY = this.mouseY - $event.clientY

      this.mouseX = $event.clientX
      this.mouseY = $event.clientY

      this.elementX = this.$element.offsetLeft - this.offsetX
      this.elementY = this.$element.offsetTop - this.offsetY

      this.$element.style.left = `${this.elementX}px`
      this.$element.style.top = `${this.elementY}px`

    }

    dragEnd() {

      this.$emit('dragend', this)
      // if(this.clone) this.$element.remove()

      document.onmouseup = null
      document.onmousemove = null

    }

  }

</script>