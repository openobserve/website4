<template>
  <div class="flex flex-col">
    <div class="sticky top-0 z-50">
      <div class="flex justify-between items-center px-4 py-4">
        <div>
          <nuxt-link to="/">
            <div class="">
              <img :src="items.logo" class="h-12 p-1" alt="openobserve logo" />
            </div>
          </nuxt-link>
        </div>
        <div class="flex-1"></div>
        <SearchComponent @searchModalOpen="isOpen = false" />
        <div class="mr-2">
          <GithubCount />
        </div>
        <div class="" @click="isOpen = !isOpen">
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="py-4 border-b flex flex-col min-h-screen container px-16"
      v-if="isOpen"
    >
      <!-- <Button variant="header" :to="items.product.link">{{
        items.product.productName
      }}</Button> -->
      <!-- <Dropdown :items="items.products" title="Products" direction="left" label="productName" triggerMode="click"
                onMode="expand" /> -->
      <Dropdown
        :items="items.useCases"
        title="Features"
        direction="left"
        label="productName"
        triggerMode="click"
        onMode="expand"
      />
      <!-- <Dropdown
        :items="items.solutions"
        title="Solutions"
        direction="left"
        label="productName"
        triggerMode="click"
        onMode="expand"
      /> -->
      <div v-for="(item, index) in items.content" :key="index">
        <Button variant="header" :class="currentRoute == item.link ? '!font-bold' : ''" :to="item.link" :target="item.target">{{ item.title }}</Button>
      </div>
      <!-- <a href="/" target="_blank">Docs</a> -->
      <div class="" v-if="isOpen">
        <Button
          variant="tryitfree"
          target="_blank"
          :to="items.btn.link"
          classes="w-full text-center"
          >{{ items.btn.text }}</Button
        >
      </div>
    </div>
    <div>
      <!-- <SubHeader></SubHeader> -->
    </div>
  </div>
</template>
<script setup>
let isOpen = ref(false);
const route = useRoute();
watch(route, (value) => {
  isOpen.value = false;
});
defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.path)
</script>
