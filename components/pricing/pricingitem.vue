<template>
  <div
    class="h-full p-6 rounded-xl border border-theme-primary-50 bg-white shadow flex flex-col relative overflow-hidden"
  >
    <div class="">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row space-x-4">
          <div
            class="rounded-xl"
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
          <div class="flex flex-col">
            <h4 class="text-lg font-normal text-black">{{ item.heading }}</h4>
            <h2
              class="text-3xl font-bold"
              :class="
                item.key === 'primary'
                  ? 'text-theme-primary'
                  : 'text-theme-secondary'
              "
            >
              {{ item.subtitle }}
            </h2>
          </div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div class="py-5">
        <h1 class="text-xl font-semibold text-black mb-4">{{ item.label }}</h1>
        <h3 class="text-lg font-normal text-black" v-show="item.sublabel">
          {{ item.sublabel }}
        </h3>
      </div>
      <div class="py-6">
        <div v-for="(it, index) in item.items" class="flex flex-row py-1 items-center">
          <span>
            <img
              src="/img/Check.svg"
              alt="check icon"
              class="p-2 rounded-full h-7 w-7"
              :class="
                item.key === 'primary'
                  ? 'bg-theme-primary'
                  : 'bg-theme-secondary'
              "
            />
          </span>

          <p :key="index" class="text-black font-normal text-base ml-2">
            {{ it }}
          </p>
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
</template>
<script setup>
defineProps({
  item: {
    type: Object,
  },
});
</script>
