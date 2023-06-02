<template>
  <div>
    <!-- <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Apply"
      :paths="data.breadcrumbs"
    /> -->
    <div class="container mx-auto flex flex-col justify-center py-10 px-44">
      <SectionHeading
        :title="data.content.heading"
        :subtitle="data.content.subheading"
      />
      <div class="mt-10">
        <form ref="form" @submit.prevent="submitdata">
          <label for="jobSelect" class="required">Select Job:</label>
          <select
            v-model="selectedOption"
            class="border border-gray-300 rounded-lg bg-gray-50 px-4 py-2 w-full"
            id="jobSelect"
            required
          >
            <option
              v-for="item in content?.hiring?.jobs"
              :key="item.id"
              :value="item.id"
            >
              {{ item.title }}
            </option>
          </select>
          <div
            v-if="error"
            class="px-4 py-2 bg-red-500 text-white border border-red-700 rounded-md"
          >
            {{ error }}
          </div>
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

          <label for="uploadFile" class="required">Resume</label><br />
          <p>
            <input
              type="file"
              id="uploadFile"
              accept=".pdf"
              ref="inputUploadFile"
              class="appearance-none border border-gray-300 rounded-lg bg-gray-50 px-4 py-2 w-full"
            />

            <span v-show="inputUploadFileError" class="text-red-600">
              {{
                inputUploadFileError
                  ? inputUploadFileError
                  : "Please add a file"
              }}
            </span>
          </p>
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
              :class="loading ? 'bg-theme-primary-300' : 'bg-theme-primary-500'"
            >
              {{ loading ? data.content.btnLoadingText : data.content.btnText }}
            </component>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const form = ref(null);
const inputName = ref(null);
const inputEmail = ref(null);
const inputPhone = ref(null);
const inputMessage = ref(null);
const selectedOption = ref(null);
const error = ref(null);
const inputUploadFile = ref(null);
// const preSignedUrl = ref(null);
const inputUploadFileError = ref(null);
const loading = ref(false);
const formValue = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  website:"",
  uploadFile: "",
});
const router = useRouter();
const { job } = route.query;
onMounted(() => {
  // Set the default value based on the 'jobs' query parameter
  selectedOption.value = job || null;
});
const validate = () => {
  const fields = [inputName, inputEmail, inputPhone, inputMessage];
  const validateValue = fields
    .map((it) => it.value.validate())
    .every((it) => it);
  if (validateValue && inputUploadFile.value.files[0]) {
    return true;
  } else {
    return false;
  }
};
const submitdata = (e) => {
  const file = inputUploadFile.value.files[0];
  const uploadPresignedUrlEndpoint = `https://r5himuz36c.execute-api.us-west-2.amazonaws.com/get-upload-presigned-url`;
  const presignedUrlEndpoint = `https://r5himuz36c.execute-api.us-west-2.amazonaws.com/get-presigned-url`;
  const submitRequestEndpoint =
    "https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail";

  let uploadUrl = null;

  e.preventDefault();
  if (validate()) {
    loading.value = true;
    // Step 1: Generate upload presigned URL
    fetch(uploadPresignedUrlEndpoint, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.uploadUrl,"================================");
        uploadUrl = data.uploadUrl;

        const formData = new FormData();
        formData.append("file", inputUploadFile.value.files[0]);

        // Step 2: Upload file to the presigned URL
        return fetch(uploadUrl, {
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": file.type, // Set the Content-Type header
          },
        });
      })
      .then((res) => {
        const urlObj = new URL(uploadUrl);
        urlObj.search = "";

        return fetch(presignedUrlEndpoint, {
          method: "POST",
          body: JSON.stringify({
            objectName: urlObj.pathname.substring(1, urlObj.pathname.length),
          }),
        });
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // Step 3: Send additional data (name, email) to your backend or desired endpoint
        const dataToSend = {
          senderName: formValue.name,
          senderEmail: formValue.email,
          senderMobile: formValue.phone,
          senderWebsite:formValue.website,
          senderMessage:
            formValue.message +
            `<br/><br/>--------<br/>Resume Url: <a href="${res.objectUrl}">Click here</a>` +
            `<br/>Job Position: ${selectedOption.value}`,
        };
        return fetch(submitRequestEndpoint, {
          method: "POST",
          body: JSON.stringify(dataToSend),
        });
      })
      .then(async (response) => {
        // Handle response from your backend or desired endpoint
        // ... do something with the response
        // alert(response.status);
        if (response.status >= 200 && response.status < 300) {
          router.push("/thank-you");
        } else {
          //read the response body
          const body = await response.json();
          error.value = body.message;
        }
      })
      .catch((error) => {
          error.value = error.response.message;
         console.error("Error sending data:", error);
      });
  }
};

const { data } = await useAsyncData(async () => {
  return await queryContent("/jobapply").findOne();
});

const { data: content } = await useAsyncData(async () => {
  return await queryContent("/career").findOne();
});

const seotitle = "Apply";
const seodesc = "";
useSeoMeta({
  title: seotitle,
  description: seodesc,
});
</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}
</style>
