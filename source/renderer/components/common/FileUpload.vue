<template>
  <label class="file-upload">
    <span class="text-sm text-secondary-900 font-medium my-2">{{ label }}</span>
    <div class="file-upload-thumbnail-wrapper">
      <figure class="file-upload-thumbnail">
        <div class="file-upload-thumbnail-label">
          <Icon size="xl" color="gray-600">image</Icon>
          <p>Click to upload image</p>
        </div>
        <div class="file-upload-thumbnail-image" :style="`--preview: ${preview ? `url(${preview})` : 'none'}`"></div>
      </figure>
    </div>
    <input class="hidden" type="file" :accept="accept" @change="handleUpload" />
  </label>
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component 
  export default class FileUpload extends Vue {

    @Prop({ required: true }) label!: string
    @Prop({ default: 'image/*'}) accept!: string
    @Prop({ default: null }) image!: null|string

    preview: null|string = this.image

    async handleUpload($event: any) {

      let reader = new FileReader()

      reader.onload = ($event: any) => {
        this.preview = $event.target.result
        this.$emit('change', this.preview)
      }

      await reader.readAsDataURL($event.target.files[0])

    }

  }

</script>


<style lang="scss">
  .file-upload {
    @apply cursor-pointer;
    @apply flex-col;
    @apply w-full;
    @apply mb-4;
    @apply flex;

    &-thumbnail {
      @apply bg-light-gray-100;
      @apply pointer-events-none;
      @apply overflow-hidden;
      @apply rounded-5;
      @apply relative;
      padding-bottom: 56.25%;

      &-wrapper {
        @apply border-light-gray-300;
        @apply bg-white;
        @apply rounded-5;
        @apply border-1;
        padding: 2px;
      }

      &-label {
        @apply text-gray-600;
        @apply items-center;
        @apply absolute;
        @apply flex-col;
        @apply flex;
        @apply z-1;
        transform: translate3d(-50%, -50%, 0);
        left: 50%;
        top: 50%;
      }

      &-image {
        @apply bg-no-repeat;
        @apply rounded-5;
        @apply bg-cover;
        @apply absolute;
        @apply h-full;
        @apply w-full;
        @apply z-2;
        transition: all 200ms ease-in-out;
        background-image: var(--preview);
        background-position: top center;
      }

    }

  }
</style>