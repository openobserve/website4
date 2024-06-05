<template>
  <Section>
    <SectionHeading :title="blogItems.title" :subtitle="blogItems.subtitle" />
    <div class="grid grid-cols-1 md:grid-cols-3 container mx-auto px-4 gap-x-6 lg:gap-x-12 gap-y-10 md:gap-y-20">
      <BlogItem :item="item" :key="index" v-for="(item, index) in blogItems.items" />
    </div>
  </Section>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
  },
});

const type = "blog";

let { data: recentArticles } = await useAsyncData(`${type}-recent-articles`,() => getRecentArticles(type));

const blogItems = {
  title: "Latest Blog Posts",
  subtitle: "",
  items: recentArticles.value,
  // [
  //   {
  //     image:
  //       "https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
  //     title: "Software Products",
  //     desc: "Top 5 Trends That Retailers Are Using In 2023",
  //     btnText: "Read More",
  //     href: "#"
  //   },
  //   {
  //     image:
  //       "https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
  //     title: "Software Products",
  //     desc: "Top 5 Trends That Retailers Are Using In 2023",
  //     btnText: "Read More",
  //     href: "#"

  //   },
  //   {
  //     image:
  //       "https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
  //     title: "Software Products",
  //     desc: "Top 5 Trends That Retailers Are Using In 2023",
  //     btnText: "Read More",
  //     href: "#"

  //   },
  //   //  {
  //   //    image:"https://media.istockphoto.com/id/1320764737/photo/a-worker-is-using-tablet-to-review-storage-report-business-management-and-technology-concept.jpg?b=1&s=170667a&w=0&k=20&c=U0B3eA-dGO5AAf7fTaFbrWlfeflQH0QVgVku83NgqEY=",
  //   //    title:"Software Products",
  //   //    desc:"Top 5 Trends That Retailers Are Using In 2023",
  //   //    btnText: "Read More"
  //   //  }
  // ],
};
</script>
