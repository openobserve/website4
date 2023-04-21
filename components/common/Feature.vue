<template>
  <Section>
    <div class="px-4 container mx-auto">
      <div :class="[directions[direction]]">
        <div :class=[variation[variant].el1]  class="background object-contain p-16">
          <img :src="data.image" class="object-contain" alt="image" />
        </div>
        <div :class='["md:pt-0 pt-5", direction == "left" ? "md:pl-8" : "md:pr-8", variation[variant].el2].join(" ")'>
          <h2 class="text-base md:text-3xl text-center md:text-left font-bold mb-4 text-black inline-block " v-html="data.title"></h2>
          <p class="text-justify text-sm lg:text-base font-normal leading-2 tracking-wider mt-1 md:mt-3">{{ data.desc1 }}</p>
          <p class="text-justify text-sm lg:text-base font-normal leading-2 tracking-wider mt-1 md:mt-3">{{ data.desc2 }}</p>

        </div>
      </div>
    </div>
  </Section>
</template>
<script setup>
const variation = {
  "1:1": {
    el1: "md:w-1/2 w-60 object-contain",
      el2: "md:w-1/2"
    },
    "1:2": {
      el1: "md:w-1/3 w-60 ",
      el2: "md:w-2/3"
    }
  };

  const directions = {
    left: "flex  flex-col md:flex-row items-center",
    right: "flex flex-col md:flex-row-reverse items-center "
  };

  const props = defineProps({
    variant: {
    type: String,
    default: "1:1"
  },
  direction: {
    type: String,
    default: "left"
  },
  data: {
    type: Object,
    default: {
      title: "",
      desc: "",
      image: '',
      bgImage:'',
    }
  }

})
</script>
<style scoped>
.background{
  background-repeat: no-repeat;
    object-fit: contain;
    background-size: auto;
}
</style>