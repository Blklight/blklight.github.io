<template>
  <div :class="isDarkMode ? 'bg-dark' : 'bg-polen'">
    <Navbar />
    <Nuxt />
    <ImageFilter />
    <Footer />
  </div>
</template>
<style>
/* @import "~/assets/style/css/ultimate.css"; */
</style>
<style lang="scss">
// @import "~/assets/style/scss/extra.scss";
</style>
<script>
import { mapGetters } from "vuex";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import ImageFilter from "~/components/ImageFilter";
export default {
  components: { Navbar, Footer, ImageFilter },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
