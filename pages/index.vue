<template>
  <div>
    <HeroSection :data="heroSection"></HeroSection>
    <Numbers :items="numbers" />
     <Feature :items="products.items" :title="products.title"/>
    <Cards :items="useCases" />
     <Feature :items="cardItems.items" :title="cardItems.title" :subtitle="cardItems.subtitle"/>
    <Cards :items="useCases2" :background-image="null" />
    <FaqSection :items="faqData" />
    <LatestBlogPosts />
  </div>
</template>
<script setup>
const seoData = {
  title: "ZincLabs",
  desc: "zinclab is a software products",
};

const products = {
  title: "Unveiling Our Top-Notch Products",
  items: [
    {
      title: "<span class='highlight'>ZincObserve</span>",
      subtitle: "Get more out of your Logs, Metrics & Traces",
      desc: "ZincObserve and Zinc Cloud provide a comprehensive solution for achieving application observability goals with ease. With the option of self-hosted ZincObserve or Zinc Cloud,getting started takes less than two minutes. <br /><br />By consolidating logs, metrics, and traces in a single system, ZincObserve enables full observability for applications at a petabyte scale. ZincObserve's Embedded UI, Dashboards, Alerting, Stateless nodes, and other advanced features facilitate faster resolution of application issues and simplified day-two operations. Additionally,ZincObserve's unique approach to data storage and indexing results in upto 140x lower storage costs, making it a cost-effective solution for managing observability.",
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
  subtitle: "Streamline your operations with worry-free observability and simplify your observability setup in just 2 minutes.",
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
  title: "Stay ahead of the curve with the Observability Stack",
  subtitle: "Stay Ahead of the Curve with Zinc Labs: The Revolutionary Log Search and Performance-Driven Software",
  items: [
    // {
    //   image: "/img/homepage/zinclabfeature1.svg",
    //   title: "Maintaining the System is a Breeze with No Hassles",
    //   desc: "Zinc Labs ensures that their software is stable and can heal itself automatically in case of issues. The majority of users can start using the system efficiently with zero configuration.",
    //   btnText: "",
    // },
    // {
    //   image: "/img/homepage/zinclabfeature2.svg",
    //   title: "Effortless Installation and User-Friendly Interface for Seamless Experience",
    //   desc: "Zinc Labs believes that setting up and using their software should be straightforward and hassle-free. With Zinc Labs, you can install the self-hosted option or sign up for the SaaS platform in under two minutes. ",
    //   btnText: "",
    // },
    {
      image: "/img/feature.webp",
      tagline: "EFFICIENT",
      title: "Functionality and features exceptionally designed to optimize efficiency and performance",
      desc: "We have excellent supporting functions such as Search around logs, VRL (Vector Remap Language) functions.  The advanced embedded UI and API are top-notch, providing an excellent user experience. The software provides visibility into your application with metrics and traces and the ability to correlate them. We have customized Dashboards that provide you with advanced data analytics.",
      btnText: "",
    },
    {
      image: "/img/feature.webp",
      tagline: "BUDGET FRIENDLY",
      title: "Affordable Pricing for Optimum Value",
      desc: "We believe that you should not have to spend a fortune to run their software, either in self-hosted mode or for the SaaS platform. ZincObserve has a distinct method of storing and organizing data that leads to a significant reduction in storage costs, up to 140 times lower than other options. As a result, it is an economical solution for overseeing and managing observability.",
      btnText: "",
    },
    // {
    //   image: "/img/feature.webp",
    //   title: "Seamless Learning Experience for all Users: Beginners to Advanced",
    //   desc: "Zinc Labs software is easy to set up and use, even for a beginner. Advanced users can use their existing skills to take advantage of the software's full potential.",
    //   btnText: "",
    // },
    {
      image: "/img/feature.webp",
      tagline: "SAMLESS USER EXPERIENCE",
      title: "10x easier to operate",
      desc: "Our software is designed to ensure that setting up and utilizing it is a straightforward and hassle-free experience for our users. You can install the self-hosted option or sign up for the SaaS platform in under two minutes. You can start ingesting data and observing the behavior of your applications without any major configuration.In addition, it supports hassle-free software upgrades, making it more convenient for users.",
      btnText: "",
    },
  ],
};

const useCases = {
  title: "Search, Observe, and Analyze with ZincObserve",
  subtitle: "Accelerate your cloud operations with ZincObserve's Search, Observability, and Analysis platform",
  items: [
    {
      image: "/img/homepage/zinclabfeature1.svg",
      title: "Search",
      desc: "Enhance both customer satisfaction and employee productivity by utilizing powerful search capabilities to help everyone find what they need, precisely when they need it. This not only reduces costs and management overhead, but also enables you to concentrate on delivering exceptional search experiences.",
      // to: "/usecases/logs"
    },
    {
      image: "/img/homepage/zinclabfeature2.svg",
      title: "Observe",
      desc: "Leverage complete end-to-end visibility across all your applications and infrastructure to promptly identify and resolve issues before they have an adverse impact on your business. Streamline management processes and access historical data effortlessly, to perform in-depth root-cause analysis.",
      btnText: "",
      // to: "/usecases/metrices"
    },
    {
      image: "/img/homepage/zinclabfeature3.svg",
      title: "Analyze",
      desc: "With the most widely deployed observability solution, you can trust in a tool built to unify metrics, logs, and traces, resulting in seamless visibility and valuable insights. Ready-to-Analyze dashboards and scheduled, real-time, and target-based alerting mechanisms simplify your analysis needs, allowing you to quickly and efficiently identify critical issues and take proactive measures to address them.",
      btnText: "",
      // to: "/usecases/traces"
    },
  ],
};

const useCases2 = {
  title: "Use Cases",
  subtitle: "Get more from your data with ZincObserve",
  items: [
    {
      image: "/img/homepage/zinclabfeature1.svg",
      title: "Logs",
      desc: "The software provides an advanced embedded GUI for fast log searching with features like top 10, search around, SQL for query and custom VRL functions. It also has ingest and query time functions, making it suitable for both beginners and advanced users to build and run sophisticated queries.",
      to: "/usecases/logs"
    },
    {
      image: "/img/homepage/zinclabfeature2.svg",
      title: "Metrics",
      desc: "The software offers long-term storage for Prometheus metrics in S3 with support for SQL and PromQL. Correlating logs and traces with metrics provides a comprehensive view of infrastructure, and high cardinality data storage offers a new level of functionality.",
      btnText: "",
      to: "/usecases/metrices"
    },
    {
      image: "/img/homepage/zinclabfeature3.svg",
      title: "Traces",
      desc: "Distributed tracing provides a means to identify performance problems within a microservices architecture with precision. Traces enables pinpointing issues that would otherwise be difficult to detect.",
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
