<template>
  <header class="header-portrait hover-header">
    <div
      :class="[
        isRight ? 'header-portrait-column-right' : 'header-portrait-column',
      ]"
    >
      <div
        v-lazy:background-image="article.imageHeader"
        :class="[
          colorFilterRandom,
          isFull
            ? 'header-portrait-background-full'
            : 'header-portrait-background',
        ]"
      ></div>
    </div>
    <div class="header-overlay">
      <div class="h-100 d-flex flex-column justify-content-center">
        <div class="header-portrait-content">
          <h1 class="article-title text-center">
            <em>
              <span
                class="p-1"
                :class="
                  !isDarkTheme ? 'text-dark bg-light' : 'text-light bg-dark'
                "
              >
                <i class="marker-line">
                  {{ article.title }}
                </i>
              </span>
            </em>
          </h1>
          <h5 class="article-meta text-center">
            <em>
              <span
                class="p-1"
                :class="
                  !isDarkTheme ? 'text-dark bg-light' : 'text-light bg-dark'
                "
              >
                <i class="marker-line">
                  <DateFormat :date="article.date" full />
                </i>
              </span>
            </em>
          </h5>
          <h5 :class="isRight ? 'text-start' : 'text-end'">
            <span class="p-2">
              <span class="badge bg-uv border border-light">Websites</span>
              <span class="badge bg-uv border border-light">Posters</span>
            </span>
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

    isRight: {
      type: Boolean,
      default: false,
    },

    isFull: {
      type: Boolean,
      default: false,
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
