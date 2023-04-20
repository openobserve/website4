<template>
  <div>
    <BreadCrumbs class="md:pt-0 pt-3" title="Careers" :paths="[{ name: 'Home', to: '/' }, { name: 'Careers' }]" />
    <Card :items="cardItems" :backgroundImage="false"/>
    <Hiring />
  </div>
</template>
<script setup>
const seoData = {
  title:"Careers",
  desc:"",
};
const cardItems = {
  title:"Why Work with Us?",
  subtitle:"",
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
    }
  ]
}
useSeoMeta(seoData)

</script>