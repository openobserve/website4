export default async (type) => {
  const articles = await queryContent(`${getContentFolder(type)}/posts`)
    .only([
      "title",
      "description",
      "categories",
      "img",
      "slug",
      "authors",
      "publishDate",
      "createdAt",
      "updatedAt",
    ])
    .sort({ publishDate: -1 })
    .limit(globals.recentBlogPostsSidebar)
    .find();

  return articles;
};
