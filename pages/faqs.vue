<template>
  <!-- <BreadCrumbs class="md:pt-0 pt-3" :title="data.title" :paths="data.breadcrumbs" /> -->
  <FaqSection
    :items="data.faqs"
    :title="data.faqs.title"
    :subtitle="data.faqs.subtitle"
  />
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/faq").findOne();
});
const seotitle = "Frequently asked questions";
const seodesc =""
useSeoMeta({
  title:seotitle,
  description:seodesc
})

</script>
