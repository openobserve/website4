<template>
	<Section>
		<div class="container mx-auto px-4">
			<SectionHeading :title="items.title"
				:subtitle="items.subtitle" align="center"/>
			<div class="mt-10">
				<div v-for="(item, index) in items.items" class="w-full max-w-3xl m-auto my-2">
					<FaqItem :item="item" :key="index" :onToggle="() => handleclick(index)" :active="clicked === index" />
				</div>
			</div>
		</div>
	</Section>
</template>
<script setup>
defineProps({
	items:{
		type:Object
	}
})
const clicked = ref(null);
const handleclick = (index) => {
	if (clicked.value === index) {
		return clicked.value = null;
	}
	return clicked.value = index;
}

</script>