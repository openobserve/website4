<template>
  <!-- <BreadCrumbs
    class="md:pt-0 pt-3"
    :title="data.title"
    :paths="data.breadcrumbs"
  /> -->

  <Feature :items="data.content.items" :title="data.content.title"/>
  <!-- <FaqSection :items="data.faqData" /> -->
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/metrics").findOne();
});
const seotitle = "Metrics";
const seodesc ="Tracking trends through metrics, unlocking insights.Finally, high cardinality data storage enables you to store and query a large number of metrics, giving you the flexibility and scalability to handle large-scale environments. Overall, long-term storage for Prometheus metrics in S3 can revolutionize the way you monitor and manage your infrastructure, providing powerful insights and unparalleled visibility."
useSeoMeta({
  title:seotitle,
  description:seodesc
})
</script>
