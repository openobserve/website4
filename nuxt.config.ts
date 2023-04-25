export default defineNuxtConfig({
  extends: [
    // "@nuxt-themes/docus",
    "./blog",
    "nuxt-seo-kit",
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@nuxt/devtools",
  ],
  app:{
    head:{
       link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
    ]
    }
  },
  css: ["@/assets/css/main.css"],
  components: {
    // component directories with the subdirs listed first for using the default names
    dirs: [
      "~/components/common/card",
      "~/components/common/FAQ",
      "~/components/common/Feature",
      "~/components/core",
      "~/components/common",
      "~/components/header",
      "~/components/pricing",
      "~/components",
    ],
  },
  colorMode: {
    preference: "light",
    fallback: "light",
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://zinc.dev/",
      siteName: "ZincLabs",
      siteDescription:
        "ZincObserve is a cloud native observability platform built specifically for logs, metrics, traces and analytics designed to work at petabyte scale.",
      language: "en",
      titleSeparator: "|",
      trailingSlash: false,
    },
    indexable: false,
  },
  linkChecker: {
    failOn404: true,
  },
  build: {
    transpile: ["@animxyz/core", "@animxyz/vue3", "clsx"],
  },
});
