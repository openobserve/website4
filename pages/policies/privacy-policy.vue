<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Privacy Policy"
      :paths="[{ name: 'Home', to: '/' }, { name: 'Privacy-Policy' }]"
    />
    <main>
      <div class="container mx-auto">
        <div class="prose max-w-none p-4">
          <ContentRenderer :value="data" />
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
const { data } = await useAsyncData("privacy-policy", () =>
  queryContent("/policies/privacy-policy").findOne()
);
</script>
