<template>
  <div>
    <Slider>
      <swiper-slide v-for="(item, index) in data.heroSection" :key="index">
        <HeroSection :data="item" backgroundBg="contain"></HeroSection>
      </swiper-slide>
    </Slider>
    <Numbers :items="data.numbers" />
    <Feature :items="data.products.items" :title="data.products.title" />
    <Cards :items="data.useCases" />
    <Cards :items="data.features" :backgroundImage=false />
    <LatestBlogPosts />
  </div>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/homepage").findOne();
});
const seotitle = "OpenObserve";
const seodesc ="Logs, Metrics, Traces and more in one platform.Streamline your operations with worry-free observability and simplify your observability setup in just 2 minutes. 140x lower storage cost than your existing observability tools"
useSeoMeta({
  title:seotitle,
  description:seodesc
})

</script>
