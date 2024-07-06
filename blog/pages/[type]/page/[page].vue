<template>
  <div class="overflow-x-hidden">
  <BreadCrumbs class="md:pt-0 pt-3" :title="getLabelFromType(type)" :paths="[{ name: 'Home', to: '/' }, { name: getLabelFromType(type) }]"/>
  
    <div class="md:px-14 px-5 py-8">
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
              :pathPrefix="`/${type}/page`"
            />
          </div>
        </div>
        <blog-sidebar :type="type"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getLabelFromType } from '~/blog/utils/typeUtils';

const route = useRoute();
const router = useRouter();

const type = route.params.type;

definePageMeta({
  middleware: (to, from) => {
    if (to.params.page == 1) {
      return navigateTo(`/${to.params.type}`, { redirectCode: 301 })
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
  queryContent(`/${getContentFolder(type)}/authors`).findOne()
);
const authors = authorsTemp?.value.authors;

// get categories
let { data: categories } = await useAsyncData(`${type}-categories`,() => getCategories(type));

// get tags
let { data: tags } = await useAsyncData(`${type}-tags`,() => getTags(type));

const { data: allArticles } = await useAsyncData(() =>
  queryContent(`/${getContentFolder(type)}/posts`).find()
);

let { data: recentArticles } = await useAsyncData(`${type}-recent-articles`,() => getRecentArticles(type));

useHead({
  title: getLabelFromType(type),
  meta: [
    {
      name: "description",
      content: `${getLabelFromType(type)} Posts`,
    },
  ],
});
</script>

<style></style>
