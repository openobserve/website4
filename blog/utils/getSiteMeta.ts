const type = "website";
const url = "https://openobserve.ai";
const title = "ZincLab Website";
const description = "ZincLab Website";
const mainImage = `/img/logo.png`;

// Ref: https://redfern.dev/articles/adding-social-media-seo-meta-data-using-nuxt-content/

export default (article: any) => {
  return [
    {
      hid: "description",
      name: "description",
      content: (article && article.description) || description,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: (article && article.type) || type,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: (article && article.url) || url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: (article && article.seoTitle) || title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: (article && article.description) || description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: (article && article.img && `${article.img}`) || mainImage,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: (article && article.url) || url,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: (article && article.title) || title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: (article && article.description) || description,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: (article && article.img && `${article.img}`) || mainImage,
    },
    {
      property: "article:published_time",
      content: article.publishDate,
    },
    {
      property: "article:modified_time",
      content: article.publishDate,
    },
    {
      property: "article:tag",
      content: article.tags ? article.tags.toString() : "",
    },
    {
      name: "twitter:data2",
      content: article.tags ? article.tags.toString() : "",
    },
  ];
};
