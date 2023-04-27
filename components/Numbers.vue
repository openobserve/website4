<template>
  <!-- <SlideIn> -->
  <div
    class="bg-gradient-to-tr from-theme-secondary-800 via-theme-secondary-500 to-theme-primary-500 w-full py-20"
  >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 container mx-auto px-4">
      <div class="py-2 md:py-10" v-for="(item, index) in items.items">
        <div class="flex justify-center py-2 items-center" :key="index">
          <h2
            class="rounded-full text-white  font-semibold text-center flex items-center justify-center text-xl md:text-2xl lg:text-5xl"
          >
            {{ item.number }}
          </h2>
        </div>
        <div>
          <p class="text-center text-white font-medium text-base md:text-lg">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- </SlideIn> -->
</template>
<script setup>
const props = defineProps({
  items: {
    type: Object,
  },
});
</script>
