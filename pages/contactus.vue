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
          <img :src="data.content.image" :alt="data.content.title"/>
          <div>
            <div class="text-3xl">{{ data.content.title }}</div>
            <div>
              <div class="w-full flex flex-col items-center space-y-4 py-4">
                <div class="w-full flex flex-col space-y-4">
                  <div class="flex">
                    <img :src="data.content.address.icon" class="max-h-12" :alt="data.content.address.title"/>
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.content.address.title }}
                      </div>
                      <div class="text-base">
                        <p>{{ data.content.address.text }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <img :src="data.content.mail.icon" class="max-h-12"  :alt="data.content.mail.title"/>
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.content.mail.title }}
                      </div>
                        <a :href="'mailto:' + emails">{{
                          data.content.mail.text
                        }}</a>
                    </div>
                  </div>
                  <div class="flex">
                    <img :src="data.content.phone.icon" class="max-h-12" :alt="data.content.phone.title"/>
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.content.phone.title }}
                      </div>
                        <a :href="'tel:' + mobile">{{
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
          <Input
            id="name"
            name="name"
            required
            label="Name"
            v-model="formValue.name"
          />
          <Input
            id="email"
            name="email"
            required
            label="Email"
            v-model="formValue.email"
          />
          <Input
            id="phone"
            name="phone"
            label="Phone"
            v-model="formValue.phone"
          />
          <TextArea
            id="message"
            name="message"
            required
            label="Message"
            v-model="formValue.message"
          ></TextArea>
          <div
            class="flex justify-center md:justify-start py-5 w-full"
          >
            <Button @click="(e) => submitdata(e)" variant="primary" classes="px-6">
              {{ data.content.btnText }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formValue = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
const submitdata = (e) => {
  e.preventDefault();
  console.log(formValue);
  (formValue.name = ""),
    (formValue.email = ""),
    (formValue.message = ""),
    (formValue.phone = "");
};
const { data } = await useAsyncData(async () => {
  return await queryContent("/contactus").findOne();
});
useSeoMeta({
  title:data.seotitle,
  description:data.seodesc
})
</script>

<style scoped></style>
