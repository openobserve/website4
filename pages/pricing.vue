<template>
  <div>
    <!-- <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Pricing"
      :paths="data.breadcrumbs"
    /> -->
    <Pricing :items="data.content" />
    <PricingTable :items="data.tableData" />
  </div>
</template>
<script setup>
const selected = ref("Monthly");
const { data } = await useAsyncData(async () => {
  return await queryContent("/pricing").findOne();
});
const seotitle = "Pricing";
const seodesc =""
useSeoMeta({
  title:seotitle,
  description:seodesc
})
</script>
