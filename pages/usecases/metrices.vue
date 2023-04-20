<template>
  <BreadCrumbs class="md:pt-0 pt-3" :title="data.title" :paths="data.breadcrumbs" />
      <Section>
      <SectionHeading
        :title="data.items.heading"
        :subtitle="data.items.subheading"
      />
      <Feature variant="1:1" direction="left" :data="data.items" />
      <Feature variant="1:1" direction="right" :data="data.items" />
      <Feature variant="1:1" direction="left" :data="data.items" />
    </Section>
    <!-- <Card :items="data.content" /> -->
    <Section>
      <FaqSection :items="data.faqData"/>
    </Section>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/usecases/metrices").findOne()
})
useSeoMeta({
  title:data.title,
  description:data.desc
})
</script>