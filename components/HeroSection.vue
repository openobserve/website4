<template>
  <div
    :style="{ backgroundImage: `url(${data.backgroundImage})` }"
    class="bg-no-repeat min-h-[calc(95vh-100px)] bg-center py-10"
    :class="bgClasses[backgroundBgType]"
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
          <div
            class="bg-theme-primary-100 rounded-full text-black px-4 py-2"
            v-html="data.tagline"
          >
      </div>
        </div>
        <h2
          class="text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight"
          v-html="data.title"
        ></h2>
        <p class="text-center md:text-left mt-6 text-xl font-normal text-black">
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
          :alt="data.title"
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

const bgClasses = {
  cover: "bg-cover object-cover",
  contain: "bg-contain object-contain",
  fullWidth: "bg-[length:100%_100%]",
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
  backgroundBgType: {
    type: String,
    default: "contain",
  },
});
</script>
