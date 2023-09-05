<template>
  <div class="overflow-x-hidden">
    <BreadCrumbs
      class="md:pt-0 pt-3"
     :title="'Author: ' + author.name"
      :paths="[
        { name: 'Home', to: '/' },
        { name: 'Blog', to: '/blog' },
        { name: 'Author' },
      ]"
    />
  
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-9/12">
          <div class="flex items-center justify-between"></div>
          <blog-list
            :articles="articles"
            :authors="authors"
            :categories="categories"
            :tags="tags"
          />
          <div class="mt-8">
            <blog-pagination
              :currentPage="currentPage"
              :total="totalArticles"
              :totalPages="lastPage"
              :pathPrefix="'/blog/author/' + route.params.author + '/page'"
            />
          </div>
        </div>
        <blog-sidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

definePageMeta({
  middleware: (to, from) => {
    if (to.params.page == 1) {
      return navigateTo("/blog/author/" + to.params.author, { redirectCode: 301 })
    }
  },
});

const nuxtApp = useNuxtApp();

const { data: articlesTemp } = await useAsyncData(
  "get-articles-" + JSON.stringify(route.params).replace(/\{|\}|\:|\s"/g, "-"),
  () =>
    getArticles(
      route.params,
      {
        type: "author",
        value: route.params.author,
      },
      nuxtApp
    )
);
const { articles, totalArticles, lastPage, currentPage } = articlesTemp.value;

const { data: authorsTemp } = await useAsyncData(() =>
  queryContent("/blog/authors").findOne()
);
const authors = authorsTemp?.value.authors;

// get categories
let { data: categories } = await useAsyncData(() => getCategories());

// get tags
let { data: tags } = await useAsyncData(() => getTags());

const { data: allArticles } = await useAsyncData(() =>
  queryContent("blog/posts").find()
);

const author = authors?.find((it) => it.slug == route.params.author);
let { data: recentArticles } = await useAsyncData(() => getRecentArticles());

useHead({
  title: "Author | Blog",
  meta: [
    {
      name: "description",
      content: "Blog Posts",
    },
  ],
});
</script>

<style></style>
