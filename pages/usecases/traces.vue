<template>
  <BreadCrumbs
    class="md:pt-0 pt-3"
    :title="data.title"
    :paths="data.breadcrumbs"
  />
  <Feature :items="data.content.items" :title="data.content.title"/>
  <Cards :items="data.tracesData"/>
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/traces").findOne();
});
useSeoMeta({
  title: data.title,
  description: data.desc,
});
</script>
