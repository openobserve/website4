<template>
  <div>
    <!-- <BreadCrumbs
      class="md:pt-0 pt-3"
      title="Apply"
      :paths="data.breadcrumbs"
    /> -->
    <div class="container mx-auto flex flex-col justify-center py-10 px-44">
      <SectionHeading :title="data.content.heading" :subtitle="data.content.subheading" />
      <div class="mt-10">
        <form ref="form" @submit="submitdata">
            <label for="jobSelect" class="required">Select Job:</label>
           <select v-model="selectedOption" class="appearance-none border border-gray-300 rounded-lg bg-gray-50  px-4 py-2 w-full "   id="jobSelect" required>
            <option
              v-for="item in data.content.jobs"
              :key="item.id"
              :value="item.id"
            >
              {{ item.id }}
            </option>
          </select>
          <div
            v-if="error"
            class="px-4 py-2 bg-red-500 text-white border border-red-700 rounded-md"
          >
            {{ error }}
          </div>
          <Input
            ref="inputName"
            id="name"
            name="name"
            required
            label="Name"
            v-model="formValue.name"
          />
          <Input
            ref="inputEmail"
            id="email"
            name="email"
            required
            label="Email"
            v-model="formValue.email"
          />
          <Input
            ref="inputPhone"
            id="phone"
            name="phone"
            label="Phone"
            v-model="formValue.phone"
          />
          <Input
            ref="inputUploadFile"
            id="uploadFile"
            required
            name="uploadFile"
            label="Resume"
            type="file"
            accept="application/pdf"
            v-model="formValue.uploadfile"
          />
         
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
const { job } = route.query
const form = ref(null);
const inputName = ref(null);
const inputEmail = ref(null);
const inputPhone = ref(null);
const selectedOption = ref('');
const error = ref(null);
const inputUploadFile = ref(null);
const preSignedUrl = ref(null);
onMounted(() => {
      // Set the default value based on the 'jobs' query parameter
      selectedOption.value = job || null;
});

const loading = ref(false);

const validate = () => {
  const fields = [
    inputName,
    inputEmail,
    inputPhone,
    inputUploadFile
  ];
  const validateValue = fields.map((it) => it.value.validate()).every((it) => it);
  if(validateValue && inputUploadFile.value.type === "application/pdf"){
    return true;
  }else{
    return false;
  }
};

const formValue = reactive({
  name: "",
  email: "",
  phone: "",
  uploadfile: "",
});
const submitdata = async (e) => {
  e.preventDefault();
  // console.log(e,"====e============");
  console.log(inputUploadFile.value,"input upload");
  return ;
  if (validate()) {
    loading.value = true;
    console.log(inputUploadFile.value,"inputUploadFile.value.fileName");
    return;
    // Step 1: Generate presigned URL
      const response = await fetch('<YOUR_LAMBDA_FUNCTION_URL>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: inputUploadFile.value
          //fileName: inputUploadFile.value.fileName,
          //fileType: inputUploadFile.value.fileType
        })
      });
       const data = await response.json();
       preSignedUrl.value = data.presignedUrl;

       // Step 2: Upload file to the presigned URL
      await fetch(preSignedUrl.value, {
        method: 'PUT',
        // headers: {
        //   'Content-Type': this.file.type
        // },
        body: inputUploadFile.value
      });

       // Step 3: Send additional data (name, email) to your backend or desired endpoint
      const dataToSend = {
        name: formValue.name,
        email: formValue.email,
        phone : formValue.phone,
      };

      await fetch('<YOUR_BACKEND_URL>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
    
  }
};

const { data } = await useAsyncData(async () => {
  return await queryContent("/jobapply").findOne();
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
