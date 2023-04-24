<template>
   <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Pricing"
      :paths="data.breadcrumbs"
    />
<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
       <section-heading :title="data.data.title" :subtitle="data.data.subtitle" />
          <div class="flex mx-auto border-2 border-theme-primary rounded overflow-hidden mt-6">

            <button class="py-1 px-10  focus:outline-none" :class="selected == 'Monthly' ? 'bg-theme-primary text-white' : ''"
              @click="selected = 'Monthly'">{{ data.data.btn.monthlyBtn }}</button>
            <button class="py-1 px-4 focus:outline-none " :class="selected == 'Yearly' ? 'bg-theme-primary text-white' : ''"
              @click="selected = 'Yearly'">{{ data.data.btn.annuallyBtn }}</button>
        </div>
    </div>
     
      <div class="flex flex-wrap -m-4">
        <div class="p-4 xl:w-1/4 md:w-1/2 w-full" v-for="(item, index) in data.data.carditems">
          <div class="h-full p-6 rounded-lg border-2 border-theme-primary flex flex-col relative overflow-hidden" :key="index">
            <h2 class="text-sm tracking-widest title-font mb-1 font-medium">{{ item.title }}</h2>
            <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">{{ selected == "Monthly" ?
              item.plan.Monthly : item.plan.Yearly }}</h1>
            <div class="mb-16">
              <p class="flex items-center text-gray-600 mb-2" v-for="(it, index) in item.feature">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-theme-primary text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                <span>{{ it }}</span>
              </p>
            </div>
            <!-- <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Button
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button> -->
            <Button variant="pricing" classes="" :href="item.link">
              <div class="flex items-center">
                <span>{{ item.btnText }}</span>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  class="w-4 h-4 ml-auto items-center" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </Button>
            <p class="text-xs text-gray-500 mt-3">{{ item.desc }}</p>
          </div>
        </div>
    </div>
  </div>
</section>
<Section>
  <FaqSection :items="data.faqData"/>
</Section>
   </div>
</template>
<script setup>

const selected = ref('Monthly');
const { data } = await useAsyncData(async () => {
  return await queryContent("/pricing").findOne();
});
useSeoMeta({
  title: data.title,
  description: data.desc,
});
</script>