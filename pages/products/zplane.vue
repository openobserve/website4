<template>
  <!-- <BreadCrumbs class="md:pt-0 pt-3" :title="data.title" :paths="data.breadcrumbs" /> -->
  <HeroSection :data="data.heroSection" />
  <Cards :items="data.content"/>
  <FaqSection :items="data.faqData"/>
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/products/zplane").findOne()
})
useSeoMeta({
  title:data.seotitle,
  description:data.seodesc
})
</script>