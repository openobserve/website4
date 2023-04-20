<template>
  <div>
    <HeroSection :data="heroSection"></HeroSection>
    <Numbers :items="numbers" />
    <SlideIn>
      <Section>
        <SectionHeading
          :title="cardItems.title"
          :subtitle="cardItems.subtitle"
        />
        <Feature variant="1:1" direction="left" :data="data1" />
        <Feature variant="1:1" direction="right" :data="data2" />
      </Section>
    </SlideIn>
    <Card :items="cardItems" />
    <!-- <Section>
        <div class="bg-[url('/homepage/cardbg2.svg')]  w-full bg-no-repeat bg-cover py-40 ">
          <SectionHeading :title=cardItems.title :subtitle="cardItems.subtitle" align="center" />
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 container mx-auto py-16 px-4">
            <Card align="left" :item="item" :key="index" v-for="(item, index) in cardItems.items" />
          </div>
        </div>
        <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row container mx-auto px-4 mt-6">
          <Card align="left" :item="item" :key="index" v-for="(item, index) in cardItems.items" />
        </div>
      </Section> -->
    <!-- <SlideIn> -->
    <Section>
      <SectionHeading :title="blogItems.title" :subtitle="blogItems.subtitle" />
      <div
        class="grid grid-cols-1 md:grid-cols-3 container mx-auto px-4 gap-x-6 lg:gap-x-12 gap-y-10 md:gap-y-20"
      >
        <Blog
          :item="item"
          :key="index"
          v-for="(item, index) in blogItems.items"
        />
      </div>
    </Section>
    <FaqSection :items="faqData" />
  </div>
</template>
<script setup>
const seoData = {
  title: "zinclab",
  desc: "zinclab is a software products",
};
const data1 = {
  title: "ZincObserve is Built for Full - Text Search",
  desc: "ZincObserve is a search engine that can be used for text data, logs, metrics, events, and more. It allows you to do a full-text search, among other things, including sending server logs to ZincObserve, pushing your application data, providing a full-text search, or building a search bar in your application.",
  image: "/img/feature.svg",
};
const data2 = {
  title: "ZincObserve is Built for Full - Text Search",
  desc: "ZincObserve is a search engine that can be used for text data, logs, metrics, events, and more. It allows you to do a full-text search, among other things, including sending server logs to ZincObserve, pushing your application data, providing a full-text search, or building a search bar in your application.",
  image: "/img/feature.svg",
};
const data3 = {
  title: "ZincObserve is Built for Full - Text Search",
  desc: "ZincObserve is a search engine that can be used for text data, logs, metrics, events, and more. It allows you to do a full-text search, among other things, including sending server logs to ZincObserve, pushing your application data, providing a full-text search, or building a search bar in your application.",
  image: "/img/feature.webp",
  bgImage: "/img/featurebg3.svg",
};
const heroSection = {
  title: "Making Data-Driven Decisions Easier than Ever!",
  subtitle: "",
  image: "/homepage/herosectionImage2.svg",
  btnText: "",
  backgroundImage: "/homepage/homepagebg3.svg",
};
const numbers = {
  title: "About Us",
  subtitle: "",
  items: [
    {
      text: "lorem ipsum dollers nk bej",
      number: "100+",
    },
    {
      text: "lorem ipsum dollers nk bej",
      number: "50",
    },
    {
      text: "lorem ipsum dollers nk bej",
      number: "1%",
    },
    {
      text: "lorem ipsum dollers nk bej",
      number: "40",
    },
  ],
};
const cardItems = {
  title: "ZincObserve Features",
  subtitle:
    "It provides a host of features that help you get up and running in minutes.",
  items: [
    {
      image: "/img/CardIcon.svg",
      title: "Full Text Search",
      desc: "You can index large amounts of text Zinc and search instantly. Zinc is a batteries-included setup. Embedded UI provides an easy way to get started and interact with your data.",
      btnText: "",
    },
    {
      image: "/img/CardIcon.svg",
      title: "Full Text Search",
      desc: "Zinc is a batteries-included setup. Embedded UI provides an easy way to get started and interact with your data. No need to set up a separate GUI like Kibana.",
      btnText: "",
    },
    {
      image: "/img/CardIcon.svg",
      title: "Full Text Search",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      btnText: "",
    },
    {
      image: "/img/CardIcon.svg",
      title: "Full Text Search",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      btnText: "",
    },
    {
      image: "/img/CardIcon.svg",
      title: "Full Text Search",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      btnText: "",
    },
    {
      image: "/img/CardIcon.svg",
      title: "Full Text Search",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      btnText: "",
    },
  ],
};
const blogItems = {
  title: "Latest Blog",
  subtitle: "",
  items: [
    {
      image:
        "https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
      title: "Software Products",
      desc: "Top 5 Trends That Retailers Are Using In 2023",
      btnText: "Read More",
      href:"#"
    },
    {
      image:
        "https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
      title: "Software Products",
      desc: "Top 5 Trends That Retailers Are Using In 2023",
      btnText: "Read More",
      href:"#"

    },
    {
      image:
        "https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
      title: "Software Products",
      desc: "Top 5 Trends That Retailers Are Using In 2023",
      btnText: "Read More",
      href:"#"

    },
    //  {
    //    image:"https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
    //    title:"Software Products",
    //    desc:"Top 5 Trends That Retailers Are Using In 2023",
    //    btnText: "Read More"
    //  }
  ],
};
const faqData = [
  {
    question: "How many programmers does it take to screw a lightbulb?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
    open: true,
  },
  {
    question: "Who is the most awesome person?",
    answer: "You! The viewer!",
    open: false,
  },
  {
    question: "How many questions does it take to makes a succesful FAQ Page?",
    answer: "This many!",
    open: false,
  },
];
useSeoMeta(seoData);
</script>
