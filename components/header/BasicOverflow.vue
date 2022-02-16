<template>
  <header class="header-overflow-basic hover-header">
    <div
      v-lazy:background-image="article.imageHeader"
      class="header-overflow-basic-background"
      :class="colorFilterRandom"
    ></div>
    <div class="header-overflow-basic-content">
      <div
        class="header-overflow-basic-content-info background-texture"
        :class="[isDarkTheme ? 'bg-dark' : 'bg-light']"
      >
        <h1 class="article-title">{{ article.title }}</h1>
        <h5 class="article-meta mb-1">
          <DateFormat :date="article.date" full />
        </h5>
      </div>
    </div>
  </header>
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
    colorFilterRandom() {
      const filters = [
        "black-green",
        "black-white",
        "blue-red",
        "cyberpunk-v",
        "cyberpunk-vi",
        "cyberpunk-vii",
        "pink-blue",
        "purple-red-green",
        "purple-red-orange",
        "red-sunset",
        "soft-blue-pink",
      ];
      const num = Math.floor(Math.random() * filters.length);
      const filter = `hover-filter-${filters[num]}`;
      return filter;
    },
  },
};
</script>
