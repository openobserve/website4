<template>
  <NuxtLink :to="`/blog/${item.slug}`">
    <div
      class="shadow-md group hover:shadow-xl transition-all duration-300 rounded-xl border bg-white flex flex-col p-3 h-full"
    >
      <img :src="item.img || '/img/homepage/herosection1.jpg'" class="object-cover rounded-xl" :alt="item.title" />
      <div class="flex-1">
        <p class="mt-4 text-xl font-bold max-h-16 overflow-hidden">{{ item.title }}</p>
      </div>
      <div
        class="flex items-center justify-end cursor-pointer mt-4 transition-all duration-300 group-hover:text-theme-primary-400"
      >
        Read More
        <span class="ml-1 text-lg">&#8594;</span>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
  },
});
</script>
