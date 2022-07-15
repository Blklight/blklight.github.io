<template>
  <header class="header-parallax hover-header">
    <div
      v-lazy:background-image="article.imageHeader"
      class="header-parallax-image"
      :class="[
        colorFilterRandom,
        isDarkTheme
          ? 'border-bottom border-light'
          : 'border-bottom border-dark',
      ]"
    ></div>

    <div class="header-overlay">
      <div class="h-100 d-flex flex-column justify-content-center">
        <h1 class="text-center">
          <span class="text-light bg-dark p-1">
            {{ article.title }}
          </span>
        </h1>
        <h5 class="text-center">
          <DateFormat
            class="text-light bg-dark py-1 px-2"
            :date="article.date"
            full
          />
        </h5>
        <div class="text-center">
          <span>
            <span class="badge badge-tag bg-uv border border-light"
              >Websites</span
            >
            <span class="badge badge-tag bg-uv border border-light"
              >Posters</span
            ></span
          >
        </div>
      </div>
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
        // "black-green",
        // "black-white",
        // "blue-red",
        // "cyberpunk-v",
        // "cyberpunk-vi",
        // "cyberpunk-vii",
        // "pink-blue",
        // "purple-red-green",
        // "purple-red-orange",
        // "red-sunset",
        // "soft-blue-pink",
        "blue-red-golden",
      ];
      const num = Math.floor(Math.random() * filters.length);
      const filter = `hover-filter-${filters[num]}`;
      return filter;
    },
  },
};
</script>
