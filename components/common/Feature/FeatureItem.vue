<template>
  <Section>
    <div class="px-4 container mx-auto">
      <div :class="[directions[direction]]">
        <div
          :class="[variation[variant].el1]"
          class="flex items-center bg-no-repeat bg-auto object-contain px-0 md:px-16"
        >
          <img
            :src="data.image"
            class="object-contain"
            :alt="data.title || data.tagline"
          />
        </div>
        <div
          :class="[
            'md:pt-0 pt-5',
            direction == 'left' ? 'md:pl-8' : 'md:pr-8',
            variation[variant].el2,
          ]"
        >
          <div
            v-if="data.tagline"
            class="text-center md:text-left text-xs md:text-sm lg:text-sm mb-4"
          >
            <span
              class="bg-theme-primary-100 rounded-full text-theme-primary-600 px-4 py-1 tracking-widest capitalize"
            >
              {{ data.tagline }}</span
            >
          </div>
          <div>
            <h2
              class="text-base md:text-3xl text-center md:text-left font-bold text-black inline-block"
              v-html="data.title || ''"
            ></h2>
          </div>
          <div>
            <h3
              class="text-sm md:text-base text-center md:text-left italic mb-4 text-black inline-block"
              v-html="data.subtitle || ''"
            ></h3>
          </div>
          <div
            class="text-justify text-base leading-relaxed font-normal mt-1 md:mt-3"
            v-html="data.desc"
          ></div>
          <div
            v-if="data.btnText"
            class="flex justify-center md:justify-start py-5"
          >
            <Button
              :variant="data.btnVariant ? data.btnVariant : 'primary'"
              :target="data.btnTarget"
              :to="data.btnTo"
            >
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
    el1: "md:w-1/2 w-full object-contain",
    el2: "md:w-1/2",
  },
  "1:2": {
    el1: "md:w-1/3 w-full ",
    el2: "md:w-2/3",
  },
};

const directions = {
  left: "flex  flex-col md:flex-row items-center",
  right: "flex flex-col md:flex-row-reverse items-center ",
};

const props = defineProps({
  variant: {
    type: String,
    default: "1:1",
  },
  direction: {
    type: String,
    default: "left",
  },
  data: {
    type: Object,
    default: {
      title: "",
      desc: "",
      image: "",
      bgImage: "",
    },
  },
});
</script>
<style scoped></style>
