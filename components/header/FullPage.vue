<template>
  <div class="sticky-content hover-header">
    <img
      v-lazy="article.cover ? article.cover : article.imageHeader"
      class="info-article-image"
      :class="colorFilterRandom"
    />
    <div class="info-article-overlay">
      <div class="h-100 d-flex flex-column justify-content-end">
        <h5 class="article-meta">
          <span class="text-light bg-dark py-1">
            <span class="marker-line">
              <DateFormat :date="article.date" fulltime />
            </span>
          </span>
        </h5>
        <h1 class="article-title">
          <span class="text-light bg-dark p-1">
            <span class="marker-line">
              {{ article.title }}
            </span>
          </span>
        </h1>
      </div>
    </div>
  </div>
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
        "purple-red-orange",
        "red-sunset",
        "soft-blue-pink",
        "blue-red-golden",
      ];
      const num = Math.floor(Math.random() * filters.length);
      const filter = `hover-filter-${filters[num]}`;
      return filter;
    },
  },
};
</script>
