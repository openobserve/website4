<template>
  <div class="flex flex-col">
    <div class="w-full px-4 mx-auto flex justify-between items-center py-4">
      <!-- main nav bar -->
      <div class="">
        <nuxt-link to="/">
          <div class="flex items-center text-black">
            <img
              :src="items.logo"
              class="h-10 md:h-12 p-1 my-2 text-black"
              alt="zinc labs logo"
            />
          </div>
        </nuxt-link>
      </div>
      <div class="flex md:space-x-0 lg:space-x-5 xl:space-x-7">
        <!-- <Button variant="header" :to="items.product.link">{{
          items.product.productName
        }}</Button> -->
        <Dropdown
          :items="items.useCases"
          title="Features"
          direction="left"
          label="productName"
          triggerMode="hover"
          onMode="hover"
        />
        <!-- <Dropdown
          :items="items.solutions"
          title="Solutions"
          direction="left"
          label="productName"
          triggerMode="hover"
          onMode="hover"
        /> -->
        <div v-for="(item, index) in items.content" :key="index">
          <Button variant="header" :class="currentRoute == item.link ? '!font-bold text-theme-primary-500' : ''" :to="item.link" :target="item.target">{{
            item.title
          }}</Button>
        </div>
        <!-- <a href="/" target="_blank">Docs</a> -->
      </div>
      <div class="flex items-center space-x-1">
        <GithubCount />
        <GithubForkCount />
        <Button variant="requestdemo" target="_blank" :to="items.btn.link">{{
          items.btn.text
        }}</Button>
      </div>
    </div>
    <div>
      <!-- <SubHeader></SubHeader> -->
    </div>
  </div>
</template>
<script setup>
defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.path)
</script>
