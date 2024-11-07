<template>
  <div class="-mx-8 w-3/12 hidden lg:block overflow-y-auto h-[calc(100vh-var(--nav-bar-top-margin))] sticky top-24 scrollbar">
    <div class="">
      <div class="mt-1 px-6">
        <h4 class="mb-4 text-xl font-medium text-gray-700">
          Table of Contents
        </h4>
        <aside class="ml-2">
          <ul>
            <li class="" v-for="link of article.body.toc.links" :key="link.id" :id="link.id">
              <a
                :class="{
                  'text-theme-primary': activeTocId.has(link.id) || link.id === lastActiveTocId,
                  'text-gray-700': link.id !== activeTocId,
                }"
                role="button"
                class="duration-75 text-sm mb-1.5 block hover:text-theme-primary"
                :href="`#${link.id}`"
                >{{ link.text }}</a
                >
              <ul>
                <li class="" v-for="link2 of link.children" :key="link2.id" :id="link2.id">
                  <a
                    :class="{
                      'text-theme-primary': activeTocId.has(link2.id) || link2.id === lastActiveTocId,
                      'text-gray-700': link2.id !== activeTocId,
                      'pl-4': link2.depth === 3,
                    }"
                    role="button"
                    class="duration-75 text-sm mb-1.5 block hover:text-theme-primary"
                    :href="`#${link2.id}`"
                    >{{ link2.text }}</a
                    >
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
      <div v-if="false" class="mt-1 px-8">
        <h4 class="mb-4 text-xl font-medium text-gray-700">Categories</h4>
        <div
          class="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg border"
        >
          <ul>
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="mb-2"
            >
              <nuxt-link
                :to="`/${type}/category/${category.slug}`"
                class="text-gray-700"
              >
                <div class="flex flex-row">
                  <div>&gt;&nbsp;&nbsp;</div>
                  <div
                    class="hover:text-theme-primary transition-all duration-200"
                  >
                    {{ category.name }}
                    <span
                      class="
                        ml-1
                        px-2
                        py-1
                        bg-gray-300
                        text-theme-text-primary
                        rounded-full
                        text-xs
                        h-4
                        w-4
                      "
                    >
                      {{ category.postCount }}
                    </span>
                  </div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="mt-10 px-8">
        <h4 class="mb-4 text-xl font-medium text-gray-700">Archives</h4>
        <div
          class="
            flex flex-col
            bg-white
            max-w-sm
            mx-auto
            rounded-lg
          "
        >
          <select
            v-model="dataVariables.selectedMonth"
            name="archiveMonths"
            id="archiveMonths"
            class="py-2 mb-2 border rounded px-2"
          >
            <option disabled value="">Select</option>
            <option
              v-for="(month, index) in archiveMonths"
              :key="index"
              :value="month"
            >
              {{ formatMonth(month) }}
            </option>
          </select>
          <ul>
            <li
              v-for="(article, index) in currentSelectedMonthArticles"
              :key="index"
              class="mb-2"
            >
              <nuxt-link
                :to="'/blog/' + article.slug"
                class="text-gray-700 font-normal"
              >
                <div class="flex flex-row">
                  <div>&gt;&nbsp;&nbsp;</div>
                  <div
                    class="hover:text-theme-primary transition-all duration-200"
                  >
                    {{ article.title }}
                  </div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div> -->
      <div class="mt-10 px-8">
        <h4 class="mb-4 text-xl font-medium text-gray-700">Recent Posts</h4>
        <div class="max-w-sm mx-auto">
          <div
            v-for="(article, index) in recentArticles"
            :key="index"
            class="flex flex-col py-2 mb-5"
          >
            <div class="">
              <nuxt-link
                :to="`/${type}/${article.slug}`"
                class="text-base text-gray-700 font-normal hover:text-theme-primary transition-all duration-150"
              >
                {{ article.title }}
              </nuxt-link>
            </div>
            <div class="flex justify-between items-center mt-4">
              <div class="flex items-center">
                <nuxt-link
                  :to="`/${type}/author/${article.authors?.[0]}`"
                  class="text-gray-700 text-sm font-light mr-3 hover:underline"
                >
                  {{
                    authors?.find((a) => a.slug == article?.authors?.[0])?.name
                  }}
                  {{
                    article.authors?.length > 1
                      ? " (+" + (article.authors.length - 1) + ")"
                      : ""
                  }}
                </nuxt-link>
              </div>
              <span class="font-light text-sm text-gray-600">
                {{ formatDate(article.publishDate) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { type, article,activeTocId,lastActiveTocId } = defineProps({
  type: {
    type: String,
    required: true,
  },
  article: {
    type: Object,
    required: true,
  },
  activeTocId: {
    type: String,
    required: true,
  },
  lastActiveTocId: {
    type: String,
    required: true,
  }
});
const { data: authorsTemp } = await useAsyncData(`${type}-authors`, () =>
  queryContent(`/${getContentFolder(type)}/authors`).findOne()
);
const authors = authorsTemp?.value.authoractiveTocIds;

// get categories
let { data: categories } = await useAsyncData(`${type}-categories`, () =>
  getCategories(type)
);

// get recentArticles
let { data: recentArticles } = await useAsyncData(
  `${type}-recent-articles`,
  () => getRecentArticles(type)
);

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en", options);
};

const getAuthorImage = (author) => {
  // return author.img;
  return author.img && `/img/${type}/${author.img}`;
};

const formatMonth = (monthYear) => {
  if (monthYear === "") {
    return "";
  }
  const [year, month] = monthYear.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[parseInt(month) - 1] + ", " + year;
};
</script>

<style>
.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(221, 219, 219);
  border-radius: 10px;
  background-color: #f8f6f6;
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(245, 244, 244);
  background-color: #808080;
}

/* Small device styles */
@media (max-width: 768px) {
  .scrollbar::-webkit-scrollbar {
    height: 0px; /* Adjust the height for small devices */
  }
}

/* Large device styles */
@media (min-width: 769px) {
  .scrollbar::-webkit-scrollbar {
    height: 0px; /* Adjust the height for large devices */
  }
}
</style>
