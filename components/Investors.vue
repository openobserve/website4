<template>
  <Section>
    <div class="w-full py-10">
      <SectionHeading :title="data.title" />
      <div class="container mx-auto px-4 md:px-0">
        <div class="flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 space-y-4 md:space-y-0">
          <div
            class="shadow-xl bg-theme-primary-100 bg-opacity-50 h-full rounded-lg"
            v-for="(item, index) in data.images"
            :key="index"
          >
            <img
              :src="item"
              alt="Investors"
              class="p-4 block mx-auto object-contain object-center "
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
