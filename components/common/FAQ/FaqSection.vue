<template>
	<Section>
		<div class="container mx-auto px-4">
			<SectionHeading :title="items.title"
				:subtitle="items.subtitle"/>
			<div class="mt-10">
				<div v-for="(item, index) in items.items" class="w-full max-w-3xl m-auto my-2">
					<FaqItem :item="item" :key="index" />
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


</script>