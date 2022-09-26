<template>
  <div class="">
    <h2 v-if="validation">It works!</h2>
    <h2 v-else>Not Working</h2>
  </div>
</template>
<script>
export default {
  props: {
    validateSelect: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      validation: this.validateSelect,
    };
  },

  mounted() {
    console.log(this.validateSelect);
  },
  updated() {
    console.log(this.validateSelect);
  },
};
</script>
