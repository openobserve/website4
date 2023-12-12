<template>
  <div class="-mx-8 w-3/12 hidden lg:block">
    <div class="">
      <div v-if="false" class="mt-1 px-8">
        <h4 class="mb-4 text-xl font-medium text-gray-700">Categories</h4>
        <div
          class="
            flex flex-col
            bg-white
            px-4
            py-6
            max-w-sm
            mx-auto
            rounded-lg
            border
          "
        >
          <ul>
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="mb-2"
            >
              <nuxt-link
                :to="'/blog/category/' + category.slug"
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
      <div class="mt-1 px-8">
        <h4 class="mb-4 text-xl font-medium text-gray-700">Tags</h4>
        <div
          class="
            flex flex-col
            bg-white
            py-6
            max-w-sm
            mx-auto
            rounded-lg
          "
        >
          <ul>
            <li v-for="(tag, index) in tags" :key="index" class="mb-2">
              <nuxt-link
                :to="'/blog/tag/' + tag.slug"
                class="text-gray-700"
              >
                <div class="flex flex-row">
                  <div>&gt;&nbsp;&nbsp;</div>
                  <div
                    class="hover:text-theme-primary transition-all duration-200"
                  >
                    {{ tag.name }}
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
                      {{ tag.postCount }}
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
                :to="`/blog/${article.slug}`"
                class="
                  text-base text-gray-700
                  font-normal
                  hover:text-theme-primary
                  transition-all
                  duration-150
                "
              >
                {{ article.title }}
              </nuxt-link>
            </div>
            <div class="flex justify-between items-center mt-4">
              <div class="flex items-center">
                <nuxt-link
                  :to="'/blog/author/' + article.authors?.[0]"
                  class="text-gray-700 text-sm font-light mr-3 hover:underline"
                >
                  {{ authors?.find((a) => a.slug == article?.authors?.[0])?.name }} 
                  {{ article.authors?.length > 1 ? (" (+" + (article.authors.length - 1 )+ ")") : "" }}
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
const { data: authorsTemp } = await useAsyncData(() =>
  queryContent("/blog/authors").findOne()
);
const authors = authorsTemp?.value.authors;

// get categories
let { data: categories } = await useAsyncData(() => getCategories());

// get tags
let { data: tags } = await useAsyncData(() => getTags());

// get allArticles
const { data: allArticles } = await useAsyncData(() =>
  queryContent("blog/posts").find()
);

// get recentArticles
let { data: recentArticles } = await useAsyncData(() => getRecentArticles());

const dataVariables = reactive({
  selectedMonth: "",
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en", options);
};

const getAuthorImage = (author) => {
  // return author.img;
  return author.img && `/img/blog/${author.img}`;
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

const archiveMonths = computed(() => {
  const months = new Set();
  allArticles?.value?.forEach((el) => {
    if (!el.publishDate) {
      return;
    }

    const date = new Date(el.publishDate);
    const dateStr =
      date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
    months.add(dateStr);
  });

  const monthsArray = [...months].sort().reverse();
  if (monthsArray.length > 0) {
    dataVariables.selectedMonth = monthsArray[0];
  }
  return monthsArray;
});

const currentSelectedMonthArticles = computed(() => {
  const [year, month] = dataVariables.selectedMonth.split("-");
  return allArticles.value.filter((it) => {
    const date = new Date(it.publishDate);
    return date.getFullYear() == year && date.getMonth() == parseInt(month) - 1;
  });
});
</script>

<style></style>
