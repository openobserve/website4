<template>
    <div :class='["py-5 md:py-10", classes]'>
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    classes: {
        type: String,
        default: ''
    }
})
</script>