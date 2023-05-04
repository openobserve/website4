<template>
  <Section>
    <SectionHeading :title="items.title" />

    <div class="container mx-auto">
      <div class="flex flex-col">
        <div class="-my-2 sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 sticky">
                  <tr>
                    <th
                      v-for="(item, index) in items.tableHeading"
                      :key="index"
                      class="px-2 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ item }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(it, index) in items.tableBody.featureData"
                    :key="index"
                  >
                    <td
                      class="px-2 py-2 md:px-6 md:py-4 whitespace-pre-wrap text-sm font-medium text-gray-900"
                    >
                      {{ it.title }}
                    </td>
                    <td class="px-2 py-2 md:px-6 md:py-4">
                      <div
                        class="flex justify-center items-center h-full w-full"
                      >
                        <img
                          src="/img/Check.svg"
                          alt="check icon"
                          class="p-2 rounded-full h-7 w-7 bg-theme-secondary"
                          v-if="it.developer === true"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-2 md:px-6 md:py-4">
                       <div
                        class="flex justify-center items-center h-full w-full"
                      >
                        <img
                          src="/img/Check.svg"
                          alt="check icon"
                          class="p-2 rounded-full h-7 w-7 bg-theme-secondary"
                          v-if="it.startup === true"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-2 md:px-6 md:py-4">
                      <div
                        class="flex justify-center items-center h-full w-full"
                      >
                        <img
                          src="/img/Check.svg"
                          alt="check icon"
                          class="p-2 rounded-full h-7 w-7 bg-theme-secondary"
                          v-if="it.enterprise === true"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
<script setup>
const props = defineProps({
  items: {
    type: Object,
    default: {},
  },
});
</script>
