export default async (type) => {

  // get categories
  let categoriesContent = await queryContent(`${getContentFolder(type)}/posts`)
    .only(["categories"])
    .find();

  let categories = categoriesContent
    .map((obj) => obj.categories) // get only categories
    .flat(1) // convert the array of arrays to a single array
    .filter(Boolean); // filter out undefined/falsy values
  categories = new Set(categories); // make it unique

  categories = [...categories].map((it) => ({
    name: it,
    // convert to array of object
    slug: slugify(it),
    postCount: categoriesContent.reduce(
      (total, currentCategories) =>
        currentCategories.categories?.includes(it) ? total + 1 : total,
      0
    ),
  }));

  return categories;
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
