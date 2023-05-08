<template>
  <Section>
    <SectionHeading :title="items.title" :subtitle="items.subtitle" />
    <div class="container mx-auto px-4 mt-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2  gap-x-4 gap-y-4"
        :class="items.priceItems.length <= 2 ? 'lg:grid-cols-2 lg:px-40':'lg:grid-cols-4'"
      >
        <Pricingitem :item="item" :key="index" :features="features" v-for="(item, index) in items.priceItems"/>
      </div>
    </div>
  </Section>
</template>
<script setup>
defineProps({
  items: {
    type: Object,
  },
  features: {
    type: Array,
  },
});
</script>
