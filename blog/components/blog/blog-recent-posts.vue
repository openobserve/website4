<template>
  <div class="px-1 md:px-5 my-8">
    <div class="flex flex-row justify-between md:py-0 px-4">
      <div class="flex flex-col py-2 md:mb-4 mb-2">
        <h1
          class="text-theme-text-primary md:font-medium font-semibold title-font md:text-3xl text-xl"
        >
          Recent Blog Posts
        </h1>
        <div
          class="mb-2 border-b-4 border-theme-primary w-5/12 rounded-full"
        ></div>
      </div>
      <div class="flex items-center">
        <nuxt-link
          class="-mt-2 md:text-lg text-sm hover:shadow-xl outline-none focus:outline-none transition-all duration-300 bg-theme-primary font-semibold rounded-lg md:px-4 px-2 py-2 shadow-lg uppercase md:mr-4 mr-0 text-white"
          to="/blog"
        >
          Visit Our Blog
        </nuxt-link>
      </div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="bg-gray-100 m-4 md:w-1/3 sm:mb-0 mb-6 border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200"
      >
        <nuxt-link :to="`/blog/${article.slug}`">
          <div class="">
            <div class="rounded-t-lg overflow-hidden">
              <img
                class="object-center h-full w-full"
                :src="
                  article.img == undefined || article.img == null
                    ? 'http://placehold.jp/24/bebebe/ffffff/600x300.png?text=.'
                    : getBlogImage(article)
                "
                alt="blog recent post"
              />
            </div>
            <h2
              class="text-xl font-medium title-font text-gray-900 mt-2 px-4 py-1"
            >
              {{ article.title }}
            </h2>
            <p class="text-sm leading-relaxed mt-2 px-4 py-1">
              {{ truncate(article.description) }}
            </p>
            <a
              class="text-theme-primary inline-flex items-center mb-2 px-4 py-1"
              >Learn More →
            </a>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    truncate(str) {
      return str?.replace(/^(.{125}[^\s]*).*/, "$1...");
    },
    getBlogImage(article) {
      return article && `/${article.img}`;
    },
  },
};
</script>

<style></style>
