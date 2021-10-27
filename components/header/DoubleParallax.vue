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
    <div class="header-overlay px-0">
      <div class="h-100 d-flex flex-column justify-content-center">
        <div
          class="py-2 px-3"
          :class="
            isDarkTheme
              ? 'bg-dark border-top border-bottom border-light'
              : 'bg-light border-top border-bottom border-dark'
          "
        >
          <h1 class="article-title">
            <em>
              <span
                class="p-1"
                :class="
                  isDarkTheme ? 'text-dark bg-light' : 'text-light bg-dark'
                "
              >
                <i class="marker-line">
                  {{ article.title }}
                </i>
              </span>
            </em>
          </h1>
          <h5 class="article-meta">
            <em>
              <span
                class="p-1"
                :class="
                  isDarkTheme ? 'text-dark bg-light' : 'text-light bg-dark'
                "
              >
                <i class="marker-line">
                  <DateFormat :date="article.date" full />
                </i>
              </span>
            </em>
          </h5>
          <h5 class="">
            <span>
              <span class="badge bg-uv border border-light">Websites</span>
              <span class="badge bg-uv border border-light">Posters</span></span
            >
          </h5>
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
