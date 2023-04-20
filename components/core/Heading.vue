<template>
  <component :is="as" :class="[
    {
      'text-left': align == 'left',
      'text-center': align == 'center',
      'text-right': align == 'right',
    },
    classes,
    variation[variant],
  ]">
    <slot></slot>
  </component>
</template>

<script setup>

defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },

  align: {
    type: String,
    default: "center",
    validator: (value) => ["left", "center", "right"].includes(value) !== -1,
  },
  as: {
    type: String,
    default: "h1",
    validator: (value) =>
      ["h1", "h2", "h3", "h4", "h5", "h6", "h7"].includes(value) !== -1,
  },
  classes: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
  variation: {
    type: [Object, String],
    default: () => ({
      default: "text-4xl md:mb-4 mb-0",
      heading: "leading-loose text-2xl md:text-4xl mb-4 text-black font-bold w-full flex flex-col container mx-auto",
      subheading: "w-full font-normal text-black text-sm md:text-base container mx-auto",
      underline: "text-4xl mb-4 relative small-underline ",
      headingUnderline:
        "text-4xl mb-4 relative small-underline-center mx-auto text-center",
      featureTitle: "text-3xl mb-4",
      usageTitle: "text-2xl mb-4 ",
      servicesTitle: "md:text-4xl text-2xl mb-4 md:font-normal font-semibold",
      aboutTitle: "",
    }),
  },
});
</script>

