<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Terms Of Service"
      :paths="[{ name: 'Home', to: '/' }, { name: 'Terms Of Service' }]"
    />
  <main>
    <div class="container mx-auto">
         <div class="prose max-w-none  p-4">

           <ContentRenderer :value="data" />
         </div>
</div>
  </main>
  </div>
</template>
<script setup>
const { data } = await useAsyncData('tos', () => queryContent('/policies/terms-of-service').findOne())
</script>