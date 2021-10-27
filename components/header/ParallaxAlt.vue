<template>
  <header class="header-parallaxAlt">
    <div class="header-parallaxAlt-content">
      <h1 class="article-title">
        <em>
          <span class="text-light bg-dark p-1">
            {{ article.title }}
          </span>
        </em>
      </h1>
      <h5 class="article-meta">
        <span class="text-light bg-dark p-1">{{ dateFormat }}</span>
      </h5>
      <h5 class="">
        <span class="">
          <span class="badge bg-uv border border-light">Websites</span>
          <span class="badge bg-uv border border-light">Posters</span>
        </span>
      </h5>
    </div>
    <div class="hover-header">
      <div
        v-lazy:background-image="article.imageHeader"
        class="header-parallaxAlt-img"
        :class="[
          colorFilterRandom,
          isDarkTheme ? 'border border-light' : 'border border-dark',
        ]"
      ></div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),

    dateFormat() {
      const formattedDate = format(
        new Date(this.article.date),
        "dd 'de' MMMM 'de' yyyy', às' H:mm",
        {
          locale: ptBR,
        }
      );

      return formattedDate;
    },
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
