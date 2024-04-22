---
title: Why Apache ECharts Won Over Plotly in Our Tech Stack 
seoTitle: Why Apache ECharts Won Over Plotly in Our Tech Stack 
description: We delves into our strategic shift from using Plotly to adopting Apache ECharts for our data visualization needs. It explores the reasons behind this decision, the comparative strengths and weaknesses of both tools, and the impact of this change on our user experience and technical operations
img: /img/blog/o2-echarts/o2-echarts.jpg
alt: OpenObserve ECharts
slug: why-apache-echarts-won-over-plotly-in-our-tech-stack
authors: 
  - kirtan
publishDate: 2023-12-25
tags:
  - dashboards
  - observability
  - echarts
  - plotly
  - data visualization
---

## Introduction

In the fast-paced and evolving field of data visualization, staying ahead with the most effective tools is not just a preference; it's a necessity. At OpenObserve, our recent decision to transition from Plotly to Apache ECharts marks a significant milestone in our journey. This shift was the result of careful deliberation and strategic planning. In this post, I will detail the main reasons behind our switch and offer insights that may guide others in the field of data visualization. Follow me as I walk you through our journey and the valuable lessons we learned while transitioning to Apache ECharts.

## Why We Needed a Change

Plotly has been a reliable companion in our data visualization tasks, offering robust features and ease of use. However, as our business scaled and our projects grew in complexity, we started to notice the boundaries of what Plotly could offer. This was the turning point when Apache ECharts came into the picture, promising new horizons and solutions to our evolving needs.

## Apache ECharts vs. Plotly: A Comparative Overview

Our experience with Plotly was largely positive until we began to encounter specific challenges that affected our customer's experience. These challenges ranged from minor glitches to more complex issues, such as:

- Difficulty displaying vertical scrollbars with lengthy legends ([Issue](https://github.com/openobserve/openobserve/issues/802))
- Hidden X Axis labels in certain scenarios ([Issue](https://github.com/openobserve/openobserve/issues/801))
- Challenges with tooltip detail on hover
- Synchronizing timelines across multiple charts on the same page
- *and several others...*

In our search for solutions, we realized that addressing these issues within Plotly's framework was either too complex or too resource-intensive. This led us to explore alternative options, eventually bringing us to Apache ECharts.

Apache ECharts impressed us with its robust performance capabilities, particularly in handling large datasets. Its efficient, lightweight nature translated into quicker load times and smoother user interactions, key factors in enhancing user experience. The range of chart options and the level of customization it offered were unparalleled, allowing us to craft visualizations that were not only precise but also visually compelling.

The features that ECharts brought to the table were exactly what we needed. Key highlights include:

- Significant performance improvements
- A diverse array of flexible chart types
- Advanced customization capabilities
- Comprehensive and detailed documentation
- A supportive and growing community
- Simple implementation of animation support
- Built-in dark mode compatibility

## The User Experience: A Key Considerant

In the realm of data visualization, the user experience is paramount. The switch to Apache ECharts did more than just alter the backend of our operations; it transformed the way our users interacted with our visualizations. ECharts enhanced both the aesthetics and functionality of our charts, leading to a more intuitive and responsive experience for our users. This positive impact on the user experience was a clear indicator of the success of our transition.

## Our Journey of Implementation

Adopting a new tool, especially one as integral as a data visualization framework, is no small feat. The transition involved overcoming learning curves and adapting our existing data structures to align with ECharts' framework. Despite these challenges, the supportive community around Apache ECharts and the comprehensive documentation available made the transition smoother and more manageable than we initially anticipated.

## Conclusion

The decision to adopt Apache ECharts has been a crucial pivot in our data visualization strategy. This choice represents more than just a shift in tools; it signifies our commitment to providing clearer insights, making better decisions, and enhancing user experience through superior technology. Apache ECharts has not just met our expectations but has set a new benchmark for what we can achieve in the realm of data visualization.