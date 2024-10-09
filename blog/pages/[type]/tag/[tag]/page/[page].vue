<template>
  <div class="overflow-x-hidden">
  <BreadCrumbs class="md:pt-0 pt-3" 
    :title="'Tag: ' + tag.name"
      :paths="[
        { name: 'Home', to: '/' },
        { name: getLabelFromType(type), to: `/${type}` },
        { name: 'Tag' },
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
              :pathPrefix="`/${type}/tag/${route.params.tag}/page`"
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

const router = useRouter();
const route = useRoute();

const type = route.params.type;

definePageMeta({
  middleware: (to, from) => {
    if (to.params.page == 1) {
      return navigateTo(`/${to.params.type}/tag/${to.params.tag}`, { redirectCode: 301 });
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
        type: "tag",
        value: route.params.tag,
      },
      nuxtApp
    )
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

// const { data: allArticles } = await useAsyncData(() =>
//   queryContent(`/${getContentFolder(type)}/posts`).find()
// );

const tag = tags?.value?.find((it) => it.slug == route.params.tag);

// let { data: recentArticles } = await useAsyncData(`${type}-recent-articles`,() => getRecentArticles(type));

useHead({
  title: `Tag | ${getLabelFromType(type)}`,
  meta: [
    {
      name: "description",
      content: `${getLabelFromType(type)} Posts`,
    },
  ],
});
</script>

<style></style>
