<template>
  <div class="bg-no-repeat bg-contain object-contain min-h-[calc(95vh-100px)] bg-center">
    <swiper-container
      pagination="true"
      navigation="true"
      loop="true"
      autoplay-delay="5000"
    >
      <slot></slot>
    </swiper-container>
  </div>
</template>

<script setup></script>
<style scoped>
</style>
