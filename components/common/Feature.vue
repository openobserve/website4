<template>
  <Section>
    <div class="px-4 container mx-auto">
      <div :class="[directions[direction]]">
        <div :class=[variation[variant].el1] class="background object-contain p-16">
          <img :src="data.image" class="object-contain" alt="image" />
        </div>
        <div :class='["md:pt-0 pt-5", direction == "left" ? "md:pl-8" : "md:pr-8", variation[variant].el2]'>
          <div v-if="data.tagline" class="text-center md:text-left text-xs md:text-sm lg:text-sm mb-4">
            <span class="bg-theme-primary-100 rounded-full text-gray-600 px-2 py-1" v-html="data.tagline">
            </span>
          </div>
          <div>
            <h2 class="text-base md:text-3xl text-center md:text-left font-bold text-black inline-block "
              v-html="data.title"></h2>
          </div>
          <div>
            <h3 class="text-sm md:text-base text-center md:text-left italic mb-4 text-black inline-block "
              v-html="data.subtitle"></h3>
          </div>
          <p class="text-justify text-sm lg:text-base leading-loose font-normal mt-1 md:mt-3" v-html="data.desc"></p>
          <div v-if="data.btnText" class="flex justify-center md:justify-start py-5">
            <Button :variant="data.btnVariant ? data.btnVariant : 'primary'" :target="data.btnTarget" :to="data.btnTo">
              {{ data.btnText }}
            </Button>
          </div>
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
      bgImage: '',
    }
  }

})
</script>
<style scoped>
.background {
  background-repeat: no-repeat;
  object-fit: contain;
  background-size: auto;
}
</style>