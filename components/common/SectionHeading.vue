<template>
    <Heading as="h2" variant="heading" align="center" classes=" inline-block text-black bg-clip-text" >
        {{ title }}
        <div class="mt-2 w-1/6 self-center mb-1  " v-if="title"><img src="/img/homepage/headingline.svg" alt="headingbottomLine"/></div>
    </Heading>
    <Heading as="h3" align="center" variant="subheading" classes="">
        {{ subtitle }}
    </Heading>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    subtitle: {
        type: String,
        default: "",
        

    },

})

</script>