<template>
  <div>
    <HeroSection :data="heroSection"></HeroSection>
    <Numbers :items="numbers" />
    <SlideIn>
      <Section>
        <SectionHeading
          :title="data1.heading"
          
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
  heading:"Our Products",
  title: "Get More with <span style='color:#5960B2;'>ZincObserve</span> - Logs, Metrics, Traces",
  desc1: "ZincObserve and Zinc Cloud provide a comprehensive solution for achieving application observability goals with ease. With the option of self-hosted ZincObserve or Zinc Cloud,getting started takes less than two minutes.",
  desc2:"By consolidating logs, metrics, and traces in a single system, ZincObserve enables full observability for applications at a petabyte scale. ZincObserve's Embedded UI, Dashboards, Alerting, Stateless nodes, and other advanced features facilitate faster resolution of application issues and simplified day-two operations. Additionally,ZincObserve's unique approach to data storage and indexing results in 140x lower storage costs, making it a cost-effective solution for managing observability.",
  image: "/img/feature.svg",
};
const data2 = {
  title: "Take your observability to the next level with <span style='color:#5960B2;'>zPlane</span> , built for the needs of larger enterprises.",
  desc1: "ZPlane is a set of additional features that are only available in the enterprise version of ZincObserve. These features are designed to provide enhanced functionality and flexibility to meet the needs of larger organizations with more complex use cases.",
  desc2:"The zPlane features currently offered in the enterprise version of ZincObserve include Elasticsearch API compatibility, single sign-on (SSO), cross-cluster search, and priority support with service level agreements (SLAs).",
  image: "/img/feature.svg",
};
const data3 = {
  title: "ZincObserve is Built for Full - Text Search",
  desc: "ZincObserve is a search engine that can be used for text data, logs, metrics, events, and more. It allows you to do a full-text search, among other things, including sending server logs to ZincObserve, pushing your application data, providing a full-text search, or building a search bar in your application.",
  image: "/img/feature.webp",
  bgImage: "/img/featurebg3.svg",
};
const heroSection = {
  title: "10x" + "<span style='color:#5960B2;'> lower cost </span>" + "than your existing" + "<span style='color:#5960B2;'> observability</span>" + " tools.",
  subtitle: " Streamline Your Operations with Worry-Free Observability - Logs,Metrics, Traces and More in One Platform",
  image: "/img/homepage/herosectionImage2.svg",
  btnText: "",
  backgroundImage: "/img/homepage/homepagebg3.svg",
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
  title: "Why Choose Zinc Labs?",
  subtitle:"Stay Ahead of the Curve with Zinc Labs: The Revolutionary Log Search and Performance-Driven Software",
    items: [
    {
      image: "/img/homepage/zinclabfeature1.svg",
      title: "Maintaining the System is a Breeze with No Hassles",
      desc: "Zinc Labs ensures that their software is stable and can heal itself automatically in case of issues. The majority of users can start using the system efficiently with zero configuration.",
      btnText: "",
    },
    {
      image: "/img/homepage/zinclabfeature2.svg",
      title: "Effortless Installation and User-Friendly Interface for Seamless Experience",
      desc: "Zinc Labs believes that setting up and using their software should be straightforward and hassle-free. With Zinc Labs, you can install the self-hosted option or sign up for the SaaS platform in under two minutes. ",
      btnText: "",
    },
    {
      image: "/img/homepage/zinclabfeature3.svg",
      title: "Functionality and Features Excellently Designed to Optimize Efficiency and Performance",
      desc: "Zinc Labs has excellent features and functionality that make it highly usable from the get-go, providing excellent ROI on the invested time.",
      btnText: "",
    },
    {
      image: "/img/homepage/zinclabfeature4.svg",
      title: "Affordable Pricing for Optimum Value",
      desc: "Zinc Labs believes that you should not have to spend a fortune to run their software, either in self-hosted mode or for the SaaS platform.",
      btnText: "",
    },
    {
      image: "/img/homepage/zinclabfeature5.svg",
      title: "Seamless Learning Experience for all Users: Beginners to Advanced",
      desc: "Zinc Labs software is easy to set up and use, even for a beginner. Advanced users can use their existing skills to take advantage of the software's full potential.",
      btnText: "",
    },
    {
      image: "/img/homepage/zinclabfeature6.svg",
      title: "Exceptional Performance with High Efficiency.",
      desc: "Zinc Labs software is highly performant, making it an excellent choice for most use cases in the real world. The software provides an excellent tradeoff value in return, making it generally acceptable to the majority of users.",
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
