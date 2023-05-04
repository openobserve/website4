<template>
  <div
    :style="{ backgroundImage: `url(${data.backgroundImage})` }"
    class="bg-no-repeat  bg-center py-10"
    :class="bgClasses[backgroundBgType]"
  >
    <div
      class="flex flex-col px-4 md:flex-row w-full items-stretch container mx-auto"
      :class="directions[direction]"
    >
      <div class="w-full md:w-1/2 py-4 md:py-12 lg:py-12 md:px-6 lg:px-10">
        <div v-if="data.tagline" class="text-center md:text-left text-sm mb-6">
          <div
            class="bg-theme-primary-100 rounded-full text-black px-4 py-2 inline-block"
            v-html="data.tagline"
          ></div>
        </div>
        <h2
          class="text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight"
          v-html="data.title"
        ></h2>
        <p
          class="text-center md:text-left mt-6 text-base md:text-xl font-normal text-black"
        >
          {{ data.subtitle }}
        </p>
        <div
          class="flex flex-row space-x-4 justify-center md:justify-start py-5"
          v-if="data.btnText1 && data.btnText2"
        >
          <Button
            variant="tryitfree"
            :target="data.btnTarget"
            :to="data.btnTo1"
          >
            {{ data.btnText1 }}
          </Button>
          <Button variant="requestdemo" :to="data.btnTo2">
            {{ data.btnText2 }}
          </Button>
        </div>
      </div>
      <div class="w-full md:w-1/2 -mt-10 md:mt-0">
        <img
          :src="data.image"
          :alt="data.title"
          class="object-center object-contain"
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
