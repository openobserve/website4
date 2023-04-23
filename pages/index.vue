<template>
  <div>
    <HeroSection :data="heroSection"></HeroSection>
    <Numbers :items="numbers" />
    <SlideIn>
      <Section>
        <SectionHeading :title="products.title" />
        <Feature v-for="(item, index) in products.items" :key="index" :direction="index % 2 == 0 ? 'left' : 'right'" :data="item" />
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
    <Card :items="useCases" />
      
    <LatestBlogPosts />
    <FaqSection :items="faqData" />
  </div>
</template>
<script setup>
const seoData = {
  title: "ZincLabs",
  desc: "zinclab is a software products",
};

const products = {
  title: "Products",
  items: [
    {
      title: "<span class='highlight'>ZincObserve</span>",
      subtitle: "Get more out of your Logs, Metrics & Traces",
      desc: "ZincObserve and Zinc Cloud provide a comprehensive solution for achieving application observability goals with ease. With the option of self-hosted ZincObserve or Zinc Cloud,getting started takes less than two minutes. <br /><br />By consolidating logs, metrics, and traces in a single system, ZincObserve enables full observability for applications at a petabyte scale. ZincObserve's Embedded UI, Dashboards, Alerting, Stateless nodes, and other advanced features facilitate faster resolution of application issues and simplified day-two operations. Additionally,ZincObserve's unique approach to data storage and indexing results in 140x lower storage costs, making it a cost-effective solution for managing observability.",
      image: "/img/feature.svg",
      btnText: "Get Started",
      btnTo: "/products/zincobserve",
      btnVariant: "secondary"
    }, {
      title: "<span class='highlight'>zPlane</span>",
      subtitle: "Built for the needs of larger enterprises",
      desc: "ZPlane is a set of additional features that are only available in the enterprise version of ZincObserve. These features are designed to provide enhanced functionality and flexibility to meet the needs of larger organizations with more complex use cases.<br /><br />The zPlane features currently offered in the enterprise version of ZincObserve include Elasticsearch API compatibility, single sign-on (SSO), cross-cluster search, and priority support with service level agreements (SLAs).",
      image: "/img/feature.svg",
      btnText: "Know More",
      btnTo: "/products/zplane",
      btnVariant: "secondary"
    }
  ]
}
const heroSection = {
  tagline: "Logs, Metrics, Traces and more in one platform",
  title: "10x <span class='highlight'>lower cost</span> than your existing <span class='highlight'>observability</span> tools",
  subtitle: "Streamline your operations with worry-free observability",
  image: "/img/homepage/herosectionImage2.svg",
  btnText: "Get Started For Free",
  btnTo: "https://observe.zinc.dev/",
  btnTarget: "_blank",
  backgroundImage: "/img/homepage/homepagebg3.svg",
};
const numbers = {
  title: "About Us",
  subtitle: "",
  items: [
    {
      text: "Easier",
      number: "10x",
    },
    {
      text: "Lower storage cost",
      number: "140x",
    },
    {
      text: "Scale",
      number: "PB",
    },
    {
      text: "Install time",
      number: "2m",
    },
  ],
};
const cardItems = {
  title: "Features",
  subtitle: "Stay Ahead of the Curve with Zinc Labs: The Revolutionary Log Search and Performance-Driven Software",
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

const useCases = {
  title: "Use Cases",
  subtitle: "Improve user experience with data-driven insights from observability",
  items: [
    {
      image: "/img/homepage/zinclabfeature1.svg",
      title: "Logs",
      desc: "Zinc Labs ensures that their software is stable and can heal itself automatically in case of issues. The majority of users can start using the system efficiently with zero configuration.",
      to: "/usecases/logs"
    },
    {
      image: "/img/homepage/zinclabfeature2.svg",
      title: "Matrics",
      desc: "Zinc Labs believes that setting up and using their software should be straightforward and hassle-free. With Zinc Labs, you can install the self-hosted option or sign up for the SaaS platform in under two minutes. ",
      btnText: "",
      to: "/usecases/metrices"
    },
    {
      image: "/img/homepage/zinclabfeature3.svg",
      title: "Traces",
      desc: "Zinc Labs has excellent features and functionality that make it highly usable from the get-go, providing excellent ROI on the invested time.",
      btnText: "",
      to: "/usecases/traces"
    },
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
