<template>
  <Section>
    <div class="w-full py-10">
      <SectionHeading :title="data.title" />
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-center space-x-8">
          <div
            class="shadow-xl bg-theme-primary-100 bg-opacity-50 h-full rounded-lg"
            v-for="(item, index) in data.images"
            :key="index"
          >
            <img
              :src="item"
              alt="Investors"
              class="p-4 flex items-center w-72 h-72 object-contain justify-center"
            />
          </div>
        </div>
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
