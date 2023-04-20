<template>
  <div :class="[
    classes?.container,
    variation[variant]?.container
  ]" @mouseover="isVisible = true" @mouseleave="isVisible = false">
    {{ tooltipHint }}
    <span v-if="isVisible" :class="[
      classes?.tooltip,
      variation[variant]?.tooltip,
      side
    ]">
      <slot>Tooltip text</slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false)

defineProps({
  side: {
    type: String,
    default: ''
  },
  tooltipHint: {
    type: String,
    default: 'ⓘ'
  },
  classes: {
    type: Object,
    default: {
      container: "relative inline-block p-2",
      tooltip: "bg-black text-white center rounded-lg p-1 absolute z-[1] whitespace-nowrap",

    },
  },
  variant: {
    type: String,
    default: "default",
  },
  variation: {
    type: Object,
    default: () => ({

    }),
  },

})

</script>
<style scoped>
.left {

  right: 110%;
}

.left::before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 100%;
  /* To the right of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent black;
}

.top {
  /* width: 120px; */
  bottom: 100%;
  left: 50%;
  margin-left: -40px;
}

.top::after {
  content: " ";
  position: absolute;
  top: 100%;
  /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.right {
  /* top: -5px; */
  left: 105%;
}

.right::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%;
  /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.bottom {
  /* width: 120px; */
  top: 100%;
  left: 50%;
  margin-left: -40px;
}

.bottom::before {
  content: " ";
  position: absolute;
  bottom: 100%;
  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
</style>