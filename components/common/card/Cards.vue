<template>
  <Section>
    <div
      class="w-full bg-no-repeat bg-cover h-full"
        :class="bgImage"
    >
      <SectionHeading
        :title="items.title"
        :subtitle="items.subtitle"
        align="center"
      />
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 container mx-auto py-16 px-4"
      >
        <CardItem
          align="left"
          :item="item"
          :key="index"
          v-for="(item, index) in items.items"
        />
      </div>
    </div>
  </Section>
</template>
<script setup>
const image = "/img/cardbg2.svg"
const props = defineProps({
  items: {
    type: Object,
  },
  backgroundImage: {
    type: Boolean,
    default: true,
  },
});
const bgImage = computed(() => {

  return props.backgroundImage ? "bg-[url('/img/cardbg2.svg')] py-40" : ""

})
</script>
