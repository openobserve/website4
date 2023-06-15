<template>
  <Section v-if="data.jobs.length > 0">
    <SectionHeading :title="data.title" :subtitle="data.subtitle" />
    <div class="container mx-auto flex flex-wrap justify-center px-4 md:px-0">
      <div
        class="flex flex-col bg-white border border-theme-primary-300 p-4 shadow rounded-lg w-full md:w-[calc(50%-20px)] m-[10px]"
        v-for="(item, index) in data.jobs"
      >
        <div class="font-bold text-lg md:text-xl py-2 text-black" :key="index">
          &#9673; {{ item.title }}
        </div>
        <div v-if="item.description" class="flex-1 mb-3">
          <div class="text-gray-600 mb-2 flex-1">Job Description</div>
          <div v-html="item.description" class="text-sm flex-1"></div>
        </div>
        <Button
          variant="primary"
          :to="`/careers/apply?job=${item.id}`"
          classes="text-center"
          >{{ item.btnText }}</Button
        >
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
