<template>
  <BreadCrumbs
    class="md:pt-0 pt-3"
    :title="data.title"
    :paths="data.breadcrumbs"
  />

  <Feature :items="data.content.items" />
  <!-- <FaqSection :items="data.faqData" /> -->
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/metrics").findOne();
});
useSeoMeta({
  title:data.seotitle,
  description:data.seodesc
})
</script>
