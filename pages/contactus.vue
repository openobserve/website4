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
          <div>
            <div class="text-3xl">{{ data.content.title }}</div>
            <div>
              <div class="w-full flex flex-col items-center space-y-4 py-4">
                <div class="w-full flex flex-col space-y-4">
                  <div class="flex">
                    <img
                      :src="data.content.address.icon"
                      class="max-h-12"
                      :alt="data.content.address.title"
                    />
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.content.address.title }}
                      </div>
                      <div class="text-sm">
                        <p>{{ data.content.address.text }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <img
                      :src="data.content.mail.icon"
                      class="max-h-12"
                      :alt="data.content.mail.title"
                    />
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.content.mail.title }}
                      </div>
                      <a :href="'mailto:' + data.content.mail.text">{{
                        data.content.mail.text
                      }}</a>
                    </div>
                  </div>
                  <div class="flex">
                    <img
                      :src="data.content.phone.icon"
                      class="max-h-12"
                      :alt="data.content.phone.title"
                    />
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.content.phone.title }}
                      </div>
                      <a :href="'tel:' + data.content.phone.text">{{
                        data.content.phone.text
                      }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <form ref="form" @submit="submitdata">
            <ZInput
              ref="inputName"
              id="name"
              name="name"
              required
              label="Name"
              v-model="formValue.name"
            />
            <ZInput
              ref="inputEmail"
              id="email"
              name="email"
              required
              label="Email"
              v-model="formValue.email"
            />
            <ZInput
              ref="inputPhone"
              id="phone"
              name="phone"
              label="Phone"
              v-model="formValue.phone"
            />
            <ZInput
              ref="inputWebsiteUrl"
              id="websiteurl"
              name="websiteurl"
              label="Website"
              type="url"
              v-model="formValue.websitelink"
            />
            <TextArea
              ref="inputMessage"
              id="message"
              name="message"
              required
              label="Message"
              v-model="formValue.message"
            ></TextArea>
            <div
              v-if="error"
              class="px-4 py-2 bg-red-500 text-white border border-red-700 rounded-md"
            >
              {{ error }}
            </div>
            <div class="flex justify-center md:justify-start py-5 w-full">
              <component
                is="button"
                type="submit"
                variant="primary"
                class="px-6 bg-theme-primary-500 rounded-md py-2 text-white"
                :disabled="loading"
                :class="
                  loading ? 'bg-theme-primary-300' : 'bg-theme-primary-500'
                "
              >
                {{
                  loading ? data.content.btnLoadingText : data.content.btnText
                }}
              </component>
            </div>
          </form>
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
