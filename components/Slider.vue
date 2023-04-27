<template>
  <swiper-container pagination="true" navigation="true" loop="true" autoplay-delay="5000" class="background">
    <slot></slot>
  </swiper-container>
</template>

<script setup>
  
</script>
<style>
.background {
  background-repeat: no-repeat;
  background-size: contain;
  object-fit: contain;
  /* width: 100vw; */
  height: calc(95vh - 100px);
  background-position: center;
}
</style>