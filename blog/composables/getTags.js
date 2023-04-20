export default async () => {
  // get tags
  let tagsContent = await queryContent("blog/posts").only(["tags"]).find();

  let tags = tagsContent
    .map((obj) => obj.tags) // get only tags
    .flat(1) // convert the array of arrays to a single array
    .filter(Boolean); // filter out undefined/falsy values

  tags = new Set(tags); // make it unique

  tags = [...tags].map((it) => ({
    name: it,
    // convert to array of object
    slug: slugify(it),
    postCount: tagsContent.reduce(
      (total, currentTags) =>
        currentTags.tags?.includes(it) ? total + 1 : total,
      0
    ),
  }));

  return tags;
};

const slugify = (str) => {
  const separator = "-";
  // Ref: https://gist.github.com/codeguy/6684588#gistcomment-3426313
  return str
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
};
