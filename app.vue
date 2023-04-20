<template>
  <div>
    <!-- Fixed header (including subheader for navigation) -->
    <SeoKit />
    <OgImageScreenshot />
    <!-- b. Generate saotir images for every page (uses the default template) -->
    <OgImageStatic />
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup>
import Header from "./components/header/Header.vue";
</script>
