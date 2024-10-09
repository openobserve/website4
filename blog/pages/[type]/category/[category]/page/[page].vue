<template>
  <div class="overflow-x-hidden">
     <BreadCrumbs
      class="md:pt-0 pt-3"
       :title="'Category: ' + category.name"
      :paths="[
        { name: 'Home', to: '/' },
        { name: getLabelFromType(type), to: `/${type}` },
        { name: 'Category' },
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
            :type="type"
          />
          <div class="mt-8">
            <blog-pagination
              :currentPage="currentPage"
              :total="totalArticles"
              :totalPages="lastPage"
              :pathPrefix="`/${type}/category/${route.params.category}/page`"
            />
          </div>
        </div>
        <blog-sidebar :type="type"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getContentFolder, getLabelFromType } from '~/blog/utils/typeUtils';

const route = useRoute();
const router = useRouter();

const type = route.params.type;

definePageMeta({
  middleware: (to, from) => {
    if (to.params.page == 1) {
      return navigateTo(`/${to.params.type}/category/${to.params.category}`, { redirectCode: 301 })
    }
  },
});

const nuxtApp = useNuxtApp();

const { data: articlesTemp } = await useAsyncData(
  "get-articles-" + JSON.stringify(route.params).replace(/\{|\}|\:|\s"/g, "-"),
  async () =>
    await getArticles(
      route.params,
      {
        type: "category",
        value: route.params.category,
      },
      nuxtApp
    )
);
const { articles, totalArticles, lastPage, currentPage } = articlesTemp?.value;

const { data: authorsTemp } = await useAsyncData(() =>
  queryContent(`/${getContentFolder(type)}/authors`).findOne()
);
const authors = authorsTemp?.value?.authors;

// get categories
let { data: categories } = await useAsyncData(`${type}-categories`,() => getCategories(type));

// get tags
let { data: tags } = await useAsyncData(`${type}-tags`,() => getTags(type));

// const { data: allArticles } = await useAsyncData(() =>
//   queryContent(`/${getContentFolder(type)}/posts`).find()
// );

const category = categories?.value?.find(
  (it) => it.slug == route.params.category
);

// let { data: recentArticles } = await useAsyncData(`${type}-recent-articles`,() => getRecentArticles(type));

useHead({
  title: `Category | ${getLabelFromType(type)}`,
  meta: [
    {
      name: "description",
      content: `${getLabelFromType(type)} Posts`,
    },
  ],
});
</script>

<style></style>
