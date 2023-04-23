<template>
  <HeroSection :data="heroSection" :required="false"></HeroSection>
  <WhatWeDo :data="content" />
  <Section>
    <div 
    :style="{ backgroundImage: `url(${items.backgroundImage})` }"
      class="background py-16"
  >
    <SectionHeading :title="data.heading" />
    <Feature variant="1:1" :data="data" />
  </div>

  </Section>
  
    <Investors :data="items" />

</template>
<script setup>
const seoData = {
  title: "About Us",
  desc: "",
};
const data = {
  heading: "Why We Do",
  title: "ZincObserve is Built for Full - Text Search",
  desc: "ZincObserve is a search engine that can be used for text data, logs, metrics, events, and more. It allows you to do a full-text search, among other things, including sending server logs to ZincObserve, pushing your application data, providing a full-text search, or building a search bar in your application.",
  image: "/img/feature.svg",
};
const heroSection = {
  title: "Making Data-Driven Decisions Easier than Ever!",
  subtitle: "",
  image: "/img/aboutus/abouthero.png",
  btnText: "Get Started For Free",
  btnTo: "https://observe.zinc.dev/",
  btnTarget: "_blank",
  backgroundImage: "/img/aboutus/aboutusbg.png",
};
const content = {
  title: "What We Do",
  para1:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ligula metus, molestie rutrum rhoncus sit amet, maximus sit amet augue. Donec non magna enim. Fusce maximus lobortis auctor. Duis pretium ipsum sed blandit sollicitudin. Curabitur venenatis sapien non laoreet ornare. Aliquam tincidunt pharetra commodo.",
  para2:
    "Phasellus bibendum, nulla sed euismod tristique, dui risus dignissim lorem, sed egestas purus tortor sit amet orci. Aliquam pharetra scelerisque convallis. Nulla vulputate interdum dignissim. Etiam sit amet dignissim elit. Fusce convallis varius ipsum, in suscipit sem faucibus et. In placerat faucibus porta. Suspendisse commodo facilisis orci, sit amet cursus mi sodales at. Fusce non ante facilisis, dignissim augue sit amet, semper mi. Integer accumsan maximus lobortis. Duis fringilla, sem vitae vestibulum ullamcorper,",
};
const items = {
  title: "Investors",
  backgroundImage:"/img/homepage/cardbg2.svg",
  images1:[
    "/img/aboutus/Investor1.png",
    "/img/aboutus/Investor1.png",
    "/img/aboutus/Investor1.png",
  ],
  images2: ["/img/aboutus/Investor1.png", "/img/aboutus/Investor1.png"],
};
// const cardItems = {
//   title: "ZincObserve Features",
//   subtitle: "It provides a host of features that help you get up and running in minutes.",
//   items: [
//     {
//       image: "/img/CardIcon.svg",
//       title: "Full Text Search",
//       desc: "You can index large amounts of text Zinc and search instantly. Zinc is a batteries-included setup. Embedded UI provides an easy way to get started and interact with your data.",
//       btnText: "",
//     },
//     {
//       image: "/img/CardIcon.svg",
//       title: "Full Text Search",
//       desc: "Zinc is a batteries-included setup. Embedded UI provides an easy way to get started and interact with your data. No need to set up a separate GUI like Kibana.",
//       btnText: "",
//     },
//     {
//       image: "/img/CardIcon.svg",
//       title: "Full Text Search",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       btnText: "",
//     },
//     {
//       image: "/img/CardIcon.svg",
//       title: "Full Text Search",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       btnText: "",
//     },{
//       image: "/img/CardIcon.svg",
//       title: "Full Text Search",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       btnText: "",
//     },
//     {
//       image: "/img/CardIcon.svg",
//       title: "Full Text Search",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       btnText: "",
//     }
//   ]
// }

useSeoMeta(seoData);
</script>
<style scoped>
.background {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: contain;
  width: 100%;
  height: 100%;
  /* width: 100vw; */
  /* height: calc(100vh - 100px); */
  background-position: center;
}
/* @media only screen and (max-width: 768px) {
  .background {
    background-size: 100vw 100vh;
    height: 100vh;
  }
} */
</style>
