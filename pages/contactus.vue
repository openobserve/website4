<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Contact Us"
      :paths="data.breadcrumbs"
    />
    <div class="text-theme-text-primary body-font">
      <div
        class="w-full flex md:flex-row flex-col md:space-y-0 space-y-4 md:px-12 px-2 md:py-10 py-2"
      >
        <div
          class="md:w-1/2 w-full overflow-hidden flex flex-col justify-start space-y-4 items-start md:px-10 px-2 py-5 md:ml-4 ml-0 md:mt-20 mt-0 md:mb-20 mb-0"
        >
          <!-- START Contact Details-->
          <img :src="data.content.image" :alt="data.content.title" />

          
          
        </div>

        <div
          class="md:w-1/2 w-full flex flex-col justify-center md:-mt-auto md:ml-auto md:px-10 px-2 md:py-5 py-2"
        >
          <h2
            class="text-theme-text-primary text-2xl mb-1 title-font font-bold"
          >
            {{ data.content.heading }}
          </h2>
          <p
            class="leading-relaxed mb-5 text-theme-text-primary"
            v-html="data.content.subheading"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const form = ref(null);
const inputName = ref(null);
const inputEmail = ref(null);
const inputPhone = ref(null);
const inputWebsiteUrl = ref(null);
const inputMessage = ref(null);

const error = ref(null);

const loading = ref(false);

const validate = () => {
  const fields = [
    inputName,
    inputEmail,
    inputPhone,
    inputWebsiteUrl,
    inputMessage,
  ];
  return fields.map((it) => it.value.validate()).every((it) => it);
};

const formValue = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  websitelink: "",
});
const submitdata = async (e) => {
  e.preventDefault();
  if (validate()) {
    loading.value = true;

    try {
      await fetch(
        " https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail",
        {
          method: "POST",
          body: JSON.stringify({
            senderName: formValue.name,
            senderEmail: formValue.email,
            senderWebsite: formValue.websitelink,
            senderMobile: formValue.phone,
            senderMessage: formValue.message,
          }),
        }
      )
        .then(async (response) => {
          if (response.status >= 200 && response.status < 300) {
            router.push("/thank-you");
          } else {
            //read the response body
            const body = await response.json();
            error.value = body.message;
          }
        })
        .catch((e) => {
          error.value = e.response.message;
        });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
};

const { data } = await useAsyncData(async () => {
  return await queryContent("/contactus").findOne();
});
const seotitle = "Contact Us";
const seodesc =
  "Let us know how we can help you with your needs for a search system";
useSeoMeta({
  title: seotitle,
  description: seodesc,
});
</script>

<style scoped></style>
