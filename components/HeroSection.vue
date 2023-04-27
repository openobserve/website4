<template>
  <div
    :style="{ backgroundImage: `url(${data.backgroundImage})` }"
    class="background py-10"
  >
    <div
      class="flex flex-col px-4 md:flex-row w-full h-full container mx-auto"
      :class="directions[direction]"
    >
      <div class="w-full md:w-1/2 py-4 md:py-16 lg:py-24 md:px-6 lg:px-10">
        <div
          v-if="data.tagline"
          class="text-center md:text-left text-sm md:text-base lg:text-base mb-6"
        >
          <span
            class="bg-theme-primary-100 rounded-full text-black px-4 py-2"
            v-html="data.tagline"
          >
          </span>
        </div>
        <h2
          class="text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
          v-html="data.title"
        ></h2>
        <p class="text-center md:text-left mt-6 text-xl font-medium text-black">
          {{ data.subtitle }}
        </p>
        <div
          class="flex justify-center md:justify-start py-5"
          v-if="data.btnText"
        >
          <Button variant="primary" :target="data.btnTarget" :to="data.btnTo">
            {{ data.btnText }}
          </Button>
        </div>
      </div>
      <div class="w-full md:w-1/2 md:h-full -mt-10 md:mt-0">
        <img
          :src="data.image"
          alt="herosection image"
          class="object-center object-contain h-full w-full"
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
    // sample data
    // {
    //   title: "10x" + "<span class='highlight'> lower cost </span>" + "than your existing" + "<span class='highlight'> observability</span>" + " tools.",
    //   subtitle: " Streamline Your Operations with Worry-Free Observability - Logs,Metrics, Traces and More in One Platform",
    //   image: "/img/homepage/herosectionImage2.svg",
    //   btnText: "Get Started For Free",
    //   btnTo: "https://observe.zinc.dev/",
    //   btnTarget: "_blank",
    //   backgroundImage: "/img/homepage/homepagebg3.svg",
    // };
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
.background {
  background-repeat: no-repeat;
  background-size: contain;
  object-fit: contain;
  /* width: 100vw; */
  height: calc(95vh - 100px);
  background-position: center;
}

@media only screen and (max-width: 768px) {
  .background {
    background-size: 100vw 100vh;
    height: 100vh;
  }
}
</style>
