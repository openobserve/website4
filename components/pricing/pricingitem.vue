<template>
  <div class="flex flex-col h-full">
    <div
      class="rounded-t-xl text-center py-2 text-white"
      :class="
        item.recommed
          ? 'bg-theme-primary border-theme-primary block'
          : 'invisible'
      "
    >
      Recommended
    </div>
    <div
      class="flex flex-col h-full p-6 rounded-b-xl border bg-white shadow relative overflow-hidden"
      :class="
        item.recommed === false
          ? 'border-theme-primary-50 rounded-t-xl'
          : ' border-theme-primary'
      "
    >
      <div class="">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row space-x-4">
            <div
              class="rounded-xl flex items-center"
              :class="
                item.key === 'primary'
                  ? 'bg-theme-primary-100'
                  : 'bg-theme-secondary-100'
              "
            >
              <img
                :src="item.image"
                :alt="item.heading"
                class="p-4 h-20 w-20 object-contain"
              />
            </div>
            <div class="">
              <h2
                class="text-3xl font-bold leading-none mt-2"
                :class="
                  item.key === 'primary'
                    ? 'text-theme-primary'
                    : 'text-theme-secondary'
                "
              >
                {{ item.subtitle }}
              </h2>
              <div
                class="inline-block px-4 text-lg font-normal text-white rounded-full text-center bg-theme-secondary-600 bg-opacity-70 mt-2"
                v-if="item.free"
              >
                {{ item?.free }}
            </div>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <h1 class="text-xl font-semibold text-black mb-2">
            {{ item.label }}
          </h1>
          <h3 class="text-lg font-normal text-black">
            {{ item.sublabel }}&nbsp;
          </h3>
        </div>
        <div class="py-6">
          <div
            v-for="(it, index) in item.items"
            class="flex flex-row py-1 items-center"
          >
              <img
                src="/img/Check.svg"
                alt="check icon"
                class="p-2 rounded-full h-7 w-7"
                :class="
                  [item.key === 'primary'
                    ? 'bg-theme-primary'
                    : 'bg-theme-secondary',
                    !it ? 'invisible' : ''
                  ]
                "
              />

            <p :key="index" class="text-black font-normal text-base ml-2">
              {{ it }}
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-2 mt-4 mb-8">
        <div class="font-semibold">Key Features</div>
        <div v-for="(feature,index) in features" :key="index" class="">
          <div class="flex flex-row items-center">
            <img
              v-if="feature[item.id]"
              src="/img/feature-check.svg"
              alt="check icon"
              class="p-1 mr-2 rounded-full h-5 w-5 "
            />
            <img
              v-if="!feature[item.id]"
              src="/img/feature-no.svg"
              alt="check icon"
              class="p-0.5 mr-2 rounded-full h-5 w-5 "
            />
            <span class="text-sm" :class="!feature[item.id] ? 'text-gray-500' : ''">{{ feature.title }}</span>
          </div>
        </div>
      </div>
      <Button variant="pricing" classes="" :href="item.btnLink">
        <div class="flex items-center">
          <span>{{ item.btnText }}</span>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-auto items-center"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </Button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
  },
  features: {
    type: Array
  },
});
</script>
