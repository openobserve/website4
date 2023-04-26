<template>
 <Section>
    <div class="w-full  py-10">
      <SectionHeading :title="data.title" />
      <div class="flex flex-col md:flex-row container mx-auto justify-center items-center">
        <div class="" v-for="(item, index) in data.images" :key="index">
          <img :src="item" alt="Investors" class="px-0 md:px-10 " />
        </div>
      </div>
    </div>
  </Section>
</template>
<script setup>
defineProps({
   data:{
    type:Object
   }
})
</script>