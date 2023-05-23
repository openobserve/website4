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
        <form ref="form" @submit="submitdata">
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
              required
              accept=".pdf"
              ref="inputUploadFile"
              @change="handleFileUpload()"
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
const selectedOption = ref(null);
const error = ref(null);
const inputUploadFile = ref(null);
const preSignedUrl = ref(null);
const inputUploadFileError = ref(null);
const loading = ref(false);
const formValue = reactive({
  name: "",
  email: "",
  phone: "",
  uploadFile: "",
});
const { job } = route.query;
onMounted(() => {
  // Set the default value based on the 'jobs' query parameter
  selectedOption.value = job || null;
});
const handleFileUpload = () => {
  console.log("selected file", inputUploadFile.value.files[0]);
};
const validate = () => {
  const fields = [inputName, inputEmail, inputPhone];
  const validateValue = fields
    .map((it) => it.value.validate())
    .every((it) => it);
  if (validateValue && inputUploadFile) {
    return true;
  } else {
    return false;
  }
}

const submitdata =  (e) => {
  const file = inputUploadFile.value.files[0];
  e.preventDefault();
  if (validate()) {
    loading.value = true;
    console.log(file, "file is valid");
     // Create a dummy Lambda function endpoint
      const lambdaEndpoint = "https://us-east-1.lambda.amazonaws.com/my-function";
    // Step 1: Generate presigned URL
    fetch(lambdaEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename:file.name,
        filetype:file.type,
      })
    })
  .then(response => response.json())
  .then(data => {
    preSignedUrl.value = data.presignedUrl;

    // Step 2: Upload file to the presigned URL
    return fetch(preSignedUrl.value, {
      method: "PUT",
      headers: {
        'Content-Type': this.file.type
      },
      body: inputUploadFile.value,
    })
      .then((res) => {
        // Step 3: Send additional data (name, email) to your backend or desired endpoint
        const dataToSend = {
          name: formValue.name,
          email: formValue.email,
          phone: formValue.phone,
          pdfUrl : formValue.uploadFile
        };

       return fetch("<YOUR_BACKEND_URL>", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then(response => {
            // Handle response from your backend or desired endpoint
            // ... do something with the response
            alert(response.status)
          })
          .catch(error => {
            console.error("Error sending data:", error);
          });
        })
  })
  }
}


const { data } = useAsyncData(async () => {
  return await queryContent("/jobapply").findOne();
});
const { data: content } = useAsyncData(async () => {
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
