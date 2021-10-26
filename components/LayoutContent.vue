<template>
  <div id="body-content">
    <slot />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },

  mounted() {
    this.scrollTop();
  },

  methods: {
    scrollTop() {
      const element = document.getElementById("body-content");
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    },
  },
};
</script>
