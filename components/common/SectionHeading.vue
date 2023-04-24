<template>
    <Heading as="h3" variant="heading" align="center" classes=" inline-block text-theme-primary bg-clip-text" >
        {{ title }}
        <div class="mt-2 w-1/6 self-center mb-1  " v-if="title"><img src="/img/homepage/headingline.svg"/></div>
    </Heading>
    <Heading as="h4" align="center" variant="subheading" classes="">
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