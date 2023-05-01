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
        <Button variant="header" :to="items.product.link">{{
          items.product.productName
        }}</Button>

        <!-- <Dropdown :items="items.products" title="Products" direction="left" label="productName" triggerMode="hover"
                    onMode="hover" /> -->
        <Dropdown
          :items="items.useCases"
          title="Use Cases"
          direction="left"
          label="productName"
          triggerMode="hover"
          onMode="hover"
        />
        <Dropdown
          :items="items.solutions"
          title="Solutions"
          direction="left"
          label="productName"
          triggerMode="hover"
          onMode="hover"
        />
        <div v-for="(item, index) in items.content">
          <Button variant="header" :to="item.link" :key="index">{{
            item.title
          }}</Button>
        </div>
        <!-- <a href="/" target="_blank">Docs</a> -->
      </div>
      <div class="flex items-center space-x-1">
        <GithubCount />
        <GithubForkCount />
        <Button variant="primary" target="_blank" :to="items.btn.link">{{
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
</script>
