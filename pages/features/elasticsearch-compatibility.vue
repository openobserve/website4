<template>
  <Feature :items="data.herosection.items" :title="data.herosection.title" />
  <Cards :items="data.cardItems" :background-image="null" />
  <div class="bg-theme-primary-200">
    <Heading :title="data.contactus.title" />
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0"
    >
      <p>{{ data.contactus.desc }}</p>
      <Button>{{ data.contactus.btn }}</Button>
    </div>
  </div>
  <LatestBlogPosts />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/elasticsearch-compatibility").findOne();
});
const seotitle = "OpenObserve - Elasticsearch Compatibility";
const seodesc =
  "OpenObserve offers Elasticsearch compatible API with the zPlane add-on.";
useSeoMeta({
  title: seotitle,
  description: seodesc,
});
</script>
