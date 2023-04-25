<template>
    <Section>
        <SectionHeading :title='data.title' :subtitle="data.subtitle"/>
        <div class="container mx-auto px-4 ">
            <div class="flex flex-col md:flex-row justify-between md:justify-around items-center py-3" v-for="(item,index) in data.jobs">
                <p class="font-bold text-lg md:text-xl text-black mb-4 md:mb-0">&#9673; {{ item.title }} </p>
                <Button variant="primary" :to="item.btnLink" target="_blank">{{ item.btnText  }}</Button>
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