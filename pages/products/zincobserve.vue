<template>
  <!-- <BreadCrumbs class="md:pt-0 pt-3" :title="data.title" :paths="data.breadcrumbs" /> -->
  <HeroSection :data="data.heroSection" />
  <FeatureItem :data="data.details" />
  <Feature :items="data.content.items" :title="data.content.title" />
  <Cards :items="data.features" :backgroundImage="true" />
  <FaqSection :items="data.faqData" />
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/products/zincobserve").findOne()
})
useSeoMeta({
  title:data.title,
  description:data.desc
})
</script>