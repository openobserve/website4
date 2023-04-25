<template>
  <HeroSection :data="data.heroSection"></HeroSection>
  <WhatWeDo :data="data.aboutus" />
  <Section>
    <div 
    :style="{ backgroundImage: `url(${data.data.backgroundImage})` }"
      class="background py-16"
  >
    <Feature  :items="data.data.items" :title="data.data.heading" />
  </div>

  </Section>
  
    <Investors :data="data.items" />

</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/about").findOne();
});
useSeoMeta({
  title:data.seotitle,
  description:data.seodesc
})

</script>
<style scoped>
.background {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: contain;
  width: 100%;
  height: 100%;
  /* width: 100vw; */
  /* height: calc(100vh - 100px); */
  background-position: center;
}
/* @media only screen and (max-width: 768px) {
  .background {
    background-size: 100vw 100vh;
    height: 100vh;
  }
} */
</style>
