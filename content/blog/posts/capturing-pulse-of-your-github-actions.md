---
title: Capturing the Pulse of Your GitHub Actions with OpenObserve
seoTitle: Capturing the Pulse of Your GitHub Actions with OpenObserve
description: Explore how OpenObserve, an open-source observability tool, collaborates seamlessly with GitHub Actions through the 'openobserve_github_action_logs' repository by Mark Percival. This integration offers developers an efficient way to capture logs, enabling long-term analysis to detect build patterns and improve CI/CD pipelines. Dive into the benefits of continuous data monitoring and how it can revolutionize your software delivery process.
img: img/blog/devops.png
alt: OpenObserve
slug: capturing-pulse-of-your-github-actions
authors: 
  - prabhat
publishDate: 2023-08-07
tags:
  - github actions
  - CICD
  - build
  - DevOps

---

Observability is no longer a luxury but a necessity for today's fast-paced software development environments. And in a CI/CD landscape where continuous improvement is the mantra, every byte of data and every log matters. 

### **What makes OpenObserve special?**

Not only does it allow you to effectively capture logs, metrics, and traces from your applications, but the open-source community around it is constantly innovating. A recent development from this is a GitHub Action that enables you to capture logs from your GitHub Actions and send them straight to OpenObserve.

**Repository Spotlight**: [mdp/openobserve_github_action_logs](https://github.com/mdp/openobserve_github_action_logs)

Developed by the talented **Mark Percival**, this GitHub Action is a must-have for any team that relies on GitHub Actions for CI/CD and wants to maintain visibility into their workflow logs, this GitHub Action is designed to capture logs from your GitHub Actions and send them seamlessly to OpenObserve. And it does this with an elegance and simplicity that is just so in line with the ethos of OpenObserve.

## Getting Started: How It Works

Incorporating this GitHub Action into your workflow is straightforward. Let's look at a brief example:

```yaml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          npm ci
      - run: |
          npm run all
      - run: npm test
  send_logs_to_openobserve:
    runs-on: ubuntu-latest
    needs: build-and-test # wait until build-and-test is done
    environment: dev
    steps:
      - uses: actions/checkout@v3
      - uses: mdp/openobserve_github_action_logs@main
        with:
          openobserve_endpoint: ${{ secrets.OPENOBSERVE_ENDPOINT }} 
          openobserve_username: ${{ secrets.OPENOBSERVE_USERNAME }}
          openobserve_key: ${{ secrets.OPENOBSERVE_KEY }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

Once integrated, all your logs from GitHub Actions will be automatically piped to OpenObserve. It's that simple!


## Finding OpenObserve Username and Key:
1. **Log in to OpenObserve:** Navigate to the OpenObserve dashboard and sign in using your credentials.
2. **Go to the Ingestion Page:** Once logged in, look for a section in the left titled "Ingestion", and click on it.
3. **Locate Your Credentials:** On the Ingestion page, you should go to "logs > curl" . You should see something like:
```bash
curl -u you@yourdomain.com:18qlg4b673Rgdgd2 -k https://api.openobserve.ai/api/your_organization_254/default/_json -d [JSON-DATA]
```

In this case, values are:
```
OPENOBSERVE_ENDPOINT : https://api.openobserve.ai/api/your_organization_254/default/_json
OPENOBSERVE_USERNAME : you@yourdomain.com
OPENOBSERVE_KEY : 18qlg4b673Rgdgd2
```

## Adding Username and Key to GitHub Secrets:
1. **Navigate to Your Repository:** Go to the main page of the GitHub repository where you wish to add the secrets.
2. **Access Settings:** Click on the "Settings" tab, typically located at the top-right of the page.
3. **Secrets Management:** Scroll down in the left sidebar until you find the "Environments". Create a new environment "dev".
4. **New Repository Secret:** Now, click "Environment secrets > Add secret" button.
5. **Add OpenObserve Username:** 
   - Name: Enter a name like `OPENOBSERVE_USERNAME`.
   - Value: Paste or type in the OpenObserve username you noted earlier.
   - Click on the "Add secret" button.
6. **Add OpenObserve Key:** Repeat the same process:
   - Name: Enter a name like `OPENOBSERVE_KEY`.
   - Value: Paste or type in the OpenObserve key you noted earlier.
   - Click on the "Add secret" button.
7. **Add OpenObserve endpoint:** Repeat the same process:
   - Name: Enter a name like `OPENOBSERVE_ENDPOINT`.
   - Value: Paste or type in the OpenObserve key you noted earlier.
   - Click on the "Add secret" button.


Once you've added these secrets, your GitHub Actions workflow will be able to access them using the syntax `${{ secrets.OPENOBSERVE_USERNAME }}` and `${{ secrets.OPENOBSERVE_KEY }}` respectively.

By securely storing these credentials in GitHub Secrets, you ensure that your sensitive data remains private while still being accessible to the GitHub Actions that need them.

Once you have all the above working you should see logs in OpenObserve.

![OpenObserve Logs](/img/blog/github_actions_logs.png)

## The Long-term Vision: Gaining Insights from Your Builds

Now, why might one want to capture these logs, you wonder? It's all about long-term analysis. Think of every CI/CD pipeline as a living organism. Just as doctors analyze our vitals and medical history to detect patterns and predict future health concerns, developers and DevOps teams can analyze the historical data from their builds to detect patterns, bottlenecks, and potential points of failure.

By collecting and analyzing logs over an extended period:

1. **Identify Trends:** Recognize patterns that lead to frequently failed builds, long wait times, or other bottlenecks.
2. **Optimize Workflows:** Based on the observed patterns, streamline your workflows for faster and more efficient builds.
3. **Proactive Troubleshooting:** Predict potential issues even before they manifest, and devise solutions in advance.
4. **Continuous Improvement:** A constantly evolving CI/CD pipeline that adapts and improves with every build, ensuring that your software delivery is always at its best.

## In Conclusion

OpenObserve's integration with GitHub Actions is a match made in developer heaven. Not only does it provide a seamless way to capture valuable logs, but it also sets the stage for long-term insights that can drastically improve your CI/CD pipeline. And the best part? All of this is open source. The community is continually contributing, ensuring that this tool remains at the cutting edge of technology.

So, if you're looking to take your CI/CD pipeline to the next level, give OpenObserve and the [openobserve_github_action_logs](https://github.com/mdp/openobserve_github_action_logs) repository a try. The future of your builds is just one integration away.

Happy building!

---
