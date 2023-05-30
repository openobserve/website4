<template>
    <div class="text-black pattern-bg bg-theme-primary-100 bg-opacity-40">
      <div
        class="w-full h-full  px-4 flex flex-col text-left justify-center py-2"
      >
        <slot name="title" :title="title">
          <div v-if="title">
            <h1 class="pb-1 text-2xl font-bold">
              {{ title }}
            </h1>
          </div>
        </slot>
  
        <slot name="paths" :paths="paths">
          <div v-if="paths" class="text-sm">
            <span v-for="(path, index) in paths" :key="index">
              <span v-if="index != 0" class="mx-2"> > </span>
              <nuxt-link
                :to="path.to"
                :class="path.to === '/' ? 'cursor-pointer hover:underline transition-all duration-200' : 'cursor-default'"
                >{{ path.name }}
                </nuxt-link>
            </span>
          </div>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>
    const props = defineProps({
      title: {
        type: String,
        default: "",
      },
      paths: {
        type: Array,
        default: () => [],
      },
      imageUrl: {
        type: String,
        default: "",
      },
    })
  </script>
  
  <style scoped>
  .pattern-bg {
    /* background-image: url(/img/breadcrumbsBg.svg); */
    background-position: center;
    background-size: cover;
    
  }
  </style>
  