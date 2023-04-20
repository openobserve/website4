<template>
  <div
    :style="{ backgroundImage: `url(${data.backgroundImage})` }"
    class="background"
  >
    <div
      class="flex flex-col px-4 md:flex-row w-full h-full container mx-auto"
      :class="directions[direction]"
    >
      <div class="w-full md:w-1/2 py-4 md:py-16 lg:py-24 md:px-6 lg:px-10">
        <h2
          class="text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
          v-html="data.title"
        >
        
        </h2>
        <p class="text-center md:text-left mt-6 text-xl font-medium text-black">
          {{ data.subtitle }}
        </p>
        <div class="flex justify-center md:justify-start" v-show="required">
          <Button
            variant="primary"
            classes="mt-6 "
            href="https://cloud.zincsearch.com"
            >Get Started For Free</Button
          >
        </div>
      </div>
      <div class="w-full md:w-1/2 md:h-full -mt-10 md:mt-0">
        <img
          :src="data.image"
          alt="herosection image"
          class="object-center h-full w-full"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const directions = {
  left: "flex  flex-col md:flex-row items-center",
  right: "flex flex-col md:flex-row-reverse items-center ",
};
const props = defineProps({
  data: {
    type: Object,
  },
  direction: {
    type: String,
    default: "left",
  },
  required: {
    type: Boolean,
    default: true,
  },
});
</script>
<style scoped>
span {
   color: #5960B2;
}
.background {
  background-repeat: no-repeat;
  background-size: 100vw calc(100vh - 100px);
  object-fit: contain;
  /* width: 100vw; */
  height: calc(100vh - 100px);
  background-position: center;
}
@media only screen and (max-width: 768px) {
  .background {
    background-size: 100vw 100vh;
    height: 100vh;
  }
}
</style>
