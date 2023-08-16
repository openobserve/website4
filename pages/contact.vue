<template>
  <div>
    <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Contact Us"
      :paths="data.breadcrumbs"
    />
    <div class="text-theme-text-primary body-font  my-10">
      <div
        class="container mx-auto px-4 md:px-0 w-full flex md:flex-row flex-col space-x-0 md:space-x-10 space-y-4 md:space-y-0 md:py-10 py-2"
      >
        <div class="w-full md:w-1/2">
          <div class="flex flex-col space-y-6">
            <h1
              class="text-2xl md:text-3xl lg:text-5xl font-semibold text-theme-primary-400"
            >
              {{ data.content.leftSection.title }}
            </h1>
            <p class="text-base font-normal">
              {{ data.content.leftSection.desc }}
            </p>
            <div>
              <Button
                variant="tryitfree"
                target="_blank"
                :to="data.content.leftSection.btnLink"
                classes=""
                >{{ data.content.leftSection.btnText }}</Button
              >
            </div>
            <img
              :src="data.content.leftSection.image"
              :alt="data.content.title"
              class=""
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 flex justify-center items-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab in
          placeat quis repudiandae, magnam dolores omnis numquam voluptas! Ipsam
          omnis ea, unde esse odio harum, vel sunt tempore fugiat eum
          repudiandae deserunt provident fuga. Quasi cupiditate dignissimos
          minima perferendis. Ab?
        </div>
      </div>
      <div class="w-full mt-14 container mx-auto px-4 md:px-16 lg:px-24">
        <h2 class="text-black text-2xl md:text-4xl mb-3 title-font font-bold">
          {{ data.content.contactus.title }}
        </h2>
        <p
          class="leading-relaxed mb-5 text-theme-text-primary"
          v-html="data.content.contactus.subtitle"
        ></p>
        <form ref="form" @submit="submitdata">
          <div class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 md:py-3">
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
          </div>
          <div class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 md:py-3">
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
          </div>
          <div class="w-full md:w-1/2 container mx-0 md:mx-auto md:py-3">
          <TextArea
            ref="inputMessage"
            id="message"
            name="message"
            required
            label="Message"
            v-model="formValue.message"
          ></TextArea>
          </div>
          <div
            v-if="error"
            class="px-4 py-2 bg-red-500 text-white border border-red-700 rounded-md"
          >
            {{ error }}
          </div>
          <div class="flex justify-start md:justify-center  py-5 w-full">
            <component
              is="button"
              type="submit"
              variant="primary"
              class="px-6 bg-theme-primary-500 rounded-md py-2 text-white"
              :disabled="loading"
              :class="loading ? 'bg-theme-primary-300' : 'bg-theme-primary-500'"
            >
              {{ loading ? data.content.btnLoadingText : data.content.btnText }}
            </component>
          </div>
        </form>
      </div>
    </div>
    <!-- <div
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
        </div> -->
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
