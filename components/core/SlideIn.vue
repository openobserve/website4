<template>
  <div ref="target">
    <Transition :name="animationType">
      <div class="animated-component">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>
<script setup>

const props = defineProps({
   animationType: {
      type: String,
      required: false,
      default: 'fade'
    }
})

</script>
<style scoped>
.animated-component.fade-enter-from,
.animated-component.zoom-enter-from {
  transition: none;
}
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Zoom animation */
.zoom-enter-active,
.zoom-leave-active {
  transition: transform 300ms ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.9);
}
</style>
