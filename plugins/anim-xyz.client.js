import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core' // Import css here if you haven't elsewhere

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAnimXyz)
})