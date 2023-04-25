<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Careers"
      :paths="data.breadcrumbs"
    />
    <div class="mt-10">
      <Feature :items="data.content.items" :title="data.content.title"/>
    </div>
    <Cards :items="data.cardItems" :background-image="null"/>
    <!-- <Hiring :data="data.hiring"/> -->
  </div>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/careers").findOne();
});
useSeoMeta({
  title:data.seotitle,
  description:data.seodesc
})
</script>
