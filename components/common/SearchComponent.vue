<template>
  <div>
    <!-- Search Button to Trigger Popup -->
    <Button @click="toggleSearchModal" variant="header"
      class="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-all duration-200 hover:bg-gray-100 hover:shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path fill="black"
          d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37" />
      </svg>
      <!-- <span class="text-black">Search</span> -->
    </Button>

    <!-- Overlay for Blurring Background -->
    <Teleport to="body">
      <div v-if="showSearchModal" class="fixed inset-0 z-[100] bg-black bg-opacity-50" @click="showSearchModal = false">
      </div>
      <!-- Search Modal with Input and Results -->
      <div v-if="showSearchModal"
        class="fixed md:top-10 top-0 left-0 right-0 mx-auto p-2 md:p-6 flex items-center justify-center z-[100] w-full md:w-1/2 lg:w-2/3">
        <div class="bg-white p-4 rounded-lg shadow-lg w-full">
          <!-- Search Input Section -->
          <div class="flex items-center space-x-2 border-b pb-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="black"
                d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37" />
            </svg>
            <input v-model="searchQuery" autofocus type="text" placeholder="Search..." ref="searchInput"
              class="w-full p-2 text-black bg-transparent outline-none" />
            <Button variant="close" @click="toggleSearchCloseModal">
              <img src="../../public/img/icons/close.svg" alt="Close" class="inline-block h-5 w-5 outline-none" />
            </Button>
          </div>

          <!-- Total results found and loader -->
          <div class="flex items-center justify-between mb-1">
            <p class="text-black text-sm pl-2" v-if="filteredResults.length && !loading">
              Total results found: {{ filteredResults.length }}
            </p>
            <p class="text-black" v-else-if="loading">Loading...</p>
          </div>

          <!-- Search Results Section -->
          <div class="max-h-96 overflow-y-auto thin-scrollbar">
            <ul v-if="filteredResults.length && !loading">
              <li v-for="result in visibleItems" :key="result.id" class="py-2 border-b hover:bg-gray-100">
                <nuxt-link :to="getResultUrl(result.id)" @click="toggleSearchCloseModal"
                  class="block text-black text-sm md:text-base p-2 space-y-1" style="content-visibility: auto;">
                  <!-- Title -->
                  <span v-html="highlightText(result.title)"></span>

                  <!-- ID -->
                  <p class="text-gray-700 text-xs md:text-xs italic" v-html="highlightText(getResultUrl(result.id))">
                  </p>

                  <!-- Content -->
                  <p class="text-gray-700 text-xs md:text-sm line-clamp-3" v-html="highlightText(result.content)"></p>
                </nuxt-link>
              </li>
            </ul>

            <!-- No results message -->
            <p v-else-if="searchQuery && !filteredResults.length && !loading" class="text-gray-500 mt-2">
              No results found.
            </p>
            <div id="lazy-loading-sentinel"></div> <!-- Sentinel for lazy loading -->
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
import { debounce } from "lodash-es";
const emit = defineEmits(["searchModalOpen", "searchModalClose"]);

const showSearchModal = ref(false);
const searchQuery = ref("");
const filteredResults = ref([]);
const visibleItemCount = ref(20); // Number of items to show initially
const loadedItemCount = ref(20); // Current number of loaded items
const loading = ref(false);
let observer = null;

function highlightText(text) {
  if (!searchQuery.value) return text;
  const regex = new RegExp(`(${searchQuery.value})`, "gi");
  return text.replace(
    regex,
    `<span class="text-indigo-800 font-semibold">$1</span>`
  );
}

const debouncedSearch = async () => {
  if (!searchQuery.value) {
    filteredResults.value = [];
    loading.value = false;
    loadedItemCount.value = 20; // Reset the loaded items
    return;
  }

  loading.value = true;
  try {
    const results = await searchContent(searchQuery.value);
    filteredResults.value = results?.value || [];
    loadedItemCount.value = visibleItemCount.value; // Set initial load count
  } catch (error) {
    console.error("Error fetching search results:", error);
  } finally {
    loading.value = false;
  }
};
watch(searchQuery, debounce(debouncedSearch, 300));

const visibleItems = computed(() =>
  filteredResults.value.slice(0, loadedItemCount.value)
);

// Intersection Observer to detect when the user reaches the end of the list
async function setupLazyLoadingObserver() {
  await nextTick();

  const sentinel = document.querySelector("#lazy-loading-sentinel");
  const container = document.querySelector(".thin-scrollbar");

  if (!sentinel || !container) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMoreItems();
      }
    },
    { root: container, rootMargin: "120px" } // Adjust rootMargin as needed
  );

  observer.observe(sentinel);
}

function loadMoreItems() {
  // Load more items if there are more items available
  if (loadedItemCount.value < filteredResults.value.length) {
    loadedItemCount.value += visibleItemCount.value;
  }
}

watch(showSearchModal, (newValue) => {
  if (newValue) {
    setupLazyLoadingObserver();
  } else {
    // remove observer
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }
})

// Set up the lazy loading observer when the component is mounted
onMounted(setupLazyLoadingObserver);

const getResultUrl = (url) => {
  const postsPathRegex = /^\/(resources|blog)\/posts/;

  if (postsPathRegex.test(url)) {
    return url.replace("/posts", "")
  }
  return url;
}

function toggleSearchModal() {
  showSearchModal.value = true;
  // emit search modal open event
  emit("searchModalOpen");
}
function toggleSearchCloseModal() {
  showSearchModal.value = false;

  searchQuery.value = "";
  loading.value = false;
  emit("searchModalClose");
}
</script>

<style scoped>
.thin-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.thin-scrollbar::-webkit-scrollbar-track {
  background: #ededed;
}

.thin-scrollbar::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 10px;
}

.thin-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}
</style>
