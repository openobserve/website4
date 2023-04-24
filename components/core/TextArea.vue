<template>
  <div :class="[
    classes.container,
    variation[variant] && variation[variant].container,
  ]">
    <label v-if="label" :for="name ? name : false" :class="[
      {
        required: required,
      },
      classes.label,
      variation[variant] && variation[variant].label,
    ]">
      {{ label }}
    </label>

    <p>
      <textarea v-bind="$attrs" :value="modelValue" :name="name" @input="
        error = '';
      $emit('update:modelValue', $event.target.value);
                " @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" :class="[
            error ? 'border-red-500 ring-red-200' : 'ring-theme-primary',
            classes.textarea,
            variation[variant] && variation[variant].textarea,
          ]">
        </textarea>
      <span :class="[classes.error, variation[variant] && variation[variant].error]">
        {{ error }}
      </span>
    </p>
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref } from 'vue';
defineProps({
  modelValue: String,
  label: {
    type: String,
  },
  required: {
    type: Boolean,
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
      label: "text-sm",
      tooltipHint:
        "bg-gray-400 rounded-full text-xs font-bold text-theme-primary-dark px-1.5 cursor-pointer",
      textarea:
        "w-full px-4 py-2 text-theme-text-primary rounded-lg outline-none bg-gray-50   transition-all duration-150",
      error: "text-red-500 text-sm",
    }),
  },
  variant: {
    type: [Object, String],
    default: "default",
  },
  variation: {
    type: [Object, String],
    default: () => ({
      default: {
        container: "",
        label: "",
        tooltipHint: "",
        textarea: "border border-theme-primary focus:ring-1 focus:bg-white",
        error: "",
      },
      material: {
        container: "",
        label: "",
        tooltipHint: "",
        textarea:
          "border-b border-transparent border-gray-200 focus:border-theme-primary",
        error: "",
      },
    }),
  },
})
const validate = () => {
  if (required && isEmpty(modelValue)) {
    error = requiredError;
    return false;
  }
  if (regex && !new RegExp(regex).test(modelValue)) {
    error = validationError;
    return false;
  }
  return true;
};
   

</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}
</style>
