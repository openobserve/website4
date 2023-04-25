<template>
   <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Bug Bounty program"
      :paths="[{ name: 'Home', to: '/' }, { name: 'Bug Bounty Program' }]"
    />
  <main>
    <div class="prose container max-w-none mx-auto p-4">
      <ContentRenderer :value="data" />
    </div>
  </main>
  </div>
</template>
<script setup>
const { data } = await useAsyncData('bug-bounty-program', () => queryContent('/bug-bounty-program').findOne())

</script>