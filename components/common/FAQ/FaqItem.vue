<template>
    <div class="container mx-auto shadow rounded-lg bg-white border border-gray-100 text-black" >
        <div class="flex justify-between items-center cursor-pointer px-5 py-4" :class="clicked" @click="handleclick">
            <div class=" text-sm md:text-xl font-semibold ">{{ item.question }}</div>
            <div v-if="clicked"><img src="/img/icons/Minus.svg" alt="minus icon" /></div>
            <span v-else> <img src="/img/icons/Plus.svg" alt="plusicon" /> </span>
        </div>
        <div class="container mx-auto px-5 text-black" :class="clicked ? 'hidden':''">
            <div className="text-sm py-2 leading-2 tracking-wider" >{{ item.answer }}</div>
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
const clicked = ref(false);
const handleclick = () => {
    clicked.value = !clicked.value;
	// if (clicked.value === props.key) {
	// 	return clicked.value = null;
	// }
	// return clicked.value = props.key;
}
</script>