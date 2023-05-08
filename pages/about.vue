<template>
  <HeroSection
    :data="data.heroSection"
    backgroundBgType="fullWidth"
  ></HeroSection>
  <WhatWeDo :data="data.aboutus" />
  <div
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
const seotitle = "About Us";
const seodesc ="Making Data-Driven Decisions Easier than Ever!"
useSeoMeta({
  title:seotitle,
  description:seodesc
})

</script>
<style scoped></style>
