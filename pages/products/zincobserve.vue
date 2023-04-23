<template>
  <!-- <BreadCrumbs class="md:pt-0 pt-3" :title="data.title" :paths="data.breadcrumbs" /> -->
  <HeroSection :data="data.heroSection" />
  <Feature :data="data.details" />
  <SlideIn>
    <Section>
      <SectionHeading :title="data.content.title" />
      <Feature v-for="(item, index) in data.content.items" :key="index" :direction="index % 2 == 0 ? 'left' : 'right'"
        :data="item" />
    </Section>
  </SlideIn>
  <!-- <Card :items="data.content" :backgroundImage="true" /> -->
  <Card :items="data.features" :backgroundImage="true" />
  <FaqSection :items="data.faqData" />
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/products/zincobserve").findOne()
})
</script>