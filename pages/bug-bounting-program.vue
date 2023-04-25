<template>
   <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Privacy-Policy"
      :paths="[{ name: 'Home', to: '/' }, { name: 'Bug Bounty Program' }]"
    />
  <main>
    <div class="prose container mx-auto p-4">
      <ContentRenderer :value="data" />
    </div>
  </main>
  </div>
</template>
<script setup>
const { data } = await useAsyncData('bug-bounting-program', () => queryContent('/bug-bounting-program').findOne())

</script>