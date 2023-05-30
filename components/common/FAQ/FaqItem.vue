<template>
    <div class="container mx-auto shadow rounded-lg bg-white border border-gray-100 text-black py-4" >
        <div class="flex justify-between items-center px-5">
            <div class=" text-sm md:text-xl font-semibold ">{{ item.question }}</div>
            
            <!-- <div v-if="clicked"><img src="/img/icons/Minus.svg" alt="minus icon" /></div>
            <span v-else> <img src="/img/icons/Plus.svg" alt="plusicon" /> </span> -->
        </div>
        <div class="container mx-auto px-5 pt-3 text-black">
            <div class="text-base leading-relaxed tracking-wider" v-html="item.answer" ></div>
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