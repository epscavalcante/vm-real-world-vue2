<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  methods: {
    updateValue(event) {
      // <-- method triggered by input event
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
