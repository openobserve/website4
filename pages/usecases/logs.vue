<template>
      <BreadCrumbs class="md:pt-0 pt-3" :title="data.title" :paths="data.breadcrumbs" />
      <Feature :items="data.content.items" />
      <FaqSection :items="data.faqData"/>
      <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/logs").findOne()
})
useSeoMeta({
  title:data.title,
  description:data.desc
})
</script>