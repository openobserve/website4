<template>
  <div>
    <div v-if="isMenuOpen" tabindex="-1" class="fixed inset-0 h-screen w-full cursor-default "
      @click="isMenuOpen = false" @mouseenter="triggerMode == 'hover' ? isMenuOpen = false : null">
    </div>
    <div class="relative h-full my-2 font-medium z-50" @mouseleave="triggerMode == 'hover' ? isMenuOpen = false : null"
      @mouseover="triggerMode == 'hover' ? isMenuOpen = true : null">
      <div class="flex">
        <button @click="triggerMode == 'click' ? isMenuOpen = !isMenuOpen : null"
          class="font-normal text-base text-black  hover:text-theme-primary-500">
          {{ title }}
          <span class="inline-block items-center justify-center"
            :class="isMenuOpen == true ? 'transform rotate-180' : ''">
            ▾
            <!-- <img src="/img/icons/arrow.svg" alt="arrow icon" class="pl-1"/> -->
          </span>
        </button>
      </div>
      <div v-if="isMenuOpen"
        class="p-2 z-50 bg-white  border-theme-primary-400 border-solid border-r-4 border-b-4  shadow-2xl min-w-fit  rounded-lg mt-2"
        :class='[directions[direction], onMode == "hover" ? "absolute" : ""]'>
        <div v-for='(item, index) in items' :key="index">
          <div class="flex flex-col justify-between">
            <nuxt-link v-if="item.type != 'group'" :to="item.link">
              <Button variant="dropdownItem">
                {{ item.productName }}
              </Button>
            </nuxt-link>
            <!-- <div v-if="item.type == 'group'" :class="item.type != 'group'? 'pr-5': 'pr-0'">
              <span class="text-xs font-bold">{{ item.productName }}</span>
            </div> -->
          </div>
          
        </div>
      </div>

    </div>

  </div>
</template>
<script setup>
const isMenuOpen = ref(false);
const directions = {
  right: "right-0",
  left: "left-0",
};
const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  direction: {
    type: String,
    default: "left"
  },
  title: {
    type: String,
    default: ""
  },
  triggerMode: {
    type: String,
    default: "hover"
  },
  label: {
    type: String,
    default: ""
  },
  onMode: {
    type: String,
    default: "hover"
  }
})
// const handleclick = () => {
//     console.log("hello");
//     if (props.triggerMode == "click") {
//         isMenuOpen.value = true
//     } else {
//         isMenuOpen.value = false
//     }
// }
// const mouseEnter = () => {
//     if (props.triggerMode == "hover") {
//         isMenuOpen.value = false
//     }
// }
// const mouseout = () => {
//     if (props.triggerMode == "hover") {
//         isMenuOpen.value = false
//     }

// }
// const mouseOver = () => {
//     if (props.triggerMode == "hover") {
//         isMenuOpen.value = true
//     }
// }


</script>
<style></style>