export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: false
    },
    label: {
      type: [String, Number],
      required: false
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
