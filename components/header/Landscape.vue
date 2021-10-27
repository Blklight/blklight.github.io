<template>
  <header class="header-landscape hover-header">
    <picture>
      <source media="(max-width: 768px)" :srcset="article.cover" />
      <source media="(min-width: 769px)" :srcset="article.imageHeader" />
      <img
        v-lazy="article.imageHeader"
        class="header-landscape-img"
        :class="[colorFilterRandom]"
      />
    </picture>
    <!-- <div
      v-lazy:background-image="article.imageHeader"
      class="header-landscape-img"
    ></div> -->
    <div class="header-overlay">
      <div class="h-100 d-flex flex-column justify-content-end">
        <div class="px-3">
          <h5>
            <span class="badge bg-dark border border-light">Websites</span>
            <span class="badge bg-dark border border-light">Posters</span>
          </h5>
          <h1 class="article-title">
            <em>
              <span class="text-light bg-dark p-1">
                <i class="marker-line"> {{ article.title }} </i>
              </span>
            </em>
          </h1>
          <h5 class="article-meta">
            <em>
              <span class="text-light bg-dark p-1">
                <i class="marker-line">
                  <DateFormat :date="article.date" full />
                </i>
              </span>
            </em>
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
