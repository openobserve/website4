<template>
  <div
    class="bg-no-repeat bg-contain object-contain bg-center"
  >
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
<style scoped></style>
