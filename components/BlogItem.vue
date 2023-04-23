<template>
  <NuxtLink :to="`/blog/${item.slug}`">
    <div class="shadow-md group hover:shadow-xl transition-all duration-300 rounded-xl border bg-white flex flex-col p-3">
      <img :src="item.img" class="object-cover rounded-xl" />
      <p class="mt-4 text-2xl font-bold">{{ item.title }}</p>
      <div class="flex items-center justify-end cursor-pointer mt-4 transition-all duration-300 group-hover:text-theme-primary-400">
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
