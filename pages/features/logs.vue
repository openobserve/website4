<template>
  <!-- <BreadCrumbs
    class="md:pt-0 pt-3"
    :title="data.title"
    :paths="data.breadcrumbs"
  /> -->
  <Feature :items="data.content.items" :title="data.content.title"/>
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/logs").findOne();
});
const seotitle = "Logs";
const seodesc ="Gain deeper insights into your applications with Logs.Our advanced embedded Graphical User Interface (GUI) for searching logs is designed to help you easily and quickly find the logs of significance that you need."
useSeoMeta({
  title:seotitle,
  description:seodesc
})
</script>