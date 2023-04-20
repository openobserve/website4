<template>
  <Section>
    <div class="container mx-auto my-10">
      <SectionHeading :title="data.title" />
      <div class="flex flex-col text-center my-2 px-10 md:px-32 lg:px-44">
        <p class="text-base font-normal text-black pb-3">{{ data.para1 }}</p>
        <p class="text-base font-normal text-black">{{ data.para2 }}</p>
      </div>
    </div>
  </Section>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
  },
});
</script>
