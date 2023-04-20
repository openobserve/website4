<template>
  <div>
    <BreadCrumbs class="md:pt-0 pt-3" title="Contact Us" :paths="[{ name: 'Home', to: '/' }, { name: 'Contact Us' }]" />
    <div class="text-theme-text-primary body-font">
      <div class="w-full flex md:flex-row flex-col md:space-y-0 space-y-4 md:px-12 px-2 md:py-10 py-2">
        <div
          class="md:w-1/2 w-full overflow-hidden flex flex-col justify-start space-y-4 items-start md:px-10 px-2 py-5 md:ml-4 ml-0 md:mt-20 mt-0 md:mb-20 mb-0">
          <!-- START Contact Details-->
          <img :src="data.image" />
          <div>
            <div class="text-3xl">{{ data.title }}</div>
            <div>
              <div class="w-full flex flex-col items-center space-y-4 py-4">
                <div class="w-full flex flex-col space-y-4">
                  <div class="flex">
                    <img :src="data.address.icon" class="max-h-12" />
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.address.title }}
                      </div>
                      <div class="text-base">
                        <p>{{ data.address.text }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <img :src="data.mail.icon" class="max-h-12" />
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.mail.title }}
                      </div>
                      <ul>
                        <a :href="'mailto:' + emails">{{ data.mail.text }}</a>
                      </ul>
                    </div>
                  </div>
                  <div class="flex">
                    <img :src="data.phone.icon" class="max-h-12" />
                    <div class="flex-1">
                      <div class="font-semibold text-lg">
                        {{ data.phone.title }}
                      </div>
                      <ul>
                        <a :href="'tel:' + mobile">{{ data.phone.text }}</a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="md:w-1/2 w-full flex flex-col justify-center md:-mt-auto md:ml-auto md:px-10 px-2 md:py-5 py-2 ">
          <h2 class="text-theme-text-primary text-2xl mb-1 title-font font-bold">
            {{ data.heading }}
          </h2>
          <p class="leading-relaxed mb-5 text-theme-text-primary" v-html="data.subheading">

          </p>
          <Input id="name" name="name" required label="Name" v-model="formValue.name"/>
          <Input id="email" name="email" required label="Email" v-model="formValue.email"/>
          <Input id="phone" name="phone" label="Phone" v-model="formValue.phone"/>
          <TextArea id="message" name="message" required label="Message" v-model="formValue.message"></TextArea>
          <div class="p-2 w-full">
            <Button @click="(e) => submitdata(e)">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
const formValue = reactive({
   name : "",
   email:"",
   phone:"",
   message:""
})
const submitdata = (e) => {
  console.log("he;llo");
    e.preventDefault();
    console.log(formValue);
    formValue.name ="",
    formValue.email="",
    formValue.message="",
    formValue.phone=""
}
const data = {
  image: "/img/contactus.svg",
  title: "Contact Details",
  address: {
    title: "Address",
    icon: "/img/location_icon.svg",
    text: "315 Montgomery St, 10th Floor,San Francisco, California, 94104,United States of America"
  },
  phone: {
    title: " Mobile No",
    icon: "/img/call_icon.svg",
    text: "**********"
  },
  mail: {
    title: "Email",
    icon: "/img/email_icon.svg",
    text: "zinclabs@gmail.com"
  },
  heading: "Let us know how we can help you with your needs for a search system",
  subheading: " We can help you architect your system to provide observability at scale with no associated drama and costs.<br/>Fill out the form below, and we will reach out shortly.<br/>You could also send us an email at hello@zinclabs.io",
}
</script>

<style scoped></style>