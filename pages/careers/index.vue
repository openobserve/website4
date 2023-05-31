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
    <Hiring :data="data.hiring"/>
  </div>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/career").findOne();
});
const seotitle = "Careers";
const seodesc ="Revolutionizing the Way Businesses Optimize Their Systems.Experience the Next Generation of Observability and Search Technology"
useSeoMeta({
  title:seotitle,
  description:seodesc
})

</script>
