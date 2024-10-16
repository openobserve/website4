<template>
  <div class="overflow-x-hidden">
    <BreadCrumbs
      class="md:pt-0 pt-3"
     :title="'Author: ' + author.name"
      :paths="[
        { name: 'Home', to: '/' },
        { name: getLabelFromType(type), to: `/${type}` },
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
            :type="type"
          />
          <div class="mt-8">
            <blog-pagination
              :currentPage="currentPage"
              :total="totalArticles"
              :totalPages="lastPage"
              :pathPrefix="`/${type}/author/${route.params.author}/page`"
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
      return navigateTo(`/${to.params.type}/author/${to.params.author}`, { redirectCode: 301 })
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
  queryContent(`/${getContentFolder(type)}/authors`).findOne()
);
const authors = authorsTemp?.value.authors;

// get categories
let { data: categories } = await useAsyncData(`${type}-categories`,() => getCategories(type));

// get tags
let { data: tags } = await useAsyncData(`${type}-tags`,() => getTags(type));


const author = authors?.find((it) => it.slug == route.params.author);

useHead({
  title: `Author | ${getLabelFromType(type)}`,
  meta: [
    {
      name: "description",
      content: `${getLabelFromType(type)} Posts`,
    },
  ],
});
</script>

<style></style>
