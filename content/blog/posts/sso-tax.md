---
title: "The SSO (Single Sign On) Tax - Understanding the Controversy"
seoTitle: "The SSO (Single Sign On) Tax - Understanding the Controversy"
description: "The SSO (Single Sign On) Tax - What it is, why it is controversial"
alt: OpenObserve
slug: sso-tax
authors:
  - prabhat
publishDate: 2024-09-03
tags:
  - sso
  - enterprise
  - security
---

The SSO (Single Sign-On) tax has been a topic of discussion in the tech industry for some time now. While some argue that it's an unnecessary burden, others see it as a necessary evil. Let's understand what it is, why it's controversial, and why it's unlikely to disappear anytime soon.

## How do people use SSO?

Most folks are familiar with SSO in the form of **Sign in with Google** or **Sign in with Facebook** buttons on websites. These buttons allow users to log in to a website using their existing Google or Facebook credentials, eliminating the need to create and remember a new password for each site.

Two broad forms of SSO include:

1. **Social login**: Users can log in to a website using their social media accounts, such as Google, Microsoft, Facebook, Twitter, Apple, Github, Gitlab, etc. Google and Microsoft accounts can be used to access Google workspace and Microsoft 365 respectively. This is the most common form of SSO and is widely used by websites and apps to simplify the login process for users.
2. **Enterprise SSO**: Organizations can use SSO solutions to manage access to multiple applications and services for their employees. Typically uses SAML or OIDC. Most popular provider in this context is Okta followed closely by Microsoft Entra (Previously known as Azure AD). This also includes solutions with integration to LDAP solutions like Active Directory.

While social logins are free for services providers to implement and provide as well as users to use, enterprise SSO solutions like Okta are not free for users and cost a lot of money for organizations to implement and use.

## What is the SSO Tax?

Say, you are looking to use a SaaS or self hosted application and the functionality works well for you. However if you want to use single sign on (SSO) to manage access to the application, you will have to pay extra for it. This extra cost is what is referred to as the SSO Tax. The term SSO Tax was popularized by [Rob Chahin](https://github.com/robchahin) when he created the website [https://sso.tax/](https://sso.tax/) to highlight the phenomenon.

He argued that SSO should be a basic feature and not an add-on that requires additional payment primarily due to the fact that it's not a value add or convenience feature but a basic security feature and any vendor that is essentially charging separately for it does not care for security of their customers.

## Why is the SSO Tax Controversial?

The SSO tax has sparked debate among tech enthusiasts and business leaders alike. Some argue that it's unfair to charge customers extra for a feature that's become a standard expectation in today's digital landscape. Others claim that the added cost is justified, given the complexity and value that SSO solutions bring to the table.

### Arguments Against the SSO Tax

- SSO is a basic feature: Many argue that SSO should be a standard feature, not an add-on that requires additional payment. With the rise of cloud-based services and remote work, seamless access to multiple applications has become essential.
- Increased costs for customers: The SSO tax can result in significant additional costs for organizations, particularly those with large user bases or complex IT infrastructures.
- Perceived greed: Some view the SSO tax as a money grab by vendors, who are seen as taking advantage of customers' needs for convenient access to their services.

### Arguments For the SSO Tax

- Value-added service: Proponents of the SSO tax argue that it reflects the significant value that SSO solutions bring to organizations, including enhanced security, simplified user management, and improved productivity.
- Complexity and development costs: Developing and maintaining SSO solutions requires significant investment in research, development, and infrastructure. The SSO tax helps vendors recoup these costs and continue to innovate.
- Customization and support: SSO solutions often require customization and dedicated support to ensure seamless integration with various applications and services. The SSO tax helps cover these costs.
- Enterprises can pay for SSO: Enterprises that require advanced security features and centralized user management have paid for SSO solutions like Okta should be willing to pay for the feature in other solutions as well.

### Why the SSO Tax is Here to Stay

Despite the controversy surrounding the SSO tax, it's unlikely to disappear anytime soon. Here's why:

- Vendors need to recoup costs: SSO solutions require significant investment, and vendors need to recoup these costs to remain profitable and continue innovating. Sometimes many core functionalities are provided in the free tier and SSO is a premium feature that pays for the rest of the product.
- Customers are willing to pay: While some customers may grumble about the SSO tax, many are willing to pay for the convenience, security, and productivity benefits that SSO solutions provide.
- Industry standards: The SSO tax has become an industry standard, with many vendors incorporating it into their pricing models. It's unlikely that vendors will abandon this revenue stream anytime soon.
- Despite the controversy, the list on [https://sso.tax/](https://sso.tax/) has kept growing and shows no signs of stopping.

## What we think of SSO Tax at OpenObserve

At OpenObserve, we understand the importance of SSO. We believe that SSO is critical for ensuring seamless access to our platform and integral to improving security, which is why we strive to provide SSO capabilities to most of our customers at no additional cost.

### Cloud service

For our cloud service we provide SSO in our free tier for following providers with plan to support more in future:

- Google
- GitHub
- GitLab
- Microsoft

SAML and OIDC are available in our enterprise tier.

### Self hosted

For self hosted version of OpenObserve, SSO is available in the enterprise version, which is available to anyone for free who ingests less than 200 GB of data per day. That is 6 TB/Month of data ingestion. Most users will never hit this limit. Most startups and small businesses will never hit this limit too. Only large enterprises will hit this limit.

### Why we provide SSO for free to everyone but large enterprises

The way we think of it is, are you a large enterprise that is already spending a lot of money on security and SSO solutions like Okta? If yes, you should be able to pay us as well for the same level of security.

If you are a small business or a startup, you should not have to pay for security or convenience as you could use all the support you can get. You should be able to use the same level of security as large enterprises without having to pay for it that you might not be able to afford.

## Conclusion

The SSO tax may be a contentious issue, but it's a reality that's here to stay. While some may view it as an unnecessary burden, others see it as a necessary cost for the value that SSO solutions bring to organizations. As the tech landscape continues to evolve, it's essential to understand the SSO tax and its implications for businesses and vendors alike.

By acknowledging the complexity and value of SSO solutions, we can work towards creating a more transparent and equitable pricing model that benefits both vendors and customers. The SSO tax may not be going away, but with a deeper understanding of its role in the tech ecosystem, we can navigate its implications and make informed decisions about our IT investments.
