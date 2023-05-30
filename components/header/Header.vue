<template>
  <div
    class="sticky top-0 z-50 backdrop-blur-sm bg-white text-black transition-all duration-500"
    :class="y > 20 ? 'drop-shadow-md ' : ''"
  >
    <div class="lg:block hidden">
      <LaptopView :items="items" />
    </div>
    <div class="lg:hidden block">
      <MobileView :items="items" />
    </div>
  </div>
</template>
<script setup>
import { useWindowScroll } from "@vueuse/core";
const isOpen = ref(false);
const route = useRoute();
watch(route, (value) => {
  isOpen.value = false;
});
const { y } = useWindowScroll();

const items = {
  logo: "/img/logo/logo_horizontal.svg",
  btn: {
    text: "Get started for free",
    link: "https://observe.openobserve.ai",
  },
  content: [
    // {
    //   title: "About",
    //   link: "/about",
    // },
    {
      title: "FAQs",
      link: "/faqs",
    },
    {
      title: "Pricing",
      link: "/pricing",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Docs",
      link: "/docs",
      target: "_blank",
    },
  ],

  product: {
    //link: "/products/openobserve",
    //productName: "Product",
  },

  useCases: [
    {
      label: "",
      link: "/features/logs",
      productName: "Logs",
    },
    {
      label: "",
      link: "/features/metrics",
      productName: "Metrics",
    },
    {
      label: "",
      link: "/features/traces",
      productName: "Traces",
    },
  ],
  solutions: [
    {
      label: "",
      link: "/solutions/migration-from-elasticsearch",
      productName: "Migration from Elasticsearch",
    },
  ],
};
</script>
