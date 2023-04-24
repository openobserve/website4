<template>
   <Section>
        <SectionHeading :title="title" :subtitle="subtitle"/>
        <FeatureItem v-for="(item, index) in items" :key="index" :direction="index % 2 == 0 ? 'left' : 'right'" :data="item" />
   </Section>
</template>
<script setup>
defineProps({
  items:{
    type:String,
  },
  title:{
    type:String
  },
  subtitle:{
    type:String
  }
  
})
</script>
