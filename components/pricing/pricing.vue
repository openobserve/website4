<template>
  <Section>
    <SectionHeading :title="items.title" :subtitle="items.subtitle" />
    <div class="container mx-auto px-4 mt-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
      >
        <Pricingitem :item="item" :key="index" v-for="(item, index) in items.priceItems"/>
      </div>
    </div>
  </Section>
</template>
<script setup>
defineProps({
  items: {
    type: Object,
  },
});
</script>
