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
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      script: [
        {
          src: "https://buttons.github.io/buttons.js",
          body: true,
          async: true,
          defer: true,
        },
      ]
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return ['swiper-container', 'swiper-slide'].includes(tag)
      }
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
  googleFonts: {
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900]
      },
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://zinc.dev/",
      siteName: "Zinc Labs",
      siteDescription:
        "ZincObserve is a cloud native open source observability platform built specifically for logs, metrics, traces and analytics designed to work at petabyte scale.",
      language: "en",
      titleSeparator: "|",
      trailingSlash: false,
    },
    indexable: true,
  },
  linkChecker: {
    failOn404: false,
  },
  build: {
    transpile: ["clsx"],
  },
  
});
