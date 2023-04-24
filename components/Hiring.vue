<template>
    <Section>
        <SectionHeading :title='data.title' :subtitle="data.subtitle"/>
        <div class="container mx-auto px-4 ">
            <div class="flex flex-col md:flex-row justify-between md:justify-around items-center py-10">
                <p class="font-bold text-lg md:text-xl text-black mb-4 md:mb-0">&#9673; {{ data.jobs }} </p>
                <Button variant="primary" :to="data.href" target="_blank">{{ data.btnText  }}</Button>
            </div>
        </div>
    </Section>
</template>
<script setup>
defineProps({
    data:{
        type:Object
    }
})
</script>