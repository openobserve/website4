export default defineNuxtConfig({
  extends: [
    // "@nuxt-themes/docus",
    "./blog",
    // "nuxt-seo-kit",
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@nuxt/devtools",
    "@nuxtjs/seo",
    "@nuxt/content",
  ],

  linkChecker: {
    enabled: false,
    failOnError: false,
    excludeLinks: ["/docs", "/docs/**"],
  },

  ogImage: {
    enabled: false,
  },

  nitro: {
    prerender: {
      concurrency: 1,
      failOnError: false,
    },
  },
  content: {
    experimental: {
      search: {
        ignoredTags: ["style", "script"],
        indexed: true,
      },
    },
  },
  app: {
    head: {
      meta: [
        {
          property: "og:image",
          content: "./img/logo/logo_horizontal.svg",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "stylesheet",
          href: "https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css",
        },
      ],
      script: [
        {
          src: "https://buttons.github.io/buttons.js",
          body: true,
          async: true,
          defer: true,
        },
        {
          src: "https://plausible.io/js/script.js",
          body: true,
          defer: true,
          async: true,
          "data-domain": "openobserve.ai",
        },
        {
          src: "/js/clarity.js",
          body: true,
          defer: true,
          async: true,
        },
        {
          src: "/js/zinc.js",
          body: true,
          defer: true,
          async: true,
        },
        {
          src: "/js/rb2b.js",
          body: true,
          defer: true,
          async: true,
        },
        {
          src: "/js/vector_co.js",
          body: true,
          defer: true,
          async: true,
        },
        {
          src: "/js/zoho.js",
          body: true,
          defer: true,
          async: true,
        },
      ],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return ["swiper-container", "swiper-slide"].includes(tag);
      },
    },
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
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900],
      },
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://openobserve.ai/",
    name: "Open Source Observability Platform for Logs, Metrics, Traces, and More – Your Ultimate Dashboard for Alerts and Insights",
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://openobserve.ai/",
      siteName:
        "Open Source Observability Platform for Logs, Metrics, Traces, and More – Your Ultimate Dashboard for Alerts and Insights",
      siteDescription:
        "OpenObserve is a cloud native open source observability platform built specifically for logs, metrics, traces and analytics designed to work at petabyte scale.",
      language: "en",
      titleSeparator: "|",
      trailingSlash: false,
    },
    indexable: true,
  },

  build: {
    transpile: ["clsx"],
  },

  robots: {
    // sitemap: ["https://zinc.struct.ai/sitemap.xml"],
  },

  compatibilityDate: "2024-09-23",
});
