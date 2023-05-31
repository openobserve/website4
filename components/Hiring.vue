<template>
  <Section v-if="data.jobs.length > 0">
    <SectionHeading :title="data.title" :subtitle="data.subtitle" />
    <div
      class="container mx-auto px-4 py-4 flex flex-col md:flex-row space-x-6"
    >
      <!-- <div v-for="(item, index) in data.jobs">
                <div class="flex flex-row md:flex-row justify-items-center justify-between py-3">
                    <div class="font-bold text-lg md:text-xl py-2 text-black">&#9673; {{ item.title }} </div>
                    <Button variant="primary" :to="`/career/apply?job=${item.id}`">{{ item.btnText }}</Button>
                </div>
                <div v-if="item.description">
                    <div class="text-gray-600 mb-2">Job Description</div>
                    <div v-html="item.description"></div>
                </div>
                <hr class="border my-4">
            </div> -->
      <div
        class="flex flex-col bg-white border border-theme-primary-300 p-4 shadow rounded-lg"
        v-for="(item, index) in data.jobs"
      >
          <div class="font-bold text-lg md:text-xl py-2 text-black">
            &#9673; {{ item.title }}
          </div>
          <div v-if="item.description" class="flex-1 mb-3">
            <div class="text-gray-600 mb-2 flex-1">Job Description</div>
            <div v-html="item.description" class="text-sm flex-1"></div>
          </div>
          <Button variant="primary" :to="`/careers/apply?job=${item.id}`" classes="text-center">{{
            item.btnText
          }}</Button>
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
