<template>
  <div class="md:space-y-7 pb-8 mx-auto container px-4">
    <SectionHeading :title="data.title" :subtitle="data.subtitle" />

    <div class="embed_jobs_head embed_jobs_with_style_3">
      <div class="embed_jobs_head2">
        <div class="embed_jobs_head3">
          <div id="rec_job_listing_div"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount } from "vue";
defineProps({
  data: {
    type: Object,
  },
});

onMounted(() => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js";
  script.onload = () => {
    // Once the Zoho Recruit script has loaded, initialize it
    rec_embed_js.load({
      widget_id: "rec_job_listing_div",
      page_name: "Careers",
      source: "CareerSite",
      site: "https://openobserve.zohorecruit.com",
      brand_color: "#000000",
      empty_job_msg: "No current Openings",
      extra_fields: ["Number_of_Positions"],
    });
  };
  document.head.appendChild(script);
});
const handleClick = (event) => {
  const testDiv = event.target.closest(".rec-job-info");
  if (testDiv) {
    const recJobTitleDiv = testDiv.querySelector(".rec-job-title");
    if (recJobTitleDiv) {
      const anchorTag = recJobTitleDiv.querySelector("a");
      if (anchorTag) {
        anchorTag.click();
      }
    }
  }
};   
onMounted(() => {
  document.addEventListener("click", handleClick);
});

const cleanup = () => {
  document.removeEventListener("click", handleClick);
};

onBeforeUnmount(() => {
  cleanup();
});
</script>

<style>
.rec_filter_cls {
  display: none;
}

.embed_jobs_head2 {
  border: none;
  margin: 5px;
  padding: 18px;
  width: 100%;
}
.rec-grp-drop {
  border: 2px solid #f48f7b;
  margin-bottom: 5px;
}
.rec_facet_group {
  border: 1px solid #f48f7b;
}
.cw-facet-checkbox + span:before {
  box-shadow: inset 0 0 0 2px #f48f7b;
}
.cw-facet-checkbox + span:hover:before {
  border: 1px solid #f48f7b;
  box-shadow: inset 0 0 0 2px #f48f7b;
}
.cw-facet-checkbox:checked + span:before {
  background-color: #f48f7b;
}
.rec-grp-cnt {
  background-color: #fdebe7;
}
ul.rec-job-info {
  margin-top: 3px;
  border-bottom: none;
  box-sizing: border-box;
  cursor: pointer;
}
ul.rec-job-info:hover {
  background-color: #fdebe7;
}
.embed_jobs_with_style_3 .rec-group .zrsite_Job_Description {
  margin-top: 0px;
}
.embed_jobs_with_style_3 .rec-group .rec-job-info {
  display: block;
}
.embed_jobs_with_style_3 .rec-group .rec-job-info .zrsite_Date_Opened {
  flex-direction: row;
  width: max-content;
  padding-right: 8px;
}
.rec_job_listing_div_jobs ul,
.rec_job_listing_div_jobs li {
  display: flex;
  flex-wrap: wrap;
}
.embed_jobs_head {
  background-color: transparent !important;
}
.embed_jobs_with_style_3 .rec-group .rec-job-info {
  flex: 0 0 33.3333%;
}
.embed_jobs_with_style_3 .rec-group .zrsite_Location,
.embed_jobs_with_style_3 .zrsite_Job_Description {
  float: left;
  margin-bottom: 10px;
}
.embed_jobs_with_style_1 .zrsite_Salary,
.embed_jobs_with_style_2 .zrsite_Job_Type,
.embed_jobs_with_style_2 .rec-group .zrsite_Salary,
.embed_jobs_with_style_3 .zrsite_Work_Experience {
  padding-top: 2px;
}
.rec_job_listing_div_jobs .rec-group .rec-job-title {
  margin-bottom: 10px;
}
@media only screen and (max-width: 950px) {
  .embed_jobs_with_style_3 .rec-group .rec-job-info {
    display: block;
  }
  .embed_jobs_with_style_3 .rec-group .rec-job-info .zrsite_Date_Opened {
    padding-top: 5px;
  }
  .rec_job_listing_div_jobs ul,
  .rec_job_listing_div_jobs li {
    display: block;
  }
}
</style>
