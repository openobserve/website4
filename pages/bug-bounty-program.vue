<template>
   <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Bug Bounty Program"
      :paths="[{ name: 'Home', to: '/' }, { name: 'Bug Bounty Program' }]"
    />
  <main>
    <div class="container mx-auto">

    <div class="prose  max-w-none  p-4">
      <ContentRenderer :value="data" />
    </div>
    </div>

  </main>
  </div>
</template>
<script setup>
const { data } = await useAsyncData('bug-bounty-program', () => queryContent('/bug-bounty-program').findOne())

</script>