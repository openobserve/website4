<template>
  <div class="">
    <div
      class="w-full bg-cover bg-[url('/img/footerbg.png')] bg-no-repeat h-full"
    >
      <footer class="w-full body-font pt-20">
        <div
          class="lg:container px-6 py-10 lg:mx-auto flex md:items-center lg:items-start md:flex-row flex-wrap flex-col w-full"
        >
          <div
            class="w-full md:w-1/3 lg:w-1/4 md:mx-0 mx-auto md:text-left lg:mt-16"
          >
            <nuxt-link href="#">
              <div class="flex justify-center md:justify-start">
                <img
                  :src="footerData.logo"
                  class="h-20 w-40 object-contain"
                  alt="openobserve logo"
                />
              </div>
            </nuxt-link>
            <p class="lg:mt-1 text-sm text-black text-center md:text-left">
              {{ footerData.address }}
            </p>
          </div>
          <div
            class="flex justify-center w-full md:w-2/3 lg:w-3/4 pl-0 md:pl-5 mt-20 lg:mt-20 text-center md:text-left"
          >
            <div
              class="flex flex-col md:space-x-10 lg:space-x-28 space-y-6 md:space-y-0 md:flex-row"
            >
              <div class="w-full">
                <div class="flex flex-col text-black">
                  <h3 class="font-bold text-lg pb-2 text-center md:text-left">
                    {{ footerData.quickLink.title }}
                  </h3>
                </div>
                <ul>
                  <li
                    class="list-none mb-2 text-black text-center md:text-left"
                    v-for="(item, index) in footerData.quickLink.content"
                  >
                    <nuxt-link
                      :href="item.link"
                      :target="item.target"
                      :key="index"
                      class="text-center font-medium tetx-white text-sm md:text-sm hover:text-theme-primary-500 transform duration-100 hover:underline hover:underline-offset-4"
                    >
                      {{ item.text }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <div class="flex flex-col text-black">
                  <h3 class="font-bold text-xl pb-2 text-center md:text-left">
                    {{ footerData.docs.title }}
                  </h3>
                </div>
                <ul>
                  <li
                    class="list-none mb-2 text-black text-center md:text-left"
                    v-for="(item, index) in footerData.docs.content"
                  >
                    <nuxt-link
                      :href="item.link"
                      :target="
                        item.text == 'Get Started For Free' ? '_blank' : ''
                      "
                      :key="index"
                      class="font-medium text-sm hover:text-theme-primary-500 transform duration-100 hover:underline hover:underline-offset-4"
                    >
                      {{ item.text }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <div class="flex flex-col space-y-2 text-black">
                  <h3 class="font-bold text-xl text-center md:text-left">
                    {{ footerData.items.title }}
                  </h3>
                  <div class="flex justify-start hover:text-theme-primary-500">
                    <img
                      :src="footerData.items.emailicon"
                      class="max-h-4 mr-2"
                      alt="Email"
                    />
                    <a
                      class="font-semibold text-sm text-center md:text-left"
                      :href="'mailto:' + footerData.items.email"
                      target="_blank"
                      >{{ footerData.items.email }}</a
                    >
                  </div>
                  <div class="flex justify-start hover:text-theme-primary-500">
                    <img
                      :src="footerData.items.callicon"
                      class="max-h-4 mr-2"
                      alt="Phone"
                    />
                    <a
                      class="font-semibold text-sm text-center md:text-left md:whitespace-nowrap"
                      :href="'tel:' + footerData.items.phone"
                      >{{ footerData.items.phone }}</a
                    >
                  </div>
                  <div class="flex flex-row space-x-4">
                    <div
                      class="mt-4 flex flex-row justify-between"
                      v-for="(item, index) in footerData.social"
                    >
                      <nuxt-link :to="item.link" :key="index" target="_blank">
                        <img
                          :src="item.icon"
                          class="max-h-6 flex justify-between"
                          alt="social media icon"
                        />
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div class="bg-theme-primary-200 bg-opacity-20 text-black py-4 flex">
        <div
          class="mx-auto w self-center px-4 text-center flex flex-col md:flex-row"
        >
          <div>OpenObserve Inc. © {{ currentYear }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentYear = computed(() => {
  return new Date().getFullYear();
});
const footerData = {
  logo: "/img/logo/logo_horizontal.svg",
  address:
    "315 Montgomery St, 10th Floor, San Francisco, California,94104, United States of America",
  quickLink: {
    title: "Quick Links",
    content: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About Us",
        link: "/about",
      },
      {
        text: "Contact Us",
        link: "/contactus",
      },
      {
        text: "Careers",
        link: "/careers",
      },
      {
        text: "Blog",
        link: "/blog",
      },
      {
        text: "Resources",
        link: "/resources",
      },
      {
        text: "Knowledge Base",
        link: "https://discuss.openobserve.ai/kb",
        target: "_blank",
      },
    ],
  },
  docs: {
    title: "Docs",
    content: [
      {
        text: "Privacy Policy",
        link: "/policies/privacy-policy",
      },
      {
        text: "Terms Of Service",
        link: "/policies/terms-of-service",
      },
    ],
  },
  items: {
    title: "Get In Touch",
    emailicon: "/img/gmail.svg",
    email: "hello@openobserve.ai",
    callicon: "/img/phone-call.svg",
    phone: "+1 (415) 429-6096",
    linkdn: "",
    slack: "/img/slack.svg",
    github: "/img/github.svg",
    twitter: "/img/twitter.svg",
  },
  social: [
    {
      icon: "/img/github.svg",
      link: "https://github.com/openobserve/openobserve",
    },
    {
      icon: "/img/slack.svg",
      link: "https://join.slack.com/t/zincobserve/shared_invite/zt-11r96hv2b-UwxUILuSJ1duzl_6mhJwVg",
    },
    {
      icon: "/img/linkdin.svg",
      link: "https://www.linkedin.com/company/openobserve",
    },
    {
      icon: "/img/twitter.svg",
      link: "https://twitter.com/OpenObserve",
    },
  ],
};
</script>

<style scoped></style>
