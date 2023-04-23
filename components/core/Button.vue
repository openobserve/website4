<template>
  <NuxtLink
    :class="[
      classes,
      variation[variant],
      { 'cursor-not-allowed': disabled || loading },
    ]"
    :to="to"
    :target="target"
    :disabled="loading || disabled"
    @click="!loading && !disabled ? $emit('click', $event) : ''"
  >
    <div class="relative">
      <div :class="{ invisible: loading }">
        <slot></slot>
      </div>
      <div v-if="loading" class="absolute inset-0 flex items-center">
        <Loading small light class="mx-auto" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  // click behaviors
  to: {
    type: [String, Object],
    default: null,
  },
  target: {
    type: String,
    default: null,
  },
  // states
  loading: {
    // it will be disabled when loading
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default:
      "cursor-pointer transition-all duration-150 focus:outline-none outline-none",
  },
  variant: {
    type: String,
    default: "default",
  },
  variation: {
    type: Object,
    default: () => ({
      default:
        "inline-block px-2 py-1 md:px-6 md:py-3 rounded-lg border border-transparent bg-theme-primary text-center text-md transition cursor-pointer effect effect-1 ",
      header:
        "block my-2 font-normal text-base animate-left text-black hover:text-emerald-700",
      dropdownItem:
        "block px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-base text-black animate-left whitespace-nowrap",
      pricing:
        "block items-center mt-auto text-white bg-theme-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-theme-primary-600 rounded",
      headerBtn:
        "inline-block px-3 py-3 text-center rounded-lg text-white bg-emerald-700 focus:ring-2 ring-offset-1",
      primary:
        "inline-block px-4 py-3 text-base rounded-full cursor-pointer text-white bg-theme-primary hover:bg-theme-primary-600 border-theme-primary-500 focus:ring-2 ring-offset-1 ring-theme-primary-500",
      blog: "cursor-pointer mt-4 hover:text-theme-primary-400",
    }),
  },
});
</script>

<style scoped>
/* Hover Me */
.effect {
  display: inline-block;
  position: relative;
  color: #fff;
  text-transform: capitalize;
  width: 200px;
  overflow: hidden;
}

/* effect-1 styles */
.effect.effect-1 {
  transition: all 0.2s linear 0s;
}

.effect.effect-1:before {
  content: "›";
  font-size: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  opacity: 0;
  height: 100%;
  width: 40px;
  transition: all 0.2s linear 0s;
}

.effect.effect-1:hover {
  text-indent: -20px;
}

.effect.effect-1:hover:before {
  opacity: 1;
  text-indent: 0px;
}

/* Hover Me */
</style>
