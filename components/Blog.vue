<template>
  <div
    class="shadow-md hover:shadow-xl transition-all duration-500 rounded-xl border bg-white flex flex-col p-3"
  >
    <img :src="item.image" class="object-cover rounded-xl" />
    <div>
      <div
        class="mt-4 bg-theme-primary-200 text-center text-black py-1 px-4 inline-block rounded-xl"
      >
        {{ item.title }}
      </div>
    </div>
    <p class="mt-4 text-2xl font-bold">{{ item.desc }}</p>
    <NuxtLink :to="item.href">
      <div class="flex items-center justify-end cursor-pointer mt-4  hover:text-theme-primary-400">
        {{ item.btnText }}
        <span class="ml-1 text-lg">&#8594;</span>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
  },
});
</script>
