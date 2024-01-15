---
title: What are Apache, GPL and AGPL licenses and why OpenObserve moved from Apache to AGPL
seoTitle: What are Apache, GPL and AGPL licenses - misconceptions, lies, facts - and why OpenObserve moved from Apache to AGPL
description: Standup AI team describes, how to setup OpenObserve on Azure AKS with postgres as metastore.
img: img/blog/agpl-license-misconceptions-2.webp
alt: OpenObserve
slug: what-are-apache-gpl-and-agpl-licenses-and-why-openobserve-moved-from-apache-to-agpl
authors: 
  - prabhat
publishDate: 2024-01-13
tags:
  - open source
  - agpl
  - gpl
  - apache
---

In the realm of open source software, navigating the license landscape can feel like traversing a dense forest. Terms like MIT, Apache, GPL, and AGPL flit through conversations, often shrouded in misconceptions and in half-truths.

I have talked extensively to developers, founders, customers and investors about open source licenses. I have seen a lot of confusion and misinformation about open source licenses and would like to take some time here to dispel some of the myths and misinformation about open source licenses, especially MIT, Apache, GPL and AGPL licenses and why OpenObserve moved from Apache to AGPL.

## Unpacking the Acronyms

- **MIT**: A permissive license granting extensive freedom to use, modify, and distribute copyrighted material. No obligation to share modifications applies, making it attractive for incorporating into proprietary projects.
- **Apache**: A permissive license granting extensive freedom to use, modify, and distribute copyrighted material. No obligation to share modifications applies, making it attractive for incorporating into proprietary projects. In addition to MIT, Apache also requires attribution and preservation of license notices. Also includes a patent grant, protecting users from patent litigation.
- **GPL (General Public License)**: A "copyleft" license ensuring **covered work** (We will cover this in detail below) inherits the same licensing terms. Users modifying and distributing GPL-licensed code must make their adaptations publicly available, nurturing a collaborative ecosystem.
- **AGPL (Affero General Public License)**: A stricter derivative of GPL, specifically targeting network-facing software. If you offer the program as a service (e.g., SaaS), modifications must also be offered openly under the AGPL.

## Covered work? What does it mean?

**Official definition**: A “covered work” means either the unmodified Program or a work based on the Program.

Some examples here on **covered work** in the context of AGPL (Talk to your lawyer if you need legal advice).

### Covered work

1. You are building a software that includes a library licensed under AGPL: Your software is a **covered work** and you need to license it under AGPL and make the source code available to your users.
2. You are building a SaaS platform that includes a library licensed under AGPL: Your software is a **covered work** and you need to license it under AGPL and make the source code available to your users.
3. You are building a software that uses an AGPL software by calling its APIs : Your software is a **covered work** and you need to license it under AGPL and make the source code available to your users. A concrete example would be a monitoring software that calls OpenObserve APIs to provide its core functionality.
4. You are building a software by modifying an existing AGPL licensed software : Your software is a **covered work** and you need to license it under AGPL and make the source code available to your users. 

### Not a covered work

1. You are building a software and use a software licensed under AGPL to monitor your application: Your software is **not a covered work** and you can license it under any license you want. A concrete example would be - you using OpenObserve to monitor your closed source e-commerce application.

## Know this fun fact about AGPL

Did you know that you don't need to accept the AGPL license to have a copy of the software or run it? You only need to accept the license if you want to modify and distribute the software that is a covered work.

**Official statement**: You are not required to accept this License in order to receive or run a copy of the Program.

Read it yourself here: https://opensource.org/license/agpl-v3/

## Why large organizations prefer MIT, Apache and GPL and not AGPL?

Large organizations prefer MIT, Apache and GPL over AGPL because they offer their services mostly via SaaS (.e.g. google, facebook, amazon, microsoft). Now if they use a software licensed under AGPL, and build their work on top of an AGPL licensed software, they will have to make their modifications to the software available to the world. That would be a bit inconvenient for them as they would have to share their source code to the world. 

Imagine source code of google.com or amazon.com and their algorithms being open source. That is their core business and they do not want their core business to be open source. It will be difficult to have advantage over others in that case? While they can, it will be harder. Check this page from google: https://opensource.google/documentation/reference/using/agpl-policy

Open source based companies take the harder route and build the business on top of open source software that is core to their business.

## Why do large organizations release open source software (and do it under Apache or other permissive license)

Generally, core business of the large organizations is not open source software but open source softwares created by them are a side project. 

Take the case of meta/facebook and pytorch (ML framework). Facebook is not in the business of selling machine learning software. They are in the business of selling ads. They have invested heavily in building pytorch though and they want to safeguard their investment in it. Imagine tensorflow becoming the de-facto standard for machine learning and pytorch becoming obsolete. Facebook will lose a good amount of their investment in pytorch, along with the possibility of rebuilding their systems later with another technology which could be a lot of work (read work as money). They want to make sure that pytorch remains relevant. To this cause, they have an entire team promoting pytorch and ensuring its adoption.

A slightly different example is kubernetes from google. Google cloud has been a far distant player to AWS and Azure in IaaS. The depth of services especially from AWS is hard to beat since AWS has a significant early mover advantage. Take for example AWS load balancer. While both GCP and AWS has load balancers, the number of features in AWS load balancer is unmatched by a large margin. Practically GCP has no way to catch up with AWS in terms of features. However if GCP were to make everyone build on top of kubernetes instead of raw services on AWS, they have levelled the playing field and they can have a chance to compete with AWS since now they are feature parity with AWS. Not only that, they are actually better in certain areas than AWS  when it comes to services around kubernetes. This is the reason why GCP is investing heavily in kubernetes and making sure that it remains relevant. This gives GCP a fighting chance against AWS.

For the most part, open sourcing by large businesses is almost always a business decision.

## Why OpenObserve moved from Apache to AGPL

OpenObserve started as an Apache 2.0 licensed project. It's license was changed from Apache 2.0 to AGPL 3.0 in November 2023. We believe that AGPL, through its ability to give freedom to users, ensure that contributions are available to community and improve our ability to capture the value that we create is the right path forward for OpenObserve. 

OpenObserve Inc. the company behind OpenObserve, is a small team who is intent on building the best observability software in the industry. In order for us to be able to do that we need to make sure that OpenObserve remains relevant and gains wide adoption. We also need to be able to continue to invest in OpenObserve and make sure that we can continue to do so in the future. Also, if we are to be able to invest money in OpenObserve, we need to build a sustainable business around it. OpenObserve creates a lot of value for its users. We need to be able to capture some of that value. Generally in the industry, open source projects are able to capture 1-5% of the value they create. Combination of AGPL and a commercial version of the product with additional features will ensure that we are able to do that.

What we have also seen is that that elastic, hashicorp and some others have had a permissive license model which hindered their ability to capture the value they create. If there is no sustainable business, there is no way to continue to invest in the software. We do not want to be in that situation. We want to be able to continue to invest in OpenObserve and make it better.

Why did we release OpenObserve as open source software in first place if we intend to build a business around it? 

- We love open source and we want to be part of the open source community.
- We believe that open source is a way to improve the lives of people and that is what we want. 
- We have benefitted a lot from other open source software that we have used in building OpenObserve and we want to do our part in giving back to the community. 
- We also believe that open source is the way to build a better software. Thousands of people using a product, finding bugs, and contributing by various means is a much better way to build a software than a small team of developers working on it.

Something to note here is that the open source version of the OpenObserve is not a crippled version of the commercial version. It is a fully functional product that can be used in production at extremely large scale and in fact is being used by thousands of organizations globally. Commercial version has additional features like SSO, RBAC and some more that are needed by large companies for the most part. We believe that these companies have more than enough resources to pay for the software. We also believe that the open source version of the software is extremely good for small and medium sized companies. 

For organizations that cannot use the open source version of OpenObserve due to AGPL license, we have a commercial version of OpenObserve that is licensed under a commercial license.

## What does it mean for me / my organization?

If you are using OpenObserve, you can continue to use it under AGPL 3.0 with no obligations. You can also use the commercial version of OpenObserve if you want to use it under a commercial license or want the additional features available in the commercial version.

If you intend to build a software that uses OpenObserve, and falls under the definition of a covered work, you will need to license it under AGPL 3.0 and make the source code available to your users. If you do not want to do that, you can use the commercial version of OpenObserve licensed under a commercial license.

## What should I license my project under - MIT, Apache, GPL or AGPL?

Okay, this is what OpenObserve did. But what should I do?

Licensing of the project also depends on who you are and what your goals are. While every project is different and there is no one size fits all answer, here are some guidelines that you can follow:

| You are | Goal | Recommended License |
| --- | --- | --- |
| Individual Developer | Building a software for use by others, not requiring contributions back | MIT or Apache |
| Individual Developer | Building a library for use in others' projects, not expecting monetization | MIT or Apache |
| Individual Developer | Building software, caring about software freedom and community contributions | GPL or AGPL |
| Individual Developer | Building a software to build a business around, expecting monetization | AGPL (with a commercial version) |
| Company | Building software/library not as core business, wanting usage by others | MIT or Apache |
| Company | Building a library, not expecting monetization | MIT or Apache |
| Company | Building software as core business | AGPL (with a commercial version) |

Additional guidance around building libraries is that they are extremely hard to monetize. Save yourself some heartache, and don't try to take that route.

There may be scenarios where an open source license may not be appropriate for your project. There is another category of licenses called source available licenses. You can use them if you want to keep your source code available to everyone but want to have certain kind of restrictions. Companies like Elastic, Hashicorp, MongoDB  and others have used source available licenses. Some examples of source available licenses are Elastic, SSPL, BSL, Confluent Community License, Cockroach Community License, Timescale License, Redis Source Available License, and more. Explaining these licenses is out of the scope of this blog and I may cover them at some point later in a separate article. 

## Large company (x) is telling me that they can't use AGPL. What should I do?

If you are a startup/individual and are building a software that is your core business and a large company tells you that they can't use your software because it is licensed under AGPL (e.g. Google - https://opensource.google/documentation/reference/using/agpl-policy ), you might think that AGPL might not be a good choice. 

Remember, we learnt in the above paragraphs that these organizations can use the software under AGPL and they don't even have to accept the license to use it. Additionally, you need to understand that large companies have a lot of resources and they can pay for the software to get a commercial license from you if your product provides meaningful value. Only situation where they can't use the software under AGPL is when they are building a software that is a covered work and they do not want to make the source code available publicly. In that case, they can use the commercially licensed version of your software. There is always a way for them to use your software if it provides meaningful value.

**We can't even try your software because it is licensed under AGPL** is not a valid point since AGPL does not hurt their ability to use the software. It only hurts their ability to use the software in a way where they want to use it without giving any benefit to community or to   you / your company. In that case it does not even matter if they try / use your software or not.

All the best.

## Concluding Thoughts

Demystifying open source licenses empowers us to make informed choices, fostering a vibrant, ethical and sustainable software ecosystem. Whether you're navigating the licensing jungle for the first time or revisiting your project's terms, remember: knowledge is power, and open dialogue paves the path to a transparent, collaborative future.

From the perspective of an OpenObserve user, you can continue to use OpenObserve under AGPL 3.0 with no obligations. 

Remember the fun fact about AGPL - You are not required to accept this License in order to receive or run a copy of the Program.

Also remember the definition of covered work - A “covered work” means either the unmodified Program or a work based on the Program.

Let's continue the conversation, dispel more myths, and ensure the open source landscape thrives with clarity and purpose.

