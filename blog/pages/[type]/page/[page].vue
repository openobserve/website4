<template>
  <div class="overflow-x-hidden">
    <BreadCrumbs
      class="md:pt-0 pt-3"
      :title="getLabelFromType(type)"
      :paths="[{ name: 'Home', to: '/' }, { name: getLabelFromType(type) }]"
    />

    <div class="md:px-14 px-4 py-8">
      <div class="flex container mx-auto">
        <div class="w-full lg:w-9/12">
          <!-- Search input field -->
          <div
            class="search-container flex items-start w-full max-w-md"
          >
            <div class="relative w-full">
              <!-- Search Icon -->
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37"
                />
              </svg>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                :placeholder="placeholderText"
                class="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 transition-all duration-200"
              />
            </div>
          </div>

          <div
            v-if="searchQuery && filteredResults.length === 0"
            class="no-data-found text-gray-600 mt-4"
          >
            No articles found matching
            <span class="font-semibold">{{ searchQuery }}</span>
          </div>
          <div
            v-if="searchQuery && filteredResults.length > 0"
            class="no-data-found text-gray-600 mt-4"
          >
            Search results for
            <span class="font-semibold">{{ searchQuery }}</span>
          </div>
          <!-- Blog list with filtered articles -->
          <blog-list
            class="mt-2"
            :articles="searchQuery ? filteredResults : articles"
            :authors="authors"
            :categories="categories"
            :searchQuery="searchQuery"
            :tags="tags"
            :type="type"
          />

          <!-- Conditionally render pagination if searchQuery is not active -->
          <div v-if="!searchQuery && totalArticles > 0" class="mt-8">
            <blog-pagination
              :currentPage="currentPage"
              :total="totalArticles"
              :totalPages="lastPage"
              :pathPrefix="`/${type}/page`"
            />
          </div>
        </div>
        <blog-sidebar :type="type" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { getLabelFromType } from "~/blog/utils/typeUtils";
import { debounce } from "lodash-es";

const route = useRoute();
const router = useRouter();
const type = route.params.type;


// Define page metadata
definePageMeta({
  middleware: (to, from) => {
    if (to.params.page == 1) {
      return navigateTo(`/${to.params.type}`, { redirectCode: 301 });
    }
  },
});

const nuxtApp = useNuxtApp();

// Fetch articles
const { data: articlesTemp } = await useAsyncData(
  "get-articles-" + JSON.stringify(route.params),
  () => getArticles(route.params, {}, nuxtApp)
);

const { articles, totalArticles, lastPage, currentPage } = articlesTemp.value;

// Fetch all articles for search
const allArticlesParam = { perPage: 10000000000, type: type };
const { data: articlesAllTemp } = await useAsyncData(
  "get-articles-all-" + JSON.stringify(allArticlesParam),
  () => getArticles({ perPage: 10000000000, type: type }, {}, nuxtApp)
);
const { articles: articlesAll } = articlesAllTemp.value;

// Fetch authors
const { data: authorsTemp } = await useAsyncData(() =>
  queryContent(`/${getContentFolder(type)}/authors`).findOne()
);
const authors = authorsTemp?.value.authors;

// Fetch categories and tags
let { data: categories } = await useAsyncData(`${type}-categories`, () =>
  getCategories(type)
);
let { data: tags } = await useAsyncData(`${type}-tags`, () => getTags(type));

// Search query for filtering
const searchQuery = ref("");
const loading = ref(false);
const filteredResults = ref([]);


// Filtered articles based on search query
const debouncedSearch = async () => {
  loading.value = true;

  // Apply filter directly to the articles array
  if (searchQuery.value) {
    filteredResults.value = articlesAll.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else {
    filteredResults.value = []; // Reset when the search is cleared
  }

  loading.value = false;
}
watch(searchQuery, debouncedSearch);

// Fetch recent articles
let { data: recentArticles } = await useAsyncData(
  `${type}-recent-articles`,
  () => getRecentArticles(type)
);

useHead({
  title: getLabelFromType(type),
  meta: [
    {
      name: "description",
      content: `${getLabelFromType(type)} Posts`,
    },
  ],
});
let placeholderText = "Search for a " + getLabelFromType(type) +  "...";
</script>

<style>
/* Add custom styles for the loader if needed */
.loader {
  border: 2px solid transparent;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
