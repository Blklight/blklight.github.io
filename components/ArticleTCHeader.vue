<template>
  <section class="info-article">
    <template v-if="headerLayout === 'profile'">
      <HeaderProfile :article="article" twoColumn />
    </template>
    <template v-if="headerLayout === 'circle-profile'">
      <HeaderProfile :article="article" isCircle twoColumn />
    </template>
    <template v-if="headerLayout === 'fullpage'">
      <HeaderFullPage :article="article" />
    </template>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
    headerLayout() {
      const layoutTemplate = "fullpage";

      const layout = this.article.headerLayout
        ? this.article.headerLayout
        : layoutTemplate;

      return layout;
    },
  },
};
</script>
