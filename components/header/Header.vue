<template>
    <div class="sticky top-0  z-50 backdrop-blur-sm bg-white text-black transition-all duration-500"
        :class="y > 20 ? 'drop-shadow-md' : ''">

        <div class="lg:block hidden">
            <LaptopView :items="items" />
        </div>
        <div class="lg:hidden block">
            <MobileView :items="items" />
        </div>

    </div>
</template>
<script setup>
import { useWindowScroll } from '@vueuse/core'
const isOpen = ref(false);
const route = useRoute();
watch(route, (value) => {
    isOpen.value = false;

});
const { y } = useWindowScroll();

const items = {
    content: [
        {
            title: "About",
            link: "/about"
        },
        {
            title: "Pricing",
            link: "/pricing"
        },
        {
            title: "Careers",
            link: "/careers"
        },
        {
            title: "Blog",
            link: "/blog"
        },

        {
            title: "Docs",
            link: ""
        },

    ],

    products: [
        {
            label: '',
            link: "/products/zincobserve",
            productName: 'ZincObserve',
        },
        {
            label: '',
            link: "/products/zplane",
            productName: 'ZPlane',
        },

    ],
    useCases: [
        // {
        //     label: '',
        //     link: "",
        //     productName: 'Observability',
        //     type:'group'
        // },
        {
            label: '',
            link: "/usecases/logs",
            productName: 'Logs',
        },
        {
            label: '',
            link: "/usecases/metrices",
            productName: 'Metrices',

        },
        {
            label: '',
            link: "/usecases/traces",
            productName: 'Traces',
        },
        // {
        //     label: '',
        //     link: "/usecases/appsearch",
        //     productName: 'App Search',
        // },
    ],
    solutions: [
        {
            label: '',
            link: "/solutions/migration-from-elasticsearch",
            productName: 'Migration from Elasticsearch',
        },
    ]
}
</script>
