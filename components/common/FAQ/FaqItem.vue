<template>
    <div class="container mx-auto shadow rounded-lg bg-white border border-gray-100 text-black">
        <div class="flex justify-between items-center cursor-pointer px-5 py-4 " :class="active" @click="onToggle">
            <div class=" text-sm md:text-xl font-semibold ">{{ item.question }}</div>
            <div v-if="active"><img src="/img/icons/Minus.svg" alt="minus icon" /></div>
            <span v-else> <img src="/img/icons/Plus.svg" alt="plusicon" /> </span>
        </div>
        <div class="container mx-auto px-5 text-black ">
            <div className="text-sm  md:text-base py-2 leading-2 tracking-wider" v-if="active">{{ item.answer }}</div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: {}
    },
    key: {
        type: Number,
        default: 0,
    },
    onToggle: {
        type: Function,

    },
    active: {
        type: Boolean
    }
})
</script>