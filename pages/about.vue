<template>
  <HeroSection
    :data="data.heroSection"
    backgroundBgType="fullWidth"
  ></HeroSection>
  <WhatWeDo :data="data.aboutus" />
  <div
    :style="{ backgroundImage: `url(${data.data.backgroundImage})` }"
    class="bg-no-repeat bg-cover object-contain w-full h-full bg-center"
  >
    <Feature :items="data.data.items" :title="data.data.heading" />
  </div>
  <Investors :data="data.items" />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/about").findOne();
});
useSeoMeta({
  title: data.seotitle,
  description: data.seodesc,
});
</script>
<style scoped></style>
