export default async () => {
  const articles = await queryContent("blog/posts")
    .only([
      "title",
      "description",
      "categories",
      "img",
      "slug",
      "author",
      "publishDate",
      "createdAt",
      "updatedAt",
    ])
    .sort({ publishDate: -1 })
    .limit(globals.recentBlogPostsSidebar)
    .find();

  return articles;
};
