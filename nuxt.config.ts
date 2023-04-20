export default defineNuxtConfig({
  extends: ["@nuxt-themes/docus", "./blog", 'nuxt-seo-kit'],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts",'@vueuse/nuxt'],
  css: ["@/assets/css/main.css"],
  components: {
    // component directories with the subdirs listed first for using the default names
    dirs: [
      "~/components/core",
      "~/components/common",
      "~/components/header",
      "~/components",
    ],
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
   runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
      siteName: 'Zinclab',
      siteDescription: 'Welcome to ZincLab',
      language: 'en',
       titleSeparator: '|',
         trailingSlash: false,
       // prefer more explicit language codes like `en-AU` over `en`
    },
     runtimeConfig: {
    indexable: false
  },
  },
   linkChecker: {
    failOn404: true,
  },
    unhead: {
    ogTitleTemplate: '%s | My Website',
  }
  // googleFonts: {
  //   families: {
  //     Montserrat: [400],
  //   },
  //   display: "swap",
  //   preconnect: true,
  //   prefetch: true,
  // },
});
