<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Pricing"
      :paths="data.breadcrumbs"
    />
    <Pricing :items="data.content" />
    <FaqSection :items="data.faqData" />
  </div>
</template>
<script setup>
const selected = ref("Monthly");
const { data } = await useAsyncData(async () => {
  return await queryContent("/pricing").findOne();
});
useSeoMeta({
  title: data.seotitle,
  description: data.seodesc,
});
</script>
