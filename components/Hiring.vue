<template>
    <Section>
        <SectionHeading :title='data.heading' :subtitle="data.subheading"/>
        <div class="container mx-auto px-4 ">
            <div class="flex flex-col md:flex-row justify-between md:justify-around items-center py-10">
                <p class="font-bold text-lg md:text-xl text-black mb-4 md:mb-0">&#9673; {{ data.jobs }} </p>
                <Button variant="primary" :href="data.href" target="_blank">{{ data.btnText  }}</Button>
            </div>
        </div>
    </Section>
</template>
<script setup>
const data = {
     heading:"We're Hiring",
     subheading:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
     jobs:"Software Engineer - Rust (Remote)",
     btnText:"Apply Here",
     href:"https://apply.workable.com/zinc-labs-inc/?not_found=true"
}
</script>