
# Contributing a Blog to the OpenObserve website4 Repository

Thank you for your interest in contributing to the OpenObserve blog! Please follow the steps below to write, preview, and submit your blog post.

## Step 1: Fork the Repository
To contribute to the OpenObserve blog, begin by forking the repository:

1. Go to the OpenObserve GitHub repository.
2. Click the "Fork" button in the top-right corner. This will create a copy of the repository under your own GitHub account.

## Step 2: Clone the Forked Repository
Now, clone your forked repository to your local machine:

1. In your GitHub account, navigate to the forked repository.
2. Click the "Code" button and copy the repository URL.
3. In your terminal, run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-username/website4.git
   ```

4. Navigate into the cloned repository:

   ```bash
   cd website4
   ```

## Step 3: Set Up the Upstream Repository
To keep your forked repository up to date with the original repository, you need to set up the upstream remote.

1. Add the upstream repository:

   ```bash
   git remote add upstream https://github.com/openobserve/website4
   ```

2. Verify the new remote:

   ```bash
   git remote -v
   ```

This will allow you to pull changes from the main repository whenever necessary.

## Step 4: Create a New Branch
It's a good practice to create a new branch for your blog post:

1. Create and switch to a new branch:

   ```bash
   git checkout -b add-new-blog
   ```

## Step 5: Write Your Blog Post
Navigate to the blog directory where all blog posts are stored:

1. In the `content/blog` directory, create a new .md file for your blog. The filename should correspond to the URL of your blog post. For example, if your blog post URL is `https://openobserve.io/blog/monitoring-kubernetes/`, name your file `monitoring-kubernetes.md`.
2. Write your blog content in this markdown file. Refer to previous blog posts for formatting guidance.

### Author Details:
Update your author information in the `authors.json` file located in the `content/blog` directory. Add details like your name, bio, image, and social media links. Author images are stored in `public/img/blog/authors/`. Make sure to add your image to this folder and reference it in `authors.json`.

## Step 6: Add Images for Your Blog
Save the images you plan to use in your blog in the `public/img/blog` directory. If necessary, create a folder (named after your blog post) inside this directory to organize your images. You can then reference these images in your markdown file.

## Step 7: Install Dependencies
Before previewing your blog locally, install the required dependencies:

In the root of the project, open a terminal and run:

```bash
npm install
```

This will install all necessary libraries and dependencies for the website.

## Step 8: Preview Your Blog Locally
Now, you can preview the website locally to ensure your blog looks correct:

Run the following command to start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000/`. Here, you can view your blog post on the local version of the OpenObserve website.

Check if your blog content and images appear correctly. If everything looks good, you are ready to submit your work!

## Step 9: Fetch and Merge Upstream Changes
Before pushing your changes, it's a good idea to sync your fork with the upstream repository:

1. Fetch the latest changes from upstream:

   ```bash
   git fetch upstream
   ```

2. Merge the changes into your current branch:

   ```bash
   git merge upstream/main
   ```

## Step 10: Commit and Push Your Changes
Once your blog post is ready, commit your changes:

1. Add the changes:

   ```bash
   git add .
   ```

2. Commit the changes:

   ```bash
   git commit -m "Added new blog post: [your blog title]"
   ```

3. Push the changes to your fork:

   ```bash
   git push origin add-new-blog
   ```

## Step 11: Create a Pull Request
Now that your changes are pushed to your forked repository, you can submit them for review:

1. Go to your forked repository on GitHub.
2. Click on the "Compare & pull request" button.
3. Add a title and description for your pull request.
4. Click on "Create pull request."

Your pull request will be reviewed, and if everything looks good, it will be merged into the main repository. Thank you for contributing to the OpenObserve blog!
