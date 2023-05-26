<template>
  <div v-if="subHeaderVisibility" class="nav bg-white text-black py-2">
    <p class="nav-item">
      <nuxt-link to="/docs/zincsearch/configuration">Zinc Search</nuxt-link>
    </p>
    <p class="nav-item">
      <nuxt-link to="/docs/openobserve/configuration">Zinc Observe</nuxt-link>
    </p>
  </div>
</template>
<script setup>
const route = useRoute();

const subHeaderVisibility = ref(false);

watch(
  () => route.path,
  () => {
    console.log("route changed" + route.path);
    if (route.path.startsWith("/docs")) {
      subHeaderVisibility.value = true;
    } else {
      subHeaderVisibility.value = false;
    }
  },
  { immediate: true }
);
</script>
<style scoped>
.nav {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.nav-item {
  margin-left: 10px;
  margin-right: 10px;
}
</style>