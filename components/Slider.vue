<template>
  <div class="background">
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
.background {
  background-repeat: no-repeat;
  background-size: contain;
  object-fit: contain;
  /* width: 100vw; */
  height: calc(95vh - 100px);
  background-position: center;
}
</style>
