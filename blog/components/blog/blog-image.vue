<template>
  <img :src="dynamicSrc" :alt="alt" class="my-4" />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
});

const dynamicSrc = computed(() => {
  return `/assets/img/blog/${props.src}`;
});
</script>
