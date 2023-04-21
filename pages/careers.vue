<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Careers"
      :paths="[{ name: 'Home', to: '/' }, { name: 'Careers' }]"
    />
    <div class="mt-10">
      <SectionHeading :title="data1.heading" />
      <Feature variant="1:1" direction="left" :data="data1" />
      <Feature variant="1:1" direction="right" :data="data2" />
    </div>

    <!-- <Card :items="cardItems" :backgroundImage="false"/> -->
    <Hiring />
  </div>
</template>
<script setup>
const seoData = {
  title: "Careers",
  desc: "",
};
const data1 = {
  heading: "Company overview",
  title: "Revolutionizing the Way Businesses Optimize Their Systems",
  desc1:
    "Zinc Labs is a technology company that provides innovative solutions for modern businesses. Zinc Labs' mission is to empower organizations to optimize their systems, streamline their operations, and make data-driven decisions. The company's solutions are designed to help businesses unlock the full potential of their data by providing advanced search and observability technologies.",
  desc2:
    "Zinc Labs is committed to providing exceptional customer service and support to its customers. The company works closely with its customers to understand their unique business needs and provide tailored solutions that meet those needs. With Zinc Labs, businesses can rest assured that they have a reliable partner in their technology journey.",
  image: "/img/feature.svg",
};
const data2 = {
  title:
    "Experience the Next Generation of Observability and Search Technology",
  desc1:
    "Zinc Labs' innovative products include ZincObserve, a cutting-edge open-source observability platform designed for the cloud that allows you to monitor your logs, metrics, and traces with ease. ZPlane offers an enterprise version of ZincObserve for large businesses to meet their complex requirements.",
  desc2:
    "Both products offer exceptional cost savings and top-notch performance, enabling businesses to gain valuable insights into their systems' health and ultimately improve their software's quality.",
  image: "/img/feature.svg",
};
const cardItems = {
  title: "Why Work with Us?",
  subtitle: "",
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
  ],
};
useSeoMeta(seoData);
</script>
