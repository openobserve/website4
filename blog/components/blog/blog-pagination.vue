<template>
  <div class="flex flex-row justify-end">
    <div class="pagination space-x-2">
      <button
        class="pagination-item"
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        :class="{ disabled: isInFirstPage }"
      >
        First
      </button>

      <button
        class="pagination-item"
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        :class="{ disabled: isInFirstPage }"
      >
        Previous
      </button>

      <button
        v-for="(page, index) in pages"
        :key="index"
        type="button"
        class="pagination-item"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>

      <button
        type="button"
        class="pagination-item"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        :class="{ disabled: isInLastPage }"
      >
        Next
      </button>

      <button
        class="pagination-item"
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
        :class="{ disabled: isInLastPage }"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  // total: {
  //   type: Number,
  //   required: true
  // },
  currentPage: {
    type: Number,
    required: true,
  },
});
const startPage = computed(() => {
  // When on the first page
  if (props.currentPage === 1) {
    return 1;
  }

  // NOTE: I don't think below logic is working
  //   // When on the last page
  //   if (props.currentPage === props.totalPages) {
  //     return props.totalPages - props.maxVisibleButtons;
  //   }

  // When in between
  return props.currentPage - 1;
});
const pages = computed(() => {
  const range = [];

  for (
    let i = startPage;
    i <= Math.min(startPage + props.maxVisibleButtons - 1, props.totalPages);
    i += 1
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    });
  }

  return range;
});
const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});
const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

const emit = defineEmits(["pagechanged"]);

const onClickFirstPage = () => {
  emit("pagechanged", 1);
};
const onClickPreviousPage = () => {
  emit("pagechanged", props.currentPage - 1);
};
const onClickPage = (page) => {
  emit("pagechanged", page);
};
const onClickNextPage = () => {
  emit("pagechanged", props.currentPage + 1);
};
const onClickLastPage = () => {
  emit("pagechanged", props.totalPages);
};
const isPageActive = (page) => {
  return props.currentPage === page;
};
</script>

<style lang="postcss" scoped>
.pagination-item {
  @apply inline-block px-4 py-2 border rounded font-semibold transition-all duration-200 shadow-md bg-white;
}

.pagination-item:hover {
  @apply shadow-xl;
}

.active {
  @apply bg-blue-400 text-white;
}

.active:hover {
  @apply text-white;
}

.disabled {
  @apply text-gray-300 cursor-not-allowed;
}
</style>
