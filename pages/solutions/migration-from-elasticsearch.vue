<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      :title="data.title"
      :paths="data.breadcrumbs"
    />
    <Feature :items="data.content.items" :title="data.content.title" :subtitle="data.content.subtitle"/>
    <FaqSection :items="data.faqData" />
  </div>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent(
    "/solutions/migration-from-elasticsearch"
  ).findOne();
});
useSeoMeta({
  title: data.title,
  description: data.desc,
});
</script>
