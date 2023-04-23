<template>
  <div class="overflow-x-hidden">
  <BreadCrumbs class="md:pt-0 pt-3" title="Blog" :paths="[{ name: 'Home', to: '/' }, { name: 'Blog' }]"/>
  
    <div class="md:px-14 px-5 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
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
              @pagechanged="pageChanged"
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
  middleware: () => {
    if (route.params.page == 1) {
      return navigateTo("301", "/blog/" + route.params.category);
    }
  },
});

const nuxtApp = useNuxtApp();

const { data: articlesTemp } = await useAsyncData(
  "get-articles-" + JSON.stringify(route.params),
  () => getArticles(route.params, {}, nuxtApp)
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

let { data: recentArticles } = await useAsyncData(() => getRecentArticles());

const pageChanged = (pageNo) => {
  router.push("/blog/page/" + pageNo);
};

useHead({
  title: "Blog",
  meta: [
    {
      name: "description",
      content: "Blog Posts",
    },
  ],
});
</script>

<style></style>
