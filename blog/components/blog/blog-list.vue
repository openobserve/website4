<template>
  <div>
    <div v-for="(article, index) in articles" :key="index" class="mb-10">
      <div
        class="
          max-w-4xl
          px-2
          py-2
          bg-white
          rounded-lg
          transition-all
          duration-200
        "
      >
        <div class="flex flex-col md:flex-row items-stretch">
          <img
            class="rounded-lg border md:w-64 mr-2 object-cover md:flex-1"
            :src="
              article.img == undefined || article.img == null
                ? 'http://placehold.jp/24/bebebe/ffffff/600x300.png?text=.'
                : getBlogImage(article)
            "
            alt="article image"
          />
          <div style="flex: 2" class="px-4 py-2">
            <div class="">
              <nuxt-link
                :to="'/blog/' + article.slug"
                class="
                  text-2xl text-gray-700
                  font-semibold
                  hover:text-theme-primary
                  transition-all
                  duration-200
                "
              >
                {{ article.title }}
              </nuxt-link>
              <div v-if="false" class="flex justify-between items-center mt-1">
                <div class="my-1">
                  <nuxt-link
                    v-for="(category, index) in article.categories"
                    :key="index"
                    :to="'/blog/category/' + getCategorySlugFromName(category)"
                    class="
                      px-2
                      py-1
                      mr-2
                      text-sm text-theme-text-secondary
                      border border-theme-primary-200
                      bg-theme-primary-50
                      hover:bg-theme-primary-200
                      transition-all
                      duration-150
                      rounded-full
                    "
                  >
                    {{ category }}
                  </nuxt-link>
                </div>
              </div>
              <p class="mt-2 text-gray-600 text-sm leading-6">
                {{ truncate(article.description) }}
              </p>
            </div>
            <div class="flex justify-between items-center mt-4">
              <div>
                <nuxt-link
                  :to="'/blog/author/' + article.author"
                  class="flex items-center"
                >
                  <img
                    :src="`/${
                      authors?.find((a) => a.slug == article?.author)?.img
                    }`"
                    alt="author image"
                    class="
                      mr-2
                      w-10
                      h-10
                      object-cover object-top
                      rounded-full
                      hidden
                      sm:block
                    "
                  />
                  <div>
                    <h1 class="text-gray-700 text-sm font-bold hover:underline">
                      {{
                        authors?.find((a) => a.slug == article?.author)?.name
                      }}
                    </h1>
                    <span class="font-light text-sm text-gray-600">
                      {{ article && formatDate(article.publishDate) }}
                    </span>
                  </div>
                </nuxt-link>
              </div>
              <nuxt-link
                :to="'/blog/' + article.slug"
                class="text-blue-500 hover:underline"
              >
                Read more
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
  authors: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
  tags: {
    type: Array,
    default: () => [],
  },
});
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en", options);
};
const getAuthorImage = (author) => {
  return author && `/${author.img}`;
};
const getBlogImage = (article) => {
  // return article;
  return article && `/${article.img}`;
};
const truncate = (str) => {
  return str?.replace(/^(.{500}[^\s]*).*/, "$1...");
};
const getCategorySlugFromName = (name) => {
  return props.categories.find((it) => it?.name == name)?.slug;
};
</script>

<style></style>
