<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      :title="getLabelFromType(type)"
      :paths="[{ name: 'Home', to: '/' }, { name: getLabelFromType(type) }]"
    />

    <div
      class=" container mx-auto px-4 pb-8 mt-8 flex flex-col md:flex-row"
    >
      <article style="flex: 5" class="md:w-9/12 w-auto blog-content md:pr-8">
       <h1 class="text-4xl text-left text-black">{{ article.title }}</h1>

        <div
          class="text-gray-500 flex flex-col md:flex-row md:items-center my-1 justify-between"
        >
          <div>
            {{ article && formatDate(article.publishDate) }} by
            <span v-for="author in postAuthors" class="font-bold">
              <nuxt-link
                :to="`/${type}/author/${author.slug}`"
                class="hover:underline"
              >
                {{ author.name }}
              </nuxt-link>
              <span v-if="author !== postAuthors[postAuthors.length - 1]">, </span>
            </span>
          </div>
          <div class="flex justify-between items-center">
            <div class="my-1">
              <nuxt-link
                v-for="(category, index) in article.categories"
                :key="index"
                :to="`/${type}/category/${getCategorySlugFromName(category)}`"
                class="px-2 py-1 mr-2 text-sm text-theme-text-secondary border border-theme-primary-400 bg-theme-primary-100 hover:bg-theme-primary-300 transition-all duration-150 rounded-full"
              >
                {{ category }}
              </nuxt-link>
            </div>
          </div>
        </div>

        <img
          v-if="article.img"
          class="w-full mb-4 rounded-xl border"
          :src="getBlogImage(article)"
          :alt="article.alt"
        />

        <ContentRenderer
          :value="article"
          class="prose prose-lg prose-slate max-w-none text-base"
        />

        <div class="border my-6"></div>

        <div class="mt-2">
          <div class="flex flex-row flex-wrap">
            <span>Tags:&nbsp;</span>
            <span
              v-for="(tag, index) in article.tags"
              :key="index"
              class="border rounded-full px-2 py-1 border-blue-400 bg-blue-100 hover:bg-blue-200 text-sm mr-2 mb-1 transition-all duration-100"
            >
              <nuxt-link :to="`/${type}/tag/${getTagSlugFromName(tag)}`">
                {{ tag }}
              </nuxt-link>
            </span>
          </div>
          <div></div>
        </div>

        <h4 class="mt-8 text-xl">{{ postAuthors.length > 1 ? 'Authors' : 'Author' }}:</h4>
        <!-- multiple authors -->
        <figure v-for="(author, index) in postAuthors" class="md:flex bg-gray-100 rounded-xl p-8 md:p-0 border mt-4">
          <img
            class="w-24 h-24 md:w-40 object-cover object-top md:h-auto md:rounded-l-xl md:rounded-r-none rounded-full mx-auto"
            :src="getAuthorImage(author)"
            alt="authorImage"
            width="384"
            height="512"
          />
          <div
            class="pt-6 md:p-4 text-center md:text-left flex flex-col justify-between"
          >
            <blockquote>
              <p class="text-base font-normal">
                {{ author.bio }}
              </p>
            </blockquote>
            <div class="flex flex-col md:flex-row justify-between items-center">
              <figcaption class="font-medium">
                <div class="text-theme-primary uppercase font-bold">Author</div>
                <div class="text-theme-text-primary text-lg hover:underline">
                  <nuxt-link :to="`/${type}/author/${author.slug}`">
                    {{ author.name }}
                  </nuxt-link>
                </div>
              </figcaption>
              <div>
                <div class="space-x-2 mt-2 text-theme-text-primary">
                  <social-media-panel-author height="25" :author="author" />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </article>
      <blog-sidebar :type="type"/>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;
const type = route.params.type;

const { data: article } = await useAsyncData(`${type}-${slug}`, () =>
  queryContent(`${getContentFolder(type)}/posts/${slug}`).findOne()
);

const { data: authorsTemp } = await useAsyncData(() =>
  queryContent(`${getContentFolder(type)}/authors`).findOne()
);
const author = authorsTemp?.value?.authors?.find(
  (a) => a.slug == article?.value?.author
);

const postAuthors = article?.value?.authors.map((a) => authorsTemp?.value?.authors?.find((b) => b.slug == a))

const { data: prevNext } = await useAsyncData("prev-next-" + slug, () =>
  queryContent(`${getContentFolder(type)}/posts`)
    // .only(["title", "slug"])
    .sort({ date: -1 })
    .findSurround(slug)
);
const next = prevNext.value[1];
const prev = prevNext.value[0];

const nuxtApp = useNuxtApp();

// For sidebar
const { data: articlesTemp } = await useAsyncData(
  "get-articles-" + JSON.stringify(route.params),
  () => getArticles(route.params, {}, nuxtApp)
);
const { articles, totalArticles, lastPage, currentPage } = articlesTemp.value;

const authors = authorsTemp?.value?.authors;

let { data: categories } = await useAsyncData(`${type}-categories`,() => getCategories(type));

let { data: tags } = await useAsyncData(`${type}-tags`,() => getTags(type));

const { data: allArticles } = await useAsyncData(() =>
  queryContent(`${getContentFolder(type)}/posts`).find()
);

let { data: recentArticles } = await useAsyncData(`${type}-recent-articles`,() => getRecentArticles(type));

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date)?.toLocaleDateString("en", options);
};
const getAuthorImage = (author) => {
  // return author.img;
  return author.img && `${author.img}`;
};
const getBlogImage = (article) => {
  // return article.img;
  return article.img && `${article.img}`;
};
const getCategorySlugFromName = (name) => {
  //  * Removed 'this' before categories from 'return' statement
  return categories?.value?.find((it) => it.name == name)?.slug;
};
const getTagSlugFromName = (name) => {
  // * Removed 'this' before tags from 'return' statement
  return tags?.value?.find((it) => it.name == name)?.slug;
};
useHead({
  title: article?.value?.title,
  meta: getSiteMeta({
    ...article?.value,
    // url: `${this.$config.baseUrl}/blog/${this.$route.params.slug}`,
  }),
});
</script>

<style lang="postcss" scoped>
:deep(.nuxt-content h1),
.blog-content h1 {
  @apply text-2xl md:text-4xl mb-4 text-black font-medium;
}

:deep(.nuxt-content h2),
.blog-content h2 {
  @apply text-3xl mb-4 text-theme-primary-600 font-semibold;
}

:deep(.nuxt-content h3),
.blog-content h3 {
  @apply text-2xl mb-4 text-theme-primary-600 font-semibold;
}

:deep(.nuxt-content p),
:deep(.blog-content p) {
  @apply text-justify text-base leading-relaxed mb-4;
}

:deep(.nuxt-content ol li) {
  @apply list-decimal list-outside ml-4 text-xl py-2 font-semibold text-justify;
}

:deep(.nuxt-content ul li) {
  @apply list-disc list-outside ml-4 text-lg text-justify;
}

:deep(.nuxt-content ul),
:deep(.nuxt-content ol) {
  @apply mb-4;
}

:deep(.nuxt-content blockquote) {
  @apply bg-blue-100;
  border-left: 10px solid #bee3f8;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}

:deep(.nuxt-content blockquote:before) {
  color: #90cdf4;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}

:deep(.nuxt-content blockquote p) {
  @apply inline text-xl tracking-wide leading-8 text-blue-700;
}

:deep(.blog-content a) {
  @apply no-underline text-[#0000ee] font-normal;
}

:deep(.blog-content a:hover) {
  @apply underline;
}

:deep(.blog-content h1 a),
:deep(.blog-content h2 a),
:deep(.blog-content h3 a),
:deep(.blog-content h4 a),
:deep(.blog-content h5 a) {
  @apply no-underline text-black;
}

/* SOCIAL MEDIA ICONS TAKEN FROM http://svgicons.sparkk.fr/ */

.svg-icon {
  width: 2.5em;
  height: 2.5em;
  float: left;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #00000057;
}

.svg-icon circle {
  stroke: #000000aa;
  stroke-width: 1;
}
</style>
