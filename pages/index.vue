<template>
  <div>
    <Slider>
      <swiper-slide v-for="(item, index) in data.heroSection" :key="index">
        <HeroSection :data="item" backgroundBg="contain"></HeroSection>
      </swiper-slide>
    </Slider>
    <!-- <HeroSection :data="data.heroSection"></HeroSection> -->
    <Numbers :items="data.numbers" />
    <Feature :items="data.products.items" :title="data.products.title" />
    <Cards :items="data.useCases" />
    <Feature
      :items="data.cardItems.items"
      :title="data.cardItems.title"
      :subtitle="data.cardItems.subtitle"
    />
    <Cards :items="data.features" />

    <!-- <Cards :items="data.useCases2" :background-image="null" /> -->
    <LatestBlogPosts />
  </div>
</template>
<script setup>
const { data } = await useAsyncData(async () => {
  return await queryContent("/homepage").findOne();
});
const seotitle = "ZincLabs";
const seodesc ="Logs, Metrics, Traces and more in one platform.Streamline your operations with worry-free observability and simplify your observability setup in just 2 minutes. 140x lower storage cost than your existing observability tools"
useSeoMeta({
  title:seotitle,
  description:seodesc
})

</script>
