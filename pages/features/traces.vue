<template>
  <!-- <BreadCrumbs
    class="md:pt-0 pt-3"
    :title="data.title"
    :paths="data.breadcrumbs"
  /> -->
  <Feature :items="data.content.items" :title="data.content.title" />
  <Cards :items="data.tracesData" />
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/traces").findOne();
});
const seotitle = "Traces";
const seodesc =
  "Troubleshoot performance issues with Traces.OpenObserve and Zplane collects and analyzes trace data, allowing teams to understand the flow of requests through their systems and identify bottlenecks and latency issues.";
useSeoMeta({
  title: seotitle,
  description: seodesc,
});
</script>
