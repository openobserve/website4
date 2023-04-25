<template>
  <div>
    <HeroSection :data="data.heroSection"></HeroSection>
    <Numbers :items="data.numbers" />
     <Feature :items="data.products.items" :title="data.products.title"/>
    <Cards :items="data.useCases" />
     <Feature :items="data.cardItems.items" :title="data.cardItems.title" :subtitle="data.cardItems.subtitle"/>
    <Cards :items="data.useCases2" :background-image="null" />
    <FaqSection :items="data.faqData" />
    <LatestBlogPosts />
  </div>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/homepage").findOne();
});
useSeoMeta({
  title:data.seotitle,
  description:data.seodesc
})
</script>
