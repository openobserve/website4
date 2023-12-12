<template>
  <div>
    <div v-for="(article, index) in articles" :key="index" class="mb-10">
      <div class="px-2 py-2 bg-white rounded-lg transition-all duration-200">
        <div class="flex flex-col md:flex-row items-stretch">
          <div style="flex: 2" class="px-4 py-2">
            <div class="">
              <nuxt-link
                :to="'/blog/' + article.slug"
                class="text-2xl text-gray-700 font-medium hover:text-theme-primary transition-all duration-200"
              >
                {{ article.title }}
              </nuxt-link>
              <div v-if="false" class="flex justify-between items-center mt-1">
                <div class="my-1">
                  <nuxt-link
                    v-for="(category, index) in article.categories"
                    :key="index"
                    :to="'/blog/category/' + getCategorySlugFromName(category)"
                    class="px-2 py-1 mr-2 text-sm text-theme-text-secondary border border-theme-primary-200 bg-theme-primary-50 hover:bg-theme-primary-200 transition-all duration-150 rounded-full"
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
                <div class="flex items-center">
                  <nuxt-link
                    v-for="(author, index) in getAuthors(article)"
                    :to="'/blog/author/' + author.slug"
                    class="inline-block mr-2"
                    :class="{
                      '-ml-5': index > 0,
                    }"
                  >
                    <img
                      :src="`/${author?.img}`"
                      alt="author image"
                      class="w-10 h-10 object-cover object-top border rounded-full hidden sm:block"
                    />
                  </nuxt-link>
                  <div>
                    <h3 class="text-gray-700 text-sm font-bold">
                      <nuxt-link
                        v-for="(author, index) in getAuthors(article)"
                        :to="'/blog/author/' + author.slug"
                        class="hover:underline"
                      >
                        {{ author?.name 
                        }}{{ index < getAuthors(article).length - 1 ? ", " : "" }}
                      </nuxt-link>
                    </h3>
                    <span class="font-light text-sm text-gray-600">
                      {{ article && formatDate(article.publishDate) }}
                    </span>
                  </div>
                </div>
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

const getAuthors = (article) => {
  return article.authors?.map((authorSlug) =>
    props.authors.find((a) => a.slug == authorSlug)
  );
};

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
