<template>
  <div :class="[classes.container, variation[variant].container]">
    <label
      v-if="label"
      :for="name ? name : false"
      class="text-sm"
      :class="{
        required: required,
      }"
    >
      {{ label }}
    </label>
    <p>
      <input
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :accept="accept"
        @input="(error = ''), $emit('update:modelValue', $event.target.value);"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :class="[
          error ? 'border-red-500 ring-red-200' : 'ring-theme-primary',
          classes.input,
          variation[variant].input,
        ]"
      />
      <span :class="[classes.error, variation[variant].error]">{{
        error
      }}</span>
    </p>
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref } from "vue";
const error = ref("");

const props = defineProps({
  modelValue: String,

  label: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
  },
  accept: {
    type: String,
  },
  requiredError: {
    type: String,
    default: "This field is required",
  },
  name: {
    type: String,
  },
  regex: {
    type: String,
  },
  validationError: {
    type: String,
  },
  tooltipHint: {
    type: String,
    default: "?",
  },
  tooltip: {
    type: String,
  },
  classes: {
    type: [Object, String],
    default: () => ({
      container: "w-full transition-all duration-150 my-2",
      tooltipHint:
        "bg-red-400 rounded-lg text-xs font-bold text-theme-primary-dark px-2 cursor-pointer",
      input:
        "w-full px-4 py-2 text-theme-text-primary rounded-lg outline-none bg-gray-50   transition-all duration-150",
      error: "text-red-500 text-sm",
    }),
  },
  variant: {
    type: String,
    default: "default",
  },
  variation: {
    type: [Object, String],
    default: () => ({
      default: {
        container: "",
        tooltipHint: "",
        input: "border focus:ring-1 focus:bg-transparent",
        error: "",
      },
      material: {
        container: "",
        tooltipHint: "",
        input:
          "border-b border-transparent border-gray-200 focus:border-theme-primary",
        error: "",
      },
    }),
  },
});
const validate = () => {
  if (props.required) {
    if (props.type === "number" && !_.isNumber(props.modelValue)) {
      error.value = props.requiredError;
      // console.log(1)
      return false;
    }
    // for strings
    if (props.type !== "number" && _.isEmpty(props.modelValue)) {
      // console.log(2)
      error.value = props.requiredError;
      return false;
    }

    
  }
  

  // check for regex validation
  if (props.regex && !new RegExp(props.regex).test(props.modelValue)) {
    error.value = props.validationError;
    return false;
  }
  return true
};

defineExpose({
  validate,
});
</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}
</style>
